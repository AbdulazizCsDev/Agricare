import { motion } from 'framer-motion'
import { CheckCircle, Circle, Zap, User } from 'lucide-react'

const STAGES = [
  { num: 1, label: 'Data Collection\n& Augmentation', status: 'active'   },
  { num: 2, label: 'Model Training\n& Tuning',         status: 'upcoming' },
  { num: 3, label: 'Evaluation &\nBenchmarking',       status: 'upcoming' },
  { num: 4, label: 'Deployment\n& API',                status: 'upcoming' },
]

const TASKS = [
  { member: 'Khaled',     role: 'Data',       task: 'PlantVillage + Agro-Mind datasets',       color: '#60a5fa' },
  { member: 'Abdulaziz',  role: 'Quality',    task: 'Deduplication + blur detection',           color: '#4ade80' },
  { member: 'Abdulmalik', role: 'Labels',     task: 'Label verification + mislabel detection',  color: '#a78bfa' },
  { member: 'Musaad',     role: 'Splits',     task: 'Class imbalance + augmentation + splits',  color: '#fbbf24' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y:  0, transition: { duration: 0.4, ease: 'easeOut' } },
}
const vp = { once: true, amount: 0.1 }

export default function Slide05_Timeline() {
  return (
    <div style={{
      width:          '100%',
      height:         '100vh',
      display:        'flex',
      flexDirection:  'column',
      padding:        '82px 52px 28px',
      gap:            24,
      boxSizing:      'border-box',
      position:       'relative',
    }}>

      {/* ── Header ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.4 }}
        style={{ flexShrink: 0 }}
      >
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.68rem',
          color: 'rgba(74,222,128,0.55)',
          letterSpacing: '0.16em',
          marginBottom: 6,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{
          fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
          fontWeight: 800,
          color: '#f0fdf4',
          lineHeight: 1.15,
          margin: 0,
        }}>
          4 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 22px rgba(74,222,128,.45)' }}>
            Stage 1
          </span>
          {' '}In Progress
        </h2>
      </motion.div>

      {/* ── Stage Stepper ────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
          flexShrink: 0,
        }}
      >
        {STAGES.map((stage, i) => {
          const isActive   = stage.status === 'active'
          const isUpcoming = stage.status === 'upcoming'
          const isLast     = i === STAGES.length - 1

          return (
            <motion.div
              key={stage.num}
              variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', flex: 1 }}
            >
              {/* Stage card */}
              <div style={{
                flex:           1,
                padding:        '16px 18px',
                borderRadius:   14,
                background:     isActive
                  ? 'rgba(74,222,128,0.1)'
                  : 'rgba(255,255,255,0.04)',
                border:         `1.5px solid ${isActive ? 'rgba(74,222,128,0.45)' : 'rgba(255,255,255,0.1)'}`,
                boxShadow:      isActive ? '0 0 28px rgba(74,222,128,0.2)' : 'none',
                display:        'flex',
                flexDirection:  'column',
                gap:            8,
                position:       'relative',
                overflow:       'hidden',
              }}>
                {/* Glow top border for active */}
                {isActive && (
                  <div style={{
                    position:   'absolute',
                    top:        0, left: 0, right: 0,
                    height:     2,
                    background: 'linear-gradient(90deg, transparent, #4ade80, transparent)',
                    borderRadius: '14px 14px 0 0',
                  }}/>
                )}

                {/* Number + status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{
                    width:          36,
                    height:         36,
                    borderRadius:   '50%',
                    background:     isActive ? '#4ade80' : 'rgba(255,255,255,0.07)',
                    border:         `2px solid ${isActive ? '#4ade80' : 'rgba(255,255,255,0.15)'}`,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    boxShadow:      isActive ? '0 0 18px rgba(74,222,128,0.7)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize:   '0.88rem',
                      fontWeight: 800,
                      color:      isActive ? '#000' : 'rgba(255,255,255,0.35)',
                    }}>
                      {stage.num}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      style={{
                        display:    'flex',
                        alignItems: 'center',
                        gap:        4,
                        padding:    '3px 9px',
                        borderRadius: 100,
                        background: 'rgba(74,222,128,0.15)',
                        border:     '1px solid rgba(74,222,128,0.4)',
                      }}
                    >
                      <Zap size={10} color="#4ade80"/>
                      <span style={{
                        fontSize:   '0.58rem',
                        fontWeight: 700,
                        color:      '#4ade80',
                        fontFamily: 'JetBrains Mono, monospace',
                        letterSpacing: '0.08em',
                      }}>
                        ACTIVE
                      </span>
                    </motion.div>
                  )}

                  {isUpcoming && (
                    <Circle size={14} color="rgba(255,255,255,0.2)" strokeWidth={1.5}/>
                  )}
                </div>

                {/* Label */}
                <div style={{
                  fontSize:   '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color:      isActive ? '#f0fdf4' : 'rgba(240,253,244,0.42)',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}>
                  {stage.label}
                </div>
              </div>

              {/* Connector arrow */}
              {!isLast && (
                <div style={{
                  flexShrink: 0,
                  width:      28,
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="20" height="10" viewBox="0 0 20 10">
                    <line x1="0" y1="5" x2="14" y2="5"
                      stroke="rgba(74,222,128,0.25)" strokeWidth="1.5"
                      strokeDasharray="3 2"/>
                    <polygon points="13,2 19,5 13,8" fill="rgba(74,222,128,0.35)"/>
                  </svg>
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* ── Current Stage Detail ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ delay: 0.45, duration: 0.5 }}
        style={{
          flex:                 1,
          background:           'rgba(0,0,0,0.55)',
          border:               '1px solid rgba(74,222,128,0.2)',
          borderRadius:         18,
          padding:              '22px 28px',
          display:              'flex',
          flexDirection:        'column',
          gap:                  14,
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          minHeight:            0,
          boxShadow:            '0 4px 40px rgba(74,222,128,0.08)',
        }}
      >
        {/* Panel header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <CheckCircle size={18} color="#4ade80"/>
          <span style={{
            fontSize:   '1rem',
            fontWeight: 700,
            color:      '#f0fdf4',
          }}>
            Stage 1 — Data Collection, Cleaning & Augmentation
          </span>
          <div style={{
            marginLeft:  'auto',
            padding:     '3px 10px',
            borderRadius: 100,
            background:  'rgba(74,222,128,0.1)',
            border:      '1px solid rgba(74,222,128,0.3)',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize:   '0.65rem',
              color:      'rgba(74,222,128,0.9)',
            }}>
              4 MEMBERS
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(74,222,128,0.12)', flexShrink: 0 }}/>

        {/* Task cards 2x2 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap:                 12,
            flex:                1,
            minHeight:           0,
          }}
        >
          {TASKS.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display:        'flex',
                alignItems:     'flex-start',
                gap:            12,
                padding:        '14px 16px',
                borderRadius:   12,
                background:     `${t.color}0a`,
                border:         `1px solid ${t.color}25`,
              }}
            >
              {/* Avatar */}
              <div style={{
                width:          38,
                height:         38,
                borderRadius:   10,
                background:     `${t.color}18`,
                border:         `1px solid ${t.color}45`,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                flexShrink:     0,
              }}>
                <User size={18} color={t.color}/>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{
                    fontSize:   '0.9rem',
                    fontWeight: 700,
                    color:      '#f0fdf4',
                  }}>
                    {t.member}
                  </span>
                  <span style={{
                    fontSize:      '0.6rem',
                    fontFamily:    'JetBrains Mono, monospace',
                    color:         t.color,
                    background:    `${t.color}18`,
                    border:        `1px solid ${t.color}35`,
                    borderRadius:  100,
                    padding:       '1px 7px',
                  }}>
                    {t.role}
                  </span>
                </div>
                <p style={{
                  fontSize:  '0.82rem',
                  color:     'rgba(240,253,244,0.72)',
                  lineHeight: 1.5,
                  margin:    0,
                }}>
                  {t.task}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
