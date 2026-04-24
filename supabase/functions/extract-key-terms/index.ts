// Extracts the canonical list of Key Terms & Features from the saved PL-300
// syllabus, grouped by domain and section, using the Lovable AI Gateway.
//
// Used by the Key Terms page's Sync button so admins can see which terms are
// missing from the dictionary versus the latest syllabus.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

interface ExtractRequest {
  syllabusVersionId?: string;
  syllabusContent?: string;
}

const SCHEMA = {
  name: "extracted_key_terms",
  description:
    "Authoritative list of Key Terms & Features that learners should know for the PL-300 exam, grouped by domain and section, derived from the supplied syllabus.",
  parameters: {
    type: "object",
    properties: {
      domains: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", description: "Domain name, e.g. 'Prepare the data'" },
            weight: { type: "string", description: "Domain weight, e.g. '25–30%'" },
            sections: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Section / module title from the syllabus" },
                  terms: {
                    type: "array",
                    description:
                      "Distinct Key Terms or Features a learner must understand for this section. " +
                      "Use the canonical Power BI / Power Query / DAX / Service vocabulary. " +
                      "Each entry should be a single noun phrase (e.g. 'DirectQuery', 'Star schema', 'Row-level security'), not a sentence.",
                    items: { type: "string" },
                  },
                },
                required: ["title", "terms"],
                additionalProperties: false,
              },
            },
          },
          required: ["name", "sections"],
          additionalProperties: false,
        },
      },
    },
    required: ["domains"],
    additionalProperties: false,
  },
} as const;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableKey) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, anon, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json().catch(() => ({}))) as ExtractRequest;

    let syllabusContent = body.syllabusContent ?? "";
    let versionLabel: string | null = null;
    let versionId: string | null = body.syllabusVersionId ?? null;

    if (!syllabusContent) {
      // Load the latest saved syllabus (or the requested version)
      const query = supabase
        .from("syllabus_versions")
        .select("id, label, content")
        .eq("exam_code", "PL-300");
      const { data: versionData, error: versionErr } = body.syllabusVersionId
        ? await query.eq("id", body.syllabusVersionId).maybeSingle()
        : await query.order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (versionErr) throw versionErr;
      if (!versionData) {
        return new Response(JSON.stringify({ error: "No saved syllabus version" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      syllabusContent = versionData.content;
      versionLabel = versionData.label;
      versionId = versionData.id;
    }

    const systemPrompt =
      "You are a Microsoft PL-300 (Power BI Data Analyst) curriculum author. " +
      "Given a syllabus, extract the canonical Key Terms & Features a candidate must know — " +
      "this is a vocabulary / dictionary list, not a list of lessons. " +
      "Use precise Power BI, Power Query, DAX, and Power BI Service terminology. " +
      "UK English spelling. Be exhaustive but avoid duplicates across sections.";

    const userPrompt =
      "Extract the Key Terms & Features for this PL-300 syllabus. " +
      "Group them by the syllabus's own domains and sections (modules). " +
      "Each term should be a single concept (e.g. 'DirectLake', 'USERELATIONSHIP', 'Row-level security') " +
      "that would appear in a glossary. Aim for 5–15 terms per section. " +
      "Skip domain-level meta items like 'Skills measured'.\n\n" +
      "SYLLABUS:\n" +
      syllabusContent;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [{ type: "function", function: SCHEMA }],
          tool_choice: { type: "function", function: { name: "extracted_key_terms" } },
        }),
      },
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "AI rate limit reached. Try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Top up in Lovable Cloud settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(JSON.stringify({ error: "AI extraction failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiJson = await aiResponse.json();
    const toolCall = aiJson?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      return new Response(JSON.stringify({ error: "AI returned no structured output" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: { domains: Array<{ name: string; weight?: string; sections: Array<{ title: string; terms: string[] }> }> };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: "Could not parse AI output" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        syllabusVersionId: versionId,
        syllabusVersionLabel: versionLabel,
        domains: parsed.domains ?? [],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("extract-key-terms error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
