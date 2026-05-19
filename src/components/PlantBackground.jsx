import { useEffect, useRef } from 'react'

// Camera + plant state per section
const STATES = {
  hero: {
    camX: 0, camY: 1.4, camZ: 7.0,
    lookX: 0, lookY: 1.4, lookZ: 0,
    plantX: 0,   plantRotY: 0,
  },
  problem: {
    // Zoom into the leaves — upper part of the plant
    camX: 0.6, camY: 2.8, camZ: 2.4,
    lookX: 0,  lookY: 2.5, lookZ: 0,
    plantX: 0, plantRotY: 0.25,
  },
  solution: {
    // Pull down to the base / roots area
    camX: 0.4, camY: -0.2, camZ: 2.6,
    lookX: 0,  lookY:  0.2, lookZ: 0,
    plantX: 0, plantRotY: -0.3,
  },
  timeline: {
    camX: -1.8, camY: 1.5, camZ: 5.8,
    lookX:  0,  lookY: 1.2, lookZ: 0,
    plantX: -0.4, plantRotY: -0.7,
  },
  architecture: {
    camX: 2.0, camY: 1.6, camZ: 5.2,
    lookX: 0,  lookY: 1.2, lookZ: 0,
    plantX: 0.5, plantRotY: 0.8,
  },
}

const SECTION_IDS = ['hero', 'problem', 'solution', 'timeline', 'architecture']

function lerp(a, b, t) { return a + (b - a) * t }

export default function PlantBackground() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef('hero') // currently active section

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = []
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) sectionRef.current = id
        },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let cleanup = () => {}

    Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
    ]).then(([THREE, { GLTFLoader }, { DRACOLoader }]) => {
      if (cancelled) return

      const canvas = canvasRef.current
      if (!canvas) return

      // ── Renderer ─────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type    = THREE.PCFSoftShadowMap
      renderer.toneMapping       = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.4

      // ── Camera ───────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)

      const setSize = () => {
        const w = window.innerWidth, h = window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      setSize()
      window.addEventListener('resize', setSize)

      // ── Scene ────────────────────────────────────────────────
      const scene = new THREE.Scene()

      scene.add(new THREE.AmbientLight(0x4ade80, 0.5))

      const key = new THREE.DirectionalLight(0xffffff, 3.0)
      key.position.set(3, 7, 4)
      key.castShadow = true
      key.shadow.mapSize.setScalar(1024)
      scene.add(key)

      const rim = new THREE.PointLight(0x4ade80, 3.0, 20)
      rim.position.set(-3, 4, -4)
      scene.add(rim)

      const fill = new THREE.PointLight(0x60a5fa, 1.0, 16)
      fill.position.set(4, 2, 2)
      scene.add(fill)

      // ── Load model ───────────────────────────────────────────
      const draco = new DRACOLoader()
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(draco)

      const group = new THREE.Group()
      scene.add(group)
      let modelReady = false

      loader.load('/plant/scene.gltf', (gltf) => {
        if (cancelled) return

        const model = gltf.scene
        const box    = new THREE.Box3().setFromObject(model)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale  = 3.6 / Math.max(size.x, size.y, size.z)

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))
        model.position.y -= 0.2

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true
            child.receiveShadow = true
            if (child.material) child.material.envMapIntensity = 1.0
          }
        })

        group.add(model)
        modelReady = true
      })

      // ── Mouse parallax ───────────────────────────────────────
      let mouseX = 0, mouseY = 0
      const onMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5)
        mouseY = (e.clientY / window.innerHeight - 0.5)
      }
      window.addEventListener('mousemove', onMouse, { passive: true })

      // ── Lerped state ─────────────────────────────────────────
      const cur = {
        camX: 0, camY: 1.4, camZ: 7.0,
        lookX: 0, lookY: 1.4, lookZ: 0,
        plantX: 0, plantRotY: 0,
      }

      // ── Animate ──────────────────────────────────────────────
      let raf
      let time = 0
      const speed = 0.04 // lerp speed

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.008

        const target = STATES[sectionRef.current] || STATES.hero

        // Smooth lerp all values
        cur.camX     = lerp(cur.camX,     target.camX,     speed)
        cur.camY     = lerp(cur.camY,     target.camY,     speed)
        cur.camZ     = lerp(cur.camZ,     target.camZ,     speed)
        cur.lookX    = lerp(cur.lookX,    target.lookX,    speed)
        cur.lookY    = lerp(cur.lookY,    target.lookY,    speed)
        cur.lookZ    = lerp(cur.lookZ,    target.lookZ,    speed)
        cur.plantX   = lerp(cur.plantX,   target.plantX,   speed)
        cur.plantRotY = lerp(cur.plantRotY, target.plantRotY, speed)

        // Camera with mouse parallax
        camera.position.set(
          cur.camX + mouseX * 0.25,
          cur.camY - mouseY * 0.15,
          cur.camZ
        )
        camera.lookAt(cur.lookX, cur.lookY, cur.lookZ)

        if (modelReady) {
          // Plant position
          group.position.x = cur.plantX

          // Scroll-driven rotation + gentle sway
          group.rotation.y = cur.plantRotY + Math.sin(time * 0.35) * 0.03 + mouseX * 0.06
          group.rotation.x = -mouseY * 0.08 + Math.sin(time * 0.28) * 0.015
          group.rotation.z =  Math.sin(time * 0.22) * 0.012

          // Breathing
          const breathe = 1 + Math.sin(time * 0.75) * 0.007
          group.scale.setScalar(breathe)
        }

        // Lights animate
        rim.position.x = -3 + Math.sin(time * 0.45) * 0.7
        rim.intensity   = 3.0 + Math.sin(time * 0.6) * 0.5

        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize',    setSize)
        renderer.dispose()
        draco.dispose()
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
