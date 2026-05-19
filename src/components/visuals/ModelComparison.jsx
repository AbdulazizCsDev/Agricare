import { motion } from 'framer-motion'

const models = [
  { name: 'ResNet18', accuracy: 78, params: '11.7M', latency: '42ms', color: '#6ee7b7' },
  { name: 'MobileNetV2', accuracy: 81, params: '3.4M', latency: '28ms', color: '#fbbf24' },
  { name: 'EfficientNet-B0', accuracy: 89, params: '5.3M', latency: '38ms', color: '#4ade80', winner: true },
]

export default function ModelComparison() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {models.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '12px 16px',
            borderRadius: 10,
            background: m.winner ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${m.winner ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: m.color,
              width: 130,
              flexShrink: 0,
            }}
          >
            {m.name}
            {m.winner && <span style={{ marginLeft: 6, fontSize: '0.65rem', color: '#4ade80' }}>★ BEST</span>}
          </span>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.5)' }}>Accuracy</span>
              <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', color: m.color }}>
                {m.accuracy}%
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.accuracy}%` }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.7, ease: 'easeOut' }}
                style={{ height: '100%', background: m.color, borderRadius: 4 }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)' }}>Params</div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'rgba(240,253,244,0.8)' }}>
                {m.params}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(240,253,244,0.4)' }}>Latency</div>
              <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: 'rgba(240,253,244,0.8)' }}>
                {m.latency}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
