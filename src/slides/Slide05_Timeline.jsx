import { motion } from 'framer-motion'

const STAGES = [
  {
    num: 1,
    label: 'Data Collection & Cleaning',
    status: 'active',
    topPct: 74,
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'       },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'           },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection'  },
      { member: 'Musaad',     task: 'Class imbalance + train/val/test splits'  },
    ],
  },
  { num: 2, label: 'Data Augmentation',          status: 'upcoming', topPct: 57 },
  { num: 3, label: 'Model Training',              status: 'upcoming', topPct: 41 },
  { num: 4, label: 'Evaluation & Benchmarking',   status: 'upcoming', topPct: 25 },
  { num: 5, label: 'Deployment',                  status: 'upcoming', topPct: 10 },
]

export default function Slide05_Timeline() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 44%, transparent 60%)',
    }}>

      {/* Header — top left */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        style={{ position: 'absolute', top: 40, left: 52, zIndex: 10 }}
      >
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.68rem',
          color: 'rgba(74,222,128,0.55)',
          letterSpacing: '0.14em',
          marginBottom: 8,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
          5 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
            Stage 1
          </span>
          {' '}Active
        </h2>
      </motion.div>

      {/* Vertical spine along plant */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '8%',
        bottom: '6%',
        width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.18) 15%, rgba(74,222,128,0.18) 85%, transparent)',
        transform: 'translateX(-50%)',
        zIndex: 5,
      }} />

      {/* Stage nodes */}
      {STAGES.map((stage, idx) => {
        const isActive = stage.status === 'active'
        return (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            style={{
              position: 'absolute',
              top: `${stage.topPct}%`,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'flex-start',
              zIndex: 10,
            }}
          >
            {/* Label card — left half */}
            <div style={{
              width: 'calc(50% - 28px)',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: 8,
              transform: 'translateY(-50%)',
            }}>
              <div style={{
                padding: isActive ? '14px 16px' : '9px 14px',
                borderRadius: 12,
                background: isActive ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.07)'}`,
                maxWidth: 340,
                textAlign: 'right',
              }}>
                {/* Stage title row */}
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
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: '#4ade80',
                        background: 'rgba(74,222,128,0.12)',
                        border: '1px solid rgba(74,222,128,0.3)',
                        borderRadius: 100,
                        padding: '2px 7px',
                        letterSpacing: '0.1em',
                      }}
                    >
                      IN PROGRESS
                    </motion.span>
                  )}
                  <span style={{
                    fontSize: '0.6rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: isActive ? 'rgba(74,222,128,0.6)' : 'rgba(255,255,255,0.25)',
                  }}>
                    {`S${stage.num}`}
                  </span>
                  <span style={{
                    fontSize: isActive ? '0.88rem' : '0.78rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#f0fdf4' : 'rgba(240,253,244,0.38)',
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
                      <span style={{ fontSize: '0.72rem', color: 'rgba(240,253,244,0.82)', display: 'block', lineHeight: 1.4 }}>
                        {t.task}
                      </span>
                      <span style={{
                        fontSize: '0.6rem',
                        color: 'rgba(74,222,128,0.55)',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {t.member}
                      </span>
                    </div>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#4ade80', flexShrink: 0,
                      boxShadow: '0 0 5px rgba(74,222,128,0.6)',
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Connector + Node */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, transform: 'translateY(-50%)' }}>
              <div style={{
                width: 20, height: 1,
                background: isActive ? 'rgba(74,222,128,0.5)' : 'rgba(74,222,128,0.12)',
              }} />
              <motion.div
                animate={isActive ? {
                  boxShadow: ['0 0 0 0px rgba(74,222,128,0.5)', '0 0 0 8px rgba(74,222,128,0)'],
                } : {}}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  width:  isActive ? 18 : 9,
                  height: isActive ? 18 : 9,
                  borderRadius: '50%',
                  background: isActive ? '#4ade80' : 'transparent',
                  border: `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,0.22)'}`,
                  boxShadow: isActive ? '0 0 14px rgba(74,222,128,0.7)' : 'none',
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
