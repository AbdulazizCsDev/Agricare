import { useEffect, useRef } from 'react'

// Plant group is offset to x=2.2 (right side of viewport)
const PLANT_X = 2.2

/* ─── Camera targets per section ─────────────────────────────── */
const CAM_STATES = {
  // Hero: full plant visible on right half
  hero:         { x: -0.5, y: 1.0,  z: 6.5, lx: PLANT_X, ly: 1.0, lz: 0 },
  // Problem: elevated, far enough to see leaves in context
  problem:      { x:  0.5, y: 2.4,  z: 5.0, lx: PLANT_X, ly: 2.2, lz: 0 },
  // Solution: lowered, far enough to see base in context
  solution:     { x:  0.5, y: 0.2,  z: 5.0, lx: PLANT_X, ly: 0.6, lz: 0 },
  // Timeline: wide left view
  timeline:     { x: -1.5, y: 1.2,  z: 6.0, lx: PLANT_X, ly: 1.0, lz: 0 },
  // Architecture: wide right view
  architecture: { x:  4.0, y: 1.4,  z: 6.0, lx: PLANT_X, ly: 1.2, lz: 0 },
}

/* ─── Effect targets per section ─────────────────────────────── */
const FX = {
  hero:         { sick: 0, scan: 0, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 3.0  },
  problem:      { sick: 1, scan: 0, rimR: 0.85, rimG: 0.25, rimB: 0.05, rimI: 4.0 },
  solution:     { sick: 0, scan: 1, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 3.5 },
  timeline:     { sick: 0, scan: 0, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 2.5 },
  architecture: { sick: 0, scan: 0, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 2.5 },
}

const SECTIONS = ['hero', 'problem', 'solution', 'timeline', 'architecture']

/* ─── Damped spring for smooth transitions ───────────────────── */
function makeSpring(val) { return { pos: val, vel: 0 } }
function stepSpring(s, target, k = 0.055, d = 0.87) {
  s.vel = s.vel * d + (target - s.pos) * k
  s.pos += s.vel
  return s.pos
}

