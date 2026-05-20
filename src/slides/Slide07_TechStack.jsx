import { motion } from 'framer-motion'

const LAYERS = [
  {
    id: 'data',
    number: '01',
    title: 'DATA LAYER',
    subtitle: 'Collection, Processing & Storage',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.15)',
    border: 'rgba(96,165,250,0.25)',
    tools: [
      {
        name: 'Albumentations',
        role: 'Augmentation Pipeline',
        icon: '🔄',
        bg: 'rgba(96,165,250,0.08)',
      },
      {
        name: 'OpenCV',
        role: 'Image Processing',
        icon: '📷',
        bg: 'rgba(96,165,250,0.08)',
      },
      {
        name: 'Pandas & NumPy',
        role: 'Metadata & Numerical Analysis',
        icon: '📊',
        bg: 'rgba(96,165,250,0.08)',
      },
      {
        name: 'Scikit-Learn',
        role: 'Stratified Splits',
        icon: '⚗️',
        bg: 'rgba(96,165,250,0.08)',
      },
    ],
  },
  {
    id: 'model',
    number: '02',
    title: 'MODEL LAYER',
    subtitle: 'Architecture, Training & MLOps',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    border: 'rgba(167,139,250,0.25)',
    tools: [
      {
        name: 'ResNet-18',
        role: 'Baseline Model',
        icon: '🧠',
        bg: 'rgba(167,139,250,0.08)',
      },
      {
        name: 'PyTorch',
        role: 'Deep Learning Framework',
        icon: '🔥',
        bg: 'rgba(167,139,250,0.08)',
      },
      {
        name: 'EfficientNet-B0',
        role: 'Production Model',
        icon: '⚡',
        bg: 'rgba(167,139,250,0.08)',
      },
      {
        name: 'MLflow',
        role: 'Experiment Tracking & Registry',
        icon: '📈',
        bg: 'rgba(167,139,250,0.08)',
      },
    ],
  },
  {
    id: 'deploy',
    number: '03',
    title: 'DEPLOYMENT LAYER',
    subtitle: 'Inference Serving & UI',
    color: '#4ade80',
    glow: 'rgba(74,222,128,0.15)',
    border: 'rgba(74,222,128,0.25)',
    tools: [
      {
        name: 'Streamlit',
        role: 'User Interface',
        icon: '🖥️',
        bg: 'rgba(74,222,128,0.08)',
      },
      {
        name: 'FastAPI',
        role: 'Inference API',
        icon: '⚡',
        bg: 'rgba(74,222,128,0.08)',
      },
      {
        name: 'Docker',
        role: 'Microservice Containerization',
        icon: '🐳',
        bg: 'rgba(74,222,128,0.08)',
      },
      {
        name: 'Uvicorn',
        role: 'ASGI Server',
        icon: '🚀',
        bg: 'rgba(74,222,128,0.08)',
      },
    ],
  },
]

const vp = { once: true, margin: '-60px' }

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
        padding: '100px 48px 80px',
        gap: 48,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: 'rgba(74,222,128,0.55)',
            letterSpacing: '0.18em',
            marginBottom: 14,
          }}
        >
          INTEGRATED TECH STACK
        </p>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#f0fdf4',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Agro-Mind{' '}
          <span
            style={{
              color: '#4ade80',
              textShadow: '0 0 28px rgba(74,222,128,0.45)',
            }}
          >
            Pipeline
          </span>
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(240,253,244,0.45)',
            marginTop: 10,
            fontStyle: 'italic',
          }}
        >
          Seamless, Scalable, Production-Ready Computer Vision Pipeline
        </p>
      </motion.div>

      {/* Layers */}
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {LAYERS.map((layer, li) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: li % 2 === 0 ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ delay: li * 0.15, duration: 0.5, ease: 'easeOut' }}
            style={{
              background: layer.glow,
              border: `1px solid ${layer.border}`,
              borderRadius: 20,
              padding: '28px 32px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Layer header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: layer.color,
                  background: `${layer.border}`,
                  border: `1px solid ${layer.color}40`,
                  borderRadius: 8,
                  padding: '4px 10px',
                }}
              >
                {layer.number}
              </span>
              <div>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: layer.color,
                    letterSpacing: '0.06em',
                  }}
                >
                  {layer.title}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(240,253,244,0.45)',
                    marginLeft: 10,
                  }}
                >
                  — {layer.subtitle}
                </span>
              </div>
            </div>

            {/* Tool cards grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
              }}
            >
              {layer.tools.map((tool, ti) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ delay: li * 0.15 + ti * 0.07 + 0.2, duration: 0.35 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 6px 24px ${layer.color}22`,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    borderRadius: 14,
                    background: 'rgba(0,0,0,0.35)',
                    border: `1px solid ${layer.color}20`,
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${layer.color}12`,
                      border: `1px solid ${layer.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      flexShrink: 0,
                    }}
                  >
                    {tool.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#f0fdf4',
                        lineHeight: 1.3,
                      }}
                    >
                      {tool.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        color: layer.color,
                        marginTop: 3,
                        opacity: 0.85,
                      }}
                    >
                      {tool.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 24px',
          borderRadius: 100,
          background: 'rgba(74,222,128,0.06)',
          border: '1px solid rgba(74,222,128,0.18)',
        }}
      >
        <span style={{ color: '#4ade80', fontSize: '1rem' }}>✦</span>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.78rem',
            color: 'rgba(240,253,244,0.55)',
            letterSpacing: '0.06em',
          }}
        >
          End-to-End · Production-Ready · &lt;200ms Inference
        </span>
        <span style={{ color: '#4ade80', fontSize: '1rem' }}>✦</span>
      </motion.div>
    </div>
  )
}
