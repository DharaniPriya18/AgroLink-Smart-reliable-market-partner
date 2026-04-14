import { statusClass, translateStatus } from '../../utils/status.js'

function StatusBadge({ status, t, variant, label }) {
  const className = variant ? variant : statusClass(status)
  const content = label || (status ? translateStatus(status, t) : '')

  return <span className={`status-badge ${className}`}>{content}</span>
}

export default StatusBadge
