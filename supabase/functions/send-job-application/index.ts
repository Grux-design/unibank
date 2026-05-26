import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const HR_EMAIL = "recursos.humanos@unibank.com.pa";
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");

    const body = await req.json();
    const { name, phone, email, message, cvUrl, cvFileName, recaptchaToken } = body ?? {};

    // reCAPTCHA verification
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
      !name || !phone || !email || !message || !cvUrl || !cvFileName ||
      typeof name !== "string" || typeof phone !== "string" || typeof email !== "string" ||
      typeof message !== "string" || typeof cvUrl !== "string" || typeof cvFileName !== "string"
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (name.length > 100 || phone.length > 30 || email.length > 255 || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Input too long" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch CV file to attach
    let attachments: Array<{ filename: string; content: string }> = [];
    try {
      const cvRes = await fetch(cvUrl);
      if (cvRes.ok) {
        const buf = new Uint8Array(await cvRes.arrayBuffer());
        if (buf.byteLength <= 10 * 1024 * 1024) {
          attachments = [{ filename: cvFileName, content: bytesToBase64(buf) }];
        }
      }
    } catch (e) {
      console.error("CV fetch failed, sending without attachment:", e);
    }

    const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a3a5c;">Nueva aplicación – Trabaja con Nosotros</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;width:140px;">Nombre</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
        <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Teléfono</td><td style="padding:8px;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">CV</td><td style="padding:8px;"><a href="${escapeHtml(cvUrl)}">${escapeHtml(cvFileName)}</a></td></tr>
      </table>
      <p style="margin-top:16px;"><strong>Mensaje:</strong></p>
      <p style="background:#f5f5f5;padding:16px;border-radius:4px;white-space:pre-wrap;">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;" />
      <p style="color:#666;font-size:13px;">Enviado desde el formulario "Trabaja con Nosotros" de unibank.com.pa</p>
    </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: HR_EMAIL,
        reply_to: email,
        subject: `[Trabaja con Nosotros] Nueva aplicación – ${name}`,
        html,
        attachments,
      }),
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
    console.error("send-job-application error:", err);
    return new Response(JSON.stringify({ error: "Failed to send application email" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
