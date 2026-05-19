import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = 70
    const MAX_DIST = 160

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(74,222,128,${(1 - d / MAX_DIST) * 0.22})`
            ctx.lineWidth = 0.6
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }

      pts.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74,222,128,0.55)'
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.75,
      }}
    />
  )
}

export default function Slide01_Title() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        gap: 0,
      }}
    >
      <ParticleCanvas />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          textAlign: 'center',
          padding: '0 40px',
          maxWidth: 820,
        }}
      >
        {/* Logo hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Logo size="xl" animated={true} />
        </motion.div>

        {/* Tagline */}
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

        {/* Elevator pitch */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          style={{
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'rgba(240,253,244,0.65)',
            maxWidth: 640,
            lineHeight: 1.75,
          }}
        >
          "An end-to-end computer vision pipeline that turns a single leaf photo into accurate,
          deployable disease diagnosis for farmers, retailers, and crop consultants."
        </motion.p>

        {/* Press hint */}
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
          <span>Press</span>
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
            →
          </motion.span>
          <span>to begin</span>
        </motion.div>
      </div>
    </div>
  )
}
