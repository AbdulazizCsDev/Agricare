import { useEffect, useRef } from 'react'

export default function RootCanvas() {
  const canvasRef  = useRef(null)
  const visibleRef = useRef(false)

  useEffect(() => {
    const el = document.getElementById('architecture')
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { visibleRef.current = e.isIntersecting },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
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

      /* ── Renderer ───────────────────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping         = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.6
      renderer.shadowMap.enabled   = false

      /* ── Camera — wide FOV, positioned inside root mass ─────── */
      const camera = new THREE.PerspectiveCamera(72, 1, 0.01, 100)
      camera.position.set(0, 0.2, 3.8)

      /* ── Scene ──────────────────────────────────────────────── */
      const scene = new THREE.Scene()

      /* Very dark ambient — near black organic */
      scene.add(new THREE.AmbientLight(0x010d06, 1.2))

      /* Green rim — left */
      const rimA = new THREE.PointLight(0x00ff88, 10, 20)
      rimA.position.set(-2.5, 0.5, 3)
      scene.add(rimA)

      /* Cyan rim — right */
      const rimB = new THREE.PointLight(0x00ccff, 7, 16)
      rimB.position.set(2.5, -0.5, 3)
      scene.add(rimB)

      /* Deep violet undertone — underground feel */
      const rimC = new THREE.PointLight(0x5500cc, 5, 12)
      rimC.position.set(0, -3, 1)
      scene.add(rimC)

      /* Top back — subtle warmth */
      const rimD = new THREE.PointLight(0x003322, 4, 14)
      rimD.position.set(0, 3, 0)
      scene.add(rimD)

      /* ── Electric pulse lights — simulate charge traveling ───── */
      const PULSE_DEFS = [
        { color: 0x00ffcc, speed: 1.9, phase: 0.00, radius: 2.0, ySpd: 0.55 },
        { color: 0x00aaff, speed: 2.5, phase: 2.09, radius: 1.6, ySpd: 0.85 },
        { color: 0x44ff99, speed: 1.5, phase: 4.18, radius: 2.4, ySpd: 0.48 },
        { color: 0xffffff, speed: 3.3, phase: 1.05, radius: 0.9, ySpd: 1.40 },
        { color: 0x00eeff, speed: 2.1, phase: 3.14, radius: 1.8, ySpd: 0.70 },
        { color: 0x88ffcc, speed: 1.2, phase: 5.23, radius: 2.8, ySpd: 0.38 },
      ]
      const pulses = PULSE_DEFS.map(({ color, speed, phase, radius, ySpd }) => {
        const light = new THREE.PointLight(color, 0, 7)
        scene.add(light)
        return { light, speed, phase, radius, ySpd, yPh: Math.random() * Math.PI * 2 }
      })

      /* ── Resize ─────────────────────────────────────────────── */
      const resize = () => {
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      /* ── Load model ─────────────────────────────────────────── */
      const group = new THREE.Group()
      scene.add(group)
      let modelReady = false
      const wireMats = []

      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      const gltfLoader = new GLTFLoader()
      gltfLoader.setDRACOLoader(dracoLoader)

      gltfLoader.load('/root/scene.glb', (gltf) => {
        if (cancelled) return
        const model = gltf.scene
        const box    = new THREE.Box3().setFromObject(model)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale  = 5.8 / Math.max(size.x, size.y, size.z)

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))

        model.traverse((child) => {
          if (!child.isMesh) return

          /* Solid material: near-black with electric teal emissive */
          child.material = child.material.clone()
          child.material.color.setRGB(0.01, 0.055, 0.038)
          child.material.roughness         = 0.42
          child.material.metalness         = 0.38
          child.material.emissive          = new THREE.Color(0x003d22)
          child.material.emissiveIntensity = 1.8

          /* Wireframe child — inherits parent transform automatically */
          const wireMat = new THREE.MeshBasicMaterial({
            color:       0x00ffaa,
            wireframe:   true,
            transparent: true,
            opacity:     0.04,
            depthWrite:  false,
          })
          const wireMesh = new THREE.Mesh(child.geometry, wireMat)
          child.add(wireMesh)
          wireMats.push(wireMat)
        })

        group.add(model)
        modelReady = true
      })

      /* ── Animate ────────────────────────────────────────────── */
      let raf
      let time   = 0
      let opLerp = 0

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.007

        /* Smooth fade in / out */
        opLerp += ((visibleRef.current ? 1 : 0) - opLerp) * 0.035
        canvas.style.opacity = opLerp

        if (modelReady) {
          /* Slow continuous Y orbit */
          group.rotation.y += 0.0016
          /* Subtle X sway — like underground breathing */
          group.rotation.x  = Math.sin(time * 0.13) * 0.045
          /* Very gentle float */
          group.position.y  = Math.sin(time * 0.22) * 0.09

          /* Wireframe electric discharge flicker */
          wireMats.forEach((mat, i) => {
            /* Base glow + random sharp spike on charge pulse */
            const spike = Math.pow(Math.max(0, Math.sin(time * 5.2 + i * 0.61)), 7) * 0.30
            mat.opacity  = 0.028 + spike
          })

          /* Pulse lights — electricity arcing through roots */
          pulses.forEach(({ light, speed, phase, radius, ySpd, yPh }, i) => {
            const t = time * speed + phase
            light.position.set(
              Math.cos(t) * radius,
              -0.4 + Math.sin(time * ySpd + yPh) * 1.9,
              Math.sin(t * 0.85) * radius * 0.65 + 1.8
            )
            /* Sharp exponential discharge burst */
            const discharge = Math.pow(Math.abs(Math.sin(time * (1.6 + i * 0.28) + phase)), 5)
            light.intensity  = discharge * 20
          })

          /* Main rim breathing */
          rimA.intensity = 8  + Math.sin(time * 0.82) * 4
          rimB.intensity = 6  + Math.sin(time * 0.63 + 1.1) * 3
          rimC.intensity = 3  + Math.abs(Math.sin(time * 1.35)) * 3
          rimD.intensity = 3  + Math.sin(time * 0.4) * 1.5
        }

        /* Camera drifts slowly — feel of floating inside the root network */
        camera.position.x = Math.sin(time * 0.072) * 1.1
        camera.position.y = 0.15 + Math.cos(time * 0.058) * 0.55
        camera.position.z = 3.8 + Math.sin(time * 0.095) * 0.65
        camera.lookAt(
          Math.sin(time * 0.038) * 0.38,
          Math.cos(time * 0.052) * 0.28 - 0.18,
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
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        2,
        opacity:       0,
      }}
    />
  )
}
