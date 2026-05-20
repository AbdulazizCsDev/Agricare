import { useEffect, useRef } from 'react'

export default function RootCanvas() {
  const canvasRef    = useRef(null)
  const visibleRef   = useRef(false)
  const sectionRef   = useRef(null)   // 'architecture' | 'techstack' | null
  const entryMsRef   = useRef(null)
  const exitMsRef    = useRef(null)

  useEffect(() => {
    let wasVisible = false
    let lastSection = null
    const check = () => {
      const arch = document.getElementById('architecture')
      const tech = document.getElementById('techstack')
      let now = false
      let current = null

      for (const [id, el] of [['architecture', arch], ['techstack', tech]]) {
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (top < window.innerHeight * 0.9 && bottom > 0) {
          now = true
          current = id
          break
        }
      }

      if (now && !wasVisible) { entryMsRef.current = performance.now(); exitMsRef.current = null }
      if (!now && wasVisible) { exitMsRef.current  = performance.now(); entryMsRef.current = null }
      /* If switching between sections without leaving, just update the section ref */
      if (now && wasVisible && current !== lastSection) {
        /* smooth transition between sections without re-entry */
      }
      wasVisible = now
      lastSection = current
      sectionRef.current = current
      visibleRef.current = now
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    let cleanupFn = () => {}

    Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
    ]).then(([THREE, { GLTFLoader }, { DRACOLoader }]) => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return

      /* ── Renderer ─────────────────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
      renderer.setPixelRatio(1)
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping         = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.3

      /* ── Camera — wide, inside the roots ─────────────────── */
      const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.01, 60)
      camera.position.set(0, 0, 2.2)

      /* ── Scene ────────────────────────────────────────────── */
      const scene = new THREE.Scene()
      scene.add(new THREE.AmbientLight(0x010e06, 1.5))

      const rimA = new THREE.PointLight(0xaa7744, 3.5, 18)
      rimA.position.set(-2, 0.5, 2)
      scene.add(rimA)

      const rimB = new THREE.PointLight(0x997755, 2.5, 16)
      rimB.position.set(2, -0.5, 2)
      scene.add(rimB)

      /* Architecture: 2 calm pulses */
      const archPulseDefs = [
        { color: 0xaaddff, speed: 0.55, phase: 0.0  },
        { color: 0xbbeeff, speed: 0.55, phase: Math.PI },
      ]
      const archPulses = archPulseDefs.map(({ color, speed, phase }) => {
        const light = new THREE.PointLight(color, 0, 4)
        scene.add(light)
        return { light, speed, phase }
      })

      /* Tech stack: 6 lightning pulses — faster, brighter, more chaotic */
      const techPulseDefs = [
        { color: 0x88ffaa, speed: 1.2,  phase: 0.0 },
        { color: 0xaaffcc, speed: 1.1,  phase: Math.PI * 0.4 },
        { color: 0x66ddff, speed: 1.35, phase: Math.PI * 0.8 },
        { color: 0xccffdd, speed: 1.0,  phase: Math.PI * 1.2 },
        { color: 0x99eeff, speed: 1.5,  phase: Math.PI * 1.6 },
        { color: 0xbbffee, speed: 1.25, phase: Math.PI * 0.2 },
      ]
      const techPulses = techPulseDefs.map(({ color, speed, phase }) => {
        const light = new THREE.PointLight(color, 0, 6)
        scene.add(light)
        return { light, speed, phase, flicker: Math.random() }
      })

      /* ── Resize ───────────────────────────────────────────── */
      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      /* ── Load model ───────────────────────────────────────── */
      const group = new THREE.Group()
      scene.add(group)
      let modelReady = false
      let baseScale  = 1

      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      const gltfLoader = new GLTFLoader()
      gltfLoader.setDRACOLoader(dracoLoader)

      gltfLoader.load(
        '/root/scene.glb',
        (gltf) => {
          if (cancelled) return
          const model = gltf.scene
          const box    = new THREE.Box3().setFromObject(model)
          const size   = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          const scale  = 8.0 / Math.max(size.x, size.y, size.z)
          baseScale = scale

          model.scale.setScalar(scale)
          model.position.sub(center.multiplyScalar(scale))

          const sharedMat = new THREE.MeshStandardMaterial({
            color:             new THREE.Color(0.20, 0.13, 0.07),
            roughness:         0.88,
            metalness:         0.04,
            emissive:          new THREE.Color(0x0a0400),
            emissiveIntensity: 0.4,
          })
          model.traverse((child) => {
            if (child.isMesh) child.material = sharedMat
          })

          group.add(model)
          modelReady = true
        },
        undefined,
        (err) => console.error('[RootCanvas] load error:', err)
      )

      /* ── Animate ──────────────────────────────────────────── */
      let raf
      let time   = 0
      let opLerp = 0
      let scaleLerp = 1
      let techMixLerp = 0   // 0 = arch, 1 = techstack
      const smoothstep = (t) => t * t * (3 - 2 * t)

      const ENTRY_DELAY    = 0.9
      const ENTRY_FADE     = 0.9
      const ENTRY_RISE     = 2.2
      const ENTRY_Y_START  = -2.8
      const EXIT_FADE      = 0.6
      const EXIT_SINK      = 1.8
      const EXIT_Y_END     = -2.8

      const animate = () => {
        raf = requestAnimationFrame(animate)

        const nowMs   = performance.now()
        const entryMs = entryMsRef.current
        const exitMs  = exitMsRef.current
        const section = sectionRef.current

        let opTarget = 0
        let yOffset  = ENTRY_Y_START

        if (visibleRef.current && entryMs) {
          const e = (nowMs - entryMs) / 1000
          opTarget = e < ENTRY_DELAY ? 0 : Math.min(1, (e - ENTRY_DELAY) / ENTRY_FADE)
          yOffset  = ENTRY_Y_START * (1 - smoothstep(Math.min(1, e / ENTRY_RISE)))

        } else if (!visibleRef.current && exitMs) {
          const e = (nowMs - exitMs) / 1000
          opTarget = Math.max(0, 1 - smoothstep(Math.min(1, e / EXIT_FADE)))
          yOffset  = EXIT_Y_END * smoothstep(Math.min(1, e / EXIT_SINK))
          if (e > EXIT_SINK + 0.5) exitMsRef.current = null
        }

        opLerp += (opTarget - opLerp) * 0.055
        canvas.style.opacity = opLerp

        /* Tech section: scale up roots + transition lighting mode */
        const techTarget = section === 'techstack' ? 1 : 0
        techMixLerp += (techTarget - techMixLerp) * 0.04

        const scaleTarget = section === 'techstack' ? 1.35 : 1
        scaleLerp += (scaleTarget - scaleLerp) * 0.04

        if (opLerp < 0.02 && opTarget === 0 && !exitMsRef.current) return

        time += 0.006

        if (modelReady) {
          group.rotation.y += 0.0014 + techMixLerp * 0.0018
          group.rotation.x  = Math.sin(time * 0.11) * 0.03
          group.position.y  = yOffset + Math.sin(time * 0.18) * 0.07
          group.scale.setScalar(baseScale * scaleLerp)

          const lightScale = Math.min(1, opLerp * 1.5)

          /* Architecture pulses — fade out as we enter techstack */
          const archFactor = (1 - techMixLerp) * lightScale
          archPulses.forEach(({ light, speed, phase }) => {
            const t   = ((time * speed + phase) % (Math.PI * 2)) / (Math.PI * 2)
            const y   = -2.5 + t * 5.0
            const x   = Math.sin(time * 0.4 + phase) * 0.6
            light.position.set(x, y, 1.2)
            const edge = Math.min(t, 1 - t) * 4
            light.intensity = Math.min(1, edge) * 4.5 * archFactor
          })

          /* Tech stack pulses — wild lightning everywhere */
          const techFactor = techMixLerp * lightScale
          techPulses.forEach((p, i) => {
            const { light, speed, phase } = p
            const t   = ((time * speed + phase) % (Math.PI * 2)) / (Math.PI * 2)
            const y   = -3.2 + t * 6.4
            const x   = Math.sin(time * 0.55 + phase + i) * 1.4
            const z   = 1.0 + Math.cos(time * 0.7 + phase) * 0.5
            light.position.set(x, y, z)
            const edge = Math.min(t, 1 - t) * 4
            /* Random flicker — electricity feel */
            const flick = 0.7 + Math.sin(time * 28 + p.flicker * 100) * 0.3
            light.intensity = Math.min(1, edge) * 7.5 * flick * techFactor
          })

          rimA.intensity = (3 + Math.sin(time * 0.5) * 1)   * lightScale
          rimB.intensity = (2 + Math.sin(time * 0.4) * 0.8) * lightScale
        }

        /* Camera shake in techstack mode for energy feel */
        const shake = techMixLerp * 0.04
        camera.position.x = Math.sin(time * 0.065) * 0.8 + Math.sin(time * 18) * shake
        camera.position.y = Math.cos(time * 0.05)  * 0.35 + Math.cos(time * 22) * shake
        camera.position.z = 2.2 + Math.sin(time * 0.09) * 0.4
        camera.lookAt(
          Math.sin(time * 0.035) * 0.35,
          Math.cos(time * 0.045) * 0.28,
          0
        )

        renderer.render(scene, camera)
      }
      animate()

      cleanupFn = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        renderer.dispose()
        dracoLoader.dispose()
      }
    })

    return () => { cancelled = true; cleanupFn() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100vw',
        height:        '100vh',
        pointerEvents: 'none',
        zIndex:        0,
        opacity:       0,
      }}
    />
  )
}
