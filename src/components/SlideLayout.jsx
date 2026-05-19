import Logo from './Logo'

export default function SlideLayout({ children, slideNumber, totalSlides, isHero = false }) {
  const pct = (slideNumber / totalSlides) * 100

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a1410 0%, #0d1f15 60%, #0a1410 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>

      {/* Watermark logo — hidden on hero */}
      {!isHero && (
        <div className="logo-watermark">
          <Logo size="sm" animated={false} />
        </div>
      )}

      {/* Slide number badge */}
      <div className="slide-badge">
        {String(slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </div>
    </div>
  )
}
