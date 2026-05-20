import { motion } from 'framer-motion'
import Logo from '../components/Logo'

export default function Slide01_Title() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        paddingLeft: '6vw',
      }}
    >
      {/* Particle layer */}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 24,
          textAlign: 'left',
          maxWidth: 560,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Logo size="xl" animated={true} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#4ade80',
            letterSpacing: '0.04em',
            fontFamily: 'JetBrains Mono, monospace',
            textShadow: '0 0 20px rgba(74,222,128,0.4)',
          }}
        >
          AI-Powered Crop Disease Diagnosis
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          style={{
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'rgba(240,253,244,0.65)',
            maxWidth: 480,
            lineHeight: 1.75,
          }}
        >
          "An end-to-end computer vision pipeline that turns a single leaf photo into accurate,
          deployable disease diagnosis for farmers, retailers, and crop consultants."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(74,222,128,0.45)',
            fontSize: '0.78rem',
            fontFamily: 'JetBrains Mono, monospace',
            marginTop: 8,
          }}
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(74,222,128,0.35)',
              borderRadius: 5,
              padding: '1px 7px',
              fontSize: '0.75rem',
              color: '#4ade80',
            }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}
