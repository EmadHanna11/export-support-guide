// Netlify Function: proxies to OpenRouter, keeps OPENROUTER_API_KEY server-side.
const hits = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 60;

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: "OPENROUTER_API_KEY is not configured. Add it in Netlify: Site settings -> Environment variables, then redeploy." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), { status: 429, headers: { "Content-Type": "application/json" } });
  }
  list.push(now);
  hits.set(ip, list);

  try {
    const body = await req.text();
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`,
        "HTTP-Referer": "https://cmc-export-support-guide.netlify.app",
        "X-Title": "Export Support Guide",
      },
      body,
    });
    const data = await upstream.text();
    return new Response(data, { status: upstream.status, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Upstream request failed" }), { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
