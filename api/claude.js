// Serverless proxy: keeps ANTHROPIC_API_KEY server-side, forwards chat requests.
// Basic per-instance rate limit — replace with durable rate limiting before wide public launch.

const hits = new Map(); // ip -> [timestamps]
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 60; // generous for one assessment session; blocks abuse loops

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY is not configured. Add it in Vercel: Project Settings -> Environment Variables, then redeploy.",
    });
  }

  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) return res.status(429).json({ error: "Rate limit exceeded. Try again later." });
  list.push(now);
  hits.set(ip, list);

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (e) {
    return res.status(502).json({ error: "Upstream request failed" });
  }
}
