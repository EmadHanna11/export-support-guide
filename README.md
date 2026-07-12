# Export Support Guide (ESG)

A bilingual (Arabic/English, full RTL) AI-powered SME export-readiness and market-entry tool by Competence Management Consulting.

## Features
- AI-generated readiness questionnaire across six fixed pillars
- Product photo / data-sheet vision analysis
- HS code suggestion (type or auto-suggest)
- Live scoring with pillar breakdown and recommendations
- Deep-dive export plan: market fit (web-researched), entry strategy, deterministic costing calculator, documentation checklist
- 90-day phased action plan
- Compiled, print-ready branded report

## Setup
1. `npm install`
2. Set environment variable `OPENROUTER_API_KEY` (get a free one at https://openrouter.ai/keys)
3. `npm run dev` for local, or deploy to Vercel

## Deployment (Vercel)
- Framework preset: Vite
- Add `OPENROUTER_API_KEY` in Project Settings → Environment Variables
- The serverless function at `api/claude.js` proxies AI calls and keeps the key server-side

## Architecture
- `src/App.jsx` — React frontend (single file)
- `api/claude.js` — serverless proxy to OpenRouter (holds API key, basic rate limiting)

## Note on free-tier tradeoffs
Uses OpenRouter's `openrouter/free` auto-router. Live web search is unavailable on free models (market analysis uses model knowledge). Free models have rate limits (~20 req/min, 200 req/day) and may vary in JSON reliability. For production, add OpenRouter credits or switch to a paid model / Anthropic key.
