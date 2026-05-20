import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const STAGES = [
  { num: 3, label: 'Deployment',     status: 'upcoming', topPct: 12 },
  { num: 2, label: 'Model Training', status: 'upcoming', topPct: 34 },
  {
    num: 1,
    label: 'Data Collection, Cleaning & Augmentation',
    status: 'active',
    topPct: 52,
    tasks: [
      { member: 'Khaled',     task: 'PlantVillage + Agro-Mind datasets'      },
      { member: 'Abdulaziz',  task: 'Deduplication + blur detection'         },
      { member: 'Abdulmalik', task: 'Label verification + mislabel detection'},
      { member: 'Musaad',     task: 'Class imbalance + augmentation'         },
    ],
  },
]

/* Timing (seconds) ─────────────────────────────────────────── */
const TREE_SETTLE = 1.8   // wait for tree camera to settle
const SPINE_DUR   = 2.0   // spine draws bottom→top over this duration

// Spine spans from S1 (52%) to S3 (12%), total = 40% of viewport height
// Fraction of spine traveled when it reaches each node (from bottom):
//   S1 → 0/40 = 0.00  (immediately, it's at the start/bottom)
//   S2 → 18/40 = 0.45
//   S3 → 40/40 = 1.00
const UNLOCK = {
  1: TREE_SETTLE + 0.1,
  2: TREE_SETTLE + SPINE_DUR * 0.45,
  3: TREE_SETTLE + SPINE_DUR * 1.0,
}
const BADGE_DELAY = UNLOCK[1] + 1.2   // badge activates after S1 unlock

const SPINE_TOP    = STAGES[0].topPct   // 12%
const SPINE_BOTTOM = STAGES[2].topPct   // 52%
const SPINE_H      = SPINE_BOTTOM - SPINE_TOP  // 40%

