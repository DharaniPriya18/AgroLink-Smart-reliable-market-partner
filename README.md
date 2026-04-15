# AgroLink — Smart Reliable Market Partner

A role-based agricultural supply chain platform connecting farmers with government intermediaries and eliminating middlemen .

**Live:** [agro-link-smart-reliable-market-par.vercel.app](https://agro-link-smart-reliable-market-par.vercel.app)

---

## What Makes AgroLink Different

1. **AI Market Advisor**
Farmers get real-time sell recommendations powered by Groq LLaMA 3.3 70B. The advisor analyses 7-day mandi price trends and returns a predicted price, best mandi to sell at, risk score, market sentiment, 3-month seasonal forecast, and numbered actionable tips — specific to the crop and region selected, not generic advice.

2. **Demand-to-Offer in One Click**
Live demand signals surface high-priority crop requirements with price trends across regions. Clicking "Apply to Supply" on a signal pre-fills the entire offer form — crop, region, and price context — eliminating manual entry.

3. **Full Logistics Lifecycle**
Applications flow from Pending through Approved, In Transit, and Delivered entirely within the platform. Intermediaries advance each stage with a single action; status is reflected instantly on the farmer's side.

4. **Bilingual UI**
Every label, button, status badge, and section title is available in both English and Tamil, toggled instantly without a page reload.

---

## Dashboards at a Glance

- **Farmer** — Crop inventory, live demand signals, supply offer submission, application tracker, AI advisor.

- **Intermediary** — Application approval, regional supply map (6 zones with volume index), logistics coordination, performance metrics (timeliness, quantity accuracy, settlement speed, dispute rate).

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Styling | Vanilla CSS — glassmorphism |
| Backend | Node.js + Express |
| AI | Groq API — LLaMA 3.3 70B Versatile |

---

## 📁 Project Structure

```
AgroLink-Smart-reliable-market-partner/
├── frontend/
│   └── src/
│       ├── app/               # App shell and routing
│       ├── assets/            # Illustrations and static assets
│       ├── components/        # Shared UI components
│       ├── data/              # Mock data and config
│       ├── features/
│       │   ├── auth/          # Login and role selection
│       │   ├── farmer/        # Farmer dashboard — 6 sections
│       │   └── intermediary/  # Intermediary dashboard — 5 sections
│       ├── styles/            # Theme and component stylesheets
│       └── utils/             # Helper functions
├── backend/
│   ├── server.js              # Express server — Groq API proxy
│   └── .env.example
└── README.md
```
## Getting Started

```bash
# Clone
git clone https://github.com/DharaniPriya18/AgroLink-Smart-reliable-market-partner
cd AgroLink-Smart-reliable-market-partner

# Backend
cd backend && npm install
cp .env.example .env    # Add GROQ_API_KEY
npm start               # Runs on port 5000

# Frontend
cd ../frontend && npm install
npm run dev             # Runs on port 5173
```

**Required environment variable:** `GROQ_API_KEY`
