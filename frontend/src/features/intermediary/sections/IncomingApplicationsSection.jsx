import Panel from '../../../components/ui/Panel.jsx'
import StatusBadge from '../../../components/ui/StatusBadge.jsx'

const LOCKED = ['Approved', 'Rejected', 'Collected', 'Delivered', 'In Transit']

function IncomingApplicationsSection({ t, applications, updateApplicationStatus }) {
  return (
    <Panel title={t.incomingApplications} accent={`${applications.length}`} className="section-screen">
      <div className="simple-list">
        {applications.map((item) => {
          const locked = LOCKED.includes(item.status)
          return (
            <article className="submission-card split-card" key={item.id}>
              <div>
                <strong>{item.crop}</strong>
                <p>{item.quantity} kg • {item.district}</p>
                <small>{item.farmer && `${item.farmer} · `}{item.trend} • {item.region}</small>
              </div>
              <div className="action-group">
                <StatusBadge status={item.status} t={t} />
                {!locked && (
                  <>
                    <button className="secondary-button approve-button" onClick={() => updateApplicationStatus(item.id, 'Approved')}>Approve</button>
                    <button className="secondary-button reject-button" onClick={() => updateApplicationStatus(item.id, 'Rejected')}>Reject</button>
                  </>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </Panel>
  )
}

export default IncomingApplicationsSection
