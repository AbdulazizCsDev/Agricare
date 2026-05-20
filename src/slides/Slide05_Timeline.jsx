import { motion } from 'framer-motion'

/*
 * Camera: y=-0.4, z=11, fov=36 → visibleHalfH = tan(18°)×11 ≈ 3.574 units
 * topPct = 50% - (worldY - (-0.4)) / 3.574 × 50%
 *
 * Plant layout (bottom→top):
 *   Root/trunk base  ≈  worldY -2.2  →  75%
 *   Lower trunk      ≈  worldY -1.2  →  61%
 *   Mid canopy       ≈  worldY -0.1  →  48%
 *   Upper canopy     ≈  worldY  1.0  →  33%
 *   Canopy tip       ≈  worldY  2.0  →  19%
 */
const STAGES = [
  {
    /* topmost on screen = furthest in the future = Deployment */
    num: 5, label: 'Deployment',                status: 'upcoming', topPct:  5, side: 'right',
  },
  { num: 4, label: 'Evaluation & Benchmarking',  status: 'upcoming', topPct: 13, side: 'left'  },
  { num: 3, label: 'Model Training',              status: 'upcoming', topPct: 30, side: 'right' },
  { num: 2, label: 'Data Augmentation',           status: 'upcoming', topPct: 46, side: 'left'  },
  {
    /* bottommost on screen = current stage = Data Collection (root) */
    num: 1, label: 'Data Collection & Cleaning', status: 'active',   topPct: 51, leftShift: 5, side: 'right',
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'          },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection' },
      { member: 'Musaad',     task: 'Class imbalance + train/val/test splits' },
    ],
  },
]

export default function Slide05_Timeline() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
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

      {/* ── Spine ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '2%',
          bottom: '31%',
          width: 1,
          background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.22) 8%, rgba(74,222,128,0.22) 92%, transparent)',
          transform: 'translateX(-50%)',
          transformOrigin: 'top',
          zIndex: 5,
        }}
      />

      {/* ── Nodes ──────────────────────────────────────────────── */}
      {STAGES.map((stage, idx) => {
        const isActive = stage.status === 'active'
        const isLeft   = stage.side === 'left'

        return (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, x: isLeft ? -18 : 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 + idx * 0.11, duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: `${stage.topPct}%`,
              left: `${stage.leftShift || 0}%`,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              transform: 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            {isLeft ? (
              /* card ← connector ← node */
              <>
                <div style={{ width: 'calc(50% - 24px)', display: 'flex', justifyContent: 'flex-end' }}>
                  <StageCard stage={stage} isActive={isActive} align="right" />
                </div>
                <Connector isActive={isActive} />
                <NodeDot isActive={isActive} />
              </>
            ) : (
              /* node → connector → card */
              <>
                <div style={{ width: 'calc(50% - 24px)', flexShrink: 0 }} />
                <NodeDot isActive={isActive} />
                <Connector isActive={isActive} />
                <div style={{ flex: 1 }}>
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

/* ── Sub-components ─────────────────────────────────────────────── */

function NodeDot({ isActive }) {
  return (
    <motion.div
      animate={isActive ? {
        boxShadow: ['0 0 0 0px rgba(74,222,128,0.55)', '0 0 0 10px rgba(74,222,128,0)'],
      } : {}}
      transition={{ duration: 1.8, repeat: Infinity }}
      style={{
        width:        isActive ? 18 : 11,
        height:       isActive ? 18 : 11,
        borderRadius: '50%',
        background:   isActive ? '#4ade80' : 'rgba(74,222,128,0.1)',
        border:       `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,0.38)'}`,
        boxShadow:    isActive ? '0 0 18px rgba(74,222,128,0.8)' : '0 0 5px rgba(74,222,128,0.15)',
        flexShrink:   0,
        transition:   'width 0.3s, height 0.3s',
      }}
    />
  )
}

function Connector({ isActive }) {
  return (
    <div style={{
      width:      24,
      height:     1,
      background: isActive ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.16)',
      flexShrink: 0,
    }} />
  )
}

function StageCard({ stage, isActive, align }) {
  const isRight = align === 'right'

  return (
    <div style={{
      display:        'inline-block',
      padding:        isActive ? '12px 15px' : '7px 12px',
      borderRadius:   11,
      background:     isActive ? 'rgba(74,222,128,0.09)' : 'rgba(255,255,255,0.04)',
      border:         `1px solid ${isActive ? 'rgba(74,222,128,0.32)' : 'rgba(255,255,255,0.1)'}`,
      backdropFilter: 'blur(8px)',
      textAlign:      align,
      maxWidth:       isActive ? 310 : 260,
    }}>

      {/* Title row */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        gap:            7,
        marginBottom:   isActive ? 8 : 0,
        flexWrap:       'wrap',
      }}>
        {isActive && isRight  && <ActiveBadge />}
        <span style={{
          fontSize:   '0.57rem',
          fontFamily: 'JetBrains Mono, monospace',
          color:      isActive ? 'rgba(74,222,128,0.6)' : 'rgba(255,255,255,0.28)',
        }}>
          {`S${stage.num}`}
        </span>
        <span style={{
          fontSize:   isActive ? '0.85rem' : '0.74rem',
          fontWeight: isActive ? 700 : 600,
          color:      isActive ? '#f0fdf4' : 'rgba(240,253,244,0.52)',
          lineHeight: 1.25,
        }}>
          {stage.label}
        </span>
        {isActive && !isRight && <ActiveBadge />}
      </div>

      {/* Tasks — active only */}
      {isActive && stage.tasks?.map((t, ti) => (
        <div key={ti} style={{
          display:        'flex',
          alignItems:     'center',
          gap:            7,
          padding:        '3px 0',
          borderTop:      `1px solid rgba(74,222,128,${ti === 0 ? '0.15' : '0.06'})`,
          justifyContent: isRight ? 'flex-end' : 'flex-start',
        }}>
          {!isRight && <Dot />}
          <div style={{ textAlign: align }}>
            <span style={{ fontSize: '0.66rem', color: 'rgba(240,253,244,0.76)', display: 'block', lineHeight: 1.3 }}>
              {t.task}
            </span>
            <span style={{ fontSize: '0.53rem', color: 'rgba(74,222,128,0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
              {t.member}
            </span>
          </div>
          {isRight && <Dot />}
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
        fontSize:      '0.52rem',
        fontWeight:    700,
        fontFamily:    'JetBrains Mono, monospace',
        color:         '#4ade80',
        background:    'rgba(74,222,128,0.12)',
        border:        '1px solid rgba(74,222,128,0.3)',
        borderRadius:  100,
        padding:       '2px 7px',
        letterSpacing: '0.1em',
        flexShrink:    0,
        whiteSpace:    'nowrap',
      }}
    >
      IN PROGRESS
    </motion.span>
  )
}

function Dot() {
  return (
    <div style={{
      width:     4,
      height:    4,
      borderRadius: '50%',
      background: '#4ade80',
      flexShrink: 0,
      boxShadow: '0 0 4px rgba(74,222,128,0.6)',
    }} />
  )
}
