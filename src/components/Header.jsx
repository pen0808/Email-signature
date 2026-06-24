export default function Header({ onGuideClick }) {
  return (
    <header className="app-header">
      <div className="header-logo">
        <i data-lucide="pen-tool"></i>
        <h1>PenSignature</h1>
      </div>
      <nav className="header-nav">
        <button className="nav-btn" onClick={onGuideClick}>
          <i data-lucide="book-open"></i>
          <span>Installation Guide</span>
        </button>
        <a href="https://www.pengroup.com" target="_blank" className="nav-btn" rel="noreferrer">
          <i data-lucide="external-link"></i>
          <span>Pen Group</span>
        </a>
      </nav>
    </header>
  )
}
