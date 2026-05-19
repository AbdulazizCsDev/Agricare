import { motion } from 'framer-motion'
import { team } from '../data/team'

const COLORS = ['#4ade80', '#60a5fa', '#c084fc', '#fbbf24']

export default function Slide02_Team() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 60px 80px',
        gap: 48,
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.72rem',
            color: 'rgba(74,222,128,0.55)',
            letterSpacing: '0.12em',
            marginBottom: 10,
          }}
        >
          THE TEAM
        </p>
        <h2
          style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            color: '#f0fdf4',
            lineHeight: 1.2,
          }}
        >
          Built by{' '}
          <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
            four engineers
          </span>
        </h2>
      </motion.div>

      {/* Cards row */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'stretch',
          flexWrap: 'nowrap',
        }}
      >
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
            whileHover={{
              y: -8,
              boxShadow: `0 8px 32px ${COLORS[i]}33, 0 0 0 1px ${COLORS[i]}60`,
            }}
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              padding: '32px 28px',
              width: 200,
              cursor: 'default',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `${COLORS[i]}18`,
                border: `2px solid ${COLORS[i]}50`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: COLORS[i],
                fontFamily: 'Inter, sans-serif',
                boxShadow: `0 0 24px ${COLORS[i]}22`,
              }}
            >
              {member.initials}
            </div>

            {/* Name */}
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#f0fdf4',
                  lineHeight: 1.35,
                  marginBottom: 10,
                }}
              >
                {member.name}
              </p>

              {/* Role badge */}
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: COLORS[i],
                  background: `${COLORS[i]}15`,
                  border: `1px solid ${COLORS[i]}35`,
                  borderRadius: 100,
                  padding: '4px 12px',
                }}
              >
                {member.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
