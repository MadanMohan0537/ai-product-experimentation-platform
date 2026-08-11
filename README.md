# AI Product Experimentation Platform

A portfolio-grade product decision system for designing, monitoring, analyzing, and deciding product experiments. The current build demonstrates the complete PM workflow through realistic sample data while keeping the architecture ready for real event and feature-flag integrations.

## What is implemented

- Portfolio command center with active experiment, win-rate, time-to-learn, and risk signals
- Live experiment view with conversion trends, statistical confidence, and guardrail health
- AI decision brief with segment-level findings and an auditable recommendation
- Progressive rollout control from 1% to 100%
- AI-assisted three-step experiment creation workflow
- Prioritized experiment portfolio using realistic RICE-style scores
- Searchable-style experiment knowledge base and decision history
- Responsive desktop and mobile layouts
- Server-side AI provider adapter: DeepSeek first, Anthropic fallback, safe demo response without keys

## Product demo

The guided scenario follows a `One-Click Checkout` experiment. Overall checkout conversion is up 6.8%, but the system detects increased verification abandonment among new Android users. The recommendation is to hold the rollout at 25%, keep healthy segments live, and investigate the Android flow.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add either `DEEPSEEK_API_KEY` or `ANTHROPIC_API_KEY` to `.env.local`. Never commit that file. The interface remains usable in demo mode without an API key.

## Validation

```bash
npm run lint
npm test
```

## AI provider behavior

`POST /api/ai/design` accepts a goal, product area, and audience. Provider priority is:

1. DeepSeek when `DEEPSEEK_API_KEY` is available
2. Anthropic when `ANTHROPIC_API_KEY` is available
3. Deterministic demo response when neither key exists

The keys are read only by the server route and are never exposed to the browser.

## Cloudflare direction

The application uses a Cloudflare-compatible Vinext runtime and produces a Worker-compatible server bundle. Deployment can be connected to a private GitHub repository after environment variables are configured in Cloudflare. The exact Pages/Workers deployment target will be finalized in the deployment phase so API secrets remain server-side.

## Next implementation phases

- PostgreSQL/D1 experiment persistence and audit trail
- Real statistical engine for frequentist and sequential testing
- Event ingestion and metric computation
- OpenFeature or GrowthBook feature-flag adapter
- Role-based workspaces and approval workflows
- Retrieval over experiment history and qualitative feedback
- Root-cause agent using logs, feedback, and release metadata

## Architecture

```text
Product UI (React / Next.js)
        |
        +-- Experiment design API
        |       +-- DeepSeek
        |       +-- Anthropic fallback
        |
        +-- Demo analytics model (current)
        |
        +-- Persistence + event ingestion (next phase)
```
