import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SlideLayout from './components/SlideLayout'
import SlideNav from './components/SlideNav'
import Slide01_Title from './slides/Slide01_Title'
import Slide02_Team from './slides/Slide02_Team'
import Slide03_Problem from './slides/Slide03_Problem'
import Slide04_Solution from './slides/Slide04_Solution'
import Slide05_Demo from './slides/Slide05_Demo'
import Slide05_Timeline from './slides/Slide05_Timeline'
import Slide06_Architecture from './slides/Slide06_Architecture'

const SLIDES = [
  Slide01_Title,
  Slide02_Team,
  Slide03_Problem,
  Slide04_Solution,
  Slide05_Demo,
  Slide05_Timeline,
  Slide06_Architecture,
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback(
    (index) => {
      if (index < 0 || index >= SLIDES.length) return
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => goTo(current + 1), [goTo, current])
  const prev = useCallback(() => goTo(current - 1), [goTo, current])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prev()
          break
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {})
          } else {
            document.exitFullscreen().catch(() => {})
          }
          break
        default: {
          const n = parseInt(e.key)
          if (n >= 1 && n <= SLIDES.length) goTo(n - 1)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, goTo])

  const CurrentSlide = SLIDES[current]

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a1410',
        position: 'relative',
      }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <SlideLayout
            slideNumber={current + 1}
            totalSlides={SLIDES.length}
            isHero={current === 0}
          >
            <CurrentSlide />
          </SlideLayout>
        </motion.div>
      </AnimatePresence>

      <SlideNav
        current={current}
        total={SLIDES.length}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
      />
    </div>
  )
}
