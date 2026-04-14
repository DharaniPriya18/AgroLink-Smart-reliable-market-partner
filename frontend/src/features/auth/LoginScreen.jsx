import LanguageToggle from '../../components/ui/LanguageToggle.jsx'

function LoginScreen({ t, language, setLanguage, enterRole }) {
  return (
    <div className="login-screen-centered">
      <div className="backdrop-blob blob-a" />
      <div className="backdrop-blob blob-b" />

      {/* Top right language toggle */}
      <div className="login-lang-corner fade-in" style={{ animationDelay: '0.2s' }}>
        <LanguageToggle language={language} setLanguage={setLanguage} t={t} />
      </div>

      <div className="login-centered-container">

        {/* Simple Static Headers with standard fade-in */}
        <header className="login-hero-header fade-in" style={{ minHeight: '130px', display: 'flex', flexDirection: 'column', gap: '0.5rem', animationDelay: '0.1s' }}>
          <h1>Welcome to AgroLink</h1>
          <p>Your smart and reliable market partner</p>
        </header>

        {/* Big Plain Buttons using Pastel Mint Green */}
        <div className="login-role-grid fade-in" style={{ display: 'flex', gap: '20px', justifyContent: 'center', maxWidth: '600px', margin: '0 auto', animationDelay: '0.3s' }}>

          <button
            className="login-role-card role-farmer"
            style={{
              flex: 1,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(175, 235, 205, 0.6), rgba(215, 250, 230, 0.4))',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 4px 12px rgba(62, 207, 121, 0.1)',
              padding: '1.2rem 1rem',
              borderRadius: '24px',
              color: '#0d3f25',
              backdropFilter: 'blur(16px)'
            }}
            onClick={() => enterRole('farmer')}
          >
            <div className="role-card-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ color: '#0d3f25', fontSize: '1.3rem', marginBottom: '0.2rem' }}>Farmer Login</h2>
              <p style={{ color: '#165c37', fontSize: '0.85rem', fontWeight: '600' }}>{t.farmerWelcome}</p>
            </div>
          </button>

          <button
            className="login-role-card role-intermediary"
            style={{
              flex: 1,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(175, 235, 205, 0.6), rgba(215, 250, 230, 0.4))',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 4px 12px rgba(62, 207, 121, 0.1)',
              padding: '1.2rem 1rem',
              borderRadius: '24px',
              color: '#0d3f25',
              backdropFilter: 'blur(16px)'
            }}
            onClick={() => enterRole('intermediary')}
          >
            <div className="role-card-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ color: '#0d3f25', fontSize: '1.3rem', marginBottom: '0.2rem' }}>Govt Intermediary Login</h2>
              <p style={{ color: '#165c37', fontSize: '0.85rem', fontWeight: '600' }}>{t.intermediaryWelcome}</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  )
}

export default LoginScreen
