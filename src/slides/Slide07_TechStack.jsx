import { motion } from 'framer-motion'
import {
  Database, Image, FileSpreadsheet, GitBranch,
  Brain, Flame, Zap, Activity,
  Monitor, ServerCog, Container, Rocket,
  Layers, Sparkles,
} from 'lucide-react'

const LAYERS = [
  {
    id: 'data',
    number: 'L1',
    title: 'DATA LAYER',
    subtitle: 'Collection · Processing · Storage',
    color: '#60a5fa',
    glow:  'rgba(96,165,250,0.18)',
    tools: [
      { name: 'Albumentations', role: 'Augmentation Pipeline',         Icon: GitBranch },
      { name: 'OpenCV',         role: 'Image Processing',              Icon: Image },
      { name: 'Pandas / NumPy', role: 'Metadata & Numerical Analysis', Icon: FileSpreadsheet },
      { name: 'Scikit-Learn',   role: 'Stratified Splits',             Icon: Database },
    ],
  },
  {
    id: 'model',
    number: 'L2',
    title: 'MODEL LAYER',
    subtitle: 'Architecture · Training · MLOps',
    color: '#a78bfa',
    glow:  'rgba(167,139,250,0.18)',
    tools: [
      { name: 'ResNet-18',       role: 'Baseline Model',           Icon: Brain },
      { name: 'PyTorch',         role: 'Deep Learning Framework',  Icon: Flame },
      { name: 'EfficientNet-B0', role: 'Production Model',         Icon: Zap },
      { name: 'MLflow',          role: 'Experiment Tracking',      Icon: Activity },
    ],
  },
  {
    id: 'deploy',
    number: 'L3',
    title: 'DEPLOYMENT LAYER',
    subtitle: 'Inference Serving · UI · Containers',
    color: '#4ade80',
    glow:  'rgba(74,222,128,0.18)',
    tools: [
      { name: 'Streamlit', role: 'User Interface',          Icon: Monitor },
      { name: 'FastAPI',   role: 'Inference API',           Icon: ServerCog },
      { name: 'Docker',    role: 'Microservice Container',  Icon: Container },
      { name: 'Uvicorn',   role: 'ASGI Server',             Icon: Rocket },
    ],
  },
]

const vp = { once: true, margin: '-60px' }

