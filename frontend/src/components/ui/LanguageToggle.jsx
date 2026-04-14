function LanguageToggle({ language, setLanguage, t }) {
  return (
    <div className="language-toggle" aria-label={t.language}>
      <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>
        {t.english}
      </button>
      <button className={language === 'ta' ? 'active' : ''} onClick={() => setLanguage('ta')}>
        {t.tamil}
      </button>
    </div>
  )
}

export default LanguageToggle
