import { motion } from 'framer-motion'

const STAGES = [
  { num: 3, label: 'Deployment',     status: 'upcoming', topPct: 22, side: 'right' },
  { num: 2, label: 'Model Training', status: 'upcoming', topPct: 50, side: 'left'  },
  {
    num: 1,
    label: 'Data Collection, Cleaning & Augmentation',
    status: 'active',
    topPct: 78,
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
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
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
      padding:   '82px 0 28px',
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

      {/* Spine container (along the tree's vertical axis) */}
      <div style={{
        position:  'absolute',
        left:      '50%',
        top:       '14%',
        bottom:    '8%',
        width:     2,
        transform: 'translateX(-50%)',
        zIndex:    5,
      }}>
        {/* Static faint spine */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
          style={{
            position:        'absolute',
            inset:           0,
            background:      'linear-gradient(to bottom, transparent, rgba(74,222,128,.28) 6%, rgba(74,222,128,.28) 94%, transparent)',
            transformOrigin: 'top',
          }}
        />
        {/* Animated traveling pulse — proves it's a timeline */}
        <motion.div
          initial={{ top: '-12%' }}
          animate={{ top: ['-12%', '100%'] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          style={{
            position:   'absolute',
            left:       '50%',
            width:      4,
            height:     '14%',
            transform:  'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, #4ade80 60%, transparent)',
            filter:     'blur(0.5px)',
            boxShadow:  '0 0 14px rgba(74,222,128,.9)',
            borderRadius: 2,
          }}
        />
      </div>

      {/* Nodes + cards */}
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
                  {/* Card pinned to left edge */}
                  <div style={{ paddingLeft: 36, width: 'calc(50% - 18px)', display: 'flex', justifyContent: 'flex-start' }}>
                    <StageCard stage={stage} isActive={isActive} align="left" />
                  </div>
                  <Connector isActive={isActive} side="left" />
                  <NodeDot isActive={isActive} />
                  <div style={{ flex: 1 }} />
                </>
              ) : (
                <>
                  <div style={{ flex: 1 }} />
                  <NodeDot isActive={isActive} />
                  <Connector isActive={isActive} side="right" />
                  {/* Card pinned to right edge */}
                  <div style={{ paddingRight: 36, width: 'calc(50% - 18px)', display: 'flex', justifyContent: 'flex-end' }}>
                    <StageCard stage={stage} isActive={isActive} align="right" />
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
        boxShadow: ['0 0 0 0px rgba(74,222,128,.6)', '0 0 0 20px rgba(74,222,128,0)'],
      } : {}}
      transition={{ duration: 1.8, repeat: Infinity }}
      style={{
        width:        isActive ? 26 : 14,
        height:       isActive ? 26 : 14,
        borderRadius: '50%',
        background:   isActive ? '#4ade80' : 'rgba(74,222,128,.18)',
        border:       `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,.55)'}`,
        boxShadow:    isActive ? '0 0 28px rgba(74,222,128,.95)' : '0 0 8px rgba(74,222,128,.35)',
        flexShrink:   0,
      }}
    />
  )
}

function Connector({ isActive, side }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{
        width:           42,
        height:          1.5,
        background:      isActive
          ? 'linear-gradient(to right, rgba(74,222,128,.85), rgba(74,222,128,.35))'
          : 'rgba(74,222,128,.22)',
        flexShrink:      0,
        transformOrigin: side === 'left' ? 'right' : 'left',
      }}
    />
  )
}

function StageCard({ stage, isActive, align }) {
  const isRight = align === 'right'

  return (
    <div style={{
      display:        'inline-block',
      padding:        isActive ? '14px 18px' : '10px 14px',
      borderRadius:   14,
      background:     isActive ? 'rgba(74,222,128,.10)' : 'rgba(20,30,24,.72)',
      border:         `1px solid ${isActive ? 'rgba(74,222,128,.45)' : 'rgba(255,255,255,.12)'}`,
      backdropFilter: 'blur(14px)',
      textAlign:      align,
      maxWidth:       isActive ? 380 : 260,
      boxShadow:      isActive ? '0 0 36px rgba(74,222,128,.18)' : '0 4px 18px rgba(0,0,0,.4)',
    }}>

      {/* Title row */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        gap:            8,
        marginBottom:   isActive ? 8 : 0,
        flexWrap:       'wrap',
      }}>
        {isActive && isRight  && <ActiveBadge />}
        <span style={{
          fontSize:   '0.62rem',
          fontFamily: 'JetBrains Mono, monospace',
          color:      isActive ? 'rgba(74,222,128,.7)' : 'rgba(255,255,255,.4)',
        }}>
          S{stage.num}
        </span>
        <span style={{
          fontSize:   isActive ? '0.95rem' : '0.85rem',
          fontWeight: isActive ? 700 : 600,
          color:      isActive ? '#f0fdf4' : 'rgba(240,253,244,.7)',
          lineHeight: 1.3,
        }}>
          {stage.label}
        </span>
        {isActive && !isRight && <ActiveBadge />}
      </div>

      {/* Tasks in compact 2-column grid */}
      {isActive && stage.tasks?.length > 0 && (
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '6px 14px',
          marginTop:           8,
          paddingTop:          8,
          borderTop:           '1px solid rgba(74,222,128,.18)',
        }}>
          {stage.tasks.map((t, ti) => (
            <div key={ti} style={{
              display:    'flex',
              alignItems: 'flex-start',
              gap:        6,
              textAlign:  'left',
            }}>
              <Dot />
              <div>
                <span style={{
                  fontSize:   '0.72rem',
                  color:      'rgba(240,253,244,.9)',
                  display:    'block',
                  lineHeight: 1.35,
                }}>
                  {t.task}
                </span>
                <span style={{
                  fontSize:   '0.6rem',
                  color:      'rgba(74,222,128,.7)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {t.member}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
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
        border:        '1px solid rgba(74,222,128,.4)',
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
      width:        5,
      height:       5,
      marginTop:    5,
      borderRadius: '50%',
      background:   '#4ade80',
      flexShrink:   0,
      boxShadow:    '0 0 6px rgba(74,222,128,.8)',
    }} />
  )
}
