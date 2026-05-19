import { useEffect, useRef } from 'react'

/*
 * Camera looks at the CONTENT area (left side).
 * Plant is placed at the far right of the viewport in world space.
 * It appears naturally on the right because the camera is NOT pointing at it.
 */
const CAM_STATES = {
  hero:         { x: -1.0, y: 1.0, z: 6.5, lx: -0.5, ly: 1.0, lz: 0 },
  problem:      { x: -0.5, y: 1.8, z: 7.2, lx: -0.5, ly: 1.6, lz: 0 },
  solution:     { x: -0.5, y: 0.6, z: 7.0, lx: -0.5, ly: 0.6, lz: 0 },
  timeline:     { x: -1.5, y: 1.2, z: 6.0, lx: -1.0, ly: 1.0, lz: 0 },
  architecture: { x: -0.5, y: 1.4, z: 6.0, lx: -0.5, ly: 1.2, lz: 0 },
}

const FX = {
  hero:         { sick: 0, scan: 0, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 3.0 },
  problem:      { sick: 1, scan: 0, rimR: 0.85, rimG: 0.25, rimB: 0.05, rimI: 4.0 },
  solution:     { sick: 0, scan: 1, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 3.5 },
  timeline:     { sick: 0, scan: 0, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 2.5 },
  architecture: { sick: 0, scan: 0, rimR: 0.29, rimG: 0.87, rimB: 0.5,  rimI: 2.5 },
}

const SECTIONS = ['hero', 'problem', 'solution', 'timeline', 'architecture']

function lerp(a, b, t) { return a + (b - a) * t }
function makeVal(v)     { return { v } }

