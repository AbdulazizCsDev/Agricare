import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4'

export default function Slide05_Demo() {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [controlsVisible, setControlsVisible] = useState(true)
  const hideTimer = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
    setPlaying(true)
  }, [])

  const showControls = useCallback(() => {
    setControlsVisible(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2800)
  }, [])

  useEffect(() => {
    showControls()
    return () => clearTimeout(hideTimer.current)
  }, [showControls])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }, [])

  const handleSeek = useCallback((e) => {
    const v = videoRef.current
    const bar = progressRef.current
    if (!v || !bar) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * v.duration
    setProgress(ratio * 100)
  }, [])

  const handleFullscreen = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
  }, [])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 52px 68px',
        gap: 20,
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ flexShrink: 0 }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(74,222,128,0.55)',
            letterSpacing: '0.12em',
            marginBottom: 8,
          }}
        >
          SYSTEM DEMO
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f0fdf4', lineHeight: 1.2, margin: 0 }}>
            See Agricare{' '}
            <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.35)' }}>
              in Action
            </span>
          </h2>
          {/* Live badge */}
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(74,222,128,0.1)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: 100,
              padding: '3px 10px',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span
              style={{
                fontSize: '0.6rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#4ade80',
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              LIVE
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Video card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        onMouseMove={showControls}
        onMouseEnter={showControls}
        style={{
          flex: 1,
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          background: '#000',
          border: '1px solid rgba(74,222,128,0.18)',
          boxShadow:
            '0 0 0 1px rgba(74,222,128,0.06), 0 8px 40px rgba(0,0,0,0.6), 0 0 80px rgba(74,222,128,0.06)',
          cursor: 'none',
        }}
      >
        {/* Corner accents */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
          <div
            key={pos}
            style={{
              position: 'absolute',
              zIndex: 10,
              width: 20,
              height: 20,
              ...(pos.includes('top') ? { top: 10 } : { bottom: 10 }),
              ...(pos.includes('left') ? { left: 10 } : { right: 10 }),
              borderTop: pos.includes('top') ? '2px solid rgba(74,222,128,0.5)' : 'none',
              borderBottom: pos.includes('bottom') ? '2px solid rgba(74,222,128,0.5)' : 'none',
              borderLeft: pos.includes('left') ? '2px solid rgba(74,222,128,0.5)' : 'none',
              borderRight: pos.includes('right') ? '2px solid rgba(74,222,128,0.5)' : 'none',
              pointerEvents: 'none',
            }}
          />
        ))}

        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          loop
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onClick={togglePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            cursor: 'pointer',
          }}
        />

        {/* Controls overlay */}
        <motion.div
          animate={{ opacity: controlsVisible ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(10,20,16,0.95) 0%, rgba(10,20,16,0.6) 60%, transparent 100%)',
            padding: '40px 16px 14px',
            pointerEvents: controlsVisible ? 'auto' : 'none',
          }}
        >
          {/* Progress bar */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            style={{
              width: '100%',
              height: 3,
              background: 'rgba(240,253,244,0.12)',
              borderRadius: 2,
              marginBottom: 12,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                borderRadius: 2,
                boxShadow: '0 0 8px rgba(74,222,128,0.6)',
                transition: 'width 0.1s linear',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: -4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 6px rgba(74,222,128,0.8)',
                }}
              />
            </div>
          </div>

          {/* Buttons row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={togglePlay} style={iconBtn}>
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button onClick={toggleMute} style={iconBtn}>
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            {duration > 0 && (
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.62rem',
                  color: 'rgba(240,253,244,0.45)',
                  marginLeft: 4,
                }}
              >
                {fmt((progress / 100) * duration)} / {fmt(duration)}
              </span>
            )}

            <div style={{ flex: 1 }} />

            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'rgba(74,222,128,0.4)',
                letterSpacing: '0.1em',
              }}
            >
              AGRICARE · DEMO
            </span>

            <button onClick={handleFullscreen} style={iconBtn}>
              <Maximize2 size={13} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const iconBtn = {
  background: 'rgba(74,222,128,0.1)',
  border: '1px solid rgba(74,222,128,0.22)',
  borderRadius: 7,
  padding: '6px 10px',
  cursor: 'pointer',
  color: '#4ade80',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.15s',
}
