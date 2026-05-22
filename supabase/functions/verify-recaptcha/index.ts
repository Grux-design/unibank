import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SCORE_THRESHOLD = 0.5;

export async function verifyRecaptchaToken(token: string, expectedAction?: string) {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) throw new Error("RECAPTCHA_SECRET_KEY not configured");
  if (!token) return { success: false, reason: "missing_token" as const };

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await res.json();

  if (!data.success) return { success: false, reason: "verification_failed" as const, data };
  if (typeof data.score === "number" && data.score < SCORE_THRESHOLD)
    return { success: false, reason: "low_score" as const, data };
  if (expectedAction && data.action && data.action !== expectedAction)
    return { success: false, reason: "action_mismatch" as const, data };

  return { success: true as const, score: data.score, action: data.action };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { token, action } = await req.json();
    if (!token || typeof token !== "string") {
      return new Response(JSON.stringify({ success: false, error: "Missing token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const result = await verifyRecaptchaToken(token, typeof action === "string" ? action : undefined);
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("verify-recaptcha error:", err);
    return new Response(JSON.stringify({ success: false, error: "Verification error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
