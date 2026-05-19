import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Server, Filter, Cpu, List, Code, X } from 'lucide-react'

const NODES = [
  {
    id: 'input',
    label: 'User Image',
    sublabel: 'JPEG / PNG',
    icon: Camera,
    color: '#fbbf24',
    detail: 'Single leaf photo uploaded via multipart/form-data POST request to the FastAPI endpoint.',
  },
  {
    id: 'api',
    label: 'FastAPI',
    sublabel: 'Endpoint',
    icon: Server,
    color: '#60a5fa',
    detail: 'Async FastAPI server handles image upload, validation, preprocessing, and model inference in one request.',
  },
  {
    id: 'preprocess',
    label: 'Preprocessing',
    sublabel: 'Resize · Normalize',
    icon: Filter,
    color: '#c084fc',
    detail: 'Image resized to 224×224, normalized with ImageNet mean/std. Applied as a torchvision transform pipeline.',
  },
  {
    id: 'model',
    label: 'EfficientNet-B0',
    sublabel: 'Fine-tuned',
    icon: Cpu,
    color: '#4ade80',
    detail: 'EfficientNet-B0 pretrained on ImageNet, fine-tuned on 38-class PlantVillage dataset. 89% top-1 accuracy.',
  },
  {
    id: 'output',
    label: 'Top-3 Predictions',
    sublabel: '+ Confidence',
    icon: List,
    color: '#34d399',
    detail: 'Softmax over 38 disease classes. Returns top-3 class names with confidence scores and treatment links.',
  },
  {
    id: 'response',
    label: 'JSON Response',
    sublabel: '<200ms',
    icon: Code,
    color: '#94a3b8',
    detail: 'Structured JSON with predictions array, inference_ms timestamp, model_version, and request_id.',
  },
]

export default function ArchitectureDiagram() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Flow row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          flexWrap: 'nowrap',
          overflowX: 'auto',
        }}
      >
        {NODES.map((node, i) => {
          const Icon = node.icon
          const isSelected = selected === node.id
          return (
            <div key={node.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.35 }}
                onClick={() => setSelected(isSelected ? null : node.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 12px',
                  width: 105,
                  borderRadius: 12,
                  background: isSelected
                    ? `rgba(${node.color === '#4ade80' ? '74,222,128' : '255,255,255'},0.08)`
                    : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${isSelected ? node.color : 'rgba(255,255,255,0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 0 20px ${node.color}33` : 'none',
                }}
                whileHover={{
                  borderColor: node.color,
                  background: 'rgba(255,255,255,0.06)',
                  boxShadow: `0 0 16px ${node.color}22`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `${node.color}15`,
                    border: `1px solid ${node.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: node.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f0fdf4', lineHeight: 1.3 }}>
                    {node.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      color: node.color,
                      fontFamily: 'JetBrains Mono, monospace',
                      marginTop: 2,
                    }}
                  >
                    {node.sublabel}
                  </div>
                </div>
              </motion.div>

              {/* Animated arrow */}
              {i < NODES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <svg width="32" height="16" viewBox="0 0 32 16">
                    <line
                      x1="2" y1="8" x2="24" y2="8"
                      stroke="rgba(74,222,128,0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="animate-dash"
                    />
                    <polygon
                      points="24,4 30,8 24,12"
                      fill="rgba(74,222,128,0.5)"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: 24,
              padding: '14px 18px',
              borderRadius: 10,
              background: 'rgba(10,20,16,0.9)',
              border: `1px solid ${NODES.find(n => n.id === selected)?.color ?? '#4ade80'}50`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              maxWidth: 600,
              margin: '24px auto 0',
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 600, color: NODES.find(n => n.id === selected)?.color, marginBottom: 6 }}>
                {NODES.find(n => n.id === selected)?.label}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(240,253,244,0.8)', lineHeight: 1.6 }}>
                {NODES.find(n => n.id === selected)?.detail}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{ color: 'rgba(240,253,244,0.4)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
