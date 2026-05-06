import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAnon = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const { priceId, tier } = await req.json();
    if (!priceId) throw new Error("priceId is required");

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseAnon.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Resolve trial period from admin-managed pricing_settings
    let trialDays = 0;
    try {
      const { data: ps } = await supabaseAdmin
        .from("pricing_settings")
        .select("pro_trial_days, premium_trial_days")
        .limit(1)
        .maybeSingle();
      if (ps && tier === "pro") trialDays = ps.pro_trial_days || 0;
      if (ps && tier === "premium") trialDays = ps.premium_trial_days || 0;
    } catch (_) { /* ignore */ }

    const subscription_data = trialDays > 0 ? { trial_period_days: trialDays } : undefined;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      ...(subscription_data ? { subscription_data } : {}),
      success_url: `${req.headers.get("origin")}/Dashboard?checkout=success`,
      cancel_url: `${req.headers.get("origin")}/#pricing`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("create-checkout error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const safeMessages = ["priceId is required", "User not authenticated or email not available"];
    const clientMessage = safeMessages.includes(message)
      ? message
      : "An internal error occurred. Please try again.";
    return new Response(JSON.stringify({ error: clientMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
