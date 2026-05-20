import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STAGES = [
  {
    num: 1,
    label: 'Data Collection & Cleaning',
    status: 'active',
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'          },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection' },
      { member: 'Musaad',     task: 'Class imbalance + train/val/test splits' },
    ],
  },
  { num: 2, label: 'Data Augmentation',        status: 'upcoming' },
  { num: 3, label: 'Model Training',            status: 'upcoming' },
  { num: 4, label: 'Evaluation & Benchmarking', status: 'upcoming' },
  { num: 5, label: 'Deployment',                status: 'upcoming' },
]

export default function Slide05_Timeline() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const observers = STAGES.map((stage, idx) => {
      const el = document.getElementById(`timeline-s${stage.num}`)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(idx) },
        { threshold: 0.5 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const stage   = STAGES[activeIdx]
  const isActive = stage.status === 'active'

  return (
    /* ── Outer: 500vh scroll container ─────────────────────────── */
    <div style={{ height: `${STAGES.length * 100}vh`, position: 'relative' }}>

      {/* ── Invisible panels — only exist for scroll & IntersectionObserver */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {STAGES.map(s => (
          <div key={s.num} id={`timeline-s${s.num}`} style={{ height: '100vh' }} />
        ))}
      </div>

      {/* ── Sticky viewport — stays on screen while user scrolls 500vh ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        zIndex: 10,
      }}>

        {/* Header */}
        <div style={{ position: 'absolute', top: 28, left: 48, zIndex: 2 }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.66rem',
            color: 'rgba(74,222,128,0.55)',
            letterSpacing: '0.14em',
            marginBottom: 6,
          }}>
            PROJECT TIMELINE
          </p>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
            5 Stages —{' '}
            <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
              Stage 1
            </span>
            {' '}Active
          </h2>
        </div>

        {/* Stage progress dots — right side */}
        <div style={{
          position: 'absolute',
          right: 48,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          zIndex: 2,
        }}>
          {STAGES.map((s, i) => (
            <div key={i} style={{
              width:  i === activeIdx ? 6 : 4,
              height: i === activeIdx ? 6 : 4,
              borderRadius: '50%',
              background: i === activeIdx
                ? '#4ade80'
                : 'rgba(74,222,128,0.22)',
              boxShadow: i === activeIdx ? '0 0 8px rgba(74,222,128,0.6)' : 'none',
              transition: 'all 0.35s ease',
            }} />
          ))}
        </div>

        {/* ── Card + Node — permanently centered ─────────────────── */}
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>

          {/* Card — left 44%, content animates on stage change */}
          <div style={{
            width: '44%',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 12,
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <div style={{
                  padding: isActive ? '14px 16px' : '10px 14px',
                  borderRadius: 12,
                  background: isActive
                    ? 'rgba(74,222,128,0.09)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive
                    ? 'rgba(74,222,128,0.3)'
                    : 'rgba(255,255,255,0.12)'}`,
                  maxWidth: 340,
                  textAlign: 'right',
                  backdropFilter: 'blur(8px)',
                }}>

                  {/* Title row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 8,
                    marginBottom: isActive ? 10 : 0,
                  }}>
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [1, 0.35, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                        style={{
                          fontSize: '0.54rem',
                          fontWeight: 700,
                          fontFamily: 'JetBrains Mono, monospace',
                          color: '#4ade80',
                          background: 'rgba(74,222,128,0.12)',
                          border: '1px solid rgba(74,222,128,0.28)',
                          borderRadius: 100,
                          padding: '2px 7px',
                          letterSpacing: '0.1em',
                          flexShrink: 0,
                        }}
                      >
                        IN PROGRESS
                      </motion.span>
                    )}
                    <span style={{
                      fontSize: '0.58rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: isActive ? 'rgba(74,222,128,0.55)' : 'rgba(255,255,255,0.38)',
                      flexShrink: 0,
                    }}>
                      {`S${stage.num}`}
                    </span>
                    <span style={{
                      fontSize: isActive ? '0.88rem' : '0.8rem',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? '#f0fdf4' : 'rgba(240,253,244,0.62)',
                      lineHeight: 1.3,
                    }}>
                      {stage.label}
                    </span>
                  </div>

                  {/* Tasks */}
                  {isActive && stage.tasks?.map((t, ti) => (
                    <div key={ti} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '5px 0',
                      borderTop: `1px solid rgba(74,222,128,${ti === 0 ? '0.14' : '0.06'})`,
                      justifyContent: 'flex-end',
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          color: 'rgba(240,253,244,0.78)',
                          display: 'block',
                          lineHeight: 1.35,
                        }}>
                          {t.task}
                        </span>
                        <span style={{
                          fontSize: '0.56rem',
                          color: 'rgba(74,222,128,0.5)',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>
                          {t.member}
                        </span>
                      </div>
                      <div style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: '#4ade80', flexShrink: 0,
                        boxShadow: '0 0 5px rgba(74,222,128,0.6)',
                      }} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Connector line + Node — always centered on screen */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <motion.div
              animate={{ width: isActive ? 32 : 24 }}
              transition={{ duration: 0.35 }}
              style={{
                height: 1,
                background: isActive
                  ? 'rgba(74,222,128,0.45)'
                  : 'rgba(74,222,128,0.18)',
              }}
            />
            <motion.div
              layout
              animate={isActive ? {
                boxShadow: [
                  '0 0 0 0px rgba(74,222,128,0.5)',
                  '0 0 0 10px rgba(74,222,128,0)',
                ],
              } : {}}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{
                width:  isActive ? 18 : 10,
                height: isActive ? 18 : 10,
                borderRadius: '50%',
                background: isActive
                  ? '#4ade80'
                  : 'rgba(74,222,128,0.12)',
                border: `2px solid ${isActive
                  ? '#4ade80'
                  : 'rgba(74,222,128,0.38)'}`,
                boxShadow: isActive
                  ? '0 0 14px rgba(74,222,128,0.7)'
                  : '0 0 5px rgba(74,222,128,0.18)',
                flexShrink: 0,
                transition: 'width 0.35s, height 0.35s, background 0.35s',
              }}
            />
          </div>

          {/* Stage number — right of node */}
          <div style={{
            marginLeft: 14,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            color: isActive ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.12)',
            transition: 'color 0.35s',
            userSelect: 'none',
          }}>
            {`0${stage.num}`}
          </div>
        </div>
      </div>
    </div>
  )
}
