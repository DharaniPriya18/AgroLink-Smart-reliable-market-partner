import Panel from '../../../components/ui/Panel.jsx'
import { supplyRegions } from '../../../data/mockData.js'

/* ─── Level config ────────────────────────────────────────────────────────── */
const LEVEL = {
  High:   { color: '#3ecf79', bg: 'rgba(62,207,121,0.15)', border: 'rgba(62,207,121,0.3)',  dot: '#3ecf79' },
  Medium: { color: '#f0c040', bg: 'rgba(240,192,64,0.15)',  border: 'rgba(240,192,64,0.3)',  dot: '#eeb211' },
  Low:    { color: '#f08080', bg: 'rgba(240,128,128,0.15)', border: 'rgba(240,128,128,0.3)', dot: '#e55353' },
}

/* ─── Meaningful Horizontal Bar Chart ─────────────────────────────────────── */
function SupplyVolumeChart({ data }) {
  const W = 570, H = 380, padL = 100, padR = 40, padTop = 30, padBot = 30
  const numBars = data.length
  
  const availableH = H - padTop - padBot
  const step = availableH / numBars
  const barH = Math.min(24, step * 0.6)

  const maxScore = 100
  const getX = (val) => padL + (val / maxScore) * (W - padL - padR)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden="true">
      {/* Vertical Grid Lines (X-axis) */}
      {[0, 25, 50, 75, 100].map((val, i) => (
        <g key={val}>
          <line x1={getX(val)} y1={padTop} x2={getX(val)} y2={H - padBot} 
            stroke="var(--line)" strokeWidth="1" opacity={i === 0 ? "0.8" : "0.3"} strokeDasharray={i === 0 ? "none" : "3 3"} />
          <text x={getX(val)} y={H - padBot + 18} textAnchor="middle" 
             fontSize="10" fill="var(--muted)" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">
             {val}
          </text>
        </g>
      ))}

      {/* X-Axis Label */}
      <text x={padL + (W - padL - padR)/2} y={H - 2} textAnchor="middle" 
         fontSize="9" fill="var(--muted)" fontWeight="800" textTransform="uppercase" letterSpacing="0.05em" fontFamily="system-ui, -apple-system, sans-serif">
         Supply Volume Index
      </text>

      {/* Bars */}
      {data.map((d, i) => {
        const y = padTop + i * step + (step - barH)/2
        const width = getX(d.score) - padL
        const cfg = LEVEL[d.level] || LEVEL.Low

        return (
          <g key={d.name}>
            {/* Y-axis Label */}
            <text x={padL - 14} y={y + barH/2 + 3} textAnchor="end" 
              fontSize="11" fontWeight="700" fill="var(--text)" fontFamily="system-ui, -apple-system, sans-serif">
              {d.name}
            </text>
             
            {/* Bar Track Background */}
            <rect x={padL} y={y} width={W - padL - padR} height={barH} rx={barH/2}
              fill="var(--line)" opacity="0.12" />

            {/* Render a subtle glow behind the bar */}
            <rect x={padL} y={y} width={width} height={barH} rx={barH/2}
              fill={cfg.dot} opacity="0.2" filter={`blur(4px)`} />

            {/* Actual Bar Fill */}
            <rect x={padL} y={y} width={width} height={barH} rx={barH/2}
              fill={cfg.dot} opacity="0.9" />
                
            {/* Score Label inside or edge of bar */}
            <text x={getX(d.score) + 8} y={y + barH/2 + 3} textAnchor="start"
              fontSize="11" fontWeight="800" fill={cfg.dot} fontFamily="system-ui, -apple-system, sans-serif">
              {d.score}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
function SupplyMapSection({ t }) {
  // Convert symbolic levels into purely numerical Volume Index scores for the graph
  const scoreMap = { 'High': 88, 'Medium': 54, 'Low': 26 }
  const variations = [5, -3, 6, -2, 4, -4]
  
  // Create an enriched array with scores and sort them for a meaningful graph layout
  const enrichedRegions = [...supplyRegions].map((r, i) => {
    const base = scoreMap[r.level] || 50
    const score = base + variations[i % variations.length]
    return { ...r, score }
  }).sort((a,b) => b.score - a.score)

  const highCount   = enrichedRegions.filter(r => r.level === 'High').length
  const mediumCount = enrichedRegions.filter(r => r.level === 'Medium').length
  const lowCount    = enrichedRegions.filter(r => r.level === 'Low').length

  return (
    <Panel title={t.activeSupplyMap} accent={`${supplyRegions.length} regions`} className="section-screen">
      <div className="full-section-grid">

        {/* ── Left: Volume Chart ── */}
        <div className="full-section-main">
          <div className="section-block-label">Supply Volume by Region</div>

          {/* Legend */}
          <div className="smap-legend">
            {[['High', '#3ecf79'], ['Medium', '#eeb211'], ['Low', '#e55353']].map(([lvl, col]) => (
              <div key={lvl} className="smap-legend-item">
                <span className="smap-legend-dot" style={{ background: col }} />
                <span>{lvl}</span>
              </div>
            ))}
          </div>

          {/* SVG Horizontal Bar Chart */}
          <div className="smap-canvas fade-in">
            <SupplyVolumeChart data={enrichedRegions} />
          </div>

          {/* Summary row */}
          <div className="smap-summary">
            <div className="smap-sum-pill" style={{ borderColor: '#3ecf79', background: 'rgba(62,207,121,0.12)' }}>
              <span style={{ color: '#3ecf79', fontWeight: 800 }}>{highCount}</span>
              <span>High Activity</span>
            </div>
            <div className="smap-sum-pill" style={{ borderColor: '#eeb211', background: 'rgba(240,192,64,0.12)' }}>
              <span style={{ color: '#eeb211', fontWeight: 800 }}>{mediumCount}</span>
              <span>Medium</span>
            </div>
            <div className="smap-sum-pill" style={{ borderColor: '#e55353', background: 'rgba(240,128,128,0.12)' }}>
              <span style={{ color: '#e55353', fontWeight: 800 }}>{lowCount}</span>
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* ── Right: Region cards ── */}
        <div className="full-section-side">
          <div className="section-block-label">Region Details</div>
          <div className="smap-regions-list">
            {enrichedRegions.map(region => {
              const cfg = LEVEL[region.level] || LEVEL.Low
              return (
                <article key={region.name} className="smap-region-card fade-in"
                  style={{ borderColor: cfg.border, background: cfg.bg }}>
                  <div className="smap-region-header">
                    <div className="smap-region-dot" style={{ background: cfg.dot }} />
                    <strong className="smap-region-name">{region.name}</strong>
                    <span className="smap-region-level" style={{ color: cfg.dot }}>
                      {region.score} Index
                    </span>
                  </div>
                  {region.products?.length > 0 && (
                    <div className="smap-products">
                      {region.products.map(p => (
                        <div key={p.name} className="smap-product-row">
                          <span className="smap-product-name">{p.name}</span>
                          <span className="smap-product-price">{p.price}</span>
                          <span className={`smap-trend-badge smap-trend-${p.trend}`}>
                            {p.trend === 'up' ? '↑' : p.trend === 'down' ? '↓' : '→'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>

      </div>
    </Panel>
  )
}

export default SupplyMapSection
