import Navbar from './components/Navbar'
import PlantBackground from './components/PlantBackground'
import Slide01_Title from './slides/Slide01_Title'
import Slide02_Team from './slides/Slide02_Team'
import Slide03_Problem from './slides/Slide03_Problem'
import Slide04_Solution from './slides/Slide04_Solution'
import Slide05_Timeline from './slides/Slide05_Timeline'
import Slide06_Architecture from './slides/Slide06_Architecture'

const sectionStyle = {
  minHeight: '100vh',
  position: 'relative',
  zIndex: 1,
  overflow: 'hidden',
  background: 'rgba(10, 20, 16, 0.78)',
}

export default function App() {
  return (
    <div style={{ background: 'transparent' }}>
      {/* Fixed 3D plant — sits behind everything */}
      <PlantBackground />

      <Navbar />

      <section id="hero" style={{ ...sectionStyle, height: '100vh' }}>
        <Slide01_Title />
      </section>

      <section id="team" style={sectionStyle}>
        <Slide02_Team />
      </section>

      <section id="problem" style={sectionStyle}>
        <Slide03_Problem />
      </section>

      <section id="solution" style={sectionStyle}>
        <Slide04_Solution />
      </section>

      <section id="timeline" style={sectionStyle}>
        <Slide05_Timeline />
      </section>

      <section id="architecture" style={sectionStyle}>
        <Slide06_Architecture />
      </section>
    </div>
  )
}
