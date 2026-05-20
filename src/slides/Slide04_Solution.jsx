import { motion } from 'framer-motion'
import { Zap, Clock, Leaf, Database, Target, Crosshair } from 'lucide-react'

const SOLUTIONS = [
  { icon: Clock,     color: '#4ade80', title: 'Instant 24/7 Results',       text: 'Automated diagnoses around the clock without extra staff.' },
  { icon: Crosshair, color: '#60a5fa', title: 'Confidence-Score Tool',      text: 'Simple interface with confidence scores for complex cases.' },
  { icon: Zap,       color: '#fbbf24', title: 'Replace Slow LLMs',          text: 'Swap expensive LLMs with a fast, low-cost disease model.' },
  { icon: Leaf,      color: '#4ade80', title: 'Automated Identification',   text: 'Plant & disease ID — no agronomy training needed.' },
  { icon: Database,  color: '#c084fc', title: 'Fix Data Limits',            text: 'Improve accuracy via targeted cleaning and augmentation.' },
  { icon: Target,    color: '#f97316', title: 'Maximum Accuracy',           text: 'Correct pesticide recommendations every single time.' },
]

const STATS = [
  { label:'Target Accuracy', value:'89%+',       color:'#4ade80' },
  { label:'Dataset Size',    value:'50k+ images', color:'#60a5fa' },
  { label:'Disease Classes', value:'38 classes',  color:'#c084fc' },
  { label:'Inference Time',  value:'<200ms',      color:'#fbbf24' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y:  0, transition: { duration: 0.42, ease: 'easeOut' } },
}

const vp = { once: true, amount: 0.12 }

export default function Slide04_Solution() {
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
      maxWidth:       '60vw',
    }}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        style={{ display:'flex', flexDirection:'column', gap:18 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp}>
          <p style={{
            fontFamily:    'JetBrains Mono, monospace',
            fontSize:      '0.68rem',
            color:         'rgba(74,222,128,0.55)',
            letterSpacing: '0.16em',
            marginBottom:  8,
          }}>
            THE SOLUTION
          </p>
          <h2 style={{ fontSize:'clamp(1.9rem,3vw,2.5rem)', fontWeight:800, color:'#f0fdf4', lineHeight:1.15, margin:0 }}>
            From Raw Images{' '}
            <span style={{ color:'rgba(240,253,244,.3)', fontSize:'1.4rem', fontWeight:300 }}>→</span>{' '}
            <span style={{ color:'#4ade80', textShadow:'0 0 20px rgba(74,222,128,.35)' }}>
              Deployable Diagnosis
            </span>
          </h2>
        </motion.div>

        {/* Solution grid */}
        <motion.div
          variants={container}
          style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}
        >
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  padding:       '12px 14px',
                  borderRadius:  12,
                  background:    `${s.color}08`,
                  border:        `1px solid ${s.color}22`,
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           6,
                }}
              >
                <div style={{
                  width:          30,
                  height:         30,
                  borderRadius:   7,
                  background:     `${s.color}18`,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          s.color,
                }}>
                  <Icon size={15}/>
                </div>
                <p style={{ fontSize:'0.75rem', fontWeight:700, color:s.color, fontFamily:'JetBrains Mono, monospace', margin:0 }}>
                  {s.title}
                </p>
                <p style={{ fontSize:'0.8rem', color:'rgba(240,253,244,.72)', lineHeight:1.5, margin:0 }}>
                  {s.text}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats row */}
        <motion.div variants={fadeUp} style={{ display:'flex', gap:10 }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{
              flex:       1,
              padding:    '10px 12px',
              borderRadius: 9,
              background: `${stat.color}0d`,
              border:     `1px solid ${stat.color}28`,
              textAlign:  'center',
            }}>
              <div style={{ fontSize:'1.2rem', fontWeight:800, fontFamily:'JetBrains Mono, monospace', color:stat.color, lineHeight:1.2 }}>
                {stat.value}
              </div>
              <div style={{ fontSize:'0.6rem', color:'rgba(240,253,244,.5)', marginTop:3 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
