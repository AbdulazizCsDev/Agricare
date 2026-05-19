import { motion } from 'framer-motion'
import ArchitectureDiagram from '../components/visuals/ArchitectureDiagram'
import { Zap, Package, Clock, BarChart2 } from 'lucide-react'

const FEATURES = [
  { icon: BarChart2, label: 'Top-3 predictions', color: '#4ade80' },
  { icon: Zap, label: 'Confidence scoring', color: '#fbbf24' },
  { icon: Package, label: 'Dockerized', color: '#60a5fa' },
  { icon: Clock, label: '<200ms inference', color: '#c084fc' },
]

export default function Slide06_Architecture() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        gap: 40,
        padding: '100px 52px 88px',
      }}
    >
      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <p
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              color: 'rgba(74,222,128,0.55)',
              letterSpacing: '0.12em',
              marginBottom: 10,
            }}
          >
            SYSTEM ARCHITECTURE
          </p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2 }}>
            Request{' '}
            <span style={{ color: 'rgba(240,253,244,0.35)', fontSize: '1.6rem', fontWeight: 300 }}>→</span>{' '}
            <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.35)' }}>
              Response
            </span>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(240,253,244,0.45)', marginTop: 8 }}>
            Click any node to inspect it
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ArchitectureDiagram />
        </div>

        {/* Stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}

          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.4 }}
          style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}
        >
          {['PyTorch', 'EfficientNet-B0', 'FastAPI', 'Docker', 'Uvicorn', 'torchvision'].map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                color: 'rgba(74,222,128,0.7)',
                background: 'rgba(74,222,128,0.07)',
                border: '1px solid rgba(74,222,128,0.2)',
                borderRadius: 100,
                padding: '4px 10px',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right panel: key features */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}

        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.45 }}
        style={{
          width: 200,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: 'rgba(74,222,128,0.5)',
            letterSpacing: '0.1em',
            marginBottom: 4,
          }}
        >
          KEY FEATURES
        </p>

        {FEATURES.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.35 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                background: `${f.color}0c`,
                border: `1px solid ${f.color}28`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: `${f.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: f.color,
                  flexShrink: 0,
                }}
              >
                <Icon size={15} />
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'rgba(240,253,244,0.85)',
                  lineHeight: 1.35,
                }}
              >
                {f.label}
              </span>
            </motion.div>
          )
        })}

        {/* Response preview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}

          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.4 }}
          style={{
            marginTop: 8,
            padding: '12px',
            borderRadius: 8,
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.06)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.58rem',
            color: 'rgba(240,253,244,0.5)',
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: '#4ade80' }}>{'{'}</span>
          <br />
          &nbsp;&nbsp;<span style={{ color: '#60a5fa' }}>"predictions"</span>: [...]
          <br />
          &nbsp;&nbsp;<span style={{ color: '#60a5fa' }}>"inference_ms"</span>: 142
          <br />
          &nbsp;&nbsp;<span style={{ color: '#60a5fa' }}>"model"</span>: <span style={{ color: '#fbbf24' }}>"efficientnet-b0"</span>
          <br />
          <span style={{ color: '#4ade80' }}>{'}'}</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
