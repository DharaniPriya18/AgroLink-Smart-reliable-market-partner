import { useState } from 'react'
import Panel from '../../../components/ui/Panel.jsx'
import { mandiData } from '../../../data/mockData.js'
import { getMandiRecommendation } from '../../../utils/mandiRecommend.js'

const CROPS = [...new Set(mandiData.map((m) => m.crop))]

function AIAdvisorSection({ t }) {
  const [crop, setCrop] = useState('')
  const [result, setResult] = useState(null)

  function handleAnalyse() {
    if (!crop) return
    setResult(getMandiRecommendation(crop))
  }

  const mandisForCrop = mandiData.filter((m) => m.crop === crop)

  return (
    <Panel title="AI Market Advisor" accent="Local" className="section-screen narrow-screen">
      <p className="helper-text" style={{ marginBottom: '0.75rem' }}>
        Analyses 7-day mandi price trends to recommend the most profitable market.
      </p>

      <div className="form-grid single-column">
        <select
          value={crop}
          onChange={(e) => { setCrop(e.target.value); setResult(null) }}
          style={{ marginBottom: '0.5rem' }}
        >
          <option value="">Choose a crop...</option>
          {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        {crop && mandisForCrop.length > 0 && (
          <div className="mandi-compare-grid">
            {mandisForCrop.map((m) => (
              <div key={m.name} className="mandi-compare-tile">
                <strong>{m.name}</strong>
                <span>Today: ₹{m.prices[m.prices.length - 1]}/kg</span>
                <small>7-day: [{m.prices.join(', ')}]</small>
              </div>
            ))}
          </div>
        )}

        <button
          className="primary-button farmer-button"
          onClick={handleAnalyse}
          disabled={!crop}
        >
          Get Recommendation
        </button>
      </div>

      {result && (
        <div className="mandi-rec" style={{ marginTop: '1rem' }}>
          <div className="mandi-rec-row">
            <span className="mandi-rec-label">Recommended Mandi for {crop}</span>
            <span className={`soft-chip ${result.trend === 'rising' ? 'green-chip' : result.trend === 'falling' ? 'red-chip' : 'sand-chip'}`}>
              {result.trendLabel}
            </span>
          </div>
          <div className="mandi-rec-body">
            <div className="mandi-rec-stat">
              <strong>{result.mandi}</strong>
              <span>Best mandi</span>
            </div>
            <div className="mandi-rec-stat">
              <strong>₹{result.predicted}/kg</strong>
              <span>Predicted tomorrow</span>
            </div>
            <div className="mandi-rec-stat">
              <strong>₹{result.avg}/kg</strong>
              <span>7-day avg</span>
            </div>
            <div className="mandi-rec-reason">
              <span>{result.reason}</span>
            </div>
          </div>
        </div>
      )}
    </Panel>
  )
}

export default AIAdvisorSection
