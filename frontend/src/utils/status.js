export function translateStatus(status, t) {
  if (status === 'Pending') return t.pending
  if (status === 'Approved') return t.approved
  if (status === 'Collected') return t.collected
  if (status === 'Rejected') return t.rejected
  if (status === 'Delivered') return t.delivered
  if (status === 'In Transit') return t.inTransit
  return status
}

export function statusClass(status) {
  return status.toLowerCase().replace(/\s/g, '-')
}