/* ── Reusable electric pulse for SVG paths ──────────────────────── */
function ElectricLine({ color, height = 60 }) {
  return (
    <svg
      width="2"
      height={height}
      viewBox={`0 0 2 ${height}`}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <line
        x1="1" y1="0" x2="1" y2={height}
        stroke={`${color}33`}
        strokeWidth="1"
      />
      <line
        x1="1" y1="0" x2="1" y2={height}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="6 4"
        style={{
          animation: 'tech-dash 1.2s linear infinite',
          filter: `drop-shadow(0 0 4px ${color})`,
        }}
      />
      {/* Traveling pulse dot */}
      <circle r="3" fill={color} style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
        <animate
          attributeName="cy"
          values={`0;${height}`}
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

export default function Slide07_TechStack() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '110px 32px 80px',
        gap: 18,
        position: 'relative',
      }}
    >
      {/* Keyframe styles for animations */}
      <style>{`
        @keyframes tech-dash {
          to { stroke-dashoffset: -20; }
        }
        @keyframes tech-flicker {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 6px currentColor); }
          50%      { opacity: 0.6; filter: drop-shadow(0 0 14px currentColor); }
        }
        @keyframes tech-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--c) inset, 0 0 18px -8px var(--c); }
          50%      { box-shadow: 0 0 30px -4px var(--c) inset, 0 0 35px -5px var(--c); }
        }
        @keyframes tech-scan {
          0%   { transform: translateX(-100%); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>

      {/* ─── Header ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: 720 }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 14px',
          borderRadius: 100,
          background: 'rgba(74,222,128,0.08)',
          border: '1px solid rgba(74,222,128,0.25)',
          marginBottom: 16,
        }}>
          <Layers size={13} color="#4ade80" />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: 'rgba(74,222,128,0.85)',
            letterSpacing: '0.16em',
          }}>
            INTEGRATED TECH STACK
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 800,
          color: '#f0fdf4',
          lineHeight: 1.1,
          margin: 0,
        }}>
          Three layers,{' '}
          <span style={{
            color: '#4ade80',
            textShadow: '0 0 30px rgba(74,222,128,0.55)',
          }}>
            one current
          </span>
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: 'rgba(240,253,244,0.5)',
          marginTop: 10,
          lineHeight: 1.6,
        }}>
          Data flows up through the model and out to deployment —
          end-to-end, electrified, production-ready.
        </p>
      </motion.div>

      {/* ─── Layers with electric connectors ────────────── */}
      <div style={{
        width: '100%',
        maxWidth: 1180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        position: 'relative',
        marginTop: 12,
      }}>
        {LAYERS.map((layer, li) => (
          <div key={layer.id} style={{ width: '100%' }}>
            {/* Layer panel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={vp}
              transition={{ delay: li * 0.18, duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
              style={{
                position: 'relative',
                background: 'rgba(0,0,0,0.62)',
                border: `1px solid ${layer.color}30`,
                borderLeft: `3px solid ${layer.color}`,
                borderRadius: 18,
                padding: '24px 28px 22px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: `0 8px 32px ${layer.color}15, 0 0 40px -10px ${layer.glow}`,
                overflow: 'hidden',
              }}
            >
              {/* Scan strip — subtle moving highlight */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '40%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${layer.color}10, transparent)`,
                  animation: `tech-scan ${5 + li * 0.7}s ease-in-out infinite`,
                  pointerEvents: 'none',
                }}
              />

              {/* Layer header row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 18,
                position: 'relative',
                zIndex: 2,
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: layer.color,
                  background: `${layer.color}14`,
                  border: `1px solid ${layer.color}45`,
                  borderRadius: 6,
                  padding: '4px 9px',
                  letterSpacing: '0.08em',
                  animation: 'tech-flicker 2.4s ease-in-out infinite',
                }}>
                  {layer.number}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    color: layer.color,
                    letterSpacing: '0.06em',
                    textShadow: `0 0 16px ${layer.color}55`,
                  }}>
                    {layer.title}
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    color: 'rgba(240,253,244,0.5)',
                    marginTop: 2,
                  }}>
                    {layer.subtitle}
                  </div>
                </div>
                <Sparkles size={16} color={layer.color} style={{ opacity: 0.7 }} />
              </div>

              {/* Tools — horizontal circuit row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: 12,
                position: 'relative',
                zIndex: 2,
              }}>
                {layer.tools.map((tool, ti) => {
                  const Icon = tool.Icon
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vp}
                      transition={{ delay: li * 0.18 + ti * 0.08 + 0.25, duration: 0.4 }}
                      whileHover={{
                        y: -4,
                        boxShadow: `0 10px 30px -6px ${layer.color}55`,
                        borderColor: layer.color,
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 14px',
                        borderRadius: 12,
                        background: `linear-gradient(135deg, rgba(0,0,0,0.55), ${layer.color}08)`,
                        border: `1px solid ${layer.color}25`,
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                    >
                      {/* Corner accent */}
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 18,
                          height: 18,
                          background: `linear-gradient(225deg, ${layer.color}55, transparent 70%)`,
                        }}
                      />

                      {/* Icon hexagon */}
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${layer.color}18`,
                        border: `1px solid ${layer.color}45`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: layer.color,
                        flexShrink: 0,
                        boxShadow: `inset 0 0 12px ${layer.color}22`,
                      }}>
                        <Icon size={20} />
                      </div>

                      {/* Text */}
                      <div style={{ minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#f0fdf4',
                          lineHeight: 1.25,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {tool.name}
                        </div>
                        <div style={{
                          fontSize: '0.7rem',
                          color: `${layer.color}cc`,
                          marginTop: 2,
                          fontFamily: 'JetBrains Mono, monospace',
                          letterSpacing: '0.02em',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {tool.role}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Electric connector between layers */}
            {li < LAYERS.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={vp}
                transition={{ delay: li * 0.18 + 0.35, duration: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 36,
                  transformOrigin: 'top',
                }}
              >
                <ElectricLine color={LAYERS[li + 1].color} height={36} />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* ─── Footer tagline ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{
          marginTop: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 22px',
          borderRadius: 100,
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(74,222,128,0.22)',
          boxShadow: '0 0 24px -8px rgba(74,222,128,0.35)',
        }}
      >
        <Zap size={14} color="#4ade80" style={{ animation: 'tech-flicker 1.6s ease-in-out infinite' }} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.78rem',
          color: 'rgba(240,253,244,0.7)',
          letterSpacing: '0.08em',
        }}>
          End-to-End · Production-Ready · &lt;200ms Inference
        </span>
        <Zap size={14} color="#4ade80" style={{ animation: 'tech-flicker 1.6s ease-in-out infinite reverse' }} />
      </motion.div>
    </div>
  )
}
