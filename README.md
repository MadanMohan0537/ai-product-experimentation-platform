# 🧪 AI Product Experimentation Platform

<p align="center">
  <strong>A portfolio-grade product decision operating system for designing, monitoring, analyzing, and deciding A/B product experiments.</strong>
</p>

<p align="center">
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react" alt="React"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript" alt="TypeScript"></a>
  <a href="https://deepseek.com"><img src="https://img.shields.io/badge/AI-DeepSeek%20%2F%20Claude-blueviolet?style=flat-square" alt="AI"></a>
  <a href="https://workers.cloudflare.com"><img src="https://img.shields.io/badge/Deployment-Cloudflare%20Workers-f38020?style=flat-square" alt="Cloudflare Workers"></a>
</p>

---

## 📌 Overview

**AI Product Experimentation Platform** is a modern decision-support system built for Product Managers, Growth Leads, and Data Scientists. It replaces chaotic spreadsheet tracking with a unified workflow: from **hypothesis design and MDE power calculations** to **real-time telemetry monitoring, guardrail health tracking, and AI-synthesized rollout recommendations**.

---

## ✨ Key Features

- **📊 Portfolio Command Center:** Real-time visibility into active experiments, portfolio win rates, average time-to-learn, and active segment risks.
- **🔬 3-Step AI-Assisted Experiment Designer:**
  - Formulates testable hypotheses, target audience segments, and variant splits.
  - Automatically identifies **Primary KPIs**, **Secondary Metrics**, and **Guardrail Metrics** (e.g. latency, error rates, drop-offs).
  - Calculates Minimum Detectable Effect (MDE) and sample size requirements.
- **📈 Live Experiment Telemetry & Statistical Significance:**
  - Conversion trends, confidence interval visualization, and p-value statistical significance alerts.
  - Detects segment-specific anomalies (e.g. high Android checkout abandonment despite overall iOS conversion lift).
- **🤖 AI Decision Briefs & Rollout Control:**
  - Generates auditable **Ship / Iterate / Rollback** recommendations with business justification.
  - Supports progressive feature rollout controls from 1% to 100%.
- **🛡️ Provider-Agnostic AI Backend:** DeepSeek V3 primary engine with Anthropic Claude fallback and offline demo simulation mode.

---

## 🏗️ Architecture

```mermaid
flowchart LR
    A[Product Hypothesis] --> B[AI Experiment Designer]
    B --> C[Variant Config & Sample Sizing]
    C --> D[Live Telemetry & Metric Engine]
    D --> E[Statistical Significance & Guardrail Health]
    E --> F[AI Decision Recommendation: Ship / Rollback]
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js:** v20+ or v22+
- **AI Key:** (Optional) `DEEPSEEK_API_KEY` or `ANTHROPIC_API_KEY`

### Installation

```bash
# Clone the repository
git clone https://github.com/MadanMohan0537/ai-product-experimentation-platform.git
cd ai-product-experimentation-platform

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Add your DEEPSEEK_API_KEY or ANTHROPIC_API_KEY (optional: app runs in demo mode without keys)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS, Modern CSS
- **AI Integrations:** DeepSeek API, Anthropic Claude SDK
- **Runtime:** Cloudflare Workers (Vinext) / Vercel

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
