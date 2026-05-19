import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function SlideNav({ current, total, onPrev, onNext, onGoTo }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(10, 20, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(74,222,128,0.18)',
        borderRadius: 40,
        padding: '8px 16px',
      }}
    >
      <button
        onClick={onPrev}
        disabled={current === 0}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: current === 0 ? 'transparent' : 'rgba(74,222,128,0.1)',
          border: '1px solid rgba(74,222,128,0.2)',
          color: current === 0 ? 'rgba(74,222,128,0.25)' : '#4ade80',
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronLeft size={16} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`nav-dot${i === current ? ' active' : ''}`}
            style={{ border: 'none', padding: 0 }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: current === total - 1 ? 'transparent' : 'rgba(74,222,128,0.1)',
          border: '1px solid rgba(74,222,128,0.2)',
          color: current === total - 1 ? 'rgba(74,222,128,0.25)' : '#4ade80',
          cursor: current === total - 1 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
