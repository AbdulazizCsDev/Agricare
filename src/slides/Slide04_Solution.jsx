import { motion } from 'framer-motion'
import { Zap, Clock, Leaf, Database, Target, Crosshair } from 'lucide-react'

const SOLUTIONS = [
  {
    icon: Clock,
    color: '#4ade80',
    title: 'Instant 24/7 Results',
    text: 'Deliver automated diagnoses around the clock without extra staff.',
  },
  {
    icon: Crosshair,
    color: '#60a5fa',
    title: 'Confidence-Score Tool',
    text: 'A simple interface with confidence scores to guide workers on complex cases.',
  },
  {
    icon: Zap,
    color: '#fbbf24',
    title: 'Replace Slow LLMs',
    text: 'Swap expensive, slow LLMs with a fast, low-cost crop disease model.',
  },
  {
    icon: Leaf,
    color: '#4ade80',
    title: 'Automated Identification',
    text: 'Automate plant and disease identification — no agronomy training required.',
  },
  {
    icon: Database,
    color: '#c084fc',
    title: 'Fix Data Limits',
    text: 'Improve accuracy through targeted data cleaning and augmentation.',
  },
  {
    icon: Target,
    color: '#f97316',
    title: 'Maximum Accuracy',
    text: 'Guarantee farmers receive the correct pesticide recommendation every time.',
  },
]

const vp = { once: true, margin: '-60px' }

export default function Slide04_Solution() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '100px 52px 80px',
        gap: 40,
        maxWidth: '54vw',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.35 }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(74,222,128,0.55)',
            letterSpacing: '0.14em',
            marginBottom: 12,
          }}
        >
          THE SOLUTION
        </p>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.15 }}>
          From Raw Images{' '}
          <span style={{ color: 'rgba(240,253,244,0.3)', fontSize: '1.6rem', fontWeight: 300 }}>{'→'}</span>{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.35)' }}>
            Deployable Diagnosis
          </span>
        </h2>
      </motion.div>

      {/* Solution grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {SOLUTIONS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: 0.08 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
              style={{
                padding: '20px 18px',
                borderRadius: 14,
                background: `${s.color}08`,
                border: `1px solid ${s.color}22`,
                backdropFilter: 'blur(8px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: `${s.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color,
                }}
              >
                <Icon size={18} />
              </div>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: s.color, fontFamily: 'JetBrains Mono, monospace' }}>
                {s.title}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(240,253,244,0.75)', lineHeight: 1.55 }}>
                {s.text}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ delay: 0.7, duration: 0.4 }}
        style={{ display: 'flex', gap: 16 }}
      >
        {[
          { label: 'Target Accuracy', value: '89%+',        color: '#4ade80' },
          { label: 'Dataset Size',    value: '50k+ images', color: '#60a5fa' },
          { label: 'Disease Classes', value: '38 classes',  color: '#c084fc' },
          { label: 'Inference Time',  value: '<200ms',      color: '#fbbf24' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1, padding: '14px 16px', borderRadius: 10,
              background: `${stat.color}0d`, border: `1px solid ${stat.color}28`,
              textAlign: 'center', backdropFilter: 'blur(6px)',
            }}
          >
            <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: stat.color, lineHeight: 1.2 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.5)', marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
