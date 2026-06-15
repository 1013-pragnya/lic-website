import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Timer } from 'three';

export default function FamilyProtectionScene() {
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
    camera.position.set(0, 0.5, 7.5);

    // 3. Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Create Lighting
    // Ambient light - base visibility
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Warm Directional Key Light
    const keyLight = new THREE.DirectionalLight(0xfff5db, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0x1d4ed8, 1.0);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    // Golden point light inside the family shield for inner glow
    const shieldLight = new THREE.PointLight(0xcfa844, 4.0, 8);
    shieldLight.position.set(0.5, 0, 0);
    scene.add(shieldLight);

    // Cyan point light behind the advisor
    const advisorLight = new THREE.PointLight(0x38bdf8, 3.0, 6);
    advisorLight.position.set(-1.8, 0.5, 0.5);
    scene.add(advisorLight);

    // --- Create 3D Meshes ---

    // A. Family Group (Father, Mother, Child)
    const familyGroup = new THREE.Group();
    familyGroup.position.set(0.6, -0.2, 0); // slightly offset to the right

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffcc99, roughness: 0.6, metalness: 0.1 });
    const dadClothesMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.4 }); // Navy blue
    const momClothesMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 }); // Saffron/Orange-gold
    const kidClothesMat = new THREE.MeshStandardMaterial({ color: 0x0891b2, roughness: 0.4 }); // Cyan

    // Father (Torso Cylinder + Head Sphere)
    const dadGroup = new THREE.Group();
    const dadTorsoGeo = new THREE.CylinderGeometry(0.24, 0.32, 1.2, 16);
    const dadTorso = new THREE.Mesh(dadTorsoGeo, dadClothesMat);
    dadTorso.castShadow = true;
    dadTorso.receiveShadow = true;
    dadGroup.add(dadTorso);

    const dadHeadGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const dadHead = new THREE.Mesh(dadHeadGeo, skinMat);
    dadHead.position.y = 0.8;
    dadHead.castShadow = true;
    dadGroup.add(dadHead);
    dadGroup.position.set(-0.35, 0.1, 0);
    familyGroup.add(dadGroup);

    // Mother (Cone dress + Head Sphere)
    const momGroup = new THREE.Group();
    const momTorsoGeo = new THREE.ConeGeometry(0.28, 1.1, 16);
    const momTorso = new THREE.Mesh(momTorsoGeo, momClothesMat);
    momTorso.castShadow = true;
    momTorso.receiveShadow = true;
    momGroup.add(momTorso);

    const momHeadGeo = new THREE.SphereGeometry(0.20, 16, 16);
    const momHead = new THREE.Mesh(momHeadGeo, skinMat);
    momHead.position.y = 0.7;
    momHead.castShadow = true;
    momGroup.add(momHead);
    momGroup.position.set(0.35, 0.05, -0.1);
    familyGroup.add(momGroup);

    // Child (Small Cylinder + Head Sphere)
    const kidGroup = new THREE.Group();
    const kidTorsoGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.65, 16);
    const kidTorso = new THREE.Mesh(kidTorsoGeo, kidClothesMat);
    kidTorso.castShadow = true;
    kidTorso.receiveShadow = true;
    kidGroup.add(kidTorso);

    const kidHeadGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const kidHead = new THREE.Mesh(kidHeadGeo, skinMat);
    kidHead.position.y = 0.45;
    kidHead.castShadow = true;
    kidGroup.add(kidHead);
    kidGroup.position.set(0, -0.15, 0.25);
    familyGroup.add(kidGroup);

    scene.add(familyGroup);

    // B. Insurance Advisor Figure
    const advisorGroup = new THREE.Group();
    advisorGroup.position.set(-1.8, -0.1, 0.5); // standing to the left

    const advisorClothesMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.2 }); // Slate Suit
    const advisorTieMat = new THREE.MeshStandardMaterial({ color: 0xcfa844, metalness: 0.8, roughness: 0.1 }); // Gold Tie/Badge

    // Torso (Slightly taller cylinder)
    const advTorsoGeo = new THREE.CylinderGeometry(0.26, 0.32, 1.4, 16);
    const advTorso = new THREE.Mesh(advTorsoGeo, advisorClothesMat);
    advTorso.castShadow = true;
    advTorso.receiveShadow = true;
    advisorGroup.add(advTorso);

    // Head
    const advHeadGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const advHead = new THREE.Mesh(advHeadGeo, skinMat);
    advHead.position.y = 0.9;
    advHead.castShadow = true;
    advisorGroup.add(advHead);

    // Gold Tie Badge detail
    const tieGeo = new THREE.BoxGeometry(0.06, 0.35, 0.04);
    const tie = new THREE.Mesh(tieGeo, advisorTieMat);
    tie.position.set(0, 0.5, 0.26);
    tie.rotation.x = 0.05;
    advisorGroup.add(tie);

    scene.add(advisorGroup);

    // C. Golden Glowing Shield (Encloses Family)
    const shieldGroup = new THREE.Group();
    shieldGroup.position.copy(familyGroup.position);

    const shieldGeo = new THREE.SphereGeometry(1.35, 32, 32);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: 0xcfa844,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shieldGroup.add(shield);

    // Wireframe overlay for glowing tech grid structure
    const shieldWireMat = new THREE.MeshBasicMaterial({
      color: 0xcfa844,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });
    const shieldWire = new THREE.Mesh(shieldGeo, shieldWireMat);
    shieldGroup.add(shieldWire);

    // Add a horizontal protective ring
    const ringGeo = new THREE.RingGeometry(1.5, 1.56, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xcfa844,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const protectiveRing = new THREE.Mesh(ringGeo, ringMat);
    protectiveRing.rotation.x = Math.PI / 2;
    shieldGroup.add(protectiveRing);

    scene.add(shieldGroup);

    // D. Floating 3D Icons
    const iconMaterials = {
      gold: new THREE.MeshStandardMaterial({ color: 0xcfa844, metalness: 0.9, roughness: 0.15 }),
      red: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, emissive: 0xef4444, emissiveIntensity: 0.2 }),
      white: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }),
      cyan: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, emissive: 0x38bdf8, emissiveIntensity: 0.2 })
    };

    const floaters = [];

    // Helper to register floating items
    const addFloater = (group, orbitRadius, speed, yOffset, angleOffset) => {
      scene.add(group);
      floaters.push({ group, orbitRadius, speed, yOffset, angleOffset, hoverOffset: Math.random() * 100 });
    };

    // 1. Health Icon (Red Cross)
    const healthGroup = new THREE.Group();
    const hBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.15, 0.15), iconMaterials.red);
    const hBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.45, 0.15), iconMaterials.red);
    healthGroup.add(hBar1, hBar2);
    addFloater(healthGroup, 2.5, 0.005, 0.8, 0);

    // 2. Home Icon (White body, Gold Roof)
    const homeGroup = new THREE.Group();
    const houseBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.3, 0.35), iconMaterials.white);
    const houseRoof = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.25, 4), iconMaterials.gold);
    houseRoof.position.y = 0.27;
    houseRoof.rotation.y = Math.PI / 4; // rotate roof to square base
    homeGroup.add(houseBody, houseRoof);
    addFloater(homeGroup, 2.4, 0.004, -0.6, Math.PI / 2);

    // 3. Savings Icon (Stack of 2 Gold Coins)
    const savingsGroup = new THREE.Group();
    const coinGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.05, 24);
    const coin1 = new THREE.Mesh(coinGeo, iconMaterials.gold);
    const coin2 = new THREE.Mesh(coinGeo, iconMaterials.gold);
    coin1.position.y = -0.03;
    coin2.position.set(0.04, 0.03, 0.02);
    coin2.rotation.y = 0.5;
    savingsGroup.add(coin1, coin2);
    addFloater(savingsGroup, 2.6, 0.006, 0.2, Math.PI);

    // 4. Retirement Icon (Clock / Hourglass Shield)
    const retirementGroup = new THREE.Group();
    const clockFaceGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24);
    const clockFace = new THREE.Mesh(clockFaceGeo, iconMaterials.cyan);
    clockFace.rotation.x = Math.PI / 2; // face forward
    
    // clock hands
    const hand1 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.05), iconMaterials.gold);
    hand1.position.set(0, 0.05, 0.03);
    const hand2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.05), iconMaterials.gold);
    hand2.position.set(0.04, 0, 0.03);
    retirementGroup.add(clockFace, hand1, hand2);
    addFloater(retirementGroup, 2.3, 0.003, -0.3, Math.PI * 1.5);

    // 5. Luxury Building / Skyscraper Floater (Real Estate representation)
    const buildingGroup = new THREE.Group();
    const towerGeo = new THREE.BoxGeometry(0.28, 0.6, 0.28);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.15,
      transparent: true,
      opacity: 0.85
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.castShadow = true;
    buildingGroup.add(tower);

    const bandGeo = new THREE.BoxGeometry(0.32, 0.02, 0.32);
    for (let y = -0.2; y <= 0.2; y += 0.15) {
      const band = new THREE.Mesh(bandGeo, iconMaterials.gold);
      band.position.y = y;
      buildingGroup.add(band);
    }

    const spireGeo = new THREE.ConeGeometry(0.1, 0.2, 4);
    const spire = new THREE.Mesh(spireGeo, iconMaterials.gold);
    spire.position.y = 0.4;
    spire.rotation.y = Math.PI / 4;
    buildingGroup.add(spire);
    addFloater(buildingGroup, 2.6, 0.004, 0.5, Math.PI * 0.75);

    // E. Drifting Background Particles
    const particlesCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particlesCount * 3);
    const pColors = new Float32Array(particlesCount * 3);

    const goldColor = new THREE.Color('#cfa844');
    const blueColor = new THREE.Color('#38bdf8');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Box volume distribution
      pPositions[i] = (Math.random() - 0.5) * 12;
      pPositions[i + 1] = (Math.random() - 0.5) * 8;
      pPositions[i + 2] = (Math.random() - 0.5) * 6;

      const clr = Math.random() > 0.5 ? goldColor : blueColor;
      pColors[i] = clr.r;
      pColors[i + 1] = clr.g;
      pColors[i + 2] = clr.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeo, pMaterial);
    scene.add(particles);

    // --- Mouse Move handler for parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- Resize handler ---
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

      // 1. Shield animations
      shieldWire.rotation.y = elapsed * 0.12;
      shieldWire.rotation.x = elapsed * 0.06;
      shield.rotation.y = -elapsed * 0.04;
      protectiveRing.rotation.z = -elapsed * 0.3;

      // Pulse shield size slightly
      const pulse = 1.35 + Math.sin(elapsed * 2.0) * 0.03;
      shieldGeo.dispose();
      const newGeo = new THREE.SphereGeometry(pulse, 32, 32);
      shield.geometry = newGeo;
      shieldWire.geometry = newGeo;

      // 2. Rotate family & advisor gently
      familyGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.08;
      advisorGroup.rotation.y = -0.3 + Math.sin(elapsed * 0.3) * 0.05;

      // 3. Floating Icons Orbit & Bobbing
      floaters.forEach((floater) => {
        floater.angleOffset += floater.speed;
        
        // Circular orbit relative to family group
        const targetX = familyGroup.position.x + Math.cos(floater.angleOffset) * floater.orbitRadius;
        const targetZ = familyGroup.position.z + Math.sin(floater.angleOffset) * floater.orbitRadius;
        
        // Bobbing heights
        const bob = Math.sin(elapsed * 1.5 + floater.hoverOffset) * 0.15;
        floater.group.position.set(targetX, floater.yOffset + bob, targetZ);

        // Rotate individual icons
        floater.group.rotation.y += 0.01;
        floater.group.rotation.x += 0.005;
      });

      // 4. Drift particles upward
      const positionsArray = particles.geometry.attributes.position.array;
      for (let i = 1; i < positionsArray.length; i += 3) {
        positionsArray[i] += 0.004; // float up
        if (positionsArray[i] > 4) {
          positionsArray[i] = -4; // reset at bottom
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // 5. Parallax Camera smoothing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gentle camera wave path + mouse parallax
      camera.position.x = targetX * 1.8;
      camera.position.y = 0.5 + Math.sin(elapsed * 0.3) * 0.1 - targetY * 1.2;
      camera.lookAt(0.2, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // --- Clean up ---
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Memory leak prevention
      shieldGeo.dispose();
      shieldMat.dispose();
      shieldWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      dadTorsoGeo.dispose();
      dadHeadGeo.dispose();
      momTorsoGeo.dispose();
      momHeadGeo.dispose();
      kidTorsoGeo.dispose();
      kidHeadGeo.dispose();
      advTorsoGeo.dispose();
      advHeadGeo.dispose();
      tieGeo.dispose();
      hBar1.geometry.dispose();
      hBar2.geometry.dispose();
      houseBody.geometry.dispose();
      houseRoof.geometry.dispose();
      coinGeo.dispose();
      clockFaceGeo.dispose();
      hand1.geometry.dispose();
      hand2.geometry.dispose();
      towerGeo.dispose();
      bandGeo.dispose();
      spireGeo.dispose();
      towerMat.dispose();
      particlesGeo.dispose();
      pMaterial.dispose();
      skinMat.dispose();
      dadClothesMat.dispose();
      momClothesMat.dispose();
      kidClothesMat.dispose();
      advisorClothesMat.dispose();
      advisorTieMat.dispose();
      Object.values(iconMaterials).forEach((mat) => mat.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="family-scene-canvas"
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        zIndex: 1
      }} 
    />
  );
}
