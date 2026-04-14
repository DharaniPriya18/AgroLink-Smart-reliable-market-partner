import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [
    "https://agro-link-smart-reliable-market-par.vercel.app",
    "https://agro-link-smart-reliable-ma-git-c5c3a4-dharanipriya18s-projects.vercel.app"
  ]
}));
// Middleware
// Restrict CORS to the deployed frontend URL (or localhost in dev)
const allowedOrigin = process.env.FRONTEND_URL;
app.use(cors({
  origin: allowedOrigin,
}));
app.use(express.json()); // Parse JSON request bodies

// POST endpoint for AI advisor
app.post('/api/ai', async (req, res) => {
  try {
    const { crop, mandis } = req.body;

    if (!crop || !mandis || !Array.isArray(mandis)) {
      return res.status(400).json({ error: "Missing or invalid 'crop' or 'mandis' in request body" });
    }

    // Format mandi data into a string for the prompt
    const bodyText = mandis.map((m, i) =>
      `${i + 1}. ${m.name}\n   Today: ${m.today}\n   Last 7 days: [${m.last7.join(",")}]\n   Demand: ${m.demand}`
    ).join("\n");

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: "Server missing GROQ_API_KEY environment variable" });
    }

    // Build current date context so AI uses correct month names
    const currentDate = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

    // Call Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.25,
        messages: [
          {
            role: "system",
            content: `You are an expert agricultural market intelligence system for Indian farmers. Analyse mandi price data and respond with ONLY a valid JSON object — absolutely no markdown, no text outside the JSON. Produce every key listed below, no exceptions:
{
  "best_mandi": "string — name of the best mandi to sell at",
  "predicted_price": number — predicted INR price per kg next week (integer, realistic Indian market price e.g. 20-50 for vegetables),
  "trend": "string — exactly one of: Rising / Falling / Stable / Volatile",
  "confidence": "string — exactly one of: High / Medium / Low",
  "reason": "string — 1-2 sentence concise reason for the recommendation",
  "elaborate_explanation": "string — 4-6 sentences covering: current price drivers, demand-supply balance, which mandi is best and why, what the farmer should watch for",
  "forecast_3_months": "string — 3-5 sentences covering seasonal outlook, likely price trajectory, and risks over the next 3 months",
  "monthly_forecast": [
    { "month": "string — e.g. May 2026", "min_price": integer per kg, "max_price": integer per kg, "expected_price": integer per kg, "outlook": "Bullish or Neutral or Bearish" },
    { "month": "string", "min_price": integer per kg, "max_price": integer per kg, "expected_price": integer per kg, "outlook": "Bullish or Neutral or Bearish" },
    { "month": "string", "min_price": integer per kg, "max_price": integer per kg, "expected_price": integer per kg, "outlook": "Bullish or Neutral or Bearish" }
  ],
  "risk_level": "Low or Medium or High",
  "best_sell_window": "string — specific date window e.g. 'First 2 weeks of May 2026'",
  "volatility_score": integer 1-10 (1=very stable, 10=highly volatile),
  "market_sentiment": "Bullish or Neutral or Bearish",
  "actionable_tips": ["string tip 1", "string tip 2", "string tip 3"],
  "price_drivers": ["short phrase driver 1", "short phrase driver 2", "short phrase driver 3"]
}`
          },
          {
            role: "user",
            content: `Today's date: ${currentDate}\nCrop: ${crop}\nMandis:\n${bodyText}`
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Error calling Groq API");
    }

    // Extract JSON response content from LLaMA response
    const aiMessage = data.choices?.[0]?.message?.content || "{}";
    const cleanedMessage = aiMessage.replace(/```json|```/g, "").trim();

    let jsonResult;
    try {
      jsonResult = JSON.parse(cleanedMessage);
    } catch (parseError) {
      console.error("Failed to parse AI response:", cleanedMessage);
      throw new Error("AI returned an invalid data format.");
    }

    // Normalization Layer: Ensure all required dashboard keys exist with valid defaults
    const normalized = {
      ...jsonResult, // Start with raw data
      best_mandi: jsonResult.best_mandi || "Not specified",
      predicted_price: jsonResult.predicted_price || 0,
      trend: jsonResult.trend || "Stable",
      confidence: jsonResult.confidence || "Medium",
      reason: jsonResult.reason || "AI analysis complete.",
      elaborate_explanation: jsonResult.elaborate_explanation || "",
      forecast_3_months: jsonResult.forecast_3_months || "",
      monthly_forecast: jsonResult.monthly_forecast || [],
      risk_level: jsonResult.risk_level || "Medium",
      best_sell_window: jsonResult.best_sell_window || "Immediate",
      volatility_score: (jsonResult.volatility_score !== undefined && jsonResult.volatility_score !== null) ? jsonResult.volatility_score : 5,
      market_sentiment: jsonResult.market_sentiment || "Neutral",
      actionable_tips: jsonResult.actionable_tips || [],
      price_drivers: jsonResult.price_drivers || []
    };

    return res.json(normalized);
  } catch (error) {
    console.error("AI API Error:", error.message);

    // Comprehensive fallback response
    return res.status(500).json({
      best_mandi: "Data Unavailable",
      predicted_price: 0,
      trend: "Unknown",
      confidence: "Low",
      risk_level: "Medium",
      market_sentiment: "Neutral",
      volatility_score: 5,
      best_sell_window: "Unavailable",
      reason: "Could not fetch AI prediction.",
      forecast_3_months: "Unable to load forecast.",
      elaborate_explanation: `Error occurred: ${error.message}`
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`   CORS allowed origin: ${allowedOrigin}`);
});
