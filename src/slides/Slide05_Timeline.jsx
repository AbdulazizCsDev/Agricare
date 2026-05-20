import { motion } from 'framer-motion'

const STAGES = [
  { num: 3, label: 'Deployment',     status: 'upcoming', topPct: 12 },
  { num: 2, label: 'Model Training', status: 'upcoming', topPct: 34 },
  {
    num: 1,
    label: 'Data Collection, Cleaning & Augmentation',
    status: 'active',
    topPct: 52,
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'         },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection'},
      { member: 'Musaad',     task: 'Class imbalance + augmentation'         },
    ],
  },
]

/* Time constants (seconds) */
const TREE_SETTLE = 2.0   // wait for tree camera animation to settle
const STEP        = 0.7   // gap between each stage reveal
const BADGE_EXTRA = 0.9   // extra wait after S1 before badge activates

/* Delay for each stage (0-indexed, S3 first) */
const stageDelay = (i) => TREE_SETTLE + i * STEP

/* Spine spans from S3 topPct to slightly below S1 topPct */
const SPINE_TOP    = STAGES[0].topPct          // 12%
const SPINE_BOTTOM = STAGES[2].topPct + 8      // 60%
const SPINE_HEIGHT = SPINE_BOTTOM - SPINE_TOP  // 48%

