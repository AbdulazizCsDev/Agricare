import { useEffect, useRef } from 'react';

// نموذج نبتة مجاني CC0 من KhronosGroup glTF-Sample-Assets
// بنستخدم نموذج Ficus واقعي من مصدر موثوق
const MODEL_URL =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Ficus/glTF-Binary/Ficus.glb';

export default function PlantScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let cleanupFn = () => {};

    // نحمل Three.js + GLTFLoader بشكل ديناميكي
    Promise.all([
      import('three'),
      import('three/examples/jsm/loaders/GLTFLoader.js'),
      import('three/examples/jsm/loaders/DRACOLoader.js'),
    ]).then(([THREE, { GLTFLoader }, { DRACOLoader }]) => {
      if (cancelled || !container) return;

      const W = container.clientWidth  || 380;
      const H = container.clientHeight || 480;

      // ── Renderer ─────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);

      // ── Scene & Camera ────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 1.2, 3.8);
      camera.lookAt(0, 0.6, 0);

      // ── Lighting ──────────────────────────────────────────
      // Ambient خفيف لاللون الأزرق الموجود في الموقع
      const ambient = new THREE.AmbientLight(0x00d4ff, 0.3);
      scene.add(ambient);

      // ضوء رئيسي أبيض من الأعلى
      const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
      mainLight.position.set(2, 4, 3);
      mainLight.castShadow = true;
      mainLight.shadow.camera.near = 0.1;
      mainLight.shadow.camera.far  = 20;
      mainLight.shadow.mapSize.setScalar(1024);
      scene.add(mainLight);

      // ضوء ملون بنفسجي من الجانب - يتوافق مع --accent-purple
      const rimLight = new THREE.PointLight(0x7b2fff, 1.5, 8);
      rimLight.position.set(-2, 1.5, -1);
      scene.add(rimLight);

      // ضوء أزرق خلفي - يتوافق مع --accent
      const backLight = new THREE.PointLight(0x00d4ff, 0.8, 10);
      backLight.position.set(0, 2, -3);
      scene.add(backLight);

      // ── Group للتحريك ──────────────────────────────────────
      const group = new THREE.Group();
      scene.add(group);

      // ── تحميل النموذج ─────────────────────────────────────
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      let modelLoaded = false;

      loader.load(
        MODEL_URL,
        (gltf) => {
          if (cancelled) return;
          const model = gltf.scene;

          // توسيط وتحجيم النموذج
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size   = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale  = 2.2 / maxDim;

          model.scale.setScalar(scale);
          model.position.sub(center.multiplyScalar(scale));
          model.position.y += 0.1; // رفع قليل

          // تفعيل الظلال على كل mesh
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow    = true;
              child.receiveShadow = true;
              // تحسين المواد
              if (child.material) {
                child.material.envMapIntensity = 0.8;
              }
            }
          });

          group.add(model);
          modelLoaded = true;

          // Fade in بعد التحميل
          container.style.opacity = '0';
          container.style.transition = 'opacity 0.8s ease';
          requestAnimationFrame(() => {
            container.style.opacity = '1';
          });
        },
        undefined,
        (error) => {
          console.warn('PlantScene: فشل تحميل النموذج، يتم استخدام fallback', error);
          // Fallback: نبتة بسيطة بـ Three.js primitives
          buildFallbackPlant(THREE, group);
          modelLoaded = true;
        }
      );

      // ── Interaction ────────────────────────────────────────
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      const onMouseMove = (e) => {
        // نحسب الفرق من مركز الشاشة
        targetY =  (e.clientX / window.innerWidth  - 0.5) * 0.5; // rotation Y
        targetX = -(e.clientY / window.innerHeight - 0.5) * 0.3; // rotation X
      };

      const onDeviceOrientation = (e) => {
        if (e.gamma !== null) targetY = (e.gamma / 45) * 0.4;
        if (e.beta  !== null) targetX = ((e.beta - 45) / 45) * 0.2;
      };

      window.addEventListener('mousemove',        onMouseMove,        { passive: true });
      window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });

      const onResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // ── Animation Loop ────────────────────────────────────
      let raf;
      let time = 0;

      const animate = () => {
        raf = requestAnimationFrame(animate);
        time += 0.01;

        // Smooth lerp للحركة
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        if (modelLoaded) {
          // تأرجح خفيف + استجابة للماوس
          group.rotation.y = currentY + Math.sin(time * 0.4) * 0.04;
          group.rotation.x = currentX + Math.sin(time * 0.3) * 0.02;
          group.rotation.z = Math.sin(time * 0.25) * 0.015;

          // نبض خفيف في الحجم (نَفَس)
          const breathe = 1 + Math.sin(time * 0.7) * 0.008;
          group.scale.setScalar(breathe);
        }

        // حركة الأضواء
        rimLight.position.x = -2 + Math.sin(time * 0.5) * 0.5;
        rimLight.position.y =  1.5 + Math.cos(time * 0.3) * 0.3;

        renderer.render(scene, camera);
      };
      animate();

      cleanupFn = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove',         onMouseMove);
        window.removeEventListener('deviceorientation', onDeviceOrientation);
        window.removeEventListener('resize',            onResize);
        renderer.dispose();
        dracoLoader.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelled = true;
      cleanupFn();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="plant-scene"
      aria-hidden="true"
    />
  );
}

// ── Fallback إذا فشل تحميل الـ GLB ──────────────────────────────
function buildFallbackPlant(THREE, group) {
  // إناء
  const potGeo = new THREE.CylinderGeometry(0.42, 0.3, 0.55, 20);
  const potMat = new THREE.MeshStandardMaterial({ color: 0xc1440e, roughness: 0.7 });
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.y = -1.0;
  group.add(pot);

  // تربة
  const soilGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.06, 20);
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 1 });
  const soil = new THREE.Mesh(soilGeo, soilMat);
  soil.position.y = -0.7;
  group.add(soil);

  // ساق
  const stemGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.6, 8);
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x4a7c3f, roughness: 0.8 });
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.y = 0.1;
  group.add(stem);

  // أوراق بـ ShapeGeometry
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.quadraticCurveTo(0.35, 0.7, 0, 1.6);
  leafShape.quadraticCurveTo(-0.35, 0.7, 0, 0);

  const leafGeo  = new THREE.ShapeGeometry(leafShape, 12);
  const leafMat1 = new THREE.MeshStandardMaterial({ color: 0x2d7a3a, side: THREE.DoubleSide, roughness: 0.6 });
  const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x3d9a4a, side: THREE.DoubleSide, roughness: 0.6 });

  const leaves = [
    { x:  0.25, y: 0.3,  rz:  0.4, mat: leafMat1, s: 0.9 },
    { x: -0.25, y: 0.55, rz: -0.5, mat: leafMat2, s: 1.0 },
    { x:  0.3,  y: 0.85, rz:  0.3, mat: leafMat1, s: 0.85 },
    { x: -0.2,  y: 1.1,  rz: -0.4, mat: leafMat2, s: 1.05 },
    { x:  0.15, y: 1.35, rz:  0.2, mat: leafMat1, s: 0.75 },
    { x: -0.1,  y: 1.55, rz: -0.2, mat: leafMat2, s: 0.7  },
  ];

  leaves.forEach(({ x, y, rz, mat, s }) => {
    const leaf = new THREE.Mesh(leafGeo, mat);
    leaf.position.set(x, y, (Math.random() - 0.5) * 0.2);
    leaf.rotation.z = rz;
    leaf.scale.setScalar(s);
    group.add(leaf);
  });
}
