import { mandiData } from '../data/mockData.js'

export function getMandiRecommendation(crop) {
  const mandis = mandiData.filter((m) => m.crop === crop)
  if (!mandis.length) return null

  const analysed = mandis.map((m) => {
    const prices = m.prices
    const avg = prices.reduce((s, p) => s + p, 0) / prices.length
    const first = prices[0]
    const last = prices[prices.length - 1]
    const diff = last - first
    // simple linear prediction: extend the slope one more day
    const slope = (last - prices[prices.length - 2])
    const predicted = Math.round(last + slope)
    const trend = diff > 2 ? 'rising' : diff < -2 ? 'falling' : 'stable'
    return { name: m.name, avg: +avg.toFixed(1), last, predicted, trend, diff }
  })

  // best = highest predicted price
  const best = analysed.reduce((a, b) => (b.predicted > a.predicted ? b : a))

  const trendLabel = best.trend === 'rising' ? '↑ Rising' : best.trend === 'falling' ? '↓ Falling' : '→ Stable'
  const reason =
    best.trend === 'rising'
      ? `Prices up ₹${best.diff}/kg over 7 days`
      : best.trend === 'falling'
      ? `Prices down ₹${Math.abs(best.diff)}/kg — sell soon`
      : `Steady demand, reliable returns`

  return { mandi: best.name, predicted: best.predicted, avg: best.avg, trend: best.trend, trendLabel, reason }
}
