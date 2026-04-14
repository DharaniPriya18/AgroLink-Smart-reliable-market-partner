import { demandSignals } from '../../../data/mockData.js'
import Panel from '../../../components/ui/Panel.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'

function FarmerSignalsSection({ t, selectedSignal, setSelectedSignal, setActiveSection }) {
  function handleApply(signal) {
    setSelectedSignal(signal)
    setActiveSection('applyToSupply')
  }

  return (
    <Panel title={t.demandSignals} accent={t.nearestRegion} className="section-screen">
      <div className="full-section-grid">

        {/* ── Left: Signal list ── */}
        <div className="full-section-main">
          <div className="section-block-label">Live Demand Signals</div>
          <div className="signals-list">
            {demandSignals.map(signal => (
              <button
                key={signal.id}
                className={`signal-card ${selectedSignal?.id === signal.id ? 'selected' : ''}`}
                onClick={() => setSelectedSignal(signal)}
              >
                <div className="signal-card-left">
                  <strong>{signal.crop}</strong>
                  <p>{signal.region}&nbsp;·&nbsp;₹{signal.price}/kg&nbsp;·&nbsp;{signal.change}</p>
                </div>
                <div className="signal-meta">
                  <span>{signal.trend}</span>
                  <StatusBadge
                    label={signal.priority === 'high' ? t.highPriority : t.stable}
                    variant={signal.priority === 'high' ? 'priority' : 'good'}
                  />
                  {signal.priority !== 'stable' && (
                    <button
                      className="secondary-button approve-button"
                      onClick={e => { e.stopPropagation(); handleApply(signal) }}
                    >
                      {t.applyToSupply}
                    </button>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Selected signal detail ── */}
        <div className="full-section-side">
          <div className="section-block-label">Signal Details</div>
          {selectedSignal ? (
            <div className="signal-detail-card">
              <div className="signal-detail-header">
                <div className="signal-detail-icon">📦</div>
                <div>
                  <div className="signal-detail-crop">{selectedSignal.crop}</div>
                  <div className="signal-detail-region">{selectedSignal.region}</div>
                </div>
              </div>
              <div className="signal-detail-stats">
                <div className="signal-detail-stat">
                  <span className="sdl">Price</span>
                  <strong>₹{selectedSignal.price}/kg</strong>
                </div>
                <div className="signal-detail-stat">
                  <span className="sdl">Change</span>
                  <strong>{selectedSignal.change}</strong>
                </div>
                <div className="signal-detail-stat">
                  <span className="sdl">Trend</span>
                  <strong>{selectedSignal.trend}</strong>
                </div>
                <div className="signal-detail-stat">
                  <span className="sdl">Priority</span>
                  <StatusBadge
                    label={selectedSignal.priority === 'high' ? t.highPriority : t.stable}
                    variant={selectedSignal.priority === 'high' ? 'priority' : 'good'}
                  />
                </div>
              </div>
              <button
                className="primary-button farmer-button"
                style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                onClick={() => handleApply(selectedSignal)}
              >
                {t.applyToSupply} →
              </button>
            </div>
          ) : (
            <div className="signal-empty-state">
              <div className="signal-empty-icon">📋</div>
              <p className="helper-text">{t.selectFromSignals}</p>
            </div>
          )}
        </div>

      </div>
    </Panel>
  )
}

export default FarmerSignalsSection
