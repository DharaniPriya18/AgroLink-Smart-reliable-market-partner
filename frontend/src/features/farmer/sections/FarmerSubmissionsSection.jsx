import Panel from '../../../components/ui/Panel.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'

function FarmerSubmissionsSection({ t, applications }) {
  const pending   = applications.filter(a => a.status === 'Pending').length
  const approved  = applications.filter(a => a.status === 'Approved' || a.status === 'approved').length
  const rejected  = applications.filter(a => a.status === 'Rejected' || a.status === 'rejected').length

  return (
    <Panel title={t.mySubmissions} accent={`${applications.length} total`} className="section-screen">
      <div className="full-section-grid">

        {/* ── Left: Submissions list ── */}
        <div className="full-section-main">
          <div className="section-block-label">All Applications</div>
          {applications.length === 0 ? (
            <p className="helper-text">No applications yet. Apply to a demand signal to get started.</p>
          ) : (
            <div className="submissions-list">
              {applications.map(item => (
                <article className="submission-card" key={item.id}>
                  <div>
                    <strong>{item.crop}</strong>
                    <p>{item.quantity} kg • {item.region}</p>
                  </div>
                  <StatusBadge status={item.status} t={t} />
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Summary stats ── */}
        <div className="full-section-side">
          <div className="section-block-label">Summary</div>

          <div className="submissions-stat-grid">
            <div className="submissions-stat-card sub-stat-all">
              <div className="sub-stat-val">{applications.length}</div>
              <div className="sub-stat-label">Total</div>
            </div>
            <div className="submissions-stat-card sub-stat-pending">
              <div className="sub-stat-val">{pending}</div>
              <div className="sub-stat-label">Pending</div>
            </div>
            <div className="submissions-stat-card sub-stat-approved">
              <div className="sub-stat-val">{approved}</div>
              <div className="sub-stat-label">Approved</div>
            </div>
            <div className="submissions-stat-card sub-stat-rejected">
              <div className="sub-stat-val">{rejected}</div>
              <div className="sub-stat-label">Rejected</div>
            </div>
          </div>

          {applications.length > 0 && (
            <>
              <div className="section-block-label" style={{ marginTop: '1rem' }}>Latest</div>
              <div className="sub-latest-card">
                <div className="sub-latest-crop">{applications.at(-1).crop}</div>
                <div className="sub-latest-meta">{applications.at(-1).quantity} kg · {applications.at(-1).region}</div>
                <StatusBadge status={applications.at(-1).status} t={t} />
              </div>
            </>
          )}
        </div>

      </div>
    </Panel>
  )
}

export default FarmerSubmissionsSection
