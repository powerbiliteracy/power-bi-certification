import React, { useEffect, useMemo, useState } from "react";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Tier = "explorer" | "pro" | "premium";

// Static perks that aren't represented as sections in the DB
const STATIC_PERKS: Record<Tier, string[]> = {
  explorer: ["Community support"],
  pro: ["Progress tracking & analytics", "Email support"],
  premium: ["Personalized study plan", "Priority support", "Certificate of completion"],
};

const STRIPE_PRICES = {
  pro: {
    monthly: "price_1TJiRbGfR936pbAmdrVoB4NC",
    annual: "price_1TJiViGfR936pbAmWBgrEiGL",
  },
  premium: {
    monthly: "price_1TJiVOGfR936pbAmaTIVsLKx",
    annual: "price_1TJiW2GfR936pbAmIscPKxWF",
  },
};

const tiers = [
  {
    id: "free",
    tierKey: "explorer" as Tier,
    name: "Explorer",
    price: "$0",
    period: "forever",
    description: "Get started with essential PL-300 study materials",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-400",
    popular: false,
    cta: "Get Started Free",
  },
  {
    id: "pro",
    tierKey: "pro" as Tier,
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Full access to all study tools and practice exams",
    icon: Crown,
    gradient: "from-primary to-accent",
    popular: true,
    cta: "Start Pro Trial",
  },
  {
    id: "premium",
    tierKey: "premium" as Tier,
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Premium coaching with AI-powered exam preparation",
    icon: Rocket,
    gradient: "from-violet-500 to-pink-400",
    popular: false,
    cta: "Start Premium Trial",
  },
];

const annualSavings = {
  pro: { monthly: "$19", annual: "$15", save: "21%" },
  premium: { monthly: "$39", annual: "$29", save: "26%" },
};

interface PricingCardsProps {
  compact?: boolean;
}

export default function PricingCards({ compact = false }: PricingCardsProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [sections, setSections] = useState<{ section_label: string; required_tier: Tier; sort_order: number }[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    supabase
      .from("section_access")
      .select("section_label, required_tier, sort_order, admin_only, is_hidden")
      .then(({ data }) => {
        if (!data) return;
        const visible = (data as any[])
          .filter((s) => !s.admin_only && !s.is_hidden)
          .map((s) => ({
            section_label: s.section_label as string,
            required_tier: s.required_tier as Tier,
            sort_order: s.sort_order as number,
          }))
          .sort((a, b) => a.sort_order - b.sort_order);
        setSections(visible);
      });
  }, []);

  const featuresByTier = useMemo(() => {
    const explorer = sections.filter((s) => s.required_tier === "explorer").map((s) => s.section_label);
    const pro = sections.filter((s) => s.required_tier === "pro").map((s) => s.section_label);
    const premium = sections.filter((s) => s.required_tier === "premium").map((s) => s.section_label);
    return {
      explorer: [...explorer, ...STATIC_PERKS.explorer],
      pro: ["Everything in Explorer", ...pro, ...STATIC_PERKS.pro],
      premium: ["Everything in Pro", ...premium, ...STATIC_PERKS.premium],
    } as Record<Tier, string[]>;
  }, [sections]);

  const handleSubscribe = async (tierId: string) => {
    if (tierId === "free") {
      if (!user) {
        navigate("/auth");
      } else {
        navigate("/Dashboard");
      }
      return;
    }

    if (!user) {
      // Store intended plan in sessionStorage so we can redirect after auth
      const priceId = STRIPE_PRICES[tierId as keyof typeof STRIPE_PRICES]?.[isAnnual ? "annual" : "monthly"];
      sessionStorage.setItem("pending_checkout_price", priceId);
      navigate("/auth");
      return;
    }

    const priceId = STRIPE_PRICES[tierId as keyof typeof STRIPE_PRICES]?.[isAnnual ? "annual" : "monthly"];
    if (!priceId) return;

    setLoadingTier(tierId);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({
        title: "Checkout Error",
        description: err.message || "Failed to start checkout",
        variant: "destructive",
      });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", !isAnnual ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={cn(
            "relative w-12 h-6 rounded-full transition-colors",
            isAnnual ? "bg-primary" : "bg-border"
          )}
        >
          <div className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform",
            isAnnual ? "translate-x-6" : "translate-x-0.5"
          )} />
        </button>
        <span className={cn("text-sm font-medium", isAnnual ? "text-foreground" : "text-muted-foreground")}>
          Annual
          <span className="ml-1 text-xs text-primary font-semibold">Save up to 26%</span>
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier) => {
          const price = isAnnual && tier.id !== "free"
            ? annualSavings[tier.id as keyof typeof annualSavings]?.annual || tier.price
            : tier.price;
          const period = tier.id === "free" ? "forever" : isAnnual ? "/month, billed annually" : "/month";

          return (
            <div
              key={tier.id}
              className={cn(
                "relative bg-card rounded-2xl border p-6 flex flex-col transition-all duration-200",
                tier.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border hover:shadow-lg hover:border-primary/20"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-3`}>
                  <tier.icon className="w-5 h-5 text-card" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
              </div>

              <div className="mb-5">
                <span className="text-4xl font-bold text-foreground">{price}</span>
                <span className="text-sm text-muted-foreground ml-1">{period}</span>
                {isAnnual && tier.id !== "free" && (
                  <p className="text-xs text-primary font-medium mt-1">
                    Save {annualSavings[tier.id as keyof typeof annualSavings]?.save}
                  </p>
                )}
              </div>

              <ul className={cn("space-y-3 mb-6 flex-1", compact && "space-y-2")}>
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "default" : "outline"}
                className={cn(
                  "w-full rounded-xl font-semibold",
                  tier.popular && "shadow-lg shadow-primary/20"
                )}
                disabled={loadingTier === tier.id}
                onClick={() => handleSubscribe(tier.id)}
              >
                {loadingTier === tier.id ? "Loading..." : tier.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
