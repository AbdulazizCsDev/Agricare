import { useState, useEffect } from 'react'
import Logo from './Logo'

const NAV_ITEMS = [
  { id: 'problem',      label: 'Problem' },
  { id: 'solution',     label: 'Solution' },
  { id: 'timeline',     label: 'Timeline' },
  { id: 'architecture', label: 'Architecture' },
]

const SECTIONS = ['hero', 'problem', 'solution', 'timeline', 'architecture']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        padding: '0 2rem',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(74,222,128,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Logo size="sm" animated={false} />
        </button>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}
            className="nav-desktop">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 8,
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  color: active === id ? '#4ade80' : 'rgba(240,253,244,0.6)',
                  background: active === id ? 'rgba(74,222,128,0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s, background 0.2s',
                  position: 'relative',
                }}
              >
                {label}
                {active === id && (
                  <span style={{
                    position: 'absolute',
                    bottom: 3, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 18, height: 2,
                    borderRadius: 2,
                    background: '#4ade80',
                    boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                  }} />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="nav-hamburger"
          aria-label="Menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 38, height: 38,
            gap: 5,
            borderRadius: 8,
            border: '1px solid rgba(74,222,128,0.2)',
            background: 'rgba(74,222,128,0.06)',
            cursor: 'pointer',
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: 18, height: 2,
              background: '#4ade80',
              borderRadius: 2,
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                : 'none'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 2rem 20px',
          background: 'rgba(0,0,0,0.96)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(74,222,128,0.12)',
        }}>
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                padding: '14px 0',
                fontSize: '1rem',
                fontWeight: 500,
                color: active === id ? '#4ade80' : 'rgba(240,253,244,0.6)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(74,222,128,0.08)',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
