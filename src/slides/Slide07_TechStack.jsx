import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Database, Image, FileSpreadsheet, GitBranch,
  Brain, Flame, Zap, Activity,
  Monitor, ServerCog, Container, Rocket,
} from 'lucide-react'

const LAYERS = [
  {
    id: 'data',
    number: '01',
    title: 'DATA LAYER',
    subtitle: 'Collection · Processing · Storage',
    color: '#60a5fa',
    tools: [
      { name: 'Albumentations', role: 'Augmentation Pipeline',         Icon: GitBranch },
      { name: 'OpenCV',         role: 'Image Processing',              Icon: Image },
      { name: 'Pandas / NumPy', role: 'Metadata & Numerical Analysis', Icon: FileSpreadsheet },
      { name: 'Scikit-Learn',   role: 'Stratified Splits',             Icon: Database },
    ],
  },
  {
    id: 'model',
    number: '02',
    title: 'MODEL LAYER',
    subtitle: 'Architecture · Training · MLOps',
    color: '#a78bfa',
    tools: [
      { name: 'ResNet-18',       role: 'Baseline Model',          Icon: Brain },
      { name: 'PyTorch',         role: 'Deep Learning Framework', Icon: Flame },
      { name: 'EfficientNet-B0', role: 'Production Model',        Icon: Zap },
      { name: 'MLflow',          role: 'Experiment Tracking',     Icon: Activity },
    ],
  },
  {
    id: 'deploy',
    number: '03',
    title: 'DEPLOYMENT LAYER',
    subtitle: 'Inference · UI · Containers',
    color: '#4ade80',
    tools: [
      { name: 'Streamlit', role: 'User Interface',         Icon: Monitor },
      { name: 'FastAPI',   role: 'Inference API',          Icon: ServerCog },
      { name: 'Docker',    role: 'Microservice Container', Icon: Container },
      { name: 'Uvicorn',   role: 'ASGI Server',            Icon: Rocket },
    ],
  },
]

/* Timing (seconds) ─────────────────────────────────────────── */
const SETTLE = 2.4   // wait for roots transition to settle
const COL    = 0.55  // gap between columns
const TOOL   = 0.09  // gap between tools inside a column

