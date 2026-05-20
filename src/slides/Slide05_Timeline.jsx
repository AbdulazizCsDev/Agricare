import { motion } from 'framer-motion'

/*
 * Node topPct values are derived from camera math:
 * Camera y=-0.4, z=13, fov=36 → visible half-height = tan(18°)×13 ≈ 4.22 units
 * Plant spans y≈2.7 (top, 10% screen) to y≈-3.5 (bottom, 90% screen)
 * Node world-Y → screen topPct = 50% - ((worldY - (-0.4)) / 4.22) × 50%
 */
const STAGES = [
  {
    num: 1,
    label: 'Data Collection & Cleaning',
    status: 'active',
    topPct: 16,
    side: 'left',
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'          },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection' },
      { member: 'Musaad',     task: 'Class imbalance + train/val/test splits' },
    ],
  },
  { num: 2, label: 'Data Augmentation',         status: 'upcoming', topPct: 33,  side: 'right' },
  { num: 3, label: 'Model Training',             status: 'upcoming', topPct: 50,  side: 'left'  },
  { num: 4, label: 'Evaluation & Benchmarking',  status: 'upcoming', topPct: 67,  side: 'right' },
  { num: 5, label: 'Deployment',                 status: 'upcoming', topPct: 82,  side: 'left'  },
]

export default function Slide05_Timeline() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>

      {/* ── Header top-left ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', top: 36, left: 48, zIndex: 10 }}
      >
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.66rem',
          color: 'rgba(74,222,128,0.55)',
          letterSpacing: '0.14em',
          marginBottom: 6,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
          5 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
            Stage 1
          </span>
          {' '}Active
        </h2>
      </motion.div>

      {/* ── Vertical spine at 50% (plant trunk) ────────────────── */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '8%',
          bottom: '12%',
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.2) 10%, rgba(74,222,128,0.2) 90%, transparent)',
          transform: 'translateX(-50%)',
          transformOrigin: 'top',
          zIndex: 5,
        }}
      />

      {/* ── Stage nodes ─────────────────────────────────────────── */}
      {STAGES.map((stage, idx) => {
        const isActive = stage.status === 'active'
        const isLeft   = stage.side === 'left'

        return (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15 + idx * 0.12, duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: `${stage.topPct}%`,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            {isLeft ? (
              /* ── LEFT layout: card → connector → node ──────── */
              <>
                {/* Card */}
                <div style={{ width: 'calc(50% - 28px)', display: 'flex', justifyContent: 'flex-end', paddingRight: 0 }}>
                  <StageCard stage={stage} isActive={isActive} align="right" />
                </div>
                {/* Connector */}
                <div style={{ width: 28, height: 1, background: isActive ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.18)', flexShrink: 0 }} />
                {/* Node */}
                <NodeDot isActive={isActive} />
              </>
            ) : (
              /* ── RIGHT layout: node → connector → card ─────── */
              <>
                {/* Spacer to push to 50% */}
                <div style={{ width: 'calc(50% - 28px)', flexShrink: 0 }} />
                {/* Node */}
                <NodeDot isActive={isActive} />
                {/* Connector */}
                <div style={{ width: 28, height: 1, background: isActive ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.18)', flexShrink: 0 }} />
                {/* Card */}
                <div style={{ flex: 1, paddingLeft: 0 }}>
                  <StageCard stage={stage} isActive={isActive} align="left" />
                </div>
              </>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Node dot component ──────────────────────────────────────────── */
function NodeDot({ isActive }) {
  return (
    <motion.div
      animate={isActive ? {
        boxShadow: ['0 0 0 0px rgba(74,222,128,0.5)', '0 0 0 10px rgba(74,222,128,0)'],
      } : {}}
      transition={{ duration: 1.8, repeat: Infinity }}
      style={{
        width:        isActive ? 18 : 11,
        height:       isActive ? 18 : 11,
        borderRadius: '50%',
        background:   isActive ? '#4ade80' : 'rgba(74,222,128,0.1)',
        border:       `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,0.4)'}`,
        boxShadow:    isActive
          ? '0 0 16px rgba(74,222,128,0.8)'
          : '0 0 6px rgba(74,222,128,0.18)',
        flexShrink: 0,
        transition: 'width 0.3s, height 0.3s',
      }}
    />
  )
}

/* ── Stage card component ────────────────────────────────────────── */
function StageCard({ stage, isActive, align }) {
  const isRight = align === 'right'

  return (
    <div style={{
      display: 'inline-block',
      padding: isActive ? '13px 16px' : '9px 13px',
      borderRadius: 11,
      background: isActive ? 'rgba(74,222,128,0.09)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${isActive ? 'rgba(74,222,128,0.32)' : 'rgba(255,255,255,0.1)'}`,
      backdropFilter: 'blur(8px)',
      textAlign: align,
      maxWidth: 300,
    }}>
      {/* Title row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        gap: 7,
        marginBottom: isActive ? 9 : 0,
        flexWrap: 'wrap',
      }}>
        {isActive && isRight && <ActiveBadge />}
        <span style={{
          fontSize: '0.57rem',
          fontFamily: 'JetBrains Mono, monospace',
          color: isActive ? 'rgba(74,222,128,0.6)' : 'rgba(255,255,255,0.3)',
        }}>
          {`S${stage.num}`}
        </span>
        <span style={{
          fontSize: isActive ? '0.86rem' : '0.76rem',
          fontWeight: isActive ? 700 : 600,
          color: isActive ? '#f0fdf4' : 'rgba(240,253,244,0.55)',
          lineHeight: 1.25,
        }}>
          {stage.label}
        </span>
        {isActive && !isRight && <ActiveBadge />}
      </div>

      {/* Tasks — active only, compact */}
      {isActive && stage.tasks?.map((t, ti) => (
        <div key={ti} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '3px 0',
          borderTop: `1px solid rgba(74,222,128,${ti === 0 ? '0.15' : '0.07'})`,
          justifyContent: isRight ? 'flex-end' : 'flex-start',
        }}>
          {!isRight && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 4px rgba(74,222,128,0.6)' }} />}
          <div style={{ textAlign: align }}>
            <span style={{ fontSize: '0.67rem', color: 'rgba(240,253,244,0.75)', display: 'block', lineHeight: 1.3 }}>{t.task}</span>
            <span style={{ fontSize: '0.54rem', color: 'rgba(74,222,128,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>{t.member}</span>
          </div>
          {isRight && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 4px rgba(74,222,128,0.6)' }} />}
        </div>
      ))}
    </div>
  )
}

function ActiveBadge() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.35, 1] }}
      transition={{ duration: 1.6, repeat: Infinity }}
      style={{
        fontSize: '0.52rem',
        fontWeight: 700,
        fontFamily: 'JetBrains Mono, monospace',
        color: '#4ade80',
        background: 'rgba(74,222,128,0.12)',
        border: '1px solid rgba(74,222,128,0.3)',
        borderRadius: 100,
        padding: '2px 7px',
        letterSpacing: '0.1em',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      IN PROGRESS
    </motion.span>
  )
}
