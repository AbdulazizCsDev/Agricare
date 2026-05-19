import Navbar from './components/Navbar'
import Slide01_Title from './slides/Slide01_Title'
import Slide02_Team from './slides/Slide02_Team'
import Slide03_Problem from './slides/Slide03_Problem'
import Slide04_Solution from './slides/Slide04_Solution'
import Slide05_Timeline from './slides/Slide05_Timeline'
import Slide06_Architecture from './slides/Slide06_Architecture'

export default function App() {
  return (
    <div style={{ background: '#0a1410' }}>
      <Navbar />

      <section id="hero" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Slide01_Title />
      </section>

      <section id="team" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Slide02_Team />
      </section>

      <section id="problem" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Slide03_Problem />
      </section>

      <section id="solution" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Slide04_Solution />
      </section>

      <section id="timeline" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Slide05_Timeline />
      </section>

      <section id="architecture" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Slide06_Architecture />
      </section>
    </div>
  )
}
