import { motion } from 'framer-motion'

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
  return (
    <div style={{ width: '100%', position: 'relative' }}>

      {/* ── Sticky header ───────────────────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        padding: '28px 48px 20px',
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
      }}>
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

      {/* ── One 100vh panel per stage ───────────────────────────── */}
      {STAGES.map((stage, idx) => {
        const isActive = stage.status === 'active'
        return (
          <div
            key={stage.num}
            id={`timeline-s${stage.num}`}
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* ── Card — occupies left 44% ─────────────────── */}
              <div style={{
                width: '44%',
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight: 12,
              }}>
                <div style={{
                  padding: isActive ? '14px 16px' : '10px 14px',
                  borderRadius: 12,
                  background: isActive
                    ? 'rgba(74,222,128,0.09)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive
                    ? 'rgba(74,222,128,0.3)'
                    : 'rgba(255,255,255,0.07)'}`,
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
                      color: isActive ? 'rgba(74,222,128,0.55)' : 'rgba(255,255,255,0.22)',
                      flexShrink: 0,
                    }}>
                      {`S${stage.num}`}
                    </span>
                    <span style={{
                      fontSize: isActive ? '0.88rem' : '0.78rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#f0fdf4' : 'rgba(240,253,244,0.35)',
                      lineHeight: 1.3,
                    }}>
                      {stage.label}
                    </span>
                  </div>

                  {/* Tasks — active stage only */}
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
              </div>

              {/* ── Connector + Node at 50% (plant trunk center) ── */}
              <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 28, height: 1,
                  background: isActive
                    ? 'rgba(74,222,128,0.45)'
                    : 'rgba(74,222,128,0.12)',
                }} />
                <motion.div
                  animate={isActive ? {
                    boxShadow: [
                      '0 0 0 0px rgba(74,222,128,0.5)',
                      '0 0 0 10px rgba(74,222,128,0)',
                    ],
                  } : {}}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{
                    width:  isActive ? 18 : 9,
                    height: isActive ? 18 : 9,
                    borderRadius: '50%',
                    background: isActive ? '#4ade80' : 'transparent',
                    border: `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,0.2)'}`,
                    boxShadow: isActive ? '0 0 14px rgba(74,222,128,0.7)' : 'none',
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* ── Stage number — right of node (faint) ────────── */}
              <div style={{
                marginLeft: 14,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: isActive ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.1)',
                userSelect: 'none',
              }}>
                {`0${stage.num}`}
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
