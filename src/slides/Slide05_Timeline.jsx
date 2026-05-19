import { motion } from 'framer-motion'
import TimelineGantt from '../components/visuals/TimelineGantt'

export default function Slide05_Timeline() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '100px 64px 88px',
        gap: 36,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}

        viewport={{ once: true }}
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
          PROJECT TIMELINE
        </p>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2 }}>
          5 Weeks,{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.35)' }}>
            5 Milestones
          </span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'rgba(240,253,244,0.45)', marginTop: 8 }}>
          Phase 1 complete · Phase 2 in progress
        </p>
      </motion.div>

      {/* Gantt chart */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 36 }}>
        <TimelineGantt />
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}

        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.4 }}
        style={{ display: 'flex', gap: 24, alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 10,
              borderRadius: 4,
              background: 'linear-gradient(90deg, #16a34a, #4ade80)',
            }}
          />
          <span style={{ fontSize: '0.72rem', color: 'rgba(240,253,244,0.65)', fontFamily: 'JetBrains Mono, monospace' }}>
            Completed
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 10,
              borderRadius: 4,
              background: 'rgba(240,253,244,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          />
          <span style={{ fontSize: '0.72rem', color: 'rgba(240,253,244,0.45)', fontFamily: 'JetBrains Mono, monospace' }}>
            Planned
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginLeft: 'auto',
            padding: '6px 14px',
            borderRadius: 100,
            background: 'rgba(74,222,128,0.08)',
            border: '1px solid rgba(74,222,128,0.2)',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ fontSize: '0.68rem', color: '#4ade80', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            30% COMPLETE
          </span>
        </div>
      </motion.div>
    </div>
  )
}
