import Navbar from './components/Navbar'
import PlantBackground from './components/PlantBackground'
import Slide01_Title from './slides/Slide01_Title'
import Slide03_Problem from './slides/Slide03_Problem'
import Slide04_Solution from './slides/Slide04_Solution'
import Slide05_Timeline from './slides/Slide05_Timeline'
import Slide06_Architecture from './slides/Slide06_Architecture'

export default function App() {
  return (
    <div style={{ background: 'transparent' }}>
      <PlantBackground />
      <Navbar />

      {/* Hero — very transparent so plant dominates */}
      <section
        id="hero"
        style={{ height: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden' }}
      >
        <Slide01_Title />
      </section>

      {/* Problem — semi-transparent, camera zooms to leaves */}
      <section
        id="problem"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden', background: 'rgba(10,20,16,0.80)' }}
      >
        <Slide03_Problem />
      </section>

      {/* Solution — camera goes to base */}
      <section
        id="solution"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden', background: 'rgba(10,20,16,0.80)' }}
      >
        <Slide04_Solution />
      </section>

      {/* Timeline */}
      <section
        id="timeline"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden', background: 'rgba(10,20,16,0.80)' }}
      >
        <Slide05_Timeline />
      </section>

      {/* Architecture */}
      <section
        id="architecture"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden', background: 'rgba(10,20,16,0.80)' }}
      >
        <Slide06_Architecture />
      </section>
    </div>
  )
}