export default function PlantBackground() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef('hero')

  /* ── Section tracking ──────────────────────────────────────── */
  useEffect(() => {
    const obs = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) sectionRef.current = id },
        { threshold: 0.3 }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach((o) => o.disconnect())
  }, [])

  /* ── Three.js scene ────────────────────────────────────────── */
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
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type    = THREE.PCFSoftShadowMap
      renderer.toneMapping         = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 2.6

      /* ── Camera ───────────────────────────────────────────── */
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
      }
      resize()
      window.addEventListener('resize', resize)

      /* ── Scene ────────────────────────────────────────────── */
      const scene = new THREE.Scene()

      const ambient = new THREE.AmbientLight(0xffffff, 1.8)
      scene.add(ambient)

      // Main key — top-right
      const key = new THREE.DirectionalLight(0xffffff, 4.5)
      key.position.set(4, 8, 6)
      key.castShadow = true
      key.shadow.mapSize.setScalar(1024)
      scene.add(key)

      // Strong front fill — faces the plant directly from camera side
      const front = new THREE.DirectionalLight(0xffffff, 3.5)
      front.position.set(PLANT_X, 1.5, 8)
      scene.add(front)

      // Green rim from behind-left
      const rim = new THREE.PointLight(0x4ade80, 5.0, 28)
      rim.position.set(PLANT_X - 4, 4, -5)
      scene.add(rim)

      // Warm fill from right side
      const fill = new THREE.PointLight(0xa8edbc, 2.5, 20)
      fill.position.set(PLANT_X + 3, 2, 3)
      scene.add(fill)

      /* ── Disease light (problem section) ─────────────────── */
      const diseaseLight = new THREE.PointLight(0xff6a00, 0, 7)
      diseaseLight.position.set(PLANT_X, 1.5, 0.5)
      scene.add(diseaseLight)

      /* ── Scan plane (solution section) ───────────────────── */
      const scanMat = new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const scanPlane = new THREE.Mesh(
        new THREE.BoxGeometry(4.0, 0.018, 4.0),
        scanMat
      )
      scene.add(scanPlane)

      // Glow volume below the scan plane
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const glowVolume = new THREE.Mesh(
        new THREE.BoxGeometry(3.6, 0.4, 3.6),
        glowMat
      )
      scene.add(glowVolume)

      // Scan point light that follows the plane
      const scanLight = new THREE.PointLight(0x4ade80, 0, 6)
      scene.add(scanLight)

      /* ── Model ────────────────────────────────────────────── */
      const draco = new DRACOLoader()
      draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(draco)

      const group = new THREE.Group()
      scene.add(group)
      let modelReady = false
      const meshData = [] // { mesh, origColor: THREE.Color }

      loader.load('/plant/scene.gltf', (gltf) => {
        if (cancelled) return
        const model = gltf.scene
        const box    = new THREE.Box3().setFromObject(model)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale  = 4.8 / Math.max(size.x, size.y, size.z)

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))
        model.position.y -= 0.4

        model.traverse((child) => {
          if (!child.isMesh) return
          child.castShadow = child.receiveShadow = true
          if (child.material) {
            // Clone material so we can tint per-mesh
            child.material = child.material.clone()
            child.material.envMapIntensity = 1.0
            meshData.push({
              mesh: child,
              origR: child.material.color.r,
              origG: child.material.color.g,
              origB: child.material.color.b,
            })
          }
        })

        group.add(model)
        // Fix plant to right side of viewport
        group.position.x = PLANT_X
        modelReady = true
      })

      /* ── Mouse ────────────────────────────────────────────── */
      let mxRaw = 0, myRaw = 0
      const onMouse = (e) => {
        mxRaw = e.clientX / window.innerWidth  - 0.5
        myRaw = e.clientY / window.innerHeight - 0.5
      }
      window.addEventListener('mousemove', onMouse, { passive: true })

      /* ── Springs (one per interpolated value) ────────────── */
      const sp = {
        camX: makeSpring(-0.5), camY: makeSpring(1.0),  camZ: makeSpring(6.5),
        lkX:  makeSpring(PLANT_X), lkY: makeSpring(1.0), lkZ: makeSpring(0),
        mx:   makeSpring(0),   my:   makeSpring(0),
        sick: makeSpring(0),   scan: makeSpring(0),
        rimR: makeSpring(0.29), rimG: makeSpring(0.87), rimB: makeSpring(0.5),
        rimI: makeSpring(5.0),
      }

      /* ── Animate ──────────────────────────────────────────── */
      let raf
      let time    = 0
      let scanY   = -0.5   // scan line Y position
      let scanDir = 1      // +1 = going up, -1 = going down

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.01

        const sec    = sectionRef.current || 'hero'
        const camTgt = CAM_STATES[sec]
        const fxTgt  = FX[sec]

        // ── Spring-step every value ──────────────────────────
        const cx  = stepSpring(sp.camX,  camTgt.x,  0.028, 0.92)
        const cy  = stepSpring(sp.camY,  camTgt.y,  0.028, 0.92)
        const cz  = stepSpring(sp.camZ,  camTgt.z,  0.028, 0.92)
        const lkx = stepSpring(sp.lkX,   camTgt.lx, 0.028, 0.92)
        const lky = stepSpring(sp.lkY,   camTgt.ly, 0.028, 0.92)
        const lkz = stepSpring(sp.lkZ,   camTgt.lz, 0.028, 0.92)

        const sick = stepSpring(sp.sick, fxTgt.sick, 0.018, 0.93)
        const scan = stepSpring(sp.scan, fxTgt.scan, 0.022, 0.92)
        const rR   = stepSpring(sp.rimR, fxTgt.rimR, 0.022, 0.93)
        const rG   = stepSpring(sp.rimG, fxTgt.rimG, 0.022, 0.93)
        const rB   = stepSpring(sp.rimB, fxTgt.rimB, 0.022, 0.93)
        const rI   = stepSpring(sp.rimI, fxTgt.rimI, 0.022, 0.93)

        const mx = stepSpring(sp.mx, mxRaw, 0.08, 0.82)
        const my = stepSpring(sp.my, myRaw, 0.08, 0.82)

        // ── Camera ───────────────────────────────────────────
        camera.position.set(cx + mx * 0.22, cy - my * 0.14, cz)
        camera.lookAt(lkx, lky, lkz)

        // ── Rim light (color + intensity spring) ─────────────
        rim.color.setRGB(rR, rG, rB)
        rim.intensity = rI + Math.sin(time * 0.55) * 0.6
        rim.position.x = (PLANT_X - 4) + Math.sin(time * 0.42) * 0.6

        // ── Disease light ─────────────────────────────────────
        const flicker = sick * (1.8 + Math.sin(time * 9.5) * 0.7 + Math.sin(time * 17) * 0.3)
        diseaseLight.intensity = flicker
        diseaseLight.position.y = 1.5 + Math.sin(time * 3.2) * 0.3

        if (modelReady) {
          // ── Plant sway ─────────────────────────────────────
          const camVel = Math.abs(sp.camX.vel) + Math.abs(sp.camY.vel) + Math.abs(sp.camZ.vel)
          const transitionSpin = camVel * 1.8
          const wilt = sick * 0.06
          group.rotation.y = Math.sin(time * 0.32) * 0.025 + mx * 0.055 + transitionSpin
          group.rotation.x = -my * 0.07  + Math.sin(time * 0.26) * 0.012
          group.rotation.z = wilt + Math.sin(time * 0.18) * (0.01 + sick * 0.02)

          // Breathing scale (reduced when sick, stronger during scan)
          const breathe = 1 + Math.sin(time * 0.72) * (0.006 + scan * 0.004)
          group.scale.setScalar(breathe)

          // ── Material tint (sick = yellowish-brown) ─────────
          meshData.forEach(({ mesh, origR, origG, origB }) => {
            const m = mesh.material
            // sick target: R stays, G×0.6, B×0.08
            m.color.r = origR + (origR * 0.1) * sick
            m.color.g = origG * (1 - sick * 0.45)
            m.color.b = origB * (1 - sick * 0.85)
          })
        }

        // ── Scan plane ───────────────────────────────────────
        if (scan > 0.01) {
          scanY += scanDir * 0.022
          if (scanY >  3.8) { scanY =  3.8; scanDir = -1 }
          if (scanY < -0.5) { scanY = -0.5; scanDir =  1 }

          const opBase = scan * 0.75
          scanPlane.position.set(PLANT_X, scanY, 0)
          scanMat.opacity = opBase + Math.sin(time * 4) * 0.15 * scan

          glowVolume.position.set(PLANT_X, scanY - 0.22 * scanDir, 0)
          glowMat.opacity = opBase * 0.18

          scanLight.position.set(PLANT_X, scanY, 0)
          scanLight.intensity = scan * (2.0 + Math.sin(time * 4) * 0.5)
        } else {
          scanMat.opacity  = 0
          glowMat.opacity  = 0
          scanLight.intensity = 0
        }

        renderer.render(scene, camera)
      }
      animate()

      cleanupFn = () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', resize)
        renderer.dispose()
        draco.dispose()
      }
    })

    return () => { cancelled = true; cleanupFn() }
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
