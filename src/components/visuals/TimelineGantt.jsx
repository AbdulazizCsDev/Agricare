import { motion } from 'framer-motion'
import { timeline } from '../../data/timeline'

const WEEKS = [1, 2, 3, 4, 5]
const PHASE1_END_PCT = 40 // 40% = after week 2

export default function TimelineGantt() {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Week headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px repeat(5, 1fr)',
          gap: 0,
          marginBottom: 8,
        }}
      >
        <div />
        {WEEKS.map((w) => (
          <div
            key={w}
            style={{
              textAlign: 'center',
              fontSize: '0.7rem',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'rgba(74,222,128,0.6)',
              fontWeight: 500,
              padding: '0 4px 8px',
            }}
          >
            WK {w}
          </div>
        ))}
      </div>

      {/* Grid container */}
      <div style={{ position: 'relative' }}>
        {/* Phase divider line at 40% (after week 2) */}
        <div
          style={{
            position: 'absolute',
            left: `calc(200px + ${PHASE1_END_PCT}%)`,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'rgba(74,222,128,0.6)',
            zIndex: 10,
            boxShadow: '0 0 8px rgba(74,222,128,0.4)',
          }}
        />
        {/* Phase label */}
        <div
          style={{
            position: 'absolute',
            left: `calc(200px + ${PHASE1_END_PCT / 2}%)`,
            top: -28,
            transform: 'translateX(-50%)',
            fontSize: '0.65rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#4ade80',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            background: 'rgba(10,20,16,0.9)',
            padding: '3px 8px',
            borderRadius: 4,
            border: '1px solid rgba(74,222,128,0.3)',
          }}
        >
          ● PHASE 1 — implemented
        </div>
        <div
          style={{
            position: 'absolute',
            left: `calc(200px + ${PHASE1_END_PCT + (100 - PHASE1_END_PCT) / 2}%)`,
            top: -28,
            transform: 'translateX(-50%)',
            fontSize: '0.65rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(240,253,244,0.4)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            background: 'rgba(10,20,16,0.9)',
            padding: '3px 8px',
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ○ PHASE 2 — display only
        </div>

        {/* Rows */}
        {timeline.map((item, rowIdx) => (
          <motion.div
            key={item.week}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rowIdx * 0.1, duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px repeat(5, 1fr)',
              gap: 0,
              marginBottom: 10,
              alignItems: 'center',
            }}
          >
            {/* Stage label */}
            <div style={{ paddingRight: 16 }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: item.phase === 1 ? '#f0fdf4' : 'rgba(240,253,244,0.45)',
                  marginBottom: 2,
                  lineHeight: 1.3,
                }}
              >
                {item.stage}
              </div>
              <div
                style={{
                  fontSize: '0.62rem',
                  color: item.phase === 1 ? 'rgba(74,222,128,0.7)' : 'rgba(240,253,244,0.3)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {item.deliverable}
              </div>
            </div>

            {/* Week cells */}
            {WEEKS.map((w) => {
              const isActive = w === item.week
              const isPhase1 = item.phase === 1
              return (
                <div
                  key={w}
                  style={{
                    padding: '0 3px',
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {isActive ? (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: rowIdx * 0.1 + 0.3, duration: 0.5, ease: 'easeOut' }}
                      style={{
                        width: '100%',
                        height: 28,
                        borderRadius: 6,
                        background: isPhase1
                          ? 'linear-gradient(90deg, #16a34a, #4ade80)'
                          : 'rgba(240,253,244,0.08)',
                        border: isPhase1
                          ? '1px solid rgba(74,222,128,0.5)'
                          : '1px solid rgba(255,255,255,0.12)',
                        transformOrigin: 'left',
                        boxShadow: isPhase1 ? '0 0 12px rgba(74,222,128,0.3)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.6rem',
                          fontWeight: 600,
                          color: isPhase1 ? '#0a1410' : 'rgba(240,253,244,0.4)',
                          fontFamily: 'JetBrains Mono, monospace',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        WK{w}
                      </span>
                    </motion.div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: 28,
                        borderRadius: 6,
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
