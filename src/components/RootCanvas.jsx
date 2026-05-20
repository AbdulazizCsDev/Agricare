import { useEffect, useRef } from 'react'

export default function RootCanvas() {
  const canvasRef    = useRef(null)
  const visibleRef   = useRef(false)
  const entryMsRef   = useRef(null)   // when architecture became visible
  const exitMsRef    = useRef(null)   // when architecture became hidden

  useEffect(() => {
    let wasVisible = false
    const check = () => {
      const el = document.getElementById('architecture')
      if (!el) return
      const { top, bottom } = el.getBoundingClientRect()
      const now = top < window.innerHeight * 0.9 && bottom > 0
      if (now && !wasVisible) { entryMsRef.current = performance.now(); exitMsRef.current = null }
      if (!now && wasVisible) { exitMsRef.current  = performance.now(); entryMsRef.current = null }
      wasVisible = now
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

      /* Soft warm ambient — muted underground feel */
      const rimA = new THREE.PointLight(0xaa7744, 3.5, 18)
      rimA.position.set(-2, 0.5, 2)
      scene.add(rimA)

      const rimB = new THREE.PointLight(0x997755, 2.5, 16)
      rimB.position.set(2, -0.5, 2)
      scene.add(rimB)

      /* ── Electricity: 2 lights that travel upward through roots ─ */
      const pulseDefs = [
        { color: 0xaaddff, speed: 0.55, phase: 0.0  },
        { color: 0xbbeeff, speed: 0.55, phase: Math.PI },
      ]
      const pulses = pulseDefs.map(({ color, speed, phase }) => {
        const light = new THREE.PointLight(color, 0, 4)
        scene.add(light)
        return { light, speed, phase }
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

          model.scale.setScalar(scale)
          model.position.sub(center.multiplyScalar(scale))

          /* Muted dark earth — subtle, not distracting */
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
      const smoothstep = (t) => t * t * (3 - 2 * t)

      /* Entry constants */
      const ENTRY_DELAY    = 0.9   // wait for plant zoom + fade
      const ENTRY_FADE     = 0.9   // opacity fade-in duration
      const ENTRY_RISE     = 2.2   // roots rise duration
      const ENTRY_Y_START  = -2.8  // below centre

      /* Exit constants */
      const EXIT_FADE      = 0.6   // opacity fade-out duration
      const EXIT_SINK      = 1.8   // roots sink duration
      const EXIT_Y_END     = -2.8  // back below centre

      const animate = () => {
        raf = requestAnimationFrame(animate)

        const nowMs   = performance.now()
        const entryMs = entryMsRef.current
        const exitMs  = exitMsRef.current

        /* ── Determine yOffset and opTarget based on state ─────── */
        let opTarget = 0
        let yOffset  = ENTRY_Y_START   // default: hidden below

        if (visibleRef.current && entryMs) {
          /* ENTERING — rise from below */
          const e = (nowMs - entryMs) / 1000
          opTarget = e < ENTRY_DELAY ? 0 : Math.min(1, (e - ENTRY_DELAY) / ENTRY_FADE)
          yOffset  = ENTRY_Y_START * (1 - smoothstep(Math.min(1, e / ENTRY_RISE)))

        } else if (!visibleRef.current && exitMs) {
          /* EXITING — sink back below */
          const e = (nowMs - exitMs) / 1000
          opTarget = Math.max(0, 1 - smoothstep(Math.min(1, e / EXIT_FADE)))
          yOffset  = EXIT_Y_END * smoothstep(Math.min(1, e / EXIT_SINK))
          /* Clear exitMs once fully gone */
          if (e > EXIT_SINK + 0.5) exitMsRef.current = null
        }

        opLerp += (opTarget - opLerp) * 0.055
        canvas.style.opacity = opLerp

        /* Skip render when invisible */
        if (opLerp < 0.02 && opTarget === 0 && !exitMsRef.current) return

        time += 0.006

        if (modelReady) {
          group.rotation.y += 0.0014
          group.rotation.x  = Math.sin(time * 0.11) * 0.03
          group.position.y  = yOffset + Math.sin(time * 0.18) * 0.07

          const lightScale = Math.min(1, opLerp * 1.5)

          /* Electricity: two lights traveling bottom→top continuously */
          pulses.forEach(({ light, speed, phase }) => {
            /* y loops -2.5 → +2.5, offset by phase so they alternate */
            const t   = ((time * speed + phase) % (Math.PI * 2)) / (Math.PI * 2)
            const y   = -2.5 + t * 5.0
            /* x wanders slightly — follows root branching feel */
            const x   = Math.sin(time * 0.4 + phase) * 0.6
            light.position.set(x, y, 1.2)
            /* Intensity: soft, just a hint — fades at top and bottom */
            const edge = Math.min(t, 1 - t) * 4        // 0 at ends, 1 in middle
            light.intensity = Math.min(1, edge) * 4.5 * lightScale
          })

          rimA.intensity = (3 + Math.sin(time * 0.5) * 1)   * lightScale
          rimB.intensity = (2 + Math.sin(time * 0.4) * 0.8) * lightScale
        }

        /* Camera drifts slowly inside the root network */
        camera.position.x = Math.sin(time * 0.065) * 0.8
        camera.position.y = Math.cos(time * 0.05)  * 0.35
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
