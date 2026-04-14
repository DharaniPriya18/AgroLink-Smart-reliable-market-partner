import Panel from '../../../components/ui/Panel.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'

const CYCLE = { Approved: 'In Transit', 'In Transit': 'Delivered', Delivered: 'Delivered' }
const NEXT_LABEL = { Approved: 'Mark In Transit', 'In Transit': 'Mark Delivered', Delivered: 'Delivered' }

function TruckArt() {
  return (
    <svg viewBox="0 0 180 140" className="section-art" aria-hidden="true" fill="none">
      {/* road */}
      <path d="M10 115 Q90 110 170 115" stroke="rgba(150,150,150,0.3)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M10 115 Q90 110 170 115" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeDasharray="12 8"/>
      {/* truck body */}
      <rect x="20" y="72" width="90" height="40" rx="6" fill="rgba(108,197,146,0.3)" stroke="rgba(60,140,80,0.45)" strokeWidth="1.5"/>
      {/* cab */}
      <path d="M110 88 L110 72 Q118 72 128 82 L138 95 L138 112 L110 112 Z" fill="rgba(108,197,146,0.35)" stroke="rgba(60,140,80,0.45)" strokeWidth="1.5"/>
      {/* windshield */}
      <path d="M112 88 L112 76 Q118 76 126 84 L132 92 L112 92 Z" fill="rgba(180,220,255,0.3)" stroke="rgba(100,160,200,0.3)" strokeWidth="1"/>
      {/* wheels */}
      <circle cx="45" cy="114" r="10" fill="rgba(80,80,80,0.25)" stroke="rgba(60,60,60,0.4)" strokeWidth="1.5"/>
      <circle cx="45" cy="114" r="4" fill="rgba(120,120,120,0.3)"/>
      <circle cx="95" cy="114" r="10" fill="rgba(80,80,80,0.25)" stroke="rgba(60,60,60,0.4)" strokeWidth="1.5"/>
      <circle cx="95" cy="114" r="4" fill="rgba(120,120,120,0.3)"/>
      <circle cx="128" cy="114" r="10" fill="rgba(80,80,80,0.25)" stroke="rgba(60,60,60,0.4)" strokeWidth="1.5"/>
      <circle cx="128" cy="114" r="4" fill="rgba(120,120,120,0.3)"/>
      {/* cargo boxes */}
      <rect x="30" y="78" width="22" height="18" rx="3" fill="rgba(235,186,92,0.35)" stroke="rgba(180,140,50,0.4)" strokeWidth="1"/>
      <rect x="56" y="78" width="22" height="18" rx="3" fill="rgba(235,186,92,0.3)" stroke="rgba(180,140,50,0.4)" strokeWidth="1"/>
      <rect x="82" y="78" width="16" height="18" rx="3" fill="rgba(235,186,92,0.3)" stroke="rgba(180,140,50,0.4)" strokeWidth="1"/>
      {/* speed lines */}
      <path d="M8 85 L18 85" stroke="rgba(108,197,146,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 93 L16 93" stroke="rgba(108,197,146,0.3)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M8 101 L17 101" stroke="rgba(108,197,146,0.25)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function LogisticsSection({ t, logisticsApplications, updateLogisticsStatus }) {
  return (
    <Panel title={t.logistics} accent={`${logisticsApplications.length}`} className="section-screen">
      <div className="section-with-visual">
        <div className="simple-list">
          {logisticsApplications.map((item) => (
            <article className="submission-card split-card" key={item.id}>
              <div>
                <strong>{item.crop}</strong>
                <p>{item.quantity} kg • {item.district}</p>
              </div>
              <div className="action-group">
                <StatusBadge status={item.status} t={t} />
                {item.status !== 'Delivered' && (
                  <button
                    className="secondary-button"
                    onClick={() => updateLogisticsStatus(item.id, CYCLE[item.status])}
                  >
                    {NEXT_LABEL[item.status]}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="art-aside">
          <TruckArt />
          <span className="art-aside-label">{t.logisticsVisualTitle}</span>
        </div>
      </div>
    </Panel>
  )
}

export default LogisticsSection
