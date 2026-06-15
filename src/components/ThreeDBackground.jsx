import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    let width = currentRef.clientWidth;
    let height = currentRef.clientHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 20;

    // Create WebGL Renderer with alpha channel
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);

    // Particle Cloud Geometry
    const particlesCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const goldColor = new THREE.Color('#cfa844');
    const blueColor = new THREE.Color('#38bdf8');
    const whiteColor = new THREE.Color('#ffffff');

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Distribute in a spherical shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 10 + Math.random() * 12;

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      // Mix colors: 40% gold, 30% blue, 30% white
      const rand = Math.random();
      let chosenColor;
      if (rand < 0.4) {
        chosenColor = goldColor;
      } else if (rand < 0.7) {
        chosenColor = blueColor;
      } else {
        chosenColor = whiteColor;
      }

      colors[i] = chosenColor.r;
      colors[i + 1] = chosenColor.g;
      colors[i + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add gold floating geometric 3D shapes
    const octahedronGeom = new THREE.OctahedronGeometry(1.6, 0);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xcfa844,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

    const floatingGroup = new THREE.Group();
    const shapesArray = [];

    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(octahedronGeom, wireframeMat);
      // Place randomly
      mesh.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10
      );
      // Unique size
      const scale = 0.5 + Math.random() * 0.8;
      mesh.scale.set(scale, scale, scale);
      
      floatingGroup.add(mesh);
      shapesArray.push(mesh);
    }
    scene.add(floatingGroup);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Mouse movement coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window resize handler
    const handleResize = () => {
      if (!currentRef) return;
      width = currentRef.clientWidth;
      height = currentRef.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate base particles
      points.rotation.y += 0.0006;
      points.rotation.x += 0.0002;

      // Rotate wireframe octahedrons
      shapesArray.forEach((mesh, index) => {
        mesh.rotation.y += 0.001 * (index + 1);
        mesh.rotation.x += 0.0015 * (index + 1);
      });

      // Smooth mouse-follow rotation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      floatingGroup.rotation.y = targetX * 0.4;
      floatingGroup.rotation.x = -targetY * 0.4;

      points.rotation.y += targetX * 0.15;
      points.rotation.x += targetY * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
      
      // Memory cleanup
      geometry.dispose();
      material.dispose();
      octahedronGeom.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="three-d-bg-container"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, 
        pointerEvents: 'none', 
        overflow: 'hidden' 
      }} 
    />
  );
}
