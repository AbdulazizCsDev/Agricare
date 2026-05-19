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

      {/* Hero — fully transparent: plant is the hero */}
      <section
        id="hero"
        style={{ height: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden' }}
      >
        <Slide01_Title />
      </section>

      {/* Problem — camera zooms to leaves, plant turns sick */}
      <section
        id="problem"
        style={{
          minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden',
          background: 'linear-gradient(90deg, rgba(10,20,16,0.88) 55%, transparent 100%)',
        }}
      >
        <Slide03_Problem />
      </section>

      {/* Solution — plant gets scanned */}
      <section
        id="solution"
        style={{
          minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden',
          background: 'linear-gradient(90deg, rgba(10,20,16,0.88) 55%, transparent 100%)',
        }}
      >
        <Slide04_Solution />
      </section>

      {/* Timeline */}
      <section
        id="timeline"
        style={{
          minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden',
          background: 'linear-gradient(90deg, rgba(10,20,16,0.88) 65%, transparent 100%)',
        }}
      >
        <Slide05_Timeline />
      </section>

      {/* Architecture */}
      <section
        id="architecture"
        style={{
          minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden',
          background: 'linear-gradient(90deg, rgba(10,20,16,0.88) 65%, transparent 100%)',
        }}
      >
        <Slide06_Architecture />
      </section>
    </div>
  )
}
