function VisualCard({ image, alt, title, text, className = '' }) {
  return (
    <aside className={`visual-card ${className}`}>
      <img src={image} alt={alt} />
      <div className="visual-card-copy">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </aside>
  )
}

export default VisualCard
