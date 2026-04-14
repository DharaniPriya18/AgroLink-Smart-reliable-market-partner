function Topbar({ title, description, label, stats }) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', minHeight: '60px' }}>
        <h1 style={{ margin: 0, alignSelf: 'center' }}>{title}</h1>
      </div>
      <div className="stats-row">
        {stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </header>
  )
}

export default Topbar
