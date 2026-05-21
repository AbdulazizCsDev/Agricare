import { motion } from 'framer-motion'

const SIZES = { sm: 120, md: 200, lg: 300, xl: 420 }

export default function Logo({ size = 'md', animated = true }) {
  const width = SIZES[size]
  const height = Math.round(width * (80 / 240))

  const nodeVariants = animated
    ? {
        animate: {
          scale: [1, 1.35, 1],
          opacity: [1, 0.45, 1],
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        },
      }
    : {}

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`leafGrad-${size}`} x1="0%" y1="90%" x2="75%" y2="0%">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
        <linearGradient id={`veinGrad-${size}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.9" />
        </linearGradient>
        <filter id={`nodeGlow-${size}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`leafGlow-${size}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Leaf background fill */}
      <path
        d="M38,72 C12,66 8,22 22,10 C30,3 50,2 60,14 C70,26 68,58 52,68 C46,72 38,72 38,72Z"
        fill={`url(#leafGrad-${size})`}
        opacity="0.1"
        filter={`url(#leafGlow-${size})`}
      />
      {/* Leaf outline */}
      <path
        d="M38,72 C12,66 8,22 22,10 C30,3 50,2 60,14 C70,26 68,58 52,68 C46,72 38,72 38,72Z"
        fill="none"
        stroke={`url(#leafGrad-${size})`}
        strokeWidth="1.5"
        filter={`url(#leafGlow-${size})`}
      />

      {/* Stem */}
      <line x1="38" y1="68" x2="38" y2="40" stroke={`url(#veinGrad-${size})`} strokeWidth="1.1" />

      {/* Left branch */}
      <line x1="38" y1="40" x2="26" y2="26" stroke={`url(#veinGrad-${size})`} strokeWidth="1.1" />

      {/* Right branch */}
      <line x1="38" y1="40" x2="50" y2="26" stroke={`url(#veinGrad-${size})`} strokeWidth="1.1" />

      {/* Outer node (bottom) */}
      <circle cx="38" cy="68" r="2" fill="#4ade80" opacity="0.6" filter={`url(#nodeGlow-${size})`} />

      {/* Branch tip nodes */}
      <circle cx="26" cy="26" r="2.5" fill="#4ade80" opacity="0.85" filter={`url(#nodeGlow-${size})`} />
      <circle cx="50" cy="26" r="2.5" fill="#4ade80" opacity="0.85" filter={`url(#nodeGlow-${size})`} />

      {/* Central node — animated pulse */}
      {animated ? (
        <motion.circle
          cx="38" cy="40" r="4"
          fill="#4ade80"
          filter={`url(#nodeGlow-${size})`}
          variants={nodeVariants}
          animate="animate"
        />
      ) : (
        <circle cx="38" cy="40" r="4" fill="#4ade80" filter={`url(#nodeGlow-${size})`} />
      )}

      {/* Wordmark */}
      <text
        x="82"
        y="50"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="26"
        letterSpacing="-0.5"
      >
        <tspan fontWeight="800" fill="#f0fdf4">Agro</tspan>
        <tspan fontWeight="400" fill="#4ade80">-Mind</tspan>
      </text>
    </svg>
  )
}
