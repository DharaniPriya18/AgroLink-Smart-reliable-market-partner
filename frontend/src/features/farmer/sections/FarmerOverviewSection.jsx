import { getMandiRecommendation } from '../../../utils/mandiRecommend.js'

function SaplingArt() {
  return (
    <svg viewBox="0 0 120 200" className="sapling-art" aria-hidden="true" fill="none" overflow="hidden" preserveAspectRatio="xMidYMid meet">
      {/* stem */}
      <path d="M60 190 Q58 150 60 110 Q62 80 60 50" stroke="rgba(80,140,90,0.7)" strokeWidth="3" strokeLinecap="round" />
      {/* left leaf */}
      <path d="M60 120 Q30 105 22 80 Q45 78 60 100" fill="rgba(108,197,146,0.45)" stroke="rgba(80,140,90,0.5)" strokeWidth="1.2" />
      {/* right leaf */}
      <path d="M60 100 Q90 85 98 60 Q75 58 60 82" fill="rgba(108,197,146,0.55)" stroke="rgba(80,140,90,0.5)" strokeWidth="1.2" />
      {/* top leaf */}
      <path d="M60 70 Q45 45 50 20 Q68 35 65 62" fill="rgba(118,213,163,0.6)" stroke="rgba(80,140,90,0.5)" strokeWidth="1.2" />
      {/* small left sprout */}
      <path d="M60 145 Q40 138 36 122 Q52 120 60 138" fill="rgba(108,197,146,0.3)" stroke="rgba(80,140,90,0.4)" strokeWidth="1" />
      {/* soil mound */}
      <ellipse cx="60" cy="192" rx="22" ry="6" fill="rgba(160,120,80,0.25)" stroke="rgba(140,100,60,0.3)" strokeWidth="1" />
    </svg>
  )
}

function FarmerOverviewSection({ t, farmerCrops, applications, selectedSignal, setActiveSection }) {
  const topCrop = farmerCrops[0]?.crop || 'Tomato'
  const rec = getMandiRecommendation(topCrop)

  return (
    <div className="content-grid single-screen">
      <section className="panel overview-panel">
        <div className="panel-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>{t.shortcuts}</h3>
          <span className="soft-chip sand-chip">{t.overview}</span>
        </div>
        <div className="overview-with-art">
          <div className="overview-actions">
            <button className="shortcut-card" onClick={() => setActiveSection('myCrops')}>
              <strong>{t.myCrops}</strong>
              <span className="shortcut-sub">Crop stock</span>
              <span className="shortcut-val">{farmerCrops.length} items</span>
            </button>
            <button className="shortcut-card" onClick={() => setActiveSection('demandSignals')}>
              <strong>{t.demandSignals}</strong>
              <span className="shortcut-sub">Live signals</span>
              <span className="shortcut-val">4 active</span>
            </button>
            <button className="shortcut-card" onClick={() => setActiveSection('applyToSupply')}>
              <strong>{t.applyToSupply}</strong>
              <span className="shortcut-sub">Choose crop</span>
              <span className="shortcut-val">{selectedSignal ? selectedSignal.crop : '—'}</span>
            </button>
            <button className="shortcut-card" onClick={() => setActiveSection('mySubmissions')}>
              <strong>{t.mySubmissions}</strong>
              <span className="shortcut-sub">Track status</span>
              <span className="shortcut-val">{applications.length} records</span>
            </button>
          </div>
          <SaplingArt />
        </div>
      </section>
    </div>
  )
}

export default FarmerOverviewSection
