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

const SYSTEM_PROMPT = `You are the official AI assistant for Victoria, an elite AI Automation Engineer.

Her Expertise: n8n, Make.com, Zapier, Vapi, ElevenLabs, Monday.com, Airtable, Notion, GoHighLevel.
Her Value: She builds backend systems that save teams 40-60 hours a week.
Rate: $25/hr or fixed-price builds.

STRICT RULES:
1. ONLY answer questions related to business automation and systems. Decline all other topics politely and steer back to automation.
2. If the user asks for a meeting, quote, or deep strategy, reply with EXACTLY: "For project-specific mapping and pricing, let's get a call on the calendar." and tell them a button to open the booking form is shown below your message.
3. Your ultimate goal is to collect their Name, Email, and a brief description of their problem.
4. Ask for these one at a time, conversationally. Confirm details once collected.
5. Once you have ALL THREE — full name, valid email, and a problem description — your NEXT message must be ONLY the JSON trigger on a single line, with no other text:
{"lead_captured": true, "name": "<full name>", "email": "<email>", "problem": "<short problem description>"}
Do not output that JSON until you actually have all three. Never invent values.`;

async function callGroq(messages: any[]) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Groq ${res.status}: ${t}`);
  }
  const data = await res.json();
  return data.choices[0].message.content as string;
}

async function summarizeChat(history: any[]) {
  try {
    const transcript = history
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n");
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "Summarize the chat in EXACTLY 3 short bullet points covering (1) the prospect's main problem, (2) tools/systems mentioned, (3) recommended next step for Victoria. Output the bullets as plain text lines starting with '- '. No preamble.",
          },
          { role: "user", content: transcript },
        ],
      }),
    });
    const data = await res.json();
    return data.choices[0].message.content as string;
  } catch (e) {
    console.error("summary error", e);
    return "- Summary unavailable\n- Review chat manually\n- Follow up via email";
  }
}

function escapeHtml(s: string) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHandoffEmail(
  name: string,
  email: string,
  problem: string,
  summary: string,
) {
  const bullets = summary
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
  return `<!doctype html>
<html><body style="margin:0;background:#0F172A;font-family:Inter,Arial,sans-serif;color:#E2E8F0;">
  <div style="max-width:620px;margin:0 auto;padding:24px;">
    <div style="background:#111827;border:1px solid #1F2937;border-radius:18px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #1F2937;">
        <div style="font-size:12px;letter-spacing:.18em;color:#94A3B8;text-transform:uppercase;">🤖 New Chatbot Lead</div>
        <h2 style="margin:6px 0 0;color:#fff;font-size:22px;">${escapeHtml(name)}</h2>
      </div>
      <div style="padding:24px 28px;">
        <h3 style="margin:0 0 8px;color:#A78BFA;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">Contact Info</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#E2E8F0;">
          <tr><td style="padding:6px 0;color:#94A3B8;width:90px;">Email</td><td><a style="color:#FBBF24;" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#94A3B8;">Problem</td><td>${escapeHtml(problem)}</td></tr>
        </table>

        <h3 style="margin:24px 0 8px;color:#A78BFA;font-size:13px;letter-spacing:.12em;text-transform:uppercase;">Chat Summary</h3>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.6;color:#E2E8F0;">
          ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>

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
      content: "New chatbot lead",
      html,
    });
  } finally {
    await client.close();
  }
}

function tryExtractLead(text: string) {
  const match = text.match(/\{[\s\S]*"lead_captured"[\s\S]*\}/);
  if (!match) return null;
  try {
    const obj = JSON.parse(match[0]);
    if (obj.lead_captured && obj.name && obj.email && obj.problem) return obj;
  } catch (_e) {
    return null;
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const reply = await callGroq(messages);
    const lead = tryExtractLead(reply);

    if (lead) {
      const fullHistory = [...messages, { role: "assistant", content: reply }];
      const summary = await summarizeChat(fullHistory);

      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { error: dbErr } = await supabase.from("leads").insert({
        name: lead.name,
        email: lead.email,
        details: lead.problem,
        source: "chatbot",
        chat_summary: summary,
        category: "Chatbot Handoff",
      });
      if (dbErr) console.error("DB insert error:", dbErr);

      try {
        await sendEmail(
          `🤖 New Chatbot Lead — ${lead.name}`,
          buildHandoffEmail(lead.name, lead.email, lead.problem, summary),
        );
      } catch (e) {
        console.error("SMTP error:", e);
      }

      const finalReply =
        "I have sent your details directly to Victoria's desk. She will review your systems and reach out shortly! You can also book a time directly using the calendar link below.";

      return new Response(
        JSON.stringify({ reply: finalReply, lead_captured: true, calendar_url: CALENDAR_URL }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const showBookingButton = /let's get a call on the calendar/i.test(reply);

    return new Response(
      JSON.stringify({
        reply,
        lead_captured: false,
        show_booking: showBookingButton,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e: any) {
    console.error("ai-chat-agent error:", e);
    return new Response(JSON.stringify({ error: e?.message ?? "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
