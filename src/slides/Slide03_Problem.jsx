import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const PROBLEMS = [
  { text: 'Poor model accuracy due to limited data or its poor quality.',                                                              color: '#fbbf24' },
  { text: 'Customer support team lacks agronomy background — they rely on LLMs.',                                                     color: '#ef4444' },
  { text: 'Expensive to keep customer service staff available 24/7.',                                                                 color: '#f97316' },
  { text: 'Wrong diagnoses lead to bad pesticide recommendations for farmers.',                                                        color: '#fbbf24' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y:  0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const slideIn = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x:   0, transition: { duration: 0.42, ease: 'easeOut' } },
}

const vp = { once: true, amount: 0.15 }

export default function Slide03_Problem() {
  return (
    <div style={{
      width:          '100%',
      height:         '100vh',
      display:        'flex',
      flexDirection:  'column',
      justifyContent: 'center',
      padding:        '76px 52px 28px',
      background:     'linear-gradient(90deg,rgba(0,0,0,.88) 0%,rgba(0,0,0,.6) 65%,transparent 100%)',
      boxSizing:      'border-box',
      position:       'relative',
      maxWidth:       '58vw',
    }}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        style={{ display:'flex', flexDirection:'column', gap:20 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <p style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '0.68rem',
            color:         'rgba(251,191,36,0.65)',
            letterSpacing: '0.16em',
            marginBottom:  8,
          }}>
            PROBLEM STATEMENT
          </p>
          <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.5rem)', fontWeight:800, color:'#f0fdf4', lineHeight:1.15, margin:0 }}>
            Why existing solutions{' '}
            <span style={{ color:'#fbbf24', textShadow:'0 0 18px rgba(251,191,36,.35)' }}>
              fall short
            </span>
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={i}
              variants={slideIn}
              style={{
                display:    'flex',
                alignItems: 'flex-start',
                gap:        12,
                padding:    '12px 16px',
                borderRadius: 12,
                background: `${p.color}08`,
                border:     `1px solid ${p.color}22`,
              }}
            >
              <div style={{
                flexShrink: 0,
                width:      26,
                height:     26,
                borderRadius:'50%',
                background: `${p.color}18`,
                border:     `1px solid ${p.color}40`,
                display:    'flex',
                alignItems: 'center',
                justifyContent:'center',
                marginTop:  1,
              }}>
                <AlertTriangle size={13} color={p.color}/>
              </div>
              <p style={{ fontSize:'0.9rem', color:'rgba(240,253,244,.88)', lineHeight:1.55, margin:0 }}>
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Impact strip */}
        <motion.div
          variants={fadeUp}
          style={{
            padding:    '11px 18px',
            borderRadius: 10,
            background: 'rgba(239,68,68,0.07)',
            border:     '1px solid rgba(239,68,68,0.22)',
            display:    'flex',
            alignItems: 'center',
            gap:        10,
          }}
        >
          <span style={{
            fontSize:      '0.66rem',
            fontWeight:    700,
            color:         '#ef4444',
            fontFamily:    'JetBrains Mono, monospace',
            letterSpacing: '0.08em',
            flexShrink:    0,
          }}>
            IMPACT
          </span>
          <span style={{ width:1, height:14, background:'rgba(239,68,68,0.4)', flexShrink:0 }}/>
          <span style={{ fontSize:'0.83rem', color:'rgba(240,253,244,0.62)', lineHeight:1.5 }}>
            Unreliable recommendations — leading to crop loss and wasted treatments.
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
