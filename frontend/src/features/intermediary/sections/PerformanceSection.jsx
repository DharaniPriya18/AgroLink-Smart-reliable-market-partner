import Panel from '../../../components/ui/Panel.jsx'
import { scoreCards } from '../../../data/mockData.js'

/* ─── Smooth Area Chart Generator ─────────────────────────────────────────── */
function smoothCurve(pts) {
  let res = `M ${pts[0][0]},${pts[0][1]} `
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i === 0 ? pts[0] : pts[i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = i + 2 < pts.length ? pts[i + 2] : p2
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    res += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]} `
  }
  return res
}

function LargeAreaChart({ data }) {
  if (!data || data.length < 2) return null
  const W = 800, H = 220, padX = 40, padTop = 30, padBot = 40
  
  const minVal = Math.min(...data)
  const maxVal = Math.max(...data)
  const min = Math.max(0, minVal - 5)
  const max = Math.min(100, maxVal + 5)
  const range = max - min || 1
  
  const pts = data.map((v, i) => [
    padX + (i / (data.length - 1)) * (W - 2 * padX),
    H - padBot - ((v - min) / range) * (H - padTop - padBot)
  ])
  
  const linePath = smoothCurve(pts)
  const areaPath = `${linePath} L ${pts.at(-1)[0]},${H - padBot} L ${pts[0][0]},${H - padBot} Z`

  const labels = ['6W Ago', '5W Ago', '4W Ago', '3W Ago', '2W Ago', 'Last Wk', 'This Wk']

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3ecf79" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3ecf79" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Axis line */}
      <line x1={padX} y1={H - padBot} x2={W - padX} y2={H - padBot} stroke="var(--line)" strokeWidth="1" opacity="0.6" />
      
      {/* Area & Line */}
      <path d={areaPath} fill="url(#perfGrad)" />
      <path d={linePath} fill="none" stroke="#3ecf79" strokeWidth="4" strokeLinecap="round" />
      
      {/* Data points & labels */}
      {pts.map(([x, y], i) => (
        <g key={i}>
          {/* Vertical dash */}
          <line x1={x} y1={y + 10} x2={x} y2={H - padBot} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          
          {/* Point */}
          <circle cx={x} cy={y} r="5" fill="#eef5f3" stroke="#3ecf79" strokeWidth="2.5" />
          <circle cx={x} cy={y} r="14" fill="transparent" /> {/* Interaction area if ever needed */}
          
          {/* X Label */}
          <text x={x} y={H - padBot + 22} textAnchor="middle" 
            fontSize="11" fontWeight="700" fill="var(--muted)" 
            fontFamily="system-ui, -apple-system, sans-serif">
            {labels[i]}
          </text>
          
          {/* Value Label */}
          <text x={x} y={y - 14} textAnchor="middle" 
            fontSize="14" fontWeight="800" fill="var(--text)" 
            fontFamily="system-ui, -apple-system, sans-serif">
            {data[i]}%
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Modern Radial Ring ──────────────────────────────────────────────────── */
function RadialRing({ value, color, size = 110, stroke = 12 }) {
  const r    = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const fill = (Math.min(value, 100) / 100) * circ
  const cx   = size / 2
  const cy   = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ overflow: 'visible' }}>
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--line)" strokeWidth={stroke} opacity="0.4" />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${fill} ${circ - fill}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 4px 6px ${color}30)` }}
      />
      <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="middle"
        fontSize="22" fontWeight="800" fill="var(--text)"
        fontFamily="system-ui, -apple-system, sans-serif">
        {value}%
      </text>
    </svg>
  )
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
function PerformanceSection({ t }) {
  // Dynamically compute overall historical scores
  const overallHistory = [0, 1, 2, 3, 4, 5, 6].map(i => {
    const sum = scoreCards.reduce((acc, c) => acc + (c.inverse ? 100 - c.history[i] : c.history[i]), 0)
    return Math.round(sum / scoreCards.length)
  })
  const overall = overallHistory.at(-1)

  return (
    <Panel title={t.performance} accent={`${overall}% overall`} className="section-screen">
      <div className="perf-new-layout fade-in">
        
        {/* ── TOP: Large Area Graph ── */}
        <div className="perf-main-chart">
          <div className="perf-chart-header">
            <div>
              <div className="perf-block-title">Overall Performance Trend</div>
              <div className="perf-block-subtitle">Analyzed over the last 7 weeks</div>
            </div>
            <div className="perf-chart-score">
              <span className="perf-cs-val">{overall}%</span>
              <span className="perf-cs-lbl">Current Health</span>
            </div>
          </div>
          <div className="perf-chart-canvas">
            <LargeAreaChart data={overallHistory} />
          </div>
        </div>

        {/* ── BOTTOM: Metric Circles Grid ── */}
        <div className="perf-circles-grid">
          {scoreCards.map(c => {
            const eff = c.inverse ? 100 - c.value : c.value
            const chgGood = c.inverse ? c.change < 0 : c.change > 0
            const chgColor = chgGood ? '#3ecf79' : '#f08080'

            return (
              <div key={c.key} className="perf-circle-card">
                <RadialRing value={eff} color={c.color} />
                
                <div className="perf-circle-info">
                  <div className="perf-circle-key">{c.key}</div>
                  <div className="perf-circle-desc">{c.description}</div>
                </div>

                <div className="perf-circle-chg" style={{ color: chgColor, background: `${chgColor}15`, border: `1px solid ${chgColor}35` }}>
                  {c.change > 0 ? `+${c.change}` : c.change}pp vs Last Wk
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </Panel>
  )
}

export default PerformanceSection
