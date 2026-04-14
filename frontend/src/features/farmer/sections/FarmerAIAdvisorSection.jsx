import { useState } from 'react'
import Panel from '../../../components/ui/Panel.jsx'

/* ─── Static mandi dataset ────────────────────────────────────────────────── */
const MANDI_DATA = {
  Tomato:  { mandis: [{ name: 'Chennai',    today: 22, last7: [18,19,20,21,21,22,22], demand: 'High'   },
                       { name: 'Trichy',     today: 19, last7: [20,20,20,19,19,19,19], demand: 'Low'    }] },
  Onion:   { mandis: [{ name: 'Coimbatore', today: 31, last7: [26,27,28,29,30,31,31], demand: 'High'   },
                       { name: 'Madurai',    today: 28, last7: [29,29,28,28,28,28,28], demand: 'Medium' }] },
  Potato:  { mandis: [{ name: 'Madurai',    today: 18, last7: [17,17,17,18,18,18,18], demand: 'Medium' },
                       { name: 'Salem',      today: 16, last7: [18,18,17,17,16,16,16], demand: 'Low'    }] },
  Brinjal: { mandis: [{ name: 'Trichy',     today: 16, last7: [13,14,14,15,15,16,16], demand: 'High'   },
                       { name: 'Erode',      today: 14, last7: [14,14,14,14,14,14,14], demand: 'Medium' }] },
}

