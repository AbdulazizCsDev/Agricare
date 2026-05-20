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

      /* ── Renderer ─────────────────────────────────────────── */
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping         = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      renderer.shadowMap.enabled   = false

      /* ── Camera — wide FOV, positioned INSIDE the root mass ─ */
      const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.01, 100)
      camera.position.set(0, 0, 1.8)

      /* ── Scene ────────────────────────────────────────────── */
      const scene = new THREE.Scene()

      /* Dark ambient — underground feel */
      scene.add(new THREE.AmbientLight(0x000a05, 0.8))

      /* Green left rim */
      const rimA = new THREE.PointLight(0x00ff77, 6, 14)
      rimA.position.set(-2, 0.5, 2)
      scene.add(rimA)

      /* Cyan right rim */
      const rimB = new THREE.PointLight(0x00bbff, 5, 12)
      rimB.position.set(2, -0.5, 2)
      scene.add(rimB)

      /* Deep violet — underground depth */
      const rimC = new THREE.PointLight(0x4400bb, 4, 10)
      rimC.position.set(0, -2.5, 0.5)
      scene.add(rimC)

      /* Back glow */
      const rimD = new THREE.PointLight(0x003322, 3, 10)
      rimD.position.set(0, 2, -1)
      scene.add(rimD)

      /* ── Electric pulse lights — charge arcing through roots ─ */
      const PULSE_DEFS = [
        { color: 0x00ffcc, speed: 2.1, phase: 0.00, radius: 1.4, ySpd: 0.6  },
        { color: 0x00aaff, speed: 2.8, phase: 2.09, radius: 1.0, ySpd: 0.9  },
        { color: 0x44ff88, speed: 1.6, phase: 4.18, radius: 1.8, ySpd: 0.45 },
        { color: 0xffffff, speed: 3.5, phase: 1.05, radius: 0.6, ySpd: 1.5  },
        { color: 0x00eeff, speed: 2.3, phase: 3.14, radius: 1.2, ySpd: 0.75 },
        { color: 0x88ffcc, speed: 1.3, phase: 5.23, radius: 2.0, ySpd: 0.35 },
      ]
      const pulses = PULSE_DEFS.map(({ color, speed, phase, radius, ySpd }) => {
        const light = new THREE.PointLight(color, 0, 5)
        scene.add(light)
        return { light, speed, phase, radius, ySpd, yPh: Math.random() * Math.PI * 2 }
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
      const wireMats = []

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

          /* Scale large — camera is INSIDE, roots surround it */
          const scale  = 9.5 / Math.max(size.x, size.y, size.z)
          model.scale.setScalar(scale)
          model.position.sub(center.multiplyScalar(scale))

          /* Collect first, add wireframes after traverse */
          const meshes = []
          model.traverse((child) => {
            if (!child.isMesh) return
            /* Dark organic material — let lights do the color */
            child.material = child.material.clone()
            child.material.color.setRGB(0.008, 0.042, 0.026)
            child.material.roughness         = 0.55
            child.material.metalness         = 0.28
            child.material.emissive          = new THREE.Color(0x001f10)
            child.material.emissiveIntensity = 2.2
            meshes.push(child)
          })

          meshes.forEach((child) => {
            const wireMat = new THREE.MeshBasicMaterial({
              color:       0x00ffaa,
              wireframe:   true,
              transparent: true,
              opacity:     0.022,
              depthWrite:  false,
            })
            child.add(new THREE.Mesh(child.geometry, wireMat))
            wireMats.push(wireMat)
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

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.006

        opLerp += ((visibleRef.current ? 1 : 0) - opLerp) * 0.038
        canvas.style.opacity = opLerp

        if (!modelReady) {
          renderer.render(scene, camera)
          return
        }

        /* Very slow rotation — exploring underground */
        group.rotation.y += 0.0012
        group.rotation.x  = Math.sin(time * 0.11) * 0.035
        group.position.y  = Math.sin(time * 0.18) * 0.06

        /* Wireframe electric discharge flicker */
        wireMats.forEach((mat, i) => {
          const spike = Math.pow(Math.max(0, Math.sin(time * 5.5 + i * 0.58)), 8) * 0.28
          mat.opacity  = 0.018 + spike
        })

        /* Pulse lights arc through the root network */
        pulses.forEach(({ light, speed, phase, radius, ySpd, yPh }, i) => {
          const t = time * speed + phase
          light.position.set(
            Math.cos(t) * radius,
            -0.3 + Math.sin(time * ySpd + yPh) * 1.5,
            Math.sin(t * 0.9) * radius * 0.7 + 0.8
          )
          const discharge = Math.pow(Math.abs(Math.sin(time * (1.7 + i * 0.3) + phase)), 5)
          light.intensity  = discharge * 16
        })

        /* Main rims breathe */
        rimA.intensity = 5 + Math.sin(time * 0.85) * 3
        rimB.intensity = 4 + Math.sin(time * 0.65 + 1.1) * 2.5
        rimC.intensity = 3 + Math.abs(Math.sin(time * 1.4)) * 2.5
        rimD.intensity = 2 + Math.sin(time * 0.38) * 1

        /* Camera drifts slowly — feel of floating through roots */
        camera.position.x = Math.sin(time * 0.065) * 0.95
        camera.position.y = Math.cos(time * 0.052) * 0.42 + 0.0
        camera.position.z = 1.8 + Math.sin(time * 0.088) * 0.55
        camera.lookAt(
          Math.sin(time * 0.035) * 0.45,
          Math.cos(time * 0.048) * 0.32,
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
        zIndex:        0,   /* behind all content */
        opacity:       0,
      }}
    />
  )
}