export default function PlantBackground() {
  const canvasRef  = useRef(null)
  const sectionRef = useRef('hero')

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

      /* ── Dynamic plant X — right edge of viewport in world space ─ */
      const getPlantX = () => {
        const aspect = window.innerWidth / window.innerHeight
        // Visible half-width at z=0 with camera at (x=-1, z=6.5, fov=36)
        const halfW = Math.tan(18 * Math.PI / 180) * 6.5 * aspect
        // Right edge of screen = camX + halfW; pull plant 0.9u inward
        return -1.0 + halfW - 0.9
      }
      let plantX = getPlantX()

      /* ── Scene ────────────────────────────────────────────── */
      const scene = new THREE.Scene()

      const ambient = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambient)

      const topSpot = new THREE.SpotLight(0xffffff, 18, 30, Math.PI / 5.5, 0.35, 1.2)
      topSpot.position.set(plantX, 12, 2)
      topSpot.target.position.set(plantX, 0, 0)
      topSpot.castShadow = true
      topSpot.shadow.mapSize.setScalar(1024)
      scene.add(topSpot)
      scene.add(topSpot.target)

      const front = new THREE.DirectionalLight(0xffffff, 1.8)
      front.position.set(plantX - 1, 3, 9)
      scene.add(front)

      const rim = new THREE.PointLight(0x4ade80, 4.0, 22)
      rim.position.set(plantX - 3, 5, -4)
      scene.add(rim)

      const fill = new THREE.PointLight(0x88ccff, 1.2, 18)
      fill.position.set(plantX - 4, 2, 4)
      scene.add(fill)

      const diseaseLight = new THREE.PointLight(0xff6a00, 0, 7)
      diseaseLight.position.set(plantX, 1.5, 0.5)
      scene.add(diseaseLight)

      /* ── Scan plane ───────────────────────────────────────── */
      const scanMat = new THREE.MeshBasicMaterial({
        color: 0x4ade80, transparent: true, opacity: 0,
        depthWrite: false, side: THREE.DoubleSide,
      })
      const scanPlane = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.018, 4.0), scanMat)
      scene.add(scanPlane)

      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4ade80, transparent: true, opacity: 0,
        depthWrite: false, side: THREE.DoubleSide,
      })
      const glowVolume = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.4, 3.6), glowMat)
      scene.add(glowVolume)

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
      const meshData = []

      loader.load('/plant/scene.gltf', (gltf) => {
        if (cancelled) return
        const model = gltf.scene
        const box    = new THREE.Box3().setFromObject(model)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const scale  = 6.24 / Math.max(size.x, size.y, size.z)

        model.scale.setScalar(scale)
        model.position.sub(center.multiplyScalar(scale))
        model.position.y -= 0.4

        model.traverse((child) => {
          if (!child.isMesh) return
          child.castShadow = child.receiveShadow = true
          if (child.material) {
            child.material = child.material.clone()
            child.material.envMapIntensity = 1.0
            meshData.push({
              mesh:  child,
              origR: child.material.color.r,
              origG: child.material.color.g,
              origB: child.material.color.b,
            })
          }
        })

        group.add(model)
        group.position.x = plantX
        modelReady = true
      })

      /* ── Resize ───────────────────────────────────────────── */
      const repositionLights = () => {
        topSpot.position.setX(plantX)
        topSpot.target.position.setX(plantX)
        front.position.setX(plantX - 1)
        rim.position.setX(plantX - 3)
        fill.position.setX(plantX - 4)
        diseaseLight.position.setX(plantX)
        if (modelReady) group.position.x = plantX
      }

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        plantX = getPlantX()
        repositionLights()
      }
      resize()
      window.addEventListener('resize', resize)

      /* ── Mouse ────────────────────────────────────────────── */
      let mxRaw = 0, myRaw = 0
      const onMouse = (e) => {
        mxRaw = e.clientX / window.innerWidth  - 0.5
        myRaw = e.clientY / window.innerHeight - 0.5
      }
      window.addEventListener('mousemove', onMouse, { passive: true })

      /* ── Lerp state ───────────────────────────────────────── */
      const lv = {
        camX: makeVal(-1.0), camY: makeVal(1.0),  camZ: makeVal(6.5),
        lkX:  makeVal(-0.5), lkY:  makeVal(1.0),  lkZ:  makeVal(0),
        mx:   makeVal(0),    my:   makeVal(0),
        sick: makeVal(0),    scan: makeVal(0),
        rimR: makeVal(0.29), rimG: makeVal(0.87), rimB: makeVal(0.5),
        rimI: makeVal(3.0),
        rotY: makeVal(0),   // section-change rotation impulse
      }

      /* ── Animate ──────────────────────────────────────────── */
      let raf
      let time     = 0
      let scanY    = -0.5
      let scanDir  = 1
      let prevSec  = 'hero'

      const animate = () => {
        raf = requestAnimationFrame(animate)
        time += 0.01

        const sec    = sectionRef.current || 'hero'
        const camTgt = CAM_STATES[sec]
        const fxTgt  = FX[sec]

        // Section change → fire a rotation impulse
        if (sec !== prevSec) {
          lv.rotY.v += 0.28
          prevSec = sec
        }

        const cx  = lv.camX.v = lerp(lv.camX.v, camTgt.x,  0.055)
        const cy  = lv.camY.v = lerp(lv.camY.v, camTgt.y,  0.055)
        const cz  = lv.camZ.v = lerp(lv.camZ.v, camTgt.z,  0.055)
        const lkx = lv.lkX.v  = lerp(lv.lkX.v,  camTgt.lx, 0.055)
        const lky = lv.lkY.v  = lerp(lv.lkY.v,  camTgt.ly, 0.055)
        const lkz = lv.lkZ.v  = lerp(lv.lkZ.v,  camTgt.lz, 0.055)

        const sick = lv.sick.v = lerp(lv.sick.v, fxTgt.sick, 0.035)
        const scan = lv.scan.v = lerp(lv.scan.v, fxTgt.scan, 0.035)
        const rR   = lv.rimR.v = lerp(lv.rimR.v, fxTgt.rimR, 0.04)
        const rG   = lv.rimG.v = lerp(lv.rimG.v, fxTgt.rimG, 0.04)
        const rB   = lv.rimB.v = lerp(lv.rimB.v, fxTgt.rimB, 0.04)
        const rI   = lv.rimI.v = lerp(lv.rimI.v, fxTgt.rimI, 0.04)

        const mx   = lv.mx.v  = lerp(lv.mx.v,   mxRaw, 0.1)
        const my   = lv.my.v  = lerp(lv.my.v,   myRaw, 0.1)
        // Rotation impulse decays to 0
        const rotY = lv.rotY.v = lerp(lv.rotY.v, 0, 0.04)

        camera.position.set(cx + mx * 0.18, cy - my * 0.12, cz)
        camera.lookAt(lkx, lky, lkz)

        rim.color.setRGB(rR, rG, rB)
        rim.intensity = rI + Math.sin(time * 0.55) * 0.6
        rim.position.x = (plantX - 3) + Math.sin(time * 0.42) * 0.6

        const flicker = sick * (1.8 + Math.sin(time * 9.5) * 0.7 + Math.sin(time * 17) * 0.3)
        diseaseLight.intensity = flicker
        diseaseLight.position.y = 1.5 + Math.sin(time * 3.2) * 0.3

        if (modelReady) {
          const wilt = sick * 0.05
          // Base sway + impulse rotation when section changes
          group.rotation.y = Math.sin(time * 0.28) * 0.012 + mx * 0.03 + rotY
          group.rotation.x = -my * 0.04 + Math.sin(time * 0.22) * 0.006
          group.rotation.z = wilt + Math.sin(time * 0.16) * (0.006 + sick * 0.014)

          const breathe = 1 + Math.sin(time * 0.72) * (0.006 + scan * 0.004)
          group.scale.setScalar(breathe)

          meshData.forEach(({ mesh, origR, origG, origB }) => {
            const m = mesh.material
            m.color.r = origR + (origR * 0.1) * sick
            m.color.g = origG * (1 - sick * 0.45)
            m.color.b = origB * (1 - sick * 0.85)
          })
        }

        if (scan > 0.01) {
          scanY += scanDir * 0.022
          if (scanY >  3.8) { scanY =  3.8; scanDir = -1 }
          if (scanY < -0.5) { scanY = -0.5; scanDir =  1 }

          const opBase = scan * 0.75
          scanPlane.position.set(plantX, scanY, 0)
          scanMat.opacity = opBase + Math.sin(time * 4) * 0.15 * scan
          glowVolume.position.set(plantX, scanY - 0.22 * scanDir, 0)
          glowMat.opacity = opBase * 0.18
          scanLight.position.set(plantX, scanY, 0)
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