export default function Slide05_Timeline() {
  return (
    <div style={{
      width:     '100%',
      height:    '100vh',
      boxSizing: 'border-box',
      position:  'relative',
      overflow:  'hidden',
    }}>

      {/* Dark left overlay */}
      <div style={{
        position:      'absolute',
        left:          0,
        top:           0,
        bottom:        0,
        width:         '52%',
        background:    'linear-gradient(to right, rgba(4,12,8,.85) 58%, transparent 100%)',
        pointerEvents: 'none',
        zIndex:        4,
      }} />

      {/* Header — appears right away */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', top: 88, left: 48, zIndex: 10 }}
      >
        <p style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.67rem',
          color:         'rgba(74,222,128,.55)',
          letterSpacing: '0.16em',
          marginBottom:  6,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{
          fontSize:   'clamp(1.6rem,2.4vw,2.1rem)',
          fontWeight: 800,
          color:      '#f0fdf4',
          lineHeight: 1.15,
          margin:     0,
        }}>
          3 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 22px rgba(74,222,128,.5)' }}>
            Stage 1
          </span>{' '}
          Active
        </h2>
      </motion.div>

      {/* ── Spine: starts at S3 node, draws DOWN to S1 node ──── */}
      <div style={{
        position:  'absolute',
        left:      '50%',
        top:       `${SPINE_TOP}%`,
        height:    `${SPINE_HEIGHT}%`,
        width:     4,
        transform: 'translateX(-50%)',
        zIndex:    8,
        overflow:  'visible',
      }}>
        {/* Line draws from top → bottom after tree settles */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: STEP * 2 + 0.6,   // finishes as S1 appears
            delay:    TREE_SETTLE,
            ease:     'easeInOut',
          }}
          style={{
            position:        'absolute',
            inset:           0,
            transformOrigin: 'top',
            background:      'linear-gradient(to bottom, #4ade80 0%, #4ade80 94%, rgba(74,222,128,0))',
            boxShadow:       '0 0 10px #4ade80, 0 0 28px rgba(74,222,128,.55)',
            borderRadius:    2,
          }}
        />

        {/* Traveling pulse — starts after spine finishes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0, 1, 1] }}
          animate={{ y: ['-5%', '110%'] }}
          viewport={{ once: true }}
          transition={{
            opacity: {
              duration: 0.4,
              delay:    TREE_SETTLE + STEP * 2 + 0.6,
              times:    [0, 0.9, 1, 1],
            },
            y: {
              duration:    2.8,
              repeat:      Infinity,
              ease:        'easeInOut',
              repeatDelay: 0.5,
              delay:       TREE_SETTLE + STEP * 2 + 0.8,
            },
          }}
          style={{
            position:     'absolute',
            left:         '50%',
            transform:    'translateX(-50%)',
            width:        10,
            height:       '22%',
            background:   'linear-gradient(to bottom, transparent, #d4ffd4 50%, transparent)',
            boxShadow:    '0 0 20px #4ade80, 0 0 50px rgba(74,222,128,.7)',
            borderRadius: 5,
            filter:       'blur(1px)',
          }}
        />
      </div>

      {/* ── Stage rows — revealed sequentially ──────────────── */}
      {STAGES.map((stage, i) => {
        const isActive = stage.status === 'active'
        const delay    = stageDelay(i)

        return (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
            style={{
              position:   'absolute',
              top:        `${stage.topPct}%`,
              left:       0,
              right:      0,
              display:    'flex',
              alignItems: isActive ? 'flex-start' : 'center',
              transform:  isActive ? 'translateY(-12px)' : 'translateY(-50%)',
              zIndex:     10,
            }}
          >
            {/* Card */}
            <div style={{
              paddingLeft:    44,
              flex:           '0 0 calc(50% - 20px)',
              display:        'flex',
              justifyContent: 'flex-end',
            }}>
              <StageCard stage={stage} isActive={isActive} badgeDelay={delay + BADGE_EXTRA} />
            </div>

            {/* Connector */}
            <div style={{
              width:      36,
              height:     isActive ? 2 : 1.5,
              marginTop:  isActive ? 11 : 0,
              flexShrink: 0,
              background: isActive
                ? 'linear-gradient(to right, rgba(74,222,128,.5), #4ade80)'
                : 'linear-gradient(to right, rgba(74,222,128,.1), rgba(74,222,128,.45))',
              boxShadow:  isActive ? '0 0 6px rgba(74,222,128,.5)' : 'none',
            }} />

            {/* Node */}
            <motion.div
              animate={isActive ? {
                boxShadow: ['0 0 0 0px rgba(74,222,128,.7)', '0 0 0 22px rgba(74,222,128,0)'],
              } : {}}
              transition={{ duration: 1.8, repeat: Infinity, delay: delay + BADGE_EXTRA }}
              style={{
                width:        isActive ? 24 : 14,
                height:       isActive ? 24 : 14,
                marginTop:    isActive ? 11 : 0,
                borderRadius: '50%',
                background:   isActive ? '#4ade80' : 'rgba(74,222,128,.18)',
                border:       `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,.6)'}`,
                boxShadow:    isActive ? '0 0 30px rgba(74,222,128,1)' : '0 0 8px rgba(74,222,128,.4)',
                flexShrink:   0,
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── StageCard ─────────────────────────────────────────────── */
function StageCard({ stage, isActive, badgeDelay }) {
  return (
    <div style={{
      padding:        isActive ? '14px 18px' : '9px 16px',
      borderRadius:   12,
      background:     isActive ? 'rgba(74,222,128,.10)' : 'rgba(14,26,18,.75)',
      border:         `1px solid ${isActive ? 'rgba(74,222,128,.45)' : 'rgba(74,222,128,.2)'}`,
      backdropFilter: 'blur(16px)',
      boxShadow:      isActive ? '0 0 40px rgba(74,222,128,.18)' : '0 4px 20px rgba(0,0,0,.5)',
      width:          isActive ? 360 : 'auto',
      maxWidth:       isActive ? 380 : 260,
    }}>
      <div style={{
        display:     'flex',
        alignItems:  'center',
        gap:         8,
        marginBottom: isActive ? 10 : 0,
        flexWrap:    'wrap',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize:   '0.6rem',
          color:      isActive ? 'rgba(74,222,128,.7)' : 'rgba(255,255,255,.35)',
        }}>
          S{stage.num}
        </span>
        <span style={{
          fontSize:   isActive ? '0.95rem' : '0.85rem',
          fontWeight: isActive ? 700 : 600,
          color:      isActive ? '#f0fdf4' : 'rgba(240,253,244,.65)',
          lineHeight: 1.3,
        }}>
          {stage.label}
        </span>

        {/* Badge fades in after card + extra delay */}
        {isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: badgeDelay }}
            style={{
              display: 'inline-block',
              fontFamily:    'JetBrains Mono, monospace',
              fontSize:      '0.54rem',
              fontWeight:    700,
              color:         '#4ade80',
              background:    'rgba(74,222,128,.12)',
              border:        '1px solid rgba(74,222,128,.4)',
              borderRadius:  100,
              padding:       '3px 8px',
              letterSpacing: '0.1em',
              whiteSpace:    'nowrap',
            }}
          >
            <motion.span
              animate={{ opacity: [1, .3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: badgeDelay + 0.4 }}
              style={{ display: 'inline' }}
            >
              IN PROGRESS
            </motion.span>
          </motion.span>
        )}
      </div>

      {/* Tasks */}
      {isActive && stage.tasks?.length > 0 && (
        <div style={{
          display:             'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:                 '6px 16px',
          paddingTop:          8,
          borderTop:           '1px solid rgba(74,222,128,.18)',
        }}>
          {stage.tasks.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <div style={{
                width: 5, height: 5, marginTop: 6, borderRadius: '50%',
                background: '#4ade80', flexShrink: 0,
                boxShadow: '0 0 6px rgba(74,222,128,.8)',
              }} />
              <div>
                <span style={{
                  fontSize: '0.71rem', color: 'rgba(240,253,244,.9)',
                  display: 'block', lineHeight: 1.35,
                }}>
                  {t.task}
                </span>
                <span style={{
                  fontSize: '0.6rem', color: 'rgba(74,222,128,.7)',
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
