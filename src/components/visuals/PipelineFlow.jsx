import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Filter, Layers, Cpu, Activity, BarChart2, Server, X } from 'lucide-react'
import { pipeline } from '../../data/pipeline'

const ICON_MAP = {
  database: Database,
  filter: Filter,
  layers: Layers,
  cpu: Cpu,
  activity: Activity,
  'bar-chart': BarChart2,
  server: Server,
}

export default function PipelineFlow() {
  const [tooltip, setTooltip] = useState(null)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          overflowX: 'auto',
          padding: '8px 0 24px',
          scrollbarWidth: 'none',
        }}
      >
        {pipeline.map((stage, i) => {
          const Icon = ICON_MAP[stage.icon] || Database
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.4, ease: 'easeOut' }}
                className="pipeline-box"
                onClick={() => setTooltip(tooltip === i ? null : i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 12px',
                  width: 110,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(74,222,128,0.12)',
                    border: '1px solid rgba(74,222,128,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4ade80',
                  }}
                >
                  <Icon size={18} />
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#f0fdf4',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {stage.title}
                </span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    color: '#4ade80',
                    background: 'rgba(74,222,128,0.1)',
                    borderRadius: 100,
                    padding: '2px 7px',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  Step {i + 1}
                </span>
              </motion.div>

              {/* Arrow between boxes */}
              {i < pipeline.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: i * 0.12 + 0.5, duration: 0.25 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(74,222,128,0.5)',
                    flexShrink: 0,
                    transformOrigin: 'left',
                  }}
                >
                  <div style={{ width: 20, height: 1, background: 'rgba(74,222,128,0.4)' }} />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                      borderLeft: '6px solid rgba(74,222,128,0.5)',
                    }}
                  />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Tooltip overlay */}
      <AnimatePresence>
        {tooltip !== null && (
          <motion.div
            key={tooltip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: -80,
              left: `${(tooltip / pipeline.length) * 100}%`,
              transform: 'translateX(-50%)',
              background: 'rgba(10,20,16,0.95)',
              border: '1px solid rgba(74,222,128,0.4)',
              borderRadius: 10,
              padding: '10px 14px',
              maxWidth: 220,
              zIndex: 50,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <button
              onClick={() => setTooltip(null)}
              style={{
                position: 'absolute',
                top: 6,
                right: 8,
                color: 'rgba(74,222,128,0.6)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <X size={12} />
            </button>
            <p style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 600, marginBottom: 4 }}>
              {pipeline[tooltip].title}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(240,253,244,0.75)', lineHeight: 1.5 }}>
              {pipeline[tooltip].description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
