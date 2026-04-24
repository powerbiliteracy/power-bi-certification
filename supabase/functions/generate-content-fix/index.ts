// Generates a content stub (title + body) for a missing/renamed syllabus topic
// using the Lovable AI Gateway, then saves it as a content_overrides row.
//
// Called by admins from the SyllabusSyncButton "Fix issue" action.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface FixRequest {
  sectionKey: string;
  sectionLabel: string;
  itemType: string;            // e.g. "checklist_item" | "flashcard" | "lesson" | "topic"
  topic: string;               // raw syllabus topic text
  domainName?: string;
  domainSection?: string;
  syllabusVersionId?: string;
  closestMatch?: string;       // best-existing match, if any (renames)
  isRename: boolean;
}

const ITEM_TYPE_GUIDES: Record<string, string> = {
  checklist_item: "Produce a single concise actionable checklist item the learner can tick off.",
  flashcard: "Produce a flashcard with a short question on the front and a clear, exam-relevant answer on the back.",
  lesson: "Produce a short interactive lesson outline with a goal, 3-5 key beats, and a recap.",
  topic: "Produce a quick-reference cheat sheet entry with key concepts, best practices, common mistakes and exam tips.",
  scenario: "Produce a realistic exam scenario with context, a question, and a step-by-step solution approach.",
  troubleshooting: "Produce a troubleshooting entry with the symptom, likely root causes, and 4-6 numbered solutions.",
  decision_step: "Produce a decision-framework step with the action, detail, and the decision the analyst must make.",
  key_term: "Produce a key term entry with definition, speed-note, exam tip and a real-world practice tip.",
};

function buildSchema(itemType: string) {
  return {
    name: "generated_content",
    description: `PL-300 ${itemType} content for a missing or renamed syllabus topic.`,
    parameters: {
      type: "object",
      properties: {
        title: { type: "string", description: "Short title (max 80 chars)" },
        summary: { type: "string", description: "One-sentence summary" },
        body: {
          type: "object",
          properties: {
            keyPoints: { type: "array", items: { type: "string" } },
            bestPractices: { type: "array", items: { type: "string" } },
            commonMistakes: { type: "array", items: { type: "string" } },
            examTips: { type: "array", items: { type: "string" } },
          },
        },
      },
      required: ["title", "summary", "body"],
      additionalProperties: false,
    },
  };
}

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

    const body = (await req.json()) as FixRequest;
    if (!body?.topic || !body?.sectionKey || !body?.itemType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const guide =
      ITEM_TYPE_GUIDES[body.itemType] ?? ITEM_TYPE_GUIDES.topic;

    const systemPrompt =
      "You are a Microsoft PL-300 (Power BI Data Analyst) curriculum author. " +
      "Write tight, exam-aligned content. Avoid fluff. Reference Power BI, Power Query, DAX, " +
      "and the Power BI service when relevant. UK English spelling.";

    const userPrompt = body.isRename
      ? `The PL-300 syllabus topic "${body.topic}" appears to be a rename of our existing item "${body.closestMatch}". ` +
        `Generate updated content under the new name for the "${body.sectionLabel}" section. ${guide}`
      : `The PL-300 syllabus topic "${body.topic}" is missing from our "${body.sectionLabel}" section. ` +
        `Generate new content for it. ${guide}` +
        (body.domainSection ? ` Domain section: "${body.domainSection}".` : "");

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [{ type: "function", function: buildSchema(body.itemType) }],
          tool_choice: {
            type: "function",
            function: { name: "generated_content" },
          },
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
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
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

    let parsed: { title: string; summary: string; body: Record<string, unknown> };
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch {
      return new Response(JSON.stringify({ error: "Could not parse AI output" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: override, error: insertErr } = await supabase
      .from("content_overrides")
      .insert({
        section_key: body.sectionKey,
        item_type: body.itemType,
        original_topic: body.topic,
        generated_title: parsed.title,
        generated_body: { summary: parsed.summary, ...parsed.body },
        domain_name: body.domainName ?? null,
        domain_section: body.domainSection ?? null,
        syllabus_version_id: body.syllabusVersionId ?? null,
        created_by: userData.user.id,
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Insert override failed", insertErr);
      return new Response(JSON.stringify({ error: insertErr.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ override }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generate-content-fix error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
