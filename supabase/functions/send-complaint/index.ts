import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TO_EMAILS = [
  "giniva.santamaria@unibank.com.pa",
  "ileana.bundy@unibank.com.pa",
  "jahir.cervantes@unibank.com.pa",
];
const FROM = "Unibank <noreply@unibank.com.pa>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function row(label: string, value: string, alt = false) {
  return `<tr${alt ? ' style="background:#f5f5f5;"' : ""}><td style="padding:8px;font-weight:bold;width:200px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px;">${value}</td></tr>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");

    const body = await req.json();
    const {
      relationship,
      location,
      company,
      isAnonymous,
      name,
      phone,
      email,
      reason,
      knowledgeSource,
      description,
      incidentDate,
      incidentTime,
      fileUrl,
      fileName,
      recaptchaToken,
    } = body ?? {};

    // reCAPTCHA
    const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY");
    if (!recaptchaSecret) throw new Error("RECAPTCHA_SECRET_KEY not configured");
    if (!recaptchaToken) {
      return new Response(JSON.stringify({ error: "Missing reCAPTCHA token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: recaptchaSecret, response: recaptchaToken }).toString(),
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Basic validation
    if (
      !reason || !description || !relationship || !location || !company ||
      typeof reason !== "string" || typeof description !== "string"
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (description.length > 5000 || reason.length > 300) {
      return new Response(JSON.stringify({ error: "Input too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Optional file attachment (cap at 10MB; otherwise just link)
    let attachments: Array<{ filename: string; content: string }> = [];
    if (fileUrl && fileName && typeof fileUrl === "string" && typeof fileName === "string") {
      try {
        const r = await fetch(fileUrl);
        if (r.ok) {
          const buf = new Uint8Array(await r.arrayBuffer());
          if (buf.byteLength <= 10 * 1024 * 1024) {
            attachments = [{ filename: fileName, content: bytesToBase64(buf) }];
          }
        }
      } catch (e) {
        console.error("File fetch failed, sending without attachment:", e);
      }
    }

    const anon = !!isAnonymous;
    const rows: string[] = [];
    let i = 0;
    const add = (label: string, val: string | undefined | null) => {
      rows.push(row(label, val ? escapeHtml(val) : "<em style=\"color:#888\">N/D</em>", i++ % 2 === 1));
    };

    add("Relación", relationship);
    add("Ubicación", location);
    add("Empresa", company);
    add("Denuncia anónima", anon ? "Sí" : "No");
    if (!anon) {
      add("Nombre", name);
      add("Teléfono", phone);
      rows.push(row("Email", email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "<em style=\"color:#888\">N/D</em>", i++ % 2 === 1));
    }
    add("Motivo", reason);
    add("¿Cómo conoce los hechos?", knowledgeSource);
    add("Fecha del incidente", incidentDate);
    add("Hora del incidente", incidentTime);
    if (fileUrl) {
      rows.push(row("Archivo adjunto", `<a href="${escapeHtml(fileUrl)}">${escapeHtml(fileName || "archivo")}</a>${attachments.length ? "" : " <em style=\"color:#888\">(enlace, archivo &gt; 10MB)</em>"}`, i++ % 2 === 1));
    }

    const html = `<div style="font-family:sans-serif;max-width:680px;margin:0 auto;color:#111;">
      <h2 style="color:#1a3a5c;margin:0 0 16px;">Nueva denuncia – Canal de Denuncias</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows.join("")}</table>
      <p style="margin:24px 0 8px;font-weight:bold;">Descripción de los hechos</p>
      <p style="background:#f5f5f5;padding:16px;border-radius:6px;white-space:pre-wrap;font-size:14px;">${escapeHtml(description)}</p>
      <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;" />
      <p style="color:#666;font-size:12px;">Enviado desde el Canal de Denuncias de unibank.com.pa</p>
    </div>`;

    const payload: Record<string, unknown> = {
      from: FROM,
      to: TO_EMAILS,
      subject: `[Canal de Denuncias] ${reason} – ${company}`,
      html,
      attachments,
    };
    if (!anon && email && typeof email === "string") {
      payload.reply_to = email;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend error: ${err}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-complaint error:", err);
    return new Response(JSON.stringify({ error: "Failed to send complaint email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
