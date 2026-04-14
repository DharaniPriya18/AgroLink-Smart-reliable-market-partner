function Panel({ title, accent, children, className = '' }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <h3>{title}</h3>
        {accent ? <span className="soft-chip sand-chip">{accent}</span> : null}
      </div>
      {children}
    </section>
  )
}

export default Panel
