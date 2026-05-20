import { motion } from 'framer-motion'

const STAGES = [
  { num: 4, label: 'Deployment',                               status: 'upcoming', side: 'right' },
  { num: 3, label: 'Evaluation & Benchmarking',                status: 'upcoming', side: 'left'  },
  { num: 2, label: 'Model Training',                           status: 'upcoming', side: 'right' },
  {
    num: 1,
    label: 'Data Collection, Cleaning & Augmentation',
    status: 'active',
    side: 'right',
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'       },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'          },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection' },
      { member: 'Musaad',     task: 'Class imbalance + augmentation + splits' },
    ],
  },
]

/* vertical % positions within the track area */
const TOP_PCTS = [8, 30, 56, 78]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const fadeSlide = (isLeft) => ({
  hidden: { opacity: 0, x: isLeft ? -24 : 24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.42, ease: 'easeOut' } },
})

export default function Slide05_Timeline() {
  return (
    <div style={{
      width:      '100%',
      height:     '100vh',
      boxSizing:  'border-box',
      padding:    '76px 0 24px',
      position:   'relative',
      overflow:   'hidden',
    }}>

      {/* ── Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity:0, y:-14 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.4 }}
        style={{ position:'absolute', top:82, left:48, zIndex:10 }}
      >
        <p style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.66rem',
          color:         'rgba(74,222,128,0.55)',
          letterSpacing: '0.14em',
          marginBottom:  5,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{ fontSize:'clamp(1.5rem,2.4vw,2rem)', fontWeight:800, color:'#f0fdf4', lineHeight:1.2, margin:0 }}>
          4 Stages —{' '}
          <span style={{ color:'#4ade80', textShadow:'0 0 20px rgba(74,222,128,.4)' }}>
            Stage 1
          </span>
          {' '}Active
        </h2>
      </motion.div>

      {/* ── Track area (below header) ─────────────────────── */}
      <div style={{
        position: 'absolute',
        top:      '18%',
        bottom:   '4%',
        left:     0,
        right:    0,
      }}>

        {/* Spine */}
        <motion.div
          initial={{ scaleY:0 }}
          whileInView={{ scaleY:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.85, ease:'easeOut', delay:0.1 }}
          style={{
            position:       'absolute',
            left:           '50%',
            top:            0,
            bottom:         '20%',
            width:          1,
            background:     'linear-gradient(to bottom,transparent,rgba(74,222,128,.22) 6%,rgba(74,222,128,.22) 94%,transparent)',
            transform:      'translateX(-50%)',
            transformOrigin:'top',
            zIndex:         5,
          }}
        />

        {/* Nodes */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once:true, amount:0.1 }}
          style={{ position:'absolute', inset:0 }}
        >
          {STAGES.map((stage, idx) => {
            const isActive = stage.status === 'active'
            const isLeft   = stage.side === 'left'
            const topPct   = TOP_PCTS[idx]

            return (
              <motion.div
                key={stage.num}
                variants={fadeSlide(isLeft)}
                style={{
                  position:   'absolute',
                  top:        `${topPct}%`,
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
                    <div style={{ width:'calc(50% - 20px)', display:'flex', justifyContent:'flex-end' }}>
                      <StageCard stage={stage} isActive={isActive} align="right"/>
                    </div>
                    <Connector isActive={isActive}/>
                    <NodeDot isActive={isActive}/>
                  </>
                ) : (
                  <>
                    <div style={{ width:'calc(50% - 20px)', flexShrink:0 }}/>
                    <NodeDot isActive={isActive}/>
                    <Connector isActive={isActive}/>
                    <div style={{ flex:1 }}>
                      <StageCard stage={stage} isActive={isActive} align="left"/>
                    </div>
                  </>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

/* ── Sub-components ───────────────────────────────────────────── */

function NodeDot({ isActive }) {
  return (
    <motion.div
      animate={isActive ? {
        boxShadow: ['0 0 0 0px rgba(74,222,128,.6)', '0 0 0 14px rgba(74,222,128,0)'],
      } : {}}
      transition={{ duration:1.8, repeat:Infinity }}
      style={{
        width:        isActive ? 22 : 14,
        height:       isActive ? 22 : 14,
        borderRadius: '50%',
        background:   isActive ? '#4ade80' : 'rgba(74,222,128,.12)',
        border:       `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,.5)'}`,
        boxShadow:    isActive ? '0 0 20px rgba(74,222,128,.9)' : '0 0 6px rgba(74,222,128,.25)',
        flexShrink:   0,
      }}
    />
  )
}

function Connector({ isActive }) {
  return (
    <div style={{
      width:      20,
      height:     1,
      background: isActive ? 'rgba(74,222,128,.5)' : 'rgba(74,222,128,.18)',
      flexShrink: 0,
    }}/>
  )
}

function StageCard({ stage, isActive, align }) {
  const isRight = align === 'right'

  return (
    <div style={{
      display:        'inline-block',
      padding:        isActive ? '10px 13px' : '6px 11px',
      borderRadius:   10,
      background:     isActive ? 'rgba(74,222,128,.09)' : 'rgba(255,255,255,.04)',
      border:         `1px solid ${isActive ? 'rgba(74,222,128,.32)' : 'rgba(255,255,255,.1)'}`,
      backdropFilter: 'blur(8px)',
      textAlign:      align,
      maxWidth:       isActive ? 300 : 240,
    }}>
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        gap:            6,
        marginBottom:   isActive ? 6 : 0,
        flexWrap:       'wrap',
      }}>
        {isActive && isRight && <ActiveBadge/>}
        <span style={{ fontSize:'0.54rem', fontFamily:'JetBrains Mono, monospace', color: isActive ? 'rgba(74,222,128,.6)' : 'rgba(255,255,255,.28)' }}>
          S{stage.num}
        </span>
        <span style={{ fontSize: isActive ? '0.82rem' : '0.72rem', fontWeight: isActive ? 700 : 600, color: isActive ? '#f0fdf4' : 'rgba(240,253,244,.52)', lineHeight:1.25 }}>
          {stage.label}
        </span>
        {isActive && !isRight && <ActiveBadge/>}
      </div>

      {isActive && stage.tasks?.map((t, ti) => (
        <div key={ti} style={{
          display:        'flex',
          alignItems:     'center',
          gap:            6,
          padding:        '2px 0',
          borderTop:      `1px solid rgba(74,222,128,${ti === 0 ? '.15' : '.06'})`,
          justifyContent: isRight ? 'flex-end' : 'flex-start',
        }}>
          {!isRight && <Dot/>}
          <div style={{ textAlign:align }}>
            <span style={{ fontSize:'0.63rem', color:'rgba(240,253,244,.76)', display:'block', lineHeight:1.3 }}>{t.task}</span>
            <span style={{ fontSize:'0.52rem', color:'rgba(74,222,128,.5)', fontFamily:'JetBrains Mono, monospace' }}>{t.member}</span>
          </div>
          {isRight && <Dot/>}
        </div>
      ))}
    </div>
  )
}

function ActiveBadge() {
  return (
    <motion.span
      animate={{ opacity:[1,.35,1] }}
      transition={{ duration:1.6, repeat:Infinity }}
      style={{
        fontSize:'0.5rem', fontWeight:700, fontFamily:'JetBrains Mono, monospace',
        color:'#4ade80', background:'rgba(74,222,128,.12)',
        border:'1px solid rgba(74,222,128,.3)', borderRadius:100,
        padding:'2px 6px', letterSpacing:'0.1em', flexShrink:0, whiteSpace:'nowrap',
      }}
    >
      IN PROGRESS
    </motion.span>
  )
}

function Dot() {
  return (
    <div style={{
      width:4, height:4, borderRadius:'50%',
      background:'#4ade80', flexShrink:0,
      boxShadow:'0 0 4px rgba(74,222,128,.6)',
    }}/>
  )
}
