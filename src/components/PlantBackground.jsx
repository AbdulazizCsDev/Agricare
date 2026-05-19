import { useEffect, useRef } from 'react'

export default function PlantBackground() {
  const canvasRef = useRef(null)

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

      // ── Renderer ────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.4

      const setSize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
      }

      // ── Camera ───────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      )
      // Initial camera position — viewing plant from the front-right
      camera.position.set(2.2, 1.6, 5.5)
      camera.lookAt(0, 1.2, 0)
      setSize()

      // ── Scene ────────────────────────────────────────────────
      const scene = new THREE.Scene()

      // Ambient — cool green tint matching the site palette
      scene.add(new THREE.AmbientLight(0x4ade80, 0.35))

      // Main key light
      const key = new THREE.DirectionalLight(0xffffff, 2.8)
      key.position.set(3, 6, 4)
      key.castShadow = true
      key.shadow.mapSize.setScalar(1024)
      scene.add(key)

      // Rim light — green glow from behind
      const rim = new THREE.PointLight(0x4ade80, 2.5, 18)
      rim.position.set(-3, 4, -4)
      scene.add(rim)

      // Fill — soft cool from side
      const fill = new THREE.PointLight(0x60a5fa, 0.9, 14)
      fill.position.set(4, 2, 2)
      scene.add(fill)

      // ── Load model ──────────────────────────────────────────
      const draco = new DRACOLoader()
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(draco)

      const group = new THREE.Group()
      scene.add(group)

      loader.load('/plant/scene.gltf', (gltf) => {
        if (cancelled) return

        const model = gltf.scene

        // Normalize size
        const box    = new THREE.Box3().setFromObject(model)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale  = 3.2 / maxDim

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))
        model.position.y -= 0.3

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow    = true
            child.receiveShadow = true
            if (child.material) {
              child.material.envMapIntensity = 1.0
            }
          }
        })

        group.add(model)

        // Position plant to the right side of the canvas
        group.position.set(1.0, 0, 0)
      })

      // ── Scroll state ─────────────────────────────────────────
      // scrollProgress 0→1 across the full page height
      let scrollProgress = 0
      let targetProgress = 0

      const onScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        targetProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      }
      window.addEventListener('scroll', onScroll, { passive: true })

      // Mouse parallax (subtle)
      let mouseX = 0, mouseY = 0
      const onMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5)
        mouseY = (e.clientY / window.innerHeight - 0.5)
      }
      window.addEventListener('mousemove', onMouse, { passive: true })
      window.addEventListener('resize', setSize)

      // ── Animate ──────────────────────────────────────────────
      let raf
      let time = 0

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.008

        // Smooth scroll lerp
        scrollProgress += (targetProgress - scrollProgress) * 0.06

        // ── Plant reacts to scroll ──
        // Rotate Y: full rotation across the page (0 → ~180°)
        group.rotation.y = scrollProgress * Math.PI * 1.6 + Math.sin(time * 0.4) * 0.04

        // Tilt slightly based on scroll
        group.rotation.x = scrollProgress * 0.3 + mouseY * 0.12

        // Gentle sway
        group.rotation.z = Math.sin(time * 0.35) * 0.018 + mouseX * 0.06

        // Breathing scale
        const breathe = 1 + Math.sin(time * 0.8) * 0.007
        group.scale.setScalar(breathe)

        // ── Camera orbits slightly with scroll ──
        const camRadius = 5.5
        const camAngle  = scrollProgress * Math.PI * 0.5 // quarter orbit
        camera.position.x = Math.sin(camAngle) * camRadius * 0.4 + 2.2 + mouseX * 0.3
        camera.position.y = 1.6 - scrollProgress * 0.6  + mouseY * 0.2
        camera.position.z = camRadius - scrollProgress * 0.8
        camera.lookAt(0, 1.0 - scrollProgress * 0.3, 0)

        // ── Lights pulse ──
        rim.position.x = -3 + Math.sin(time * 0.5) * 0.6
        rim.intensity   = 2.5 + Math.sin(time * 0.7) * 0.4

        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', setSize)
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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
