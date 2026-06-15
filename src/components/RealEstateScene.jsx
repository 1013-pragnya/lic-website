import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Timer } from 'three';

export default function RealEstateScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Create Scene
    const scene = new THREE.Scene();

    // 2. Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    // 3. Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Create Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.0);
    scene.add(ambientLight);

    const goldLight = new THREE.DirectionalLight(0xffdf80, 2.5);
    goldLight.position.set(5, 8, 3);
    goldLight.castShadow = true;
    goldLight.shadow.mapSize.width = 1024;
    goldLight.shadow.mapSize.height = 1024;
    goldLight.shadow.bias = -0.001;
    scene.add(goldLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 1.5);
    fillLight.position.set(-6, 3, -1);
    scene.add(fillLight);

    // Point lights for window glow
    const glowLight = new THREE.PointLight(0xcfa844, 4.0, 6);
    glowLight.position.set(0, 0.5, 0.5);
    scene.add(glowLight);

    // --- Mesh Groups ---
    const realEstateGroup = new THREE.Group();
    realEstateGroup.position.set(0, -0.4, 0);
    scene.add(realEstateGroup);

    // A. Luxury Modern House / Skyscraper Models
    const buildingGroup = new THREE.Group();
    realEstateGroup.add(buildingGroup);

    // Materials
    const baseGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0a192f,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });

    const structureMat = new THREE.MeshStandardMaterial({
      color: 0xcfa844,
      metalness: 0.95,
      roughness: 0.15
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3
    });

    const glowWindowMat = new THREE.MeshBasicMaterial({
      color: 0xffe89c
    });

    // 1. High-rise Luxury Building
    const buildingHeight = 2.2;
    const towerGeo = new THREE.BoxGeometry(0.5, buildingHeight, 0.5);
    const tower = new THREE.Mesh(towerGeo, baseGlassMat);
    tower.position.set(-0.8, buildingHeight / 2, 0);
    tower.castShadow = true;
    tower.receiveShadow = true;
    buildingGroup.add(tower);

    // Gold facade structural columns on high-rise
    const colGeo = new THREE.CylinderGeometry(0.02, 0.02, buildingHeight, 8);
    const positions = [
      [-1.06, 0.26],
      [-0.54, 0.26],
      [-1.06, -0.26],
      [-0.54, -0.26]
    ];
    positions.forEach(([x, z]) => {
      const col = new THREE.Mesh(colGeo, structureMat);
      col.position.set(x, buildingHeight / 2, z);
      buildingGroup.add(col);
    });

    // Spire on top of tower
    const spireGeo = new THREE.CylinderGeometry(0.005, 0.015, 0.5, 8);
    const spire = new THREE.Mesh(spireGeo, structureMat);
    spire.position.set(-0.8, buildingHeight + 0.25, 0);
    buildingGroup.add(spire);

    // 2. Modern Villa/Penthouse block next to the tower
    const villaHeight = 1.0;
    const villaGeo = new THREE.BoxGeometry(1.0, villaHeight, 0.8);
    const villa = new THREE.Mesh(villaGeo, whiteMat);
    villa.position.set(0.2, villaHeight / 2, 0.3);
    villa.castShadow = true;
    villa.receiveShadow = true;
    buildingGroup.add(villa);

    // Villa Glass wrap (Balcony / Front)
    const wrapGeo = new THREE.BoxGeometry(0.9, 0.3, 0.84);
    const wrap = new THREE.Mesh(wrapGeo, baseGlassMat);
    wrap.position.set(0.2, 0.7, 0.3);
    buildingGroup.add(wrap);

    // Gold Villa Roof / Canopy
    const roofGeo = new THREE.BoxGeometry(1.1, 0.06, 0.9);
    const roof = new THREE.Mesh(roofGeo, structureMat);
    roof.position.set(0.2, villaHeight + 0.03, 0.3);
    buildingGroup.add(roof);

    // Tiny glowing yellow window cells
    const windowGeo = new THREE.BoxGeometry(0.06, 0.06, 0.01);
    for (let f = 1; f <= 5; f++) {
      const yPos = f * 0.35;
      const winL = new THREE.Mesh(windowGeo, glowWindowMat);
      winL.position.set(-0.8, yPos, 0.26);
      buildingGroup.add(winL);

      const winR = new THREE.Mesh(windowGeo, glowWindowMat);
      winR.position.set(-0.8, yPos, -0.26);
      buildingGroup.add(winR);
    }

    // B. Gated Gird (Land Investment Concept)
    const landGridHelper = new THREE.GridHelper(4.0, 16, 0xcfa844, 0x1d4ed8);
    landGridHelper.position.y = 0.01;
    // Lower grid opacity
    landGridHelper.material.transparent = true;
    landGridHelper.material.opacity = 0.45;
    realEstateGroup.add(landGridHelper);

    // C. Glowing Property Growth Graph (Rising Curve)
    const curvePoints = [];
    curvePoints.push(new THREE.Vector3(-1.8, 0.1, -1.2));
    curvePoints.push(new THREE.Vector3(-1.0, 0.3, -0.6));
    curvePoints.push(new THREE.Vector3(-0.2, 0.6, 0.0));
    curvePoints.push(new THREE.Vector3(0.6, 1.1, 0.6));
    curvePoints.push(new THREE.Vector3(1.5, 1.8, 1.2));

    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.03, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xcfa844,
      emissive: 0xcfa844,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9
    });
    const graphLine = new THREE.Mesh(tubeGeo, tubeMat);
    graphLine.castShadow = true;
    realEstateGroup.add(graphLine);

    // Glow Spheres at key vertices
    const sphereGeo = new THREE.SphereGeometry(0.07, 16, 16);
    curvePoints.forEach((point) => {
      const node = new THREE.Mesh(sphereGeo, tubeMat);
      node.position.copy(point);
      realEstateGroup.add(node);
    });

    // D. Orbiting Particles
    const particlesCount = 80;
    const particlesGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      pPositions[i] = Math.cos(angle) * r;
      pPositions[i + 1] = 0.2 + (Math.random() - 0.5) * 1.5;
      pPositions[i + 2] = Math.sin(angle) * r;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0xcfa844,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeo, pMaterial);
    realEstateGroup.add(particles);

    // --- Mouse Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animationFrameId;
    const timer = new Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update();
      const elapsed = timer.getElapsed();

      // Gentle rotation of the entire group
      realEstateGroup.rotation.y = elapsed * 0.1;

      // Small vertical bobbing for building elements
      buildingGroup.position.y = Math.sin(elapsed * 0.8) * 0.06;

      // Pulse window glow intensity
      const pulseIntensity = 0.5 + Math.sin(elapsed * 2.0) * 0.3;
      glowWindowMat.color.setHSL(0.12, 1.0, 0.5 + pulseIntensity * 0.3);

      // Rotate particles
      particles.rotation.y = elapsed * 0.15;

      // Parallax smoothing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 1.5;
      camera.position.y = 1.2 - targetY * 1.0;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Geometries & Materials dispose
      towerGeo.dispose();
      spireGeo.dispose();
      villaGeo.dispose();
      wrapGeo.dispose();
      roofGeo.dispose();
      windowGeo.dispose();
      tubeGeo.dispose();
      sphereGeo.dispose();
      particlesGeo.dispose();
      landGridHelper.geometry.dispose();

      baseGlassMat.dispose();
      structureMat.dispose();
      whiteMat.dispose();
      glowWindowMat.dispose();
      tubeMat.dispose();
      pMaterial.dispose();
      landGridHelper.material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="real-estate-scene-canvas"
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        zIndex: 1
      }} 
    />
  );
}
