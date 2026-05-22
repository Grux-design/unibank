import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const body = await req.json();
    const { name, email, subject, message, lang, recaptchaToken } = body;

    // Verify reCAPTCHA
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
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (name.length > 100 || email.length > 255 || subject.length > 200 || message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Input too long' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isEs = lang === 'es';
    const TEAM_EMAIL = 'team@unibank.com.pa';
    const FROM = 'Unibank <noreply@unibank.com.pa>';

    // 1. Confirmation email to the visitor
    const confirmationHtml = isEs
      ? `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a3a5c;">Gracias por contactarnos, ${name}</h2>
          <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.</p>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;" />
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background:#f5f5f5;padding:16px;border-radius:4px;">${message.replace(/\n/g, '<br>')}</p>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;" />
          <p style="color:#666;font-size:13px;">Unibank — Tu banco de confianza en Panamá</p>
        </div>`
      : `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1a3a5c;">Thank you for contacting us, ${name}</h2>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;" />
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f5f5f5;padding:16px;border-radius:4px;">${message.replace(/\n/g, '<br>')}</p>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0;" />
          <p style="color:#666;font-size:13px;">Unibank — Your trusted bank in Panama</p>
        </div>`;

    // 2. Internal notification email to Unibank team
    const internalHtml = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a3a5c;">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;font-weight:bold;width:120px;">Name</td><td style="padding:8px;">${name}</td></tr>
        <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Subject</td><td style="padding:8px;">${subject}</td></tr>
        <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Language</td><td style="padding:8px;">${isEs ? 'Spanish' : 'English'}</td></tr>
      </table>
      <p style="margin-top:16px;"><strong>Message:</strong></p>
      <p style="background:#f5f5f5;padding:16px;border-radius:4px;">${message.replace(/\n/g, '<br>')}</p>
    </div>`;

    const sendEmail = async (to: string, subject: string, html: string) => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from: FROM, to, subject, html }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Resend error: ${err}`);
      }
      return res.json();
    };

    await Promise.all([
      sendEmail(email, isEs ? `Hemos recibido tu mensaje – ${subject}` : `We received your message – ${subject}`, confirmationHtml),
      sendEmail(TEAM_EMAIL, `[Contact Form] ${subject} – from ${name}`, internalHtml),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-email error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
