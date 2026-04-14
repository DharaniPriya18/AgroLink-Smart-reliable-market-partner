import LanguageToggle from '../ui/LanguageToggle.jsx'

function Sidebar({
  brand,
  title,
  description,
  sections,
  activeSection,
  setActiveSection,
  profileName,
  profileRole,
  profileInitial,
  language,
  setLanguage,
  onSwitchRole,
  onLogout,
  t,
}) {
  return (
    <aside className="sidebar fade-in">
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h2>
      </div>

      <nav className="nav-stack">
        {sections.map((section) => (

          <button
            key={section}
            className={`nav-link ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
          >
            {t[section]}
          </button>
        ))}
      </nav>

      <div className="profile-card">
        <div className="profile-avatar">{profileInitial}</div>
        <div>
          <strong>{profileName}</strong>
          <p>{profileRole}</p>
        </div>
      </div>

      <div className="sidebar-bottom" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
        <button className="logout-button" style={{ flex: 1, padding: '0.45rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'center' }} onClick={onLogout}>{t.logout}</button>
      </div>
    </aside>
  )
}

export default Sidebar
