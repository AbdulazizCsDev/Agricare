import { motion } from 'framer-motion'

const STAGES = [
  {
    num: 1,
    label: 'Data Collection & Cleaning',
    status: 'active',
    topPct: 15,
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'          },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection' },
      { member: 'Musaad',     task: 'Class imbalance + train/val/test splits' },
    ],
  },
  { num: 2, label: 'Data Augmentation',         status: 'upcoming', topPct: 31 },
  { num: 3, label: 'Model Training',             status: 'upcoming', topPct: 47 },
  { num: 4, label: 'Evaluation & Benchmarking',  status: 'upcoming', topPct: 63 },
  { num: 5, label: 'Deployment',                 status: 'upcoming', topPct: 78 },
]

export default function Slide05_Timeline() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      position: 'relative',
    }}>

      {/* Header — top left */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
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
        <h2 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
          5 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
            Stage 1
          </span>
          {' '}Active
        </h2>
      </motion.div>

      {/* Vertical spine — top to bottom along plant trunk */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '12%',
        bottom: '18%',
        width: 1,
        background: 'linear-gradient(to bottom, rgba(74,222,128,0.22) 0%, rgba(74,222,128,0.22) 90%, transparent)',
        transform: 'translateX(-50%)',
        zIndex: 5,
      }} />

      {/* Stage nodes */}
      {STAGES.map((stage, idx) => {
        const isActive = stage.status === 'active'
        return (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            style={{
              position: 'absolute',
              top: `${stage.topPct}%`,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {/* Label card — left half */}
            <div style={{
              width: 'calc(50% - 32px)',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: 10,
              transform: 'translateY(-50%)',
            }}>
              <div style={{
                padding: isActive ? '11px 13px' : '7px 12px',
                borderRadius: 10,
                background: isActive ? 'rgba(74,222,128,0.09)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${isActive ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.06)'}`,
                maxWidth: 310,
                textAlign: 'right',
                backdropFilter: 'blur(6px)',
              }}>
                {/* Title row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 7,
                  marginBottom: isActive ? 8 : 0,
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
                        padding: '2px 6px',
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
                    fontSize: isActive ? '0.8rem' : '0.7rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#f0fdf4' : 'rgba(240,253,244,0.32)',
                    lineHeight: 1.3,
                  }}>
                    {stage.label}
                  </span>
                </div>

                {/* Tasks — compact rows */}
                {isActive && stage.tasks?.map((t, ti) => (
                  <div key={ti} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '3px 0',
                    borderTop: `1px solid rgba(74,222,128,${ti === 0 ? '0.14' : '0.06'})`,
                    justifyContent: 'flex-end',
                  }}>
                    <div style={{ textAlign: 'right', minWidth: 0 }}>
                      <span style={{
                        fontSize: '0.65rem',
                        color: 'rgba(240,253,244,0.78)',
                        display: 'block',
                        lineHeight: 1.3,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {t.task}
                      </span>
                      <span style={{
                        fontSize: '0.54rem',
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

            {/* Connector line + Node dot at spine */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, transform: 'translateY(-50%)' }}>
              <div style={{
                width: 22, height: 1,
                background: isActive ? 'rgba(74,222,128,0.45)' : 'rgba(74,222,128,0.1)',
              }} />
              <motion.div
                animate={isActive ? {
                  boxShadow: ['0 0 0 0px rgba(74,222,128,0.5)', '0 0 0 7px rgba(74,222,128,0)'],
                } : {}}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  width:  isActive ? 16 : 8,
                  height: isActive ? 16 : 8,
                  borderRadius: '50%',
                  background: isActive ? '#4ade80' : 'transparent',
                  border: `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,0.2)'}`,
                  boxShadow: isActive ? '0 0 12px rgba(74,222,128,0.7)' : 'none',
                  flexShrink: 0,
                }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
