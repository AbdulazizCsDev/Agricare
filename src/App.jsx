import Navbar from './components/Navbar'
import PlantBackground from './components/PlantBackground'
import ParticleCanvas from './components/ParticleCanvas'
import RootCanvas from './components/RootCanvas'
import Slide01_Title from './slides/Slide01_Title'
import Slide03_Problem from './slides/Slide03_Problem'
import Slide04_Solution from './slides/Slide04_Solution'
import Slide05_Timeline from './slides/Slide05_Timeline'
import Slide06_Architecture from './slides/Slide06_Architecture'
import Slide07_TechStack from './slides/Slide07_TechStack'

const sectionStyle = { minHeight: '100vh', position: 'relative', zIndex: 1, overflow: 'hidden' }

export default function App() {
  return (
    <div style={{ background: 'transparent' }}>
      <PlantBackground />
      <ParticleCanvas opacity={0.45} />
      <RootCanvas />
      <Navbar />

      <section id="hero"   style={{ ...sectionStyle, height: '100vh' }}>
        <Slide01_Title />
      </section>

      <section id="problem"      style={sectionStyle}><Slide03_Problem /></section>
      <section id="solution"     style={sectionStyle}><Slide04_Solution /></section>
      <section id="timeline" style={sectionStyle}><Slide05_Timeline /></section>
      <section id="architecture" style={sectionStyle}><Slide06_Architecture /></section>
      <section id="techstack"    style={sectionStyle}><Slide07_TechStack /></section>
    </div>
  )
}
