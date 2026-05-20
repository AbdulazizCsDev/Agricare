import { motion } from 'framer-motion'

const STAGES = [
  { num: 3, label: 'Deployment',   status: 'upcoming', topPct: 14, side: 'right' },
  { num: 2, label: 'Model Training', status: 'upcoming', topPct: 42, side: 'left'  },
  {
    num: 1,
    label: 'Data Collection, Cleaning & Augmentation',
    status: 'active',
    topPct: 72,
    side: 'right',
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'         },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection'},
      { member: 'Musaad',     task: 'Class imbalance + augmentation + splits'},
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
}

const slideFrom = (isLeft) => ({
  hidden: { opacity: 0, x: isLeft ? -32 : 32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45, ease: 'easeOut' } },
})

export default function Slide05_Timeline() {
  return (
    <div style={{
      width:     '100%',
      height:    '100vh',
      boxSizing: 'border-box',
      padding:   '82px 0 20px',
      position:  'relative',
      overflow:  'hidden',
    }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', top: 88, left: 52, zIndex: 10 }}
      >
        <p style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.68rem',
          color:         'rgba(74,222,128,0.55)',
          letterSpacing: '0.16em',
          marginBottom:  6,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{
          fontSize:   'clamp(1.7rem,2.6vw,2.2rem)',
          fontWeight: 800,
          color:      '#f0fdf4',
          lineHeight: 1.15,
          margin:     0,
        }}>
          3 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 22px rgba(74,222,128,.45)' }}>
            Stage 1
          </span>
          {' '}Active
        </h2>
      </motion.div>

      {/* Spine */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
        style={{
          position:        'absolute',
          left:            '50%',
          top:             '12%',
          bottom:          '20%',
          width:           2,
          background:      'linear-gradient(to bottom, transparent, rgba(74,222,128,.3) 6%, rgba(74,222,128,.3) 94%, transparent)',
          transform:       'translateX(-50%)',
          transformOrigin: 'top',
          zIndex:          5,
        }}
      />

      {/* Nodes */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {STAGES.map((stage) => {
          const isActive = stage.status === 'active'
          const isLeft   = stage.side === 'left'

          return (
            <motion.div
              key={stage.num}
              variants={slideFrom(isLeft)}
              style={{
                position:   'absolute',
                top:        `${stage.topPct}%`,
                left:       0,
                right:      0,
                display:    'flex',
                alignItems: 'center',
                transform:  'translateY(-50%)',
                zIndex:     10,
              }}
            >
              {isLeft ? (
                <>
                  <div style={{ width: 'calc(50% - 28px)', display: 'flex', justifyContent: 'flex-end' }}>
                    <StageCard stage={stage} isActive={isActive} align="right" />
                  </div>
                  <Connector isActive={isActive} />
                  <NodeDot isActive={isActive} />
                </>
              ) : (
                <>
                  <div style={{ width: 'calc(50% - 28px)', flexShrink: 0 }} />
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
      </motion.div>
    </div>
  )
}

function NodeDot({ isActive }) {
  return (
    <motion.div
      animate={isActive ? {
        boxShadow: ['0 0 0 0px rgba(74,222,128,.6)', '0 0 0 18px rgba(74,222,128,0)'],
      } : {}}
      transition={{ duration: 1.8, repeat: Infinity }}
      style={{
        width:        isActive ? 28 : 16,
        height:       isActive ? 28 : 16,
        borderRadius: '50%',
        background:   isActive ? '#4ade80' : 'rgba(74,222,128,.12)',
        border:       `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,.45)'}`,
        boxShadow:    isActive ? '0 0 24px rgba(74,222,128,.9)' : '0 0 6px rgba(74,222,128,.2)',
        flexShrink:   0,
      }}
    />
  )
}

function Connector({ isActive }) {
  return (
    <div style={{
      width:      32,
      height:     1.5,
      background: isActive ? 'rgba(74,222,128,.55)' : 'rgba(74,222,128,.18)',
      flexShrink: 0,
    }} />
  )
}

function StageCard({ stage, isActive, align }) {
  const isRight = align === 'right'

  return (
    <div style={{
      display:        'inline-block',
      padding:        isActive ? '16px 20px' : '10px 16px',
      borderRadius:   14,
      background:     isActive ? 'rgba(74,222,128,.09)' : 'rgba(255,255,255,.04)',
      border:         `1px solid ${isActive ? 'rgba(74,222,128,.35)' : 'rgba(255,255,255,.1)'}`,
      backdropFilter: 'blur(12px)',
      textAlign:      align,
      maxWidth:       isActive ? 360 : 280,
      boxShadow:      isActive ? '0 0 32px rgba(74,222,128,.12)' : 'none',
    }}>

      {/* Title row */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        gap:            8,
        marginBottom:   isActive ? 10 : 0,
        flexWrap:       'wrap',
      }}>
        {isActive && isRight  && <ActiveBadge />}
        <span style={{
          fontSize:   '0.62rem',
          fontFamily: 'JetBrains Mono, monospace',
          color:      isActive ? 'rgba(74,222,128,.6)' : 'rgba(255,255,255,.25)',
        }}>
          S{stage.num}
        </span>
        <span style={{
          fontSize:   isActive ? '1rem' : '0.85rem',
          fontWeight: isActive ? 700 : 500,
          color:      isActive ? '#f0fdf4' : 'rgba(240,253,244,.45)',
          lineHeight: 1.3,
        }}>
          {stage.label}
        </span>
        {isActive && !isRight && <ActiveBadge />}
      </div>

      {/* Tasks */}
      {isActive && stage.tasks?.map((t, ti) => (
        <div key={ti} style={{
          display:        'flex',
          alignItems:     'center',
          gap:            8,
          padding:        '5px 0',
          borderTop:      `1px solid rgba(74,222,128,${ti === 0 ? '.18' : '.07'})`,
          justifyContent: isRight ? 'flex-end' : 'flex-start',
        }}>
          {!isRight && <Dot />}
          <div style={{ textAlign: align }}>
            <span style={{
              fontSize:   '0.8rem',
              color:      'rgba(240,253,244,.85)',
              display:    'block',
              lineHeight: 1.4,
            }}>
              {t.task}
            </span>
            <span style={{
              fontSize:   '0.65rem',
              color:      'rgba(74,222,128,.65)',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
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
      animate={{ opacity: [1, .35, 1] }}
      transition={{ duration: 1.6, repeat: Infinity }}
      style={{
        fontSize:      '0.55rem',
        fontWeight:    700,
        fontFamily:    'JetBrains Mono, monospace',
        color:         '#4ade80',
        background:    'rgba(74,222,128,.12)',
        border:        '1px solid rgba(74,222,128,.35)',
        borderRadius:  100,
        padding:       '3px 8px',
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
      width:       5,
      height:      5,
      borderRadius: '50%',
      background:  '#4ade80',
      flexShrink:  0,
      boxShadow:   '0 0 5px rgba(74,222,128,.7)',
    }} />
  )
}