export default function Slide05_Timeline() {
  /* Increment every time the #timeline section enters the viewport */
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const section = document.getElementById('timeline')
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimKey(k => k + 1) },
      { threshold: 0.5 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{
      width: '100%', height: '100vh',
      boxSizing: 'border-box',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Left dark overlay */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '52%',
        background: 'linear-gradient(to right, rgba(4,12,8,.85) 58%, transparent 100%)',
        pointerEvents: 'none', zIndex: 4,
      }} />

      {/* Header */}
      <motion.div
        key={`hdr-${animKey}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', top: 88, left: 48, zIndex: 10 }}
      >
        <p style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.67rem',
          color: 'rgba(74,222,128,.55)', letterSpacing: '0.16em', marginBottom: 6,
        }}>
          PROJECT TIMELINE
        </p>
        <h2 style={{
          fontSize: 'clamp(1.6rem,2.4vw,2.1rem)', fontWeight: 800,
          color: '#f0fdf4', lineHeight: 1.15, margin: 0,
        }}>
          3 Stages —{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 22px rgba(74,222,128,.5)' }}>
            Stage 1
          </span>{' '}Active
        </h2>
      </motion.div>

      {/* ── Spine: bottom → top ──────────────────────────────── */}
      <div style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: `${SPINE_TOP}%`, height: `${SPINE_H}%`,
        width: 4, zIndex: 8,
      }}>
        {/* Draws from bottom upward */}
        <motion.div
          key={`spine-${animKey}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: SPINE_DUR, delay: TREE_SETTLE, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            transformOrigin: 'bottom',
            background: 'linear-gradient(to top, #4ade80 0%, #4ade80 90%, rgba(74,222,128,0))',
            boxShadow: '0 0 10px #4ade80, 0 0 28px rgba(74,222,128,.55)',
            borderRadius: 2,
          }}
        />

        {/* Pulse — starts after spine finishes */}
        <motion.div
          key={`pulse-${animKey}`}
          initial={{ opacity: 0, y: '110%' }}
          animate={{ opacity: [0, 1, 1, 1], y: ['110%', '-10%'] }}
          transition={{
            delay: TREE_SETTLE + SPINE_DUR + 0.3,
            duration: 2.6,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            width: 10, height: '22%',
            background: 'linear-gradient(to top, transparent, #d4ffd4 50%, transparent)',
            boxShadow: '0 0 20px #4ade80, 0 0 50px rgba(74,222,128,.7)',
            borderRadius: 5, filter: 'blur(1px)',
          }}
        />
      </div>

      {/* ── Stage rows ────────────────────────────────────────── */}
      {STAGES.map((stage) => {
        const isActive  = stage.status === 'active'
        const unlockAt  = UNLOCK[stage.num]

        return (
          <div
            key={stage.num}
            style={{
              position: 'absolute',
              top: `${stage.topPct}%`,
              left: 0, right: 0,
              display: 'flex',
              alignItems: isActive ? 'flex-start' : 'center',
              transform: isActive ? 'translateY(-12px)' : 'translateY(-50%)',
              zIndex: 10,
            }}
          >
            {/* Card: hidden until spine reaches this node */}
            <motion.div
              key={`card-${stage.num}-${animKey}`}
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: unlockAt, ease: 'easeOut' }}
              style={{
                paddingLeft: 44,
                flex: '0 0 calc(50% - 20px)',
                display: 'flex', justifyContent: 'flex-end',
              }}
            >
              <StageCard
                stage={stage}
                isActive={isActive}
                badgeDelay={BADGE_DELAY}
                animKey={animKey}
              />
            </motion.div>

            {/* Connector */}
            <motion.div
              key={`conn-${stage.num}-${animKey}`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: unlockAt + 0.1 }}
              style={{
                width: 36, height: isActive ? 2 : 1.5,
                marginTop: isActive ? 11 : 0,
                flexShrink: 0,
                transformOrigin: 'right',
                background: isActive
                  ? 'linear-gradient(to right, rgba(74,222,128,.5), #4ade80)'
                  : 'linear-gradient(to right, rgba(74,222,128,.1), rgba(74,222,128,.45))',
                boxShadow: isActive ? '0 0 6px rgba(74,222,128,.5)' : 'none',
              }}
            />

            {/* Node dot — all appear dimmed, then unlock when spine reaches them */}
            <motion.div
              key={`dot-${stage.num}-${animKey}`}
              /* Step 1: appear dimmed (all at once, before tree settles) */
              initial={{ opacity: 0, scale: 0.5 }}
              animate={[
                /* fade in as dim dot */
                { opacity: 0.3, scale: 1,
                  transition: { duration: 0.4, delay: TREE_SETTLE - 0.5 } },
                /* then fully unlock when spine reaches it */
                { opacity: 1, scale: 1,
                  transition: { duration: 0.4, delay: unlockAt } },
              ]}
              style={{
                width: isActive ? 24 : 14,
                height: isActive ? 24 : 14,
                marginTop: isActive ? 11 : 0,
                borderRadius: '50%',
                background: isActive ? '#4ade80' : 'rgba(74,222,128,.2)',
                border: `2px solid ${isActive ? '#4ade80' : 'rgba(74,222,128,.6)'}`,
                boxShadow: isActive
                  ? '0 0 30px rgba(74,222,128,1)'
                  : '0 0 8px rgba(74,222,128,.4)',
                flexShrink: 0,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

function StageCard({ stage, isActive, badgeDelay, animKey }) {
  return (
    <div style={{
      padding: isActive ? '14px 18px' : '9px 16px',
      borderRadius: 12,
      background: isActive ? 'rgba(74,222,128,.10)' : 'rgba(14,26,18,.75)',
      border: `1px solid ${isActive ? 'rgba(74,222,128,.45)' : 'rgba(74,222,128,.2)'}`,
      backdropFilter: 'blur(16px)',
      boxShadow: isActive ? '0 0 40px rgba(74,222,128,.18)' : '0 4px 20px rgba(0,0,0,.5)',
      width: isActive ? 360 : 'auto', maxWidth: isActive ? 380 : 260,
    }}>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: isActive ? 10 : 0, flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
          color: isActive ? 'rgba(74,222,128,.7)' : 'rgba(255,255,255,.35)',
        }}>
          S{stage.num}
        </span>
        <span style={{
          fontSize: isActive ? '0.95rem' : '0.85rem',
          fontWeight: isActive ? 700 : 600,
          color: isActive ? '#f0fdf4' : 'rgba(240,253,244,.65)',
          lineHeight: 1.3,
        }}>
          {stage.label}
        </span>

        {isActive && (
          <motion.span
            key={`badge-${animKey}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: badgeDelay }}
            style={{ display: 'inline-block' }}
          >
            <motion.span
              animate={{ opacity: [1, .3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: badgeDelay + 0.4 }}
              style={{
                display: 'inline-block',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.54rem', fontWeight: 700,
                color: '#4ade80',
                background: 'rgba(74,222,128,.12)',
                border: '1px solid rgba(74,222,128,.4)',
                borderRadius: 100, padding: '3px 8px',
                letterSpacing: '0.1em', whiteSpace: 'nowrap',
              }}
            >
              IN PROGRESS
            </motion.span>
          </motion.span>
        )}
      </div>

      {isActive && stage.tasks?.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '6px 16px', paddingTop: 8,
          borderTop: '1px solid rgba(74,222,128,.18)',
        }}>
          {stage.tasks.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <div style={{
                width: 5, height: 5, marginTop: 6, borderRadius: '50%',
                background: '#4ade80', flexShrink: 0,
                boxShadow: '0 0 6px rgba(74,222,128,.8)',
              }} />
              <div>
                <span style={{
                  fontSize: '0.71rem', color: 'rgba(240,253,244,.9)',
                  display: 'block', lineHeight: 1.35,
                }}>
                  {t.task}
                </span>
                <span style={{
                  fontSize: '0.6rem', color: 'rgba(74,222,128,.7)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {t.member}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
