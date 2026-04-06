const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const SPACE_ID = Deno.env.get("VITE_CONTENTFUL_SPACE_ID");
  const ACCESS_TOKEN = Deno.env.get("VITE_CONTENTFUL_ACCESS_TOKEN");

  if (!SPACE_ID || !ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Contentful credentials not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const url = new URL(req.url);
  const contentType = url.searchParams.get("content_type") || "";
  const slug = url.searchParams.get("slug") || "";
  const include = url.searchParams.get("include") || "3";

  const cdnUrl = new URL(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries`
  );
  cdnUrl.searchParams.set("access_token", ACCESS_TOKEN);
  if (contentType) cdnUrl.searchParams.set("content_type", contentType);
  if (slug) cdnUrl.searchParams.set("fields.slug", slug);
  cdnUrl.searchParams.set("include", include);

  const response = await fetch(cdnUrl.toString());
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
