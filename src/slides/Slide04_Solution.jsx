import { motion } from 'framer-motion'
import PipelineFlow from '../components/visuals/PipelineFlow'

export default function Slide04_Solution() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '52px 52px 80px',
        gap: 32,
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
            color: 'rgba(74,222,128,0.55)',
            letterSpacing: '0.12em',
            marginBottom: 10,
          }}
        >
          THE SOLUTION
        </p>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2 }}>
          From Raw Images{' '}
          <span style={{ color: 'rgba(240,253,244,0.35)', fontSize: '1.6rem', fontWeight: 300 }}>→</span>{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.35)' }}>
            Deployable Diagnosis
          </span>
        </h2>
        <p style={{ color: 'rgba(240,253,244,0.5)', fontSize: '0.88rem', marginTop: 8 }}>
          Click any stage for details
        </p>
      </motion.div>

      {/* Pipeline visual */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <PipelineFlow />
      </div>

      {/* Bottom stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        style={{ display: 'flex', gap: 20 }}
      >
        {[
          { label: 'Target Accuracy', value: '89%+', color: '#4ade80' },
          { label: 'Dataset Size', value: '50k+ images', color: '#60a5fa' },
          { label: 'Disease Classes', value: '38 classes', color: '#c084fc' },
          { label: 'Inference Time', value: '<200ms', color: '#fbbf24' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 10,
              background: `${stat.color}0d`,
              border: `1px solid ${stat.color}28`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
                color: stat.color,
                lineHeight: 1.2,
              }}
            >
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
