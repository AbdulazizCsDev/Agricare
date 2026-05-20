import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ArchitectureDiagram from '../components/visuals/ArchitectureDiagram'
import { Zap, Package, Clock, BarChart2 } from 'lucide-react'

const FEATURES = [
  { icon: BarChart2, label: 'Top-3 predictions',  color: '#4ade80' },
  { icon: Zap,       label: 'Confidence scoring', color: '#fbbf24' },
  { icon: Package,   label: 'Dockerized',         color: '#60a5fa' },
  { icon: Clock,     label: '<200ms inference',   color: '#c084fc' },
]

const TECH = ['PyTorch', 'EfficientNet-B0', 'FastAPI', 'Docker', 'Uvicorn', 'torchvision']

/* Timing (seconds) ─────────────────────────────────────────── */
const SETTLE = 2.6   // wait for camera transition (slow root zoom) to settle
const STEP   = 0.75  // slow, deliberate gap between each block

const glass = {
  background:           'rgba(0,0,0,0.55)',
  border:               '1px solid rgba(74,222,128,0.12)',
  borderRadius:         16,
  backdropFilter:       'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
}

export default function Slide06_Architecture() {
  /* Replay sequence each time the section enters; also fade out on exit */
  const [animKey, setAnimKey]   = useState(0)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('architecture')
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setAnimKey(k => k + 1)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
      style={{
        width: '100%', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 48px', position: 'relative',
      }}>

      {/* Card frame appears right away (still empty inside until SETTLE) */}
      <motion.div
        key={`card-${animKey}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: SETTLE - 0.5, ease: 'easeOut' }}
        style={{
          ...glass,
          width: '100%', maxWidth: 1100,
          padding: '52px 60px 48px',
          display: 'flex', flexDirection: 'column', gap: 32,
        }}
      >

        {/* Header */}
        <motion.div
          key={`hdr-${animKey}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: SETTLE, ease: 'easeOut' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
            color: 'rgba(74,222,128,0.55)', letterSpacing: '0.14em', marginBottom: 10,
          }}>
            SYSTEM ARCHITECTURE
          </p>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
            Request{' '}
            <span style={{ color: 'rgba(240,253,244,0.3)', fontSize: '1.5rem', fontWeight: 300 }}>→</span>{' '}
            <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
              Response
            </span>
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'rgba(240,253,244,0.38)', marginTop: 6 }}>
            Click any node to inspect it
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          key={`diag-${animKey}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: SETTLE + STEP, ease: 'easeOut' }}
        >
          <ArchitectureDiagram />
        </motion.div>

        {/* Stack badges */}
        <motion.div
          key={`stack-${animKey}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: SETTLE + STEP * 2, duration: 0.35 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
        >
          {TECH.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: SETTLE + STEP * 2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
              style={{
                fontSize: '0.82rem', fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                color: 'rgba(74,222,128,0.85)',
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.22)',
                borderRadius: 100, padding: '5px 14px',
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={`${f.label}-${animKey}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: SETTLE + STEP * 3 + i * 0.12, duration: 0.55, ease: 'easeOut' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '10px 18px', borderRadius: 100,
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}30`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Icon size={16} color={f.color} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(240,253,244,0.85)' }}>
                  {f.label}
                </span>
              </motion.div>
            )
          })}
        </div>

      </motion.div>
    </motion.div>
  )
}
