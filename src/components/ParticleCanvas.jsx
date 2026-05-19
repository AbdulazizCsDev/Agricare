import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ opacity = 0.5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT    = 55
    const MAX_DIST = 150

    const pts = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.6 + 0.6,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lines with glow
      ctx.save()
      ctx.shadowColor = 'rgba(74,222,128,0.6)'
      ctx.shadowBlur  = 6
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.55
            ctx.beginPath()
            ctx.strokeStyle = `rgba(74,222,128,${alpha})`
            ctx.lineWidth   = 0.8
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.restore()

      // Particles — outer glow ring + bright core
      pts.forEach((p) => {
        // Outer glow
        ctx.save()
        ctx.shadowColor = '#4ade80'
        ctx.shadowBlur  = 14
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74,222,128,0.12)'
        ctx.fill()
        ctx.restore()

        // Bright core
        ctx.save()
        ctx.shadowColor = '#4ade80'
        ctx.shadowBlur  = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(74,222,128,0.9)'
        ctx.fill()
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
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
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        opacity,
      }}
    />
  )
}
