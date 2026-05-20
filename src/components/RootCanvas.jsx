import { useEffect, useRef } from 'react'

export default function RootCanvas() {
  const canvasRef  = useRef(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    const check = () => {
      const el = document.getElementById('architecture')
      if (!el) return
      const { top, bottom } = el.getBoundingClientRect()
      visibleRef.current = top < window.innerHeight * 0.9 && bottom > 0
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

      /* ── Renderer — low pixel ratio for performance ─────────── */
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
      renderer.setPixelRatio(1)
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping         = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.3

      /* ── Camera ─────────────────────────────────────────────── */
      const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.01, 60)
      camera.position.set(0, 0, 2.2)

      /* ── Scene ──────────────────────────────────────────────── */
      const scene = new THREE.Scene()
      scene.add(new THREE.AmbientLight(0x010e06, 1.5))

      /* 3 lights only */
      const rimA = new THREE.PointLight(0x00ff88, 8, 16)
      rimA.position.set(-2, 0.5, 2)
      scene.add(rimA)

      const rimB = new THREE.PointLight(0x00bbff, 6, 14)
      rimB.position.set(2, -0.5, 2)
      scene.add(rimB)

      const rimC = new THREE.PointLight(0x4400bb, 5, 10)
      rimC.position.set(0, -2, 0.5)
      scene.add(rimC)

      /* 3 pulse lights only */
      const pulseDefs = [
        { color: 0x00ffcc, speed: 1.8, phase: 0.0,  radius: 1.3 },
        { color: 0x00aaff, speed: 2.4, phase: 2.1,  radius: 0.9 },
        { color: 0x44ff88, speed: 1.3, phase: 4.2,  radius: 1.6 },
      ]
      const pulses = pulseDefs.map(({ color, speed, phase, radius }) => {
        const light = new THREE.PointLight(color, 0, 5)
        scene.add(light)
        return { light, speed, phase, radius, yPh: Math.random() * Math.PI * 2 }
      })

      /* ── Resize ─────────────────────────────────────────────── */
      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      /* ── Load model ─────────────────────────────────────────── */
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

          /* Single material pass — no cloning per mesh, share one material */
          const sharedMat = new THREE.MeshStandardMaterial({
            color:             new THREE.Color(0.01, 0.045, 0.028),
            roughness:         0.55,
            metalness:         0.25,
            emissive:          new THREE.Color(0x001f10),
            emissiveIntensity: 2.5,
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

      /* ── Animate ────────────────────────────────────────────── */
      let raf
      let time   = 0
      let opLerp = 0

      const animate = () => {
        raf = requestAnimationFrame(animate)

        opLerp += ((visibleRef.current ? 1 : 0) - opLerp) * 0.04
        canvas.style.opacity = opLerp

        /* Skip heavy work when invisible */
        if (opLerp < 0.02) return

        time += 0.006

        if (modelReady) {
          group.rotation.y += 0.0014
          group.rotation.x  = Math.sin(time * 0.11) * 0.03
          group.position.y  = Math.sin(time * 0.18) * 0.07

          pulses.forEach(({ light, speed, phase, radius, yPh }, i) => {
            const t = time * speed + phase
            light.position.set(
              Math.cos(t) * radius,
              -0.2 + Math.sin(time * 0.6 + yPh) * 1.4,
              Math.sin(t * 0.9) * radius * 0.7 + 1.0
            )
            light.intensity = Math.pow(Math.abs(Math.sin(time * (1.6 + i * 0.3) + phase)), 5) * 14
          })

          rimA.intensity = 6 + Math.sin(time * 0.8) * 2.5
          rimB.intensity = 4 + Math.sin(time * 0.6 + 1.1) * 2
          rimC.intensity = 3 + Math.abs(Math.sin(time * 1.3)) * 2
        }

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
