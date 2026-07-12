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
2. Set environment variable `ANTHROPIC_API_KEY` (get one at https://platform.claude.com)
3. `npm run dev` for local, or deploy to Vercel

## Deployment (Vercel)
- Framework preset: Vite
- Add `ANTHROPIC_API_KEY` in Project Settings → Environment Variables
- The serverless function at `api/claude.js` proxies AI calls and keeps the key server-side

## Architecture
- `src/App.jsx` — React frontend (single file)
- `api/claude.js` — serverless proxy (holds API key, basic rate limiting)
