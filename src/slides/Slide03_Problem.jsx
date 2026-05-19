import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const PROBLEMS = [
  {
    text: 'Poor model accuracy due to limited data or its poor quality.',
    color: '#fbbf24',
  },
  {
    text: 'Customer support team lacks a background in agronomy and requires specialized training — they rely on LLMs.',
    color: '#ef4444',
  },
  {
    text: 'It is expensive to keep customer service employees available 24/7.',
    color: '#f97316',
  },
  {
    text: 'Wrong diagnoses lead to bad pesticide recommendations for farmers and sellers.',
    color: '#fbbf24',
  },
]

const vp = { once: true, margin: '-80px' }

export default function Slide03_Problem() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 64px 80px',
        gap: 48,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.4 }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(251,191,36,0.6)',
            letterSpacing: '0.14em',
            marginBottom: 12,
          }}
        >
          PROBLEM STATEMENT
        </p>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.15 }}>
          Why existing solutions{' '}
          <span style={{ color: '#fbbf24', textShadow: '0 0 18px rgba(251,191,36,0.35)' }}>
            fall short
          </span>
        </h2>
      </motion.div>

      {/* Problem cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.42, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              padding: '18px 20px',
              borderRadius: 12,
              background: `${p.color}08`,
              border: `1px solid ${p.color}22`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Number badge */}
            <div
              style={{
                flexShrink: 0,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `${p.color}18`,
                border: `1px solid ${p.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 1,
              }}
            >
              <AlertTriangle size={14} color={p.color} />
            </div>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'rgba(240,253,244,0.88)',
                lineHeight: 1.6,
              }}
            >
              {p.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Impact strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ delay: 0.65, duration: 0.4 }}
        style={{
          padding: '14px 22px',
          borderRadius: 12,
          background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 760,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            color: '#ef4444',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          IMPACT
        </span>
        <span style={{ width: 1, height: 16, background: 'rgba(239,68,68,0.4)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.85rem', color: 'rgba(240,253,244,0.65)', lineHeight: 1.55 }}>
          Unreliable recommendations for farmers and retailers — leading to crop loss and wasted treatments.
        </span>
      </motion.div>
    </div>
  )
}
