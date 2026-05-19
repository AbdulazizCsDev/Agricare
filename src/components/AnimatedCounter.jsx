import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ target, suffix = '', duration = 1800, className = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!isInView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  )
}
