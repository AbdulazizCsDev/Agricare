import { motion } from 'framer-motion'
import ArchitectureDiagram from '../components/visuals/ArchitectureDiagram'
import { Zap, Package, Clock, BarChart2 } from 'lucide-react'

const FEATURES = [
  { icon: BarChart2, label: 'Top-3 predictions', color: '#4ade80' },
  { icon: Zap,       label: 'Confidence scoring', color: '#fbbf24' },
  { icon: Package,   label: 'Dockerized',          color: '#60a5fa' },
  { icon: Clock,     label: '<200ms inference',    color: '#c084fc' },
]

const glass = {
  background:    'rgba(0,0,0,0.55)',
  border:        '1px solid rgba(74,222,128,0.12)',
  borderRadius:  16,
  backdropFilter:'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
}

export default function Slide06_Architecture() {
  return (
    <div style={{
      width:      '100%',
      minHeight:  '100vh',
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding:    '80px 48px',
      position:   'relative',
    }}>

      {/* ── Centered glass card — sits on top of root background ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          ...glass,
          width:     '100%',
          maxWidth:  1100,
          padding:   '52px 60px 48px',
          display:   'flex',
          flexDirection: 'column',
          gap:       32,
        }}
      >

        {/* Header */}
        <div>
          <p style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '0.68rem',
            color:         'rgba(74,222,128,0.55)',
            letterSpacing: '0.14em',
            marginBottom:  10,
          }}>
            SYSTEM ARCHITECTURE
          </p>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
            Request{' '}
            <span style={{ color: 'rgba(240,253,244,0.3)', fontSize: '1.5rem', fontWeight: 300 }}>→</span>{' '}
            <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
              Response
            </span>
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'rgba(240,253,244,0.38)', marginTop: 6 }}>
            Click any node to inspect it
          </p>
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <ArchitectureDiagram />
        </motion.div>

        {/* Stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
        >
          {['PyTorch', 'EfficientNet-B0', 'FastAPI', 'Docker', 'Uvicorn', 'torchvision'].map((tech) => (
            <span key={tech} style={{
              fontSize:   '0.82rem',
              fontWeight: 600,
              fontFamily: 'JetBrains Mono, monospace',
              color:      'rgba(74,222,128,0.85)',
              background: 'rgba(74,222,128,0.08)',
              border:     '1px solid rgba(74,222,128,0.22)',
              borderRadius: 100,
              padding:    '5px 14px',
            }}>
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.4 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.07, duration: 0.3 }}
                style={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        9,
                  padding:    '10px 18px',
                  borderRadius: 100,
                  background: `${f.color}10`,
                  border:     `1px solid ${f.color}30`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Icon size={16} color={f.color} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(240,253,244,0.85)' }}>
                  {f.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

      </motion.div>
    </div>
  )
}
