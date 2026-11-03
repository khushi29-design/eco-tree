/**
 * ForestScene.jsx — the living 3D banyan tree on the homepage (Three.js / WebGL).
 *
 * Everything is generated in code (no heavy 3D model download):
 *   - a multi-stemmed banyan trunk, spreading limbs and hanging aerial roots
 *   - thousands of instanced leaves that sway in the wind (tiny vertex shader)
 *   - sunlight shafts, atmospheric fog, floating pollen, a distant tree line and birds
 *   - camera parallax on mouse move, and a scroll-driven camera journey into the canopy
 *
 * Performance safeguards:
 *   - fewer leaves / particles on phones, pixel ratio capped at 1.5
 *   - rendering pauses when the scene is off-screen or the tab is hidden
 *   - reduced-motion visitors get a single still frame
 *   - if WebGL is unavailable, `onFail` is called and the page shows a photo instead
 *
 * Props:
 *   progressRef  — a React ref whose .current (0 → 1) is the scroll progress of the hero
 *   onReady/onFail — callbacks for the loading indicator / photo fallback
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ---------- tiny seeded random, so the tree looks the same on every visit ---------- */
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- a tube that tapers from r0 to r1 along a curve (branches, roots) ---------- */
function taperedTube(curve, r0, r1, segments = 24, radial = 7) {
  const geo = new THREE.TubeGeometry(curve, segments, 1, radial, false);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const center = curve.getPointAt(t);
    const r = r0 + (r1 - r0) * Math.pow(t, 0.8);
    for (let j = 0; j <= radial; j++) {
      const idx = i * (radial + 1) + j;
      v.fromBufferAttribute(pos, idx).sub(center).multiplyScalar(r).add(center);
      pos.setXYZ(idx, v.x, v.y, v.z);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

/* ---------- canvas-drawn textures (leaf shape, soft dot, light shaft) ---------- */
function leafTexture() {
  const c = document.createElement("canvas"); c.width = 64; c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "#000"; g.fillRect(0, 0, 64, 128);
  g.fillStyle = "#fff"; g.beginPath();
  g.moveTo(32, 4); g.bezierCurveTo(62, 40, 58, 96, 32, 124); g.bezierCurveTo(6, 96, 2, 40, 32, 4); g.fill();
  return new THREE.CanvasTexture(c);
}
function dotTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g = c.getContext("2d"); const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)"); grd.addColorStop(0.35, "rgba(255,255,255,0.5)"); grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
function shaftTexture() {
  const c = document.createElement("canvas"); c.width = 64; c.height = 256;
  const g = c.getContext("2d");
  const v = g.createLinearGradient(0, 0, 0, 256); v.addColorStop(0, "rgba(255,255,255,0)"); v.addColorStop(0.25, "rgba(255,255,255,0.9)"); v.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = v; g.fillRect(0, 0, 64, 256);
  g.globalCompositeOperation = "destination-in";
  const h = g.createLinearGradient(0, 0, 64, 0); h.addColorStop(0, "rgba(0,0,0,0)"); h.addColorStop(0.5, "rgba(0,0,0,1)"); h.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = h; g.fillRect(0, 0, 64, 256);
  return new THREE.CanvasTexture(c);
}

export default function ForestScene({ progressRef, onReady, onFail }) {
  const mount = useRef(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const small = window.innerWidth < 760 || window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = rng(20261103);

    /* ----- renderer ----- */
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: false, powerPreference: "high-performance" });
    } catch (e) {
      onFail?.(e);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const FOG = new THREE.Color("#1a3527");
    scene.fog = new THREE.Fog(FOG, 14, 70);
    const camera = new THREE.PerspectiveCamera(small ? 55 : 42, 1, 0.1, 200);

    /* ----- sky dome: deep green above, warm gold glow behind the tree ----- */
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(120, 32, 16),
      new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: { sunDir: { value: new THREE.Vector3(-0.35, 0.18, -1).normalize() } },
        vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `varying vec3 vDir; uniform vec3 sunDir;
          void main(){
            float h = clamp(vDir.y*0.5+0.5, 0.0, 1.0);
            vec3 top = vec3(0.035,0.10,0.075); vec3 hor = vec3(0.16,0.25,0.18);
            vec3 col = mix(hor, top, smoothstep(0.45, 0.95, h));
            float s = max(dot(normalize(vDir), sunDir), 0.0);
            col += vec3(1.0,0.78,0.45) * (pow(s, 8.0)*0.55 + pow(s, 60.0)*1.4);
            gl_FragColor = vec4(col, 1.0);
          }`,
      })
    );
    scene.add(sky);

    /* ----- light ----- */
    scene.add(new THREE.HemisphereLight("#cfe3b0", "#1d2a17", 0.9));
    const sun = new THREE.DirectionalLight("#ffd79a", 2.4);
    sun.position.set(-12, 16, -18);
    scene.add(sun);
    const rim = new THREE.DirectionalLight("#c5d9a5", 0.6);
    rim.position.set(10, 6, 12);
    scene.add(rim);

    /* ----- ground + soft canopy shadow ----- */
    const ground = new THREE.Mesh(new THREE.CircleGeometry(90, 48), new THREE.MeshLambertMaterial({ color: "#1d3a26" }));
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(10, 40),
      new THREE.MeshBasicMaterial({ map: dotTexture(), color: "#000", transparent: true, opacity: 0.55, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.02; shadow.scale.set(1.3, 1, 1);
    scene.add(shadow);

    /* ----- the banyan ----- */
    const tree = new THREE.Group();
    scene.add(tree);
    const barkMat = new THREE.MeshStandardMaterial({ color: "#4a3626", roughness: 0.95, metalness: 0 });
    const rootMat = new THREE.MeshStandardMaterial({ color: "#5a4431", roughness: 1 });
    const tips = []; // where leaf clusters grow

    // fused, twisting multi-stem trunk
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rand() * 0.4;
      const r = 0.55 + rand() * 0.25;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * r * 1.6, 0, Math.sin(a) * r * 1.6),
        new THREE.Vector3(Math.cos(a + 0.5) * r, 1.4, Math.sin(a + 0.5) * r),
        new THREE.Vector3(Math.cos(a + 0.9) * r * 0.7, 2.8, Math.sin(a + 0.9) * r * 0.7),
        new THREE.Vector3(Math.cos(a + 1.2) * r * 0.9, 3.8, Math.sin(a + 1.2) * r * 0.9),
      ]);
      tree.add(new THREE.Mesh(taperedTube(curve, 0.55 + rand() * 0.2, 0.32, 20, 8), barkMat));
    }

    // spreading primary limbs, with secondary branches and hanging aerial roots
    const LIMBS = 9;
    for (let i = 0; i < LIMBS; i++) {
      const a = (i / LIMBS) * Math.PI * 2 + rand() * 0.5;
      const reach = 6 + rand() * 4;
      const lift = 4.6 + rand() * 1.6;
      const start = new THREE.Vector3(Math.cos(a) * 0.5, 3.6 + rand() * 0.4, Math.sin(a) * 0.5);
      const limb = new THREE.CatmullRomCurve3([
        start,
        new THREE.Vector3(Math.cos(a) * reach * 0.35, lift, Math.sin(a) * reach * 0.35),
        new THREE.Vector3(Math.cos(a + 0.12) * reach * 0.7, lift + 0.6, Math.sin(a + 0.12) * reach * 0.7),
        new THREE.Vector3(Math.cos(a + 0.2) * reach, lift + 0.1 - rand(), Math.sin(a + 0.2) * reach),
      ]);
      tree.add(new THREE.Mesh(taperedTube(limb, 0.42, 0.07, 28, 7), barkMat));
      tips.push(limb.getPointAt(1));

      // secondary branches rising into the canopy
      [0.35, 0.6, 0.85].forEach((t) => {
        const p0 = limb.getPointAt(t);
        const dir = new THREE.Vector3(Math.cos(a + (rand() - 0.5) * 1.8), 0.9 + rand() * 0.6, Math.sin(a + (rand() - 0.5) * 1.8)).normalize();
        const len = 1.8 + rand() * 2.2;
        const p2 = p0.clone().addScaledVector(dir, len);
        const p1 = p0.clone().lerp(p2, 0.5).add(new THREE.Vector3(0, 0.3, 0));
        tree.add(new THREE.Mesh(taperedTube(new THREE.CatmullRomCurve3([p0, p1, p2]), 0.16 * (1.2 - t), 0.03, 10, 5), barkMat));
        tips.push(p2, p1);
      });

      // aerial prop roots — the banyan's signature
      const roots = small ? 2 : 3;
      for (let k = 0; k < roots; k++) {
        const t = 0.45 + rand() * 0.5;
        const top = limb.getPointAt(t);
        const sway = () => (rand() - 0.5) * 0.25;
        const thick = rand() < 0.25;
        const root = new THREE.CatmullRomCurve3([
          top,
          new THREE.Vector3(top.x + sway(), top.y * 0.66, top.z + sway()),
          new THREE.Vector3(top.x + sway(), top.y * 0.33, top.z + sway()),
          new THREE.Vector3(top.x + sway() * 2, thick ? -0.1 : 0.3 + rand() * top.y * 0.4, top.z + sway() * 2),
        ]);
        tree.add(new THREE.Mesh(taperedTube(root, thick ? 0.11 : 0.035, thick ? 0.16 : 0.012, 14, 5), rootMat));
      }
    }

    /* ----- leaves: one instanced mesh, swaying in the wind ----- */
    const LEAVES = small ? 4200 : 11000;
    const leafGeo = new THREE.PlaneGeometry(0.26, 0.42);
    leafGeo.translate(0, 0.2, 0);
    const leafMat = new THREE.MeshLambertMaterial({ alphaMap: leafTexture(), alphaTest: 0.5, side: THREE.DoubleSide });
    const wind = { value: 0 };
    leafMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = wind;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nuniform float uTime;")
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
           vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
           float w = sin(uTime*1.4 + ip.x*0.45 + ip.z*0.35) * 0.09 + sin(uTime*3.1 + ip.y*1.7) * 0.035;
           transformed.x += w * (0.6 + position.y * 2.0);
           transformed.z += w * 0.5;`
        );
    };
    const leaves = new THREE.InstancedMesh(leafGeo, leafMat, LEAVES);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3();
    const palette = ["#2f6b3a", "#3f7d3f", "#4f8f45", "#5f9e4b", "#7aa957", "#2a5a33", "#8db866"].map((c) => new THREE.Color(c));
    const col = new THREE.Color();
    for (let i = 0; i < LEAVES; i++) {
      const tip = tips[Math.floor(rand() * tips.length)];
      // gaussian-ish spread, flattened into a broad banyan dome
      const g = () => (rand() + rand() + rand() - 1.5) / 1.5;
      p.set(tip.x + g() * 2.2, tip.y + g() * 1.0 + 0.4, tip.z + g() * 2.2);
      e.set(rand() * Math.PI, rand() * Math.PI * 2, rand() * Math.PI);
      q.setFromEuler(e);
      const sc = 0.7 + rand() * 0.8;
      s.set(sc, sc, sc);
      m.compose(p, q, s);
      leaves.setMatrixAt(i, m);
      // sun-side leaves are brighter
      col.copy(palette[Math.floor(rand() * palette.length)]).multiplyScalar(0.75 + (p.y / 9) * 0.45 + (p.x < 0 ? 0.08 : 0));
      leaves.setColorAt(i, col);
    }
    tree.add(leaves);

    /* ----- distant tree line, softened by fog ----- */
    // soft rounded crowns (several overlapping spheres per tree) that read as silhouettes in the fog
    const farCount = small ? 45 : 100;
    const farMat = new THREE.MeshLambertMaterial({ color: "#14301f" });
    const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.12, 0.2, 1, 5), farMat, farCount);
    const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 2), farMat, farCount * 3);
    for (let i = 0; i < farCount; i++) {
      const a = rand() * Math.PI * 2, r = 26 + rand() * 32;
      const h = 3 + rand() * 5;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      q.identity();
      p.set(x, h / 2, z); s.set(1, h, 1); m.compose(p, q, s); trunks.setMatrixAt(i, m);
      for (let k = 0; k < 3; k++) {
        const cr = 1.6 + rand() * 1.8;
        p.set(x + (rand() - 0.5) * 2.4, h + cr * 0.4 + (rand() - 0.3) * 1.2, z + (rand() - 0.5) * 2.4);
        s.set(cr * 1.25, cr * 0.85, cr * 1.25);
        m.compose(p, q, s); crowns.setMatrixAt(i * 3 + k, m);
      }
    }
    scene.add(trunks, crowns);

    /* ----- sunlight shafts through the canopy ----- */
    const shaftMat = new THREE.MeshBasicMaterial({ map: shaftTexture(), color: "#ffe2a8", transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    const shafts = [];
    for (let i = 0; i < (small ? 4 : 7); i++) {
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(1.4 + rand() * 1.6, 16), shaftMat.clone());
      sh.position.set(-6 + rand() * 12, 6, -2 + rand() * 5);
      sh.rotation.set(0, rand() * 0.6 - 0.3, 0.42 + rand() * 0.15);
      sh.userData.phase = rand() * Math.PI * 2;
      shafts.push(sh); scene.add(sh);
    }

    /* ----- floating pollen / dust motes ----- */
    const PCOUNT = small ? 260 : 700;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PCOUNT * 3), pSeed = new Float32Array(PCOUNT);
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3] = (rand() - 0.5) * 26; pPos[i * 3 + 1] = rand() * 11; pPos[i * 3 + 2] = (rand() - 0.5) * 18 + 2;
      pSeed[i] = rand() * 100;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.09, map: dotTexture(), color: "#ffe7b0", transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    const pollen = new THREE.Points(pGeo, pMat);
    scene.add(pollen);
    const basePos = pPos.slice();

    /* ----- birds in the distance ----- */
    const birds = [];
    const birdMat = new THREE.MeshBasicMaterial({ color: "#0d1d15", side: THREE.DoubleSide });
    for (let i = 0; i < (small ? 4 : 7); i++) {
      const b = new THREE.Group();
      const wingGeo = new THREE.BufferGeometry();
      wingGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0.55, 0.05, -0.12, 0.05, 0, 0.18]), 3));
      const lw = new THREE.Mesh(wingGeo, birdMat), rw = new THREE.Mesh(wingGeo, birdMat);
      rw.scale.x = -1;
      b.add(lw, rw);
      b.userData = { lw, rw, speed: 0.6 + rand() * 0.5, off: rand() * 40, y: 10 + rand() * 4, z: -22 - rand() * 12, phase: rand() * 6 };
      b.scale.setScalar(0.9 + rand() * 0.6);
      birds.push(b); scene.add(b);
    }

    /* ----- sizing ----- */
    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* ----- interaction: mouse parallax ----- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (ev) => { mouse.tx = (ev.clientX / window.innerWidth - 0.5) * 2; mouse.ty = (ev.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener("pointermove", onMove, { passive: true });

    /* ----- render loop (pauses off-screen / hidden tab) ----- */
    const clock = new THREE.Clock();
    let raf = 0, visible = true, first = true;
    const camFrom = new THREE.Vector3(), look = new THREE.Vector3();

    const frame = () => {
      const t = clock.getElapsedTime();
      const prog = Math.min(1, Math.max(0, progressRef?.current || 0));
      mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;

      // camera journey: from the meadow, rising toward and into the canopy
      const ease = prog * prog * (3 - 2 * prog);
      camFrom.set(1.5 * Math.sin(t * 0.08) + mouse.x * 1.1, 2.1 + ease * 4.4 - mouse.y * 0.5, 15.5 - ease * 10.5);
      camera.position.copy(camFrom);
      look.set(mouse.x * 0.5, 4.6 + ease * 2.2, 0);
      camera.lookAt(look);

      wind.value = t;
      tree.rotation.y = Math.sin(t * 0.05) * 0.06;
      shafts.forEach((sh) => { sh.material.opacity = (0.09 + Math.sin(t * 0.6 + sh.userData.phase) * 0.06) * (1 - ease * 0.6); });

      const arr = pGeo.attributes.position.array;
      for (let i = 0; i < PCOUNT; i++) {
        const sd = pSeed[i];
        arr[i * 3] = basePos[i * 3] + Math.sin(t * 0.3 + sd) * 0.6;
        arr[i * 3 + 1] = (basePos[i * 3 + 1] + t * 0.15 * (0.4 + (sd % 1))) % 11;
        arr[i * 3 + 2] = basePos[i * 3 + 2] + Math.cos(t * 0.25 + sd) * 0.5;
      }
      pGeo.attributes.position.needsUpdate = true;

      birds.forEach((b) => {
        const u = b.userData;
        const x = ((t * u.speed * 2 + u.off) % 80) - 40;
        b.position.set(x, u.y + Math.sin(t * 0.7 + u.phase) * 0.6, u.z);
        b.rotation.y = -Math.PI / 2;
        const flap = Math.sin(t * 9 * u.speed + u.phase) * 0.6;
        u.lw.rotation.z = flap; u.rw.rotation.z = -flap;
      });

      scene.fog.near = 14 - ease * 8; scene.fog.far = 70 - ease * 40;
      renderer.render(scene, camera);
      if (first) { first = false; onReady?.(); }
    };

    const loop = () => { frame(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }, { threshold: 0 });
    io.observe(host);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    frame(); // draw one frame immediately (this is the only frame for reduced-motion visitors)
    start();

    return () => {
      stop(); io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((mm) => { mm.map?.dispose?.(); mm.alphaMap?.dispose?.(); mm.dispose?.(); });
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progressRef, onReady, onFail]);

  return <div ref={mount} className="forest-scene" />;
}