/* ─── SVG Sparkline ───────────────────────────────────────────────────────── */
function Sparkline({ data, uid, rising, compact }) {
  if (!data || data.length < 2) return null
  const W = 280, H = compact ? 36 : 52, pad = 5
  const min = Math.min(...data), max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (W - 2 * pad),
    H - pad - ((v - min) / range) * (H - 2 * pad),
  ])
  const line = `M ${pts.map(([x, y]) => `${x} ${y}`).join(' L ')}`
  const area = `${line} L ${pts.at(-1)[0]} ${H} L ${pts[0][0]} ${H} Z`
  const [lx, ly] = pts.at(-1)
  const col = rising ? '#3ecf79' : '#f08080'
  const gid = `sg-${uid}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={col} stopOpacity="0.28" />
          <stop offset="100%" stopColor={col} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="3.5" fill={col} />
      <circle cx={lx} cy={ly} r="7"   fill={col} fillOpacity="0.18" />
    </svg>
  )
}

/* ─── 3-Month Forecast Chart ──────────────────────────────────────────────── */
function ForecastChart({ monthly }) {
  if (!monthly?.length) return null
  const prices = monthly.flatMap(m => [m.min_price, m.max_price, m.expected_price].filter(Boolean))
  if (!prices.length) return null

  const dataMin = Math.min(...prices) * 0.92
  const dataMax = Math.max(...prices) * 1.08
  const range   = dataMax - dataMin || 1
  const pct     = v => ((v - dataMin) / range) * 100
  const COLS    = { Bullish: '#3ecf79', Neutral: '#f0c040', Bearish: '#f08080' }

  return (
    <div className="fc-wrap">
      <div className="fc-y-axis">
        {[100, 66, 33, 0].map(p => (
          <span key={p}>₹{Math.round(dataMin + (p / 100) * range).toLocaleString()}</span>
        ))}
      </div>
      <div className="fc-cols">
        {monthly.map((m, i) => {
          const col    = COLS[m.outlook] || '#3ecf79'
          const rangeB = pct(m.min_price      ?? dataMin)
          const rangeH = pct(m.max_price      ?? dataMax) - rangeB
          const dotB   = pct(m.expected_price ?? (dataMin + dataMax) / 2)
          return (
            <div key={i} className="fc-col">
              <div className="fc-track">
                <div className="fc-range"    style={{ bottom: `${rangeB}%`, height: `${Math.max(rangeH, 6)}%`, background: `${col}28`, border: `1px solid ${col}80` }} />
                <div className="fc-exp-line" style={{ bottom: `${dotB}%`, borderColor: `${col}55` }} />
                <div className="fc-exp-dot"  style={{ bottom: `calc(${dotB}% - 5px)`, background: col, boxShadow: `0 0 8px ${col}` }} />
              </div>
              <div className="fc-labels">
                <div className="fc-month">{m.month?.replace(' 2026', '').replace(' 2027', '') ?? `M${i + 1}`}</div>
                <div className="fc-exp-price" style={{ color: col }}>₹{(m.expected_price ?? 0).toLocaleString()}</div>
                <div className="fc-outlook"   style={{ color: col }}>{m.outlook}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Volatility Meter ────────────────────────────────────────────────────── */
function VolatilityMeter({ score = 5 }) {
  const pct = (score / 10) * 100
  const col = score <= 3 ? '#3ecf79' : score <= 6 ? '#f0c040' : '#f08080'
  return (
    <div className="vm-wrap">
      <div className="vm-track">
        <div className="vm-fill" style={{ width: `${pct}%`, background: col }} />
      </div>
      <span className="vm-score" style={{ color: col }}>{score}<small>/10</small></span>
    </div>
  )
}

/* ─── API helper ──────────────────────────────────────────────────────────── */
async function callAI(crop, mandis) {
  let r
  try {
    r = await fetch(`${import.meta.env.VITE_API_URL}/api/ai`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ crop, mandis }),
    })
  } catch (networkErr) {
    console.error('[AI Advisor] Network error:', networkErr)
    throw new Error('Cannot reach the server. Make sure the backend is running on port 5000.')
  }

  let data
  try   { data = await r.json() }
  catch { throw new Error('Server returned an unreadable response.') }

  if (!r.ok) {
    const msg = data?.error || `Server error ${r.status}`
    console.error('[AI Advisor] Backend error:', msg, data)
    throw new Error(msg)
  }

  if (!data.best_mandi) {
    console.warn('[AI Advisor] Incomplete response:', data)
    throw new Error('AI returned an incomplete recommendation — please try again.')
  }

  console.log('[AI Advisor] DATA RECEIVED:', data)
  return data
}

/* ─── Trend chip ──────────────────────────────────────────────────────────── */
function trendChip(trend = '') {
  const t = trend.toLowerCase()
  if (t.includes('rising') || t.includes('up') || t.includes('bullish') || t.includes('increase')) return 'green-chip'
  if (t.includes('falling') || t.includes('down') || t.includes('bearish') || t.includes('decrease')) return 'red-chip'
  return 'sand-chip'
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
function FarmerAIAdvisorSection({ t }) {
  const [crop,    setCrop]    = useState('')
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')

  const run = async (e) => {
    e.preventDefault()
    if (!crop) return
    setLoading(true); setResult(null); setErr('')
    try {
      setResult(await callAI(crop, MANDI_DATA[crop].mandis))
    } catch (error) {
      console.error('[AI Advisor] UI catch:', error)
      setErr(error.message || 'Failed — please try again.')
    } finally {
      setLoading(false)
    }
  }

  const mandis   = crop && MANDI_DATA[crop] ? MANDI_DATA[crop].mandis : []
  const maxPrice = mandis.length ? Math.max(...mandis.map(m => m.today)) : 1

  return (
    <Panel title={t?.aiAdvisor || 'AI Market Advisor'} className="section-screen">
      <p className="helper-text" style={{ marginBottom: '0.5rem' }}>
        Analyses 7-day mandi price trends using AI — get price forecasts, risk intelligence &amp; actionable sell recommendations.
      </p>

      <div className="full-section-grid ai-advisor-full-grid">

        {/* ══ LEFT COLUMN ══ */}
        <div className="full-section-main ai-advisor-stack">

          {/* Crop selector */}
          <div className="ai-advisor-field">
            <label className="ai-field-label" htmlFor="ai-crop-select">Select Crop</label>
            <select
              id="ai-crop-select"
              value={crop}
              onChange={e => { setCrop(e.target.value); setResult(null); setErr('') }}
            >
              <option value="">Choose a crop…</option>
              {Object.keys(MANDI_DATA).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Mandi preview tiles */}
          {mandis.length > 0 && (
            <div className="ai-mandi-preview">
              <div className="ai-section-label">Current Mandi Prices — 7-Day Trend</div>
              <div className="ai-mandi-grid">
                {mandis.map(m => {
                  const isRising = m.last7.at(-1) > m.last7[0]
                  const chg = ((m.last7.at(-1) - m.last7[0]) / m.last7[0] * 100).toFixed(1)
                  return (
                    <div key={m.name} className="ai-mandi-tile">
                      <div className="ai-mandi-tile-top">
                        <div>
                          <div className="ai-mandi-name">{m.name}</div>
                          <div className="ai-mandi-price">&#x20B9;{m.today.toLocaleString()}/kg</div>
                        </div>
                        <div className="ai-mandi-tile-right">
                          <div className={`ai-demand-badge demand-${m.demand.toLowerCase()}`}>{m.demand}</div>
                          <div className={`ai-chg-badge ${isRising ? 'ai-chg-up' : 'ai-chg-down'}`}>
                            {isRising ? '↑' : '↓'} {Math.abs(chg)}%
                          </div>
                        </div>
                      </div>
                      <Sparkline data={m.last7} uid={`prev-${m.name}`} rising={isRising} compact />
                      <div className="ai-spark-axis"><span>7d ago</span><span>Today</span></div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            id="ai-submit-btn"
            className="primary-button farmer-button"
            onClick={run}
            disabled={!crop || loading}
            style={{ justifyContent: 'center' }}
          >
            {loading
              ? <><span className="ai-spinner" />Analysing market trends…</>
              : <>Get AI Recommendation</>
            }
          </button>

          {/* Error */}
          {err && (
            <div className="ai-error-box">
              <span className="ai-error-icon">⚠️</span>
              <span>{err}</span>
            </div>
          )}

        </div>{/* end LEFT COLUMN */}

        {/* ══ RIGHT COLUMN ══ */}
        <div className="full-section-side ai-result-side">

          {/* Empty state */}
          {!result && !loading && (
            <div className="ai-empty-state">
              <div className="ai-empty-icon">AI</div>
              <p className="helper-text">
                Select a crop and click <strong>Get AI Recommendation</strong> to see market intelligence here.
              </p>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="ai-empty-state">
              <span className="ai-spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
              <p className="helper-text">Analysing market trends…</p>
            </div>
          )}

          {/* Result card */}
          {result && !loading && (
            <div className="ai-result-card fade-in">

              {/* Header */}
              <div className="ai-result-header">
                <div>
                  <div className="ai-result-eyebrow">AI Recommendation</div>
                  <div className="ai-result-crop">{crop}</div>
                </div>
                <span className={`soft-chip ${trendChip(result.trend)}`}>{result.trend}</span>
              </div>

              {/* Key stats */}
              <div className="ai-stat-row">
                <div className="ai-stat-pill">
                  <span className="ai-stat-value ai-stat-accent">{result.best_mandi}</span>
                  <span className="ai-stat-label">Best Mandi</span>
                </div>
                <div className="ai-stat-pill">
                  <span className="ai-stat-value">&#x20B9;{Number(result.predicted_price).toLocaleString()}/kg</span>
                  <span className="ai-stat-label">Predicted Price</span>
                </div>
                <div className="ai-stat-pill">
                  <span className="ai-stat-value">{result.confidence}</span>
                  <span className="ai-stat-label">Confidence</span>
                </div>
              </div>

              {/* Intelligence Dashboard */}
              <div className="ai-intel-dash">
                <div className="ai-block-title">Intelligence Dashboard</div>
                <div className="ai-intel-grid">
                  {/* Risk Level */}
                  <div className="ai-intel-card">
                    <div className="ai-intel-label">Risk Level</div>
                    <div className="ai-intel-val">
                      {(() => {
                        const risk = result.risk_level?.toLowerCase() || '';
                        if (risk.includes('low'))    return <span className="ai-badge ai-badge-green">🟢 Low</span>;
                        if (risk.includes('medium')) return <span className="ai-badge ai-badge-yellow">🟡 Medium</span>;
                        if (risk.includes('high'))   return <span className="ai-badge ai-badge-red">🔴 High</span>;
                        return <span className="ai-badge ai-badge-yellow">🟡 {result.risk_level || '—'}</span>;
                      })()}
                    </div>
                  </div>

                  {/* Market Sentiment */}
                  <div className="ai-intel-card">
                    <div className="ai-intel-label">Market Sentiment</div>
                    <div className="ai-intel-val">
                      {(() => {
                        const sent = result.market_sentiment?.toLowerCase() || '';
                        if (sent.includes('bullish')) return <span className="ai-badge ai-badge-green">📈 Bullish</span>;
                        if (sent.includes('neutral')) return <span className="ai-badge ai-badge-yellow">📊 Neutral</span>;
                        if (sent.includes('bearish')) return <span className="ai-badge ai-badge-red">📉 Bearish</span>;
                        return <span className="ai-badge ai-badge-yellow">📊 {result.market_sentiment || '—'}</span>;
                      })()}
                    </div>
                  </div>
                  <div className="ai-intel-card">
                    <div className="ai-intel-label">Price Volatility</div>
                    <div className="ai-intel-val">
                      {(result.volatility_score !== undefined && result.volatility_score !== null && !isNaN(Number(result.volatility_score)))
                        ? <VolatilityMeter score={Number(result.volatility_score)} />
                        : <span className="ai-badge ai-badge-yellow">—</span>
                      }
                    </div>
                  </div>
                  {result.best_sell_window && (
                    <div className="ai-intel-card ai-intel-wide">
                      <div className="ai-intel-label">🎯 Best Sell Window</div>
                      <div className="ai-intel-val ai-sell-txt">{result.best_sell_window}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* 7-Day Price History */}
              <div className="ai-analysis-block">
                <div className="ai-block-title">7-Day Price History</div>
                <div className="ai-sparklines">
                  {mandis.map(m => {
                    const isRising = m.last7.at(-1) > m.last7[0]
                    const chg = ((m.last7.at(-1) - m.last7[0]) / m.last7[0] * 100).toFixed(1)
                    return (
                      <div key={m.name} className="ai-spark-row">
                        <div className="ai-spark-meta">
                          <div>
                            <div className="ai-spm-name">{m.name}</div>
                            <div className="ai-spm-price">₹{m.today.toLocaleString()}/kg</div>
                          </div>
                          <span className={`ai-chg-badge ${isRising ? 'ai-chg-up' : 'ai-chg-down'}`}>
                            {isRising ? '↑' : '↓'} {Math.abs(chg)}%
                          </span>
                        </div>
                        <Sparkline data={m.last7} uid={`res-${m.name}`} rising={isRising} />
                        <div className="ai-spark-axis"><span>7d ago</span><span>Today</span></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Mandi Comparison */}
              <div className="ai-analysis-block">
                <div className="ai-block-title">Mandi Price Comparison</div>
                <div className="ai-compare-list">
                  {mandis.map(m => {
                    const isBest = m.name === result.best_mandi
                    const w = (m.today / maxPrice) * 100
                    return (
                      <div key={m.name} className="ai-compare-row">
                        <div className={`ai-compare-name ${isBest ? 'ai-compare-best' : ''}`}>
                          {isBest ? '★ ' : ''}{m.name}
                        </div>
                        <div className="ai-compare-track">
                          <div
                            className="ai-compare-bar"
                            style={{
                              width: `${w}%`,
                              background: isBest
                                ? 'linear-gradient(90deg,#3ecf79,#6de0a0)'
                                : 'linear-gradient(90deg,#7ea7ef,#9fc0f5)',
                            }}
                          />
                        </div>
                        <div className="ai-compare-val">₹{m.today.toLocaleString()}/kg</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Detailed Analysis */}
              {(result.elaborate_explanation || result.reason) && (
                <div className="ai-analysis-block">
                  <div className="ai-block-title">Detailed Analysis</div>
                  <p className="ai-block-text">{result.elaborate_explanation || result.reason}</p>
                  {result.price_drivers?.length > 0 && (
                    <div className="ai-drivers-section">
                      <div className="ai-drivers-label">Key Price Drivers</div>
                      <div className="ai-drivers-list">
                        {result.price_drivers.map((d, i) => (
                          <div key={i} className="ai-driver-chip">
                            <span className="ai-driver-dot" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3-Month Forecast */}
              {(result.monthly_forecast?.length || result.forecast_3_months) && (
                <div className="ai-analysis-block">
                  <div className="ai-block-title">3-Month Market Forecast</div>
                  {result.monthly_forecast?.length > 0 && (
                    <ForecastChart monthly={result.monthly_forecast} />
                  )}
                  {result.forecast_3_months && (
                    <p className="ai-block-text" style={{ marginTop: '0.75rem' }}>
                      {result.forecast_3_months}
                    </p>
                  )}
                </div>
              )}

              {/* Actionable Tips */}
              {result.actionable_tips?.length > 0 && (
                <div className="ai-analysis-block">
                  <div className="ai-block-title">Actionable Recommendations</div>
                  <div className="ai-tips-list">
                    {result.actionable_tips.map((tip, i) => (
                      <div key={i} className="ai-tip-item">
                        <span className="ai-tip-num">{i + 1}</span>
                        <span className="ai-tip-text">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}{/* end result card */}

        </div>{/* end RIGHT COLUMN */}

      </div>{/* end full-section-grid */}
    </Panel>
  )
}

export default FarmerAIAdvisorSection
