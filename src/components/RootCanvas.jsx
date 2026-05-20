import { useEffect, useRef } from 'react'

export default function RootCanvas() {
  const canvasRef  = useRef(null)
  const visibleRef = useRef(false)

  /* Track architecture section visibility */
  useEffect(() => {
    const el = document.getElementById('architecture')
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { visibleRef.current = e.isIntersecting },
      { threshold: 0.15 }
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
    ]).then(([THREE, { GLTFLoader }]) => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return

      /* ── Renderer ──────────────────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.2))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping         = THREE.LinearToneMapping
      renderer.toneMappingExposure = 1.6
      renderer.shadowMap.enabled   = false

      /* ── Camera ────────────────────────────────────────────── */
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
      camera.position.set(0, 0, 7)

      /* ── Scene ─────────────────────────────────────────────── */
      const scene = new THREE.Scene()

      const ambient = new THREE.AmbientLight(0x0a1a0e, 1.2)
      scene.add(ambient)

      const rimA = new THREE.PointLight(0x4ade80, 10, 22)
      rimA.position.set(-3, 2, 5)
      scene.add(rimA)

      const rimB = new THREE.PointLight(0x22d3ee, 5, 18)
      rimB.position.set(3, -1, 4)
      scene.add(rimB)

      const top = new THREE.DirectionalLight(0xffffff, 0.9)
      top.position.set(0, 6, 4)
      scene.add(top)

      const under = new THREE.PointLight(0x14532d, 4, 12)
      under.position.set(0, -4, 2)
      scene.add(under)

      /* ── Resize ────────────────────────────────────────────── */
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

      new GLTFLoader().load('/root/scene.gltf', (gltf) => {
        if (cancelled) return
        const model = gltf.scene
        const box    = new THREE.Box3().setFromObject(model)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale  = 4.5 / Math.max(size.x, size.y, size.z)

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))

        /* Re-colour: warm brown → dark green organic */
        model.traverse((child) => {
          if (!child.isMesh) return
          child.material = child.material.clone()
          child.material.color.setRGB(0.08, 0.38, 0.18)
          child.material.roughness          = 0.72
          child.material.metalness          = 0.05
          child.material.emissive           = new THREE.Color(0x041a08)
          child.material.emissiveIntensity  = 0.5
        })

        group.add(model)
        modelReady = true
      })

      /* ── Animate ───────────────────────────────────────────── */
      let raf
      let time   = 0
      let opLerp = 0

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.008

        /* Smooth fade in / out */
        opLerp += ((visibleRef.current ? 1 : 0) - opLerp) * 0.04
        canvas.style.opacity = opLerp

        if (modelReady) {
          /* Slow Y orbit — "exploring roots" */
          group.rotation.y += 0.003
          /* Oscillating X tilt — reveals root layers */
          group.rotation.x  = Math.sin(time * 0.28) * 0.12
          /* Gentle float */
          group.position.y  = Math.sin(time * 0.42) * 0.18
          /* Pulse green rim */
          rimA.intensity    = 10 + Math.sin(time * 0.55) * 3
          rimB.intensity    =  5 + Math.sin(time * 0.38) * 1.5
        }

        /* Slow camera drift for depth */
        camera.position.x = Math.sin(time * 0.12) * 0.8
        camera.position.y = Math.cos(time * 0.09) * 0.5
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }
      animate()

      cleanupFn = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        renderer.dispose()
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
        left:          '52%',
        width:         '48%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        2,
        opacity:       0,
      }}
    />
  )
}
