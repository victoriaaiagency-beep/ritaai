// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY")!;
const SMTP_EMAIL = Deno.env.get("SMTP_EMAIL")!;
const SMTP_APP_PASSWORD = Deno.env.get("SMTP_APP_PASSWORD")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const NOTIFY_TO = "victoria.ai.agency@gmail.com";
const CALENDAR_URL = "https://calendar.app.google/6neTruBhh8ZXCJGf8";

async function analyzeWithGroq(details: string) {
  const prompt = `You are an assistant that analyzes inbound business automation leads. Return STRICT JSON only — no prose, no markdown — with keys: priority ("High" | "Medium" | "Low"), category (short string, e.g. "Lead Gen", "Onboarding", "Reporting", "Voice Agent", "CRM Integration", "Other"), intent (1-2 sentences describing what the prospect wants), suggested_action (1-2 sentences with a recommended next step for Victoria).

Lead details:
"""
${details}
"""`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You output strictly valid JSON only. No commentary, no code fences.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    console.error("Groq error:", res.status, t);
    return {
      priority: "Medium",
      category: "Unclassified",
      intent: "Could not analyze automatically.",
      suggested_action: "Reach out manually to qualify.",
    };
  }
  const data = await res.json();
  try {
    return JSON.parse(data.choices[0].message.content);
  } catch (_e) {
    return {
      priority: "Medium",
      category: "Unclassified",
      intent: "Could not parse AI analysis.",
      suggested_action: "Reach out manually to qualify.",
    };
  }
}

function priorityColor(p: string) {
  const v = (p || "").toLowerCase();
  if (v === "high") return "#EF4444";
  if (v === "low") return "#10B981";
  return "#FBBF24";
}

function escapeHtml(s: string) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildEmail(lead: any, ai: any) {
  const color = priorityColor(ai.priority);
  return `<!doctype html>
<html><body style="margin:0;background:#0F172A;font-family:Inter,Arial,sans-serif;color:#E2E8F0;">
  <div style="max-width:620px;margin:0 auto;padding:24px;">
    <div style="background:#111827;border:1px solid #1F2937;border-radius:18px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #1F2937;display:flex;align-items:center;gap:12px;">
        <div style="font-size:12px;letter-spacing:.18em;color:#94A3B8;text-transform:uppercase;">New Lead Alert</div>
        <div style="margin-left:auto;background:${color};color:#0F172A;font-weight:700;font-size:12px;padding:6px 12px;border-radius:999px;">
          ${escapeHtml(ai.priority || "Medium")} priority
        </div>
      </div>
      <div style="padding:24px 28px;">
        <h2 style="margin:0 0 6px;color:#fff;font-size:22px;">${escapeHtml(lead.name)}</h2>
        <div style="color:#94A3B8;font-size:13px;">${escapeHtml(lead.source === "chatbot" ? "Source: AI Chatbot" : "Source: Strategy Call Form")}</div>

        <h3 style="margin:24px 0 8px;color:#A78BFA;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">Contact Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#E2E8F0;">
          <tr><td style="padding:6px 0;color:#94A3B8;width:90px;">Email</td><td><a style="color:#FBBF24;" href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
          ${lead.phone ? `<tr><td style="padding:6px 0;color:#94A3B8;">Phone</td><td>${escapeHtml(lead.phone)}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#94A3B8;">Category</td><td>${escapeHtml(ai.category || "—")}</td></tr>
        </table>

        <h3 style="margin:24px 0 8px;color:#A78BFA;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">Message</h3>
        <div style="background:#0B1220;border:1px solid #1F2937;border-radius:12px;padding:14px 16px;color:#E2E8F0;font-size:14px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(lead.details || "(no details provided)")}</div>

        <h3 style="margin:24px 0 8px;color:#A78BFA;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">AI Analysis</h3>
        <div style="background:#0B1220;border:1px solid #1F2937;border-radius:12px;padding:14px 16px;font-size:14px;line-height:1.55;">
          <p style="margin:0 0 8px;"><strong style="color:#fff;">Intent:</strong> ${escapeHtml(ai.intent || "—")}</p>
          <p style="margin:0;"><strong style="color:#fff;">Suggested action:</strong> ${escapeHtml(ai.suggested_action || "—")}</p>
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="${CALENDAR_URL}" style="background:#7C3AED;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;display:inline-block;">Open booking calendar</a>
        </div>
      </div>
      <div style="padding:14px 28px;border-top:1px solid #1F2937;color:#64748B;font-size:12px;text-align:center;">
        Victoria | AI Automation Agency
      </div>
    </div>
  </div>
</body></html>`;
}

async function sendEmail(subject: string, html: string) {
  const client = new SMTPClient({
    connection: {
      hostname: "smtp.gmail.com",
      port: 465,
      tls: true,
      auth: { username: SMTP_EMAIL, password: SMTP_APP_PASSWORD },
    },
  });
  try {
    await client.send({
      from: `Victoria AI Agency <${SMTP_EMAIL}>`,
      to: NOTIFY_TO,
      subject,
      content: "New lead notification",
      html,
    });
  } finally {
    await client.close();
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { name, email, phone, details } = body ?? {};

    if (!name || !email || !details) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const ai = await analyzeWithGroq(details);

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone ?? null,
      details,
      source: "form",
      priority: ai.priority ?? null,
      category: ai.category ?? null,
      intent: ai.intent ?? null,
      suggested_action: ai.suggested_action ?? null,
    });
    if (dbError) console.error("DB insert error:", dbError);

    const html = buildEmail({ name, email, phone, details, source: "form" }, ai);
    try {
      await sendEmail(
        `🚀 New Lead — ${ai.priority ?? "Medium"} priority — ${name}`,
        html,
      );
    } catch (e) {
      console.error("SMTP error:", e);
    }

    return new Response(JSON.stringify({ ok: true, ai }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("process-lead error:", e);
    return new Response(JSON.stringify({ error: e?.message ?? "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
