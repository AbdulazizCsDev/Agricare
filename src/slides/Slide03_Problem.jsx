import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'

const PROBLEMS = [
  'Low classification accuracy on real-world field images',
  'Limited training data diversity — lab-only samples',
  'Poor generalization across lighting & backgrounds',
  'No deployed inference endpoint for production use',
]

export default function Slide03_Problem() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 64px 80px',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(251,191,36,0.6)',
            letterSpacing: '0.12em',
            marginBottom: 8,
          }}
        >
          THE PROBLEM
        </p>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0fdf4' }}>
          Why existing solutions{' '}
          <span style={{ color: '#fbbf24', textShadow: '0 0 16px rgba(251,191,36,0.35)' }}>
            fall short
          </span>
        </h2>
      </motion.div>

      {/* Main content: counter + bullets */}
      <div style={{ display: 'flex', gap: 64, alignItems: 'center', flex: 1, paddingTop: 32, paddingBottom: 24 }}>
        {/* Left: counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
            width: 240,
          }}
        >
          <div
            className="animate-glitch"
            style={{
              fontSize: '6rem',
              fontWeight: 800,
              fontFamily: 'JetBrains Mono, monospace',
              color: '#fbbf24',
              lineHeight: 1,
              textShadow: '0 0 30px rgba(251,191,36,0.4)',
            }}
          >
            <AnimatedCounter target={62} suffix="%" duration={1600} />
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'rgba(251,191,36,0.7)',
              textAlign: 'center',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            Current Accuracy
          </div>
          <div
            style={{
              fontSize: '0.7rem',
              color: 'rgba(240,253,244,0.4)',
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 180,
            }}
          >
            Baseline performance on the PlantVillage test set — insufficient for production
          </div>

          {/* Broken status indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 100,
              padding: '5px 14px',
              marginTop: 4,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }}>
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#ef4444' }}
              />
            </div>
            <span style={{ fontSize: '0.65rem', color: '#ef4444', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
              NOT PRODUCTION READY
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 260,
            background: 'linear-gradient(to bottom, transparent, rgba(251,191,36,0.3), transparent)',
            flexShrink: 0,
          }}
        />

        {/* Right: problem bullets */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {PROBLEMS.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 10,
                background: 'rgba(251,191,36,0.04)',
                border: '1px solid rgba(251,191,36,0.15)',
              }}
            >
              <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: '0.9rem', color: 'rgba(240,253,244,0.85)', lineHeight: 1.5 }}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom impact strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        style={{
          padding: '12px 20px',
          borderRadius: 10,
          background: 'rgba(239,68,68,0.07)',
          border: '1px solid rgba(239,68,68,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ef4444', fontFamily: 'JetBrains Mono, monospace' }}>
          IMPACT
        </span>
        <span style={{ width: 1, height: 14, background: 'rgba(239,68,68,0.4)' }} />
        <span style={{ fontSize: '0.82rem', color: 'rgba(240,253,244,0.65)' }}>
          Unreliable recommendations for farmers, retailers, and crop consultants — leading to crop loss and wasted treatments
        </span>
      </motion.div>
    </div>
  )
}
