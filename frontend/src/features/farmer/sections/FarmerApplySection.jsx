import Panel from '../../../components/ui/Panel.jsx'

function FarmerApplySection({ t, selectedSignal, offerQuantity, setOfferQuantity, handleSubmitOffer, applications }) {
  const pendingForSignal = applications.filter(
    item => selectedSignal && item.crop === selectedSignal.crop && item.status === 'Pending'
  )

  return (
    <Panel title={t.applyToSupply} accent={selectedSignal?.crop || 'No signal selected'} className="section-screen">
      <div className="full-section-grid">

        {/* ── Left: Supply offer form ── */}
        <div className="full-section-main">
          {selectedSignal && (
            <div className="signal-prefill-alert">
              Pre-filled from demand signal — <strong>{selectedSignal.crop}</strong> in {selectedSignal.region} ({selectedSignal.change})
            </div>
          )}

          <div className="section-block-label">Offer Details</div>
          <form className="apply-form" onSubmit={handleSubmitOffer}>
            <div className="apply-form-row">
              <label className="apply-label">Crop</label>
              <input readOnly value={selectedSignal?.crop || ''} placeholder={t.selectFromSignals} />
            </div>
            <div className="apply-form-row">
              <label className="apply-label">Target Region</label>
              <input readOnly value={selectedSignal?.region || ''} placeholder="Target region" />
            </div>
            <div className="apply-form-row">
              <label className="apply-label">Quantity (kg)</label>
              <input
                type="number"
                value={offerQuantity}
                onChange={e => setOfferQuantity(e.target.value)}
                placeholder={t.offerQuantity}
              />
            </div>
            <div className="apply-form-row">
              <label className="apply-label">Notes</label>
              <input placeholder="Harvest condition, availability, quality grade…" />
            </div>
            <button className="primary-button farmer-button" type="submit" style={{ justifyContent: 'center' }}>
              {t.submitOffer}
            </button>
          </form>

          {!selectedSignal && (
            <p className="helper-text" style={{ marginTop: '0.5rem' }}>{t.selectFromSignals}</p>
          )}
          {pendingForSignal.length > 0 && (
            <span className="status-badge pending" style={{ marginTop: '0.5rem' }}>{t.pendingApproval}</span>
          )}
        </div>

        {/* ── Right: Market info & my applications ── */}
        <div className="full-section-side">
          {selectedSignal && (
            <>
              <div className="section-block-label">Market Snapshot</div>
              <div className="apply-market-card">
                <div className="apply-market-row">
                  <span>Crop</span><strong>{selectedSignal.crop}</strong>
                </div>
                <div className="apply-market-row">
                  <span>Region</span><strong>{selectedSignal.region}</strong>
                </div>
                <div className="apply-market-row">
                  <span>Offer Price</span><strong>₹{selectedSignal.price}/kg</strong>
                </div>
                <div className="apply-market-row">
                  <span>7-day Change</span><strong>{selectedSignal.change}</strong>
                </div>
                <div className="apply-market-row">
                  <span>Trend</span><strong>{selectedSignal.trend}</strong>
                </div>
              </div>
            </>
          )}

          <div className="section-block-label" style={{ marginTop: selectedSignal ? '1rem' : 0 }}>
            Recent Applications
          </div>
          {applications.length === 0 ? (
            <p className="helper-text">No applications submitted yet.</p>
          ) : (
            <div className="apply-recent-list">
              {applications.slice(0, 5).map(item => (
                <div key={item.id} className="apply-recent-item">
                  <div>
                    <div className="apply-recent-crop">{item.crop}</div>
                    <div className="apply-recent-meta">{item.quantity} kg · {item.region}</div>
                  </div>
                  <span className={`status-badge ${item.status?.toLowerCase()}`}>{item.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Panel>
  )
}

export default FarmerApplySection