export default function Slide07_TechStack() {
  const [animKey, setAnimKey]   = useState(0)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('techstack')
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setAnimKey(k => k + 1)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
      style={{
        width:          '100%',
        height:         '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '76px 40px 28px',
        gap:            20,
        boxSizing:      'border-box',
        position:       'relative',
      }}>
      <style>{`
        @keyframes ts-pulse {
          0%,100% { opacity:.9; }
          50%      { opacity:.45; }
        }
        @keyframes ts-scan {
          0%   { transform:translateX(-100%); opacity:0; }
          40%  { opacity:1; }
          100% { transform:translateX(200%); opacity:0; }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        key={`hdr-${animKey}`}
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:.7, delay: SETTLE, ease: 'easeOut' }}
        style={{ textAlign:'center', flexShrink:0 }}
      >
        <p style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.68rem',
          color:         'rgba(74,222,128,0.6)',
          letterSpacing: '0.18em',
          marginBottom:  10,
        }}>
          INTEGRATED TECH STACK
        </p>
        <h2 style={{
          fontSize:   'clamp(1.8rem,3vw,2.6rem)',
          fontWeight: 800,
          color:      '#f0fdf4',
          lineHeight: 1.1,
          margin:     0,
        }}>
          Three layers,{' '}
          <span style={{ color:'#4ade80', textShadow:'0 0 28px rgba(74,222,128,.5)' }}>
            one current
          </span>
        </h2>
      </motion.div>

      {/* ── Three columns ───────────────────────────────────── */}
      <div style={{
        width:               '100%',
        maxWidth:            1200,
        display:             'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap:                 16,
        flex:                1,
        minHeight:           0,
      }}>
        {LAYERS.map((layer, li) => (
          <motion.div
            key={`${layer.id}-${animKey}`}
            initial={{ opacity:0, y:28, scale:.96 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay: SETTLE + 0.4 + li * COL, duration:.65, ease:[.34,1.2,.64,1] }}
            style={{
              display:              'flex',
              flexDirection:        'column',
              gap:                  10,
              background:           'rgba(0,0,0,0.60)',
              border:               `1px solid ${layer.color}28`,
              borderTop:            `2px solid ${layer.color}`,
              borderRadius:         16,
              padding:              '18px 18px 16px',
              backdropFilter:       'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              boxShadow:            `0 8px 32px ${layer.color}12`,
              overflow:             'hidden',
              position:             'relative',
            }}
          >
            {/* Scan strip */}
            <div aria-hidden="true" style={{
              position:    'absolute',
              top:         0,
              left:        0,
              width:       '35%',
              height:      '100%',
              background:  `linear-gradient(90deg,transparent,${layer.color}0e,transparent)`,
              animation:   `ts-scan ${6 + li * .8}s ease-in-out infinite`,
              pointerEvents: 'none',
            }}/>

            {/* Column header */}
            <div style={{ position:'relative', zIndex:2, flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <span style={{
                  fontFamily:    'JetBrains Mono, monospace',
                  fontSize:      '0.62rem',
                  fontWeight:    700,
                  color:         layer.color,
                  background:    `${layer.color}15`,
                  border:        `1px solid ${layer.color}40`,
                  borderRadius:  5,
                  padding:       '2px 7px',
                  letterSpacing: '0.06em',
                }}>
                  {layer.number}
                </span>
                <span style={{
                  fontFamily:    'JetBrains Mono, monospace',
                  fontSize:      '0.82rem',
                  fontWeight:    700,
                  color:         layer.color,
                  letterSpacing: '0.06em',
                  textShadow:    `0 0 14px ${layer.color}55`,
                }}>
                  {layer.title}
                </span>
              </div>
              <p style={{
                fontSize:  '0.72rem',
                color:     'rgba(240,253,244,0.42)',
                margin:    0,
                lineHeight: 1.4,
              }}>
                {layer.subtitle}
              </p>

              {/* Divider */}
              <div style={{
                marginTop:  10,
                height:     1,
                background: `linear-gradient(90deg,${layer.color}55,transparent)`,
              }}/>
            </div>

            {/* Tool cards */}
            <div style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           8,
              flex:          1,
              position:      'relative',
              zIndex:        2,
            }}>
              {layer.tools.map((tool, ti) => {
                const Icon = tool.Icon
                return (
                  <motion.div
                    key={`${tool.name}-${animKey}`}
                    initial={{ opacity:0, x:-14 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{
                      delay: SETTLE + 0.6 + li * COL + ti * TOOL,
                      duration: .45,
                      ease: 'easeOut',
                    }}
                    whileHover={{ x:4, borderColor: layer.color }}
                    style={{
                      display:    'flex',
                      alignItems: 'center',
                      gap:        10,
                      padding:    '10px 12px',
                      borderRadius: 10,
                      background: `linear-gradient(120deg,rgba(0,0,0,.45),${layer.color}07)`,
                      border:     `1px solid ${layer.color}1e`,
                      cursor:     'default',
                      transition: 'border-color .2s, transform .2s',
                      position:   'relative',
                      overflow:   'hidden',
                    }}
                  >
                    {/* top-right corner glow */}
                    <span aria-hidden="true" style={{
                      position:   'absolute',
                      top:        0,
                      right:      0,
                      width:      14,
                      height:     14,
                      background: `linear-gradient(225deg,${layer.color}55,transparent 70%)`,
                    }}/>

                    <div style={{
                      width:          34,
                      height:         34,
                      borderRadius:   8,
                      background:     `${layer.color}15`,
                      border:         `1px solid ${layer.color}40`,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      color:          layer.color,
                      flexShrink:     0,
                    }}>
                      <Icon size={17}/>
                    </div>

                    <div style={{ minWidth:0 }}>
                      <div style={{
                        fontSize:  '0.88rem',
                        fontWeight: 700,
                        color:     '#f0fdf4',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow:   'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {tool.name}
                      </div>
                      <div style={{
                        fontSize:      '0.66rem',
                        color:         `${layer.color}bb`,
                        marginTop:     2,
                        fontFamily:    'JetBrains Mono, monospace',
                        whiteSpace:    'nowrap',
                        overflow:      'hidden',
                        textOverflow:  'ellipsis',
                      }}>
                        {tool.role}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <motion.div
        key={`ftr-${animKey}`}
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay: SETTLE + 0.6 + LAYERS.length * COL + 0.3, duration:.5 }}
        style={{
          display:    'flex',
          alignItems: 'center',
          gap:        10,
          padding:    '7px 18px',
          borderRadius: 100,
          background: 'rgba(0,0,0,0.5)',
          border:     '1px solid rgba(74,222,128,0.2)',
          flexShrink: 0,
        }}
      >
        <Zap size={12} color="#4ade80" style={{ animation:'ts-pulse 1.8s ease-in-out infinite' }}/>
        <span style={{
          fontFamily:    'JetBrains Mono, monospace',
          fontSize:      '0.72rem',
          color:         'rgba(240,253,244,0.6)',
          letterSpacing: '0.08em',
        }}>
          End-to-End · Production-Ready · &lt;200ms Inference
        </span>
        <Zap size={12} color="#4ade80" style={{ animation:'ts-pulse 1.8s ease-in-out infinite', animationDelay:'.9s' }}/>
      </motion.div>
    </motion.div>
  )
}
