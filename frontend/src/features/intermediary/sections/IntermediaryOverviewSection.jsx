function NetworkArt() {
  return (
    <svg viewBox="0 0 200 180" className="sapling-art" aria-hidden="true" fill="none">
      {/* center node */}
      <circle cx="100" cy="90" r="18" fill="rgba(109,163,235,0.35)" stroke="rgba(80,130,200,0.5)" strokeWidth="2"/>
      <circle cx="100" cy="90" r="8" fill="rgba(109,163,235,0.5)" stroke="rgba(80,130,200,0.4)" strokeWidth="1"/>
      {/* outer nodes */}
      {[
        { x: 40, y: 45 }, { x: 160, y: 45 },
        { x: 25, y: 120 }, { x: 175, y: 120 },
        { x: 100, y: 155 },
      ].map((n, i) => (
        <g key={i}>
          <line x1="100" y1="90" x2={n.x} y2={n.y} stroke="rgba(109,163,235,0.25)" strokeWidth="1.5" strokeDasharray="5 4"/>
          <circle cx={n.x} cy={n.y} r="12" fill="rgba(108,197,146,0.3)" stroke="rgba(60,140,80,0.45)" strokeWidth="1.5"/>
          <circle cx={n.x} cy={n.y} r="5" fill="rgba(108,197,146,0.5)"/>
        </g>
      ))}
      {/* cross connections */}
      <line x1="40" y1="45" x2="160" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
      <line x1="25" y1="120" x2="175" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  )
}

function IntermediaryOverviewSection({ t, applications, logisticsApplications, setActiveSection }) {
  return (
    <div className="content-grid single-screen">
      <section className="panel overview-panel">
        <div className="panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{t.shortcuts}</h3>
          <span className="soft-chip sand-chip">{t.overview}</span>
        </div>
        <div className="overview-with-art">
          <div className="overview-actions">
            <button className="shortcut-card" onClick={() => setActiveSection('incomingApplications')}>
              <strong>{t.incomingApplications}</strong>
              <span className="shortcut-sub">Review apps</span>
              <span className="shortcut-val">{applications.length} records</span>
            </button>
            <button className="shortcut-card" onClick={() => setActiveSection('activeSupplyMap')}>
              <strong>{t.activeSupplyMap}</strong>
              <span className="shortcut-sub">Region view</span>
              <span className="shortcut-val">6 regions</span>
            </button>
            <button className="shortcut-card" onClick={() => setActiveSection('logistics')}>
              <strong>{t.logistics}</strong>
              <span className="shortcut-sub">Track routes</span>
              <span className="shortcut-val">{logisticsApplications.length} active</span>
            </button>
            <button className="shortcut-card" onClick={() => setActiveSection('performance')}>
              <strong>{t.performance}</strong>
              <span className="shortcut-sub">Key metrics</span>
              <span className="shortcut-val">4 indicators</span>
            </button>
          </div>
          <NetworkArt />
        </div>
      </section>
    </div>
  )
}

export default IntermediaryOverviewSection
