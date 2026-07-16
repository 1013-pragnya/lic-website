import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Timer } from 'three';
import { Target, TrendingUp, Info, Coins, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { agentConfig } from '../config/agentConfig';
import './Calculator.css';

// 3D Wealth Scene Component using Three.js
function ThreeDWealthScene({ totalInvested, futureValue, goal }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const requestRef = useRef(null);

  // References for animating meshes
  const scales = useRef({ principal: 0.1, corpus: 0.1, goal: 0.1 });
  const meshesRef = useRef({});

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 9);
    camera.lookAt(0, 1.8, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5db, 2.5);
    dirLight.position.set(5, 10, 3);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xcfa844, 2, 8);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // 5. Materials
    const principalMat = new THREE.MeshStandardMaterial({
      color: 0x1e40af, // Metallic Blue
      metalness: 0.8,
      roughness: 0.2,
      flatShading: false
    });

    const corpusMat = new THREE.MeshStandardMaterial({
      color: 0xcfa844, // Metallic Gold
      metalness: 0.9,
      roughness: 0.15,
      flatShading: false
    });

    const goalMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Transparent Green
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    });

    const goalWireMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    // 6. Grid and Base Plane
    const gridHelper = new THREE.GridHelper(8, 8, 0xcfa844, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 7. Add 3D stack models (Cylinders)
    // Base geometry: Cylinder with radius 0.6, height 1. Set origin at base (offset height later)
    const geom = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

    const principalMesh = new THREE.Mesh(geom, principalMat);
    principalMesh.position.set(-2, 0, 0);
    principalMesh.castShadow = true;
    principalMesh.receiveShadow = true;
    scene.add(principalMesh);

    const corpusMesh = new THREE.Mesh(geom, corpusMat);
    corpusMesh.position.set(0, 0, 0);
    corpusMesh.castShadow = true;
    corpusMesh.receiveShadow = true;
    scene.add(corpusMesh);

    const goalMesh = new THREE.Mesh(geom, goalMat);
    goalMesh.position.set(2, 0, 0);
    scene.add(goalMesh);

    const goalWireMesh = new THREE.Mesh(geom, goalWireMat);
    goalWireMesh.position.set(2, 0, 0);
    scene.add(goalWireMesh);

    meshesRef.current = {
      principal: principalMesh,
      corpus: corpusMesh,
      goal: goalMesh,
      goalWire: goalWireMesh
    };

    // 8. Sparkle Particles for Success
    const particleCount = 40;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1.5;
      positions[i + 1] = Math.random() * 4;
      positions[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xcfa844,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const sparkles = new THREE.Points(particleGeom, particleMat);
    sparkles.position.set(0, 0, 0);
    scene.add(sparkles);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth === 0 || newHeight === 0) continue;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    const timer = new Timer();
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      timer.update();
      const elapsed = timer.getElapsed();

      // Smooth interpolation (lerping)
      scales.current.principal += (scales.current.targetPrincipal - scales.current.principal) * 0.12;
      scales.current.corpus += (scales.current.targetCorpus - scales.current.corpus) * 0.12;
      scales.current.goal += (scales.current.targetGoal - scales.current.goal) * 0.12;

      // Apply Y scale and position offset (so they grow upwards from the grid)
      if (meshesRef.current.principal) {
        meshesRef.current.principal.scale.set(1, Math.max(scales.current.principal, 0.05), 1);
        meshesRef.current.principal.position.y = scales.current.principal / 2;
        meshesRef.current.principal.rotation.y = elapsed * 0.2;
      }
      if (meshesRef.current.corpus) {
        meshesRef.current.corpus.scale.set(1, Math.max(scales.current.corpus, 0.05), 1);
        meshesRef.current.corpus.position.y = scales.current.corpus / 2;
        meshesRef.current.corpus.rotation.y = -elapsed * 0.3;
      }
      if (meshesRef.current.goal) {
        const sG = Math.max(scales.current.goal, 0.05);
        meshesRef.current.goal.scale.set(1.05, sG, 1.05);
        meshesRef.current.goal.position.y = sG / 2;
        meshesRef.current.goalWire.scale.set(1.06, sG, 1.06);
        meshesRef.current.goalWire.position.y = sG / 2;
      }

      // Rotate sparkles
      sparkles.rotation.y = elapsed * 0.5;

      // If futureValue exceeds goal, release sparkles up
      const positionsArray = sparkles.geometry.attributes.position.array;
      const showSparkles = futureValue >= goal;
      sparkles.visible = showSparkles;

      if (showSparkles) {
        for (let i = 1; i < positionsArray.length; i += 3) {
          positionsArray[i] += 0.03; // Float up
          if (positionsArray[i] > scales.current.corpus + 1) {
            positionsArray[i] = 0; // Reset at base
          }
        }
        sparkles.geometry.attributes.position.needsUpdate = true;
      }

      // Rotate camera gently
      camera.position.x = Math.sin(elapsed * 0.15) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      resizeObserver.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geom.dispose();
      principalMat.dispose();
      corpusMat.dispose();
      goalMat.dispose();
      goalWireMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update target heights whenever parameters change
  useEffect(() => {
    // Max value for scaling
    const maxVal = Math.max(futureValue, goal, 100000);
    // Height units inside Three.js scene (max height 4 units)
    scales.current.targetPrincipal = (totalInvested / maxVal) * 4;
    scales.current.targetCorpus = (futureValue / maxVal) * 4;
    scales.current.targetGoal = (goal / maxVal) * 4;
  }, [totalInvested, futureValue, goal]);

  return (
    <div className="scene-3d-wealth-wrapper">
      <div ref={mountRef} className="scene-canvas-3d" />
      <div className="scene-labels">
        <span className="label-item principal"><span className="dot" />Invested</span>
        <span className="label-item corpus"><span className="dot" />Future Value</span>
        <span className="label-item goal"><span className="dot" />Your Goal</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [investment, setInvestment] = useState(10000); // Monthly investment
  const [years, setYears] = useState(15); // Time period
  const [goal, setGoal] = useState(5000000); // Goal amount

  // Outputs
  const [totalInvested, setTotalInvested] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [gains, setGains] = useState(0);
  const [surplusOrShortfall, setSurplusOrShortfall] = useState(0);
  const [additionalNeeded, setAdditionalNeeded] = useState(0);

  // Interest rate assumption (6.8% compounding monthly, standard for premium LIC savings combo plans)
  const interestRate = 0.068;

  useEffect(() => {
    const total = investment * 12 * years;
    setTotalInvested(total);

    // Compound Interest Formula (Monthly compounding)
    const r = interestRate;
    const n = 12; // Monthly
    const t = years;
    const ratePerPeriod = r / n;
    const totalPeriods = n * t;

    // FV = P * [((1 + i)^t - 1) / i] * (1 + i) (Invested at start of month)
    const compoundFactor = (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod;
    const calculatedFV = Math.round(investment * compoundFactor * (1 + ratePerPeriod));
    
    setFutureValue(calculatedFV);
    setGains(Math.max(0, calculatedFV - total));

    const diff = calculatedFV - goal;
    setSurplusOrShortfall(diff);

    // If goal is not reached, calculate how much more they need monthly
    if (diff < 0) {
      const neededInvestment = Math.round(goal / (compoundFactor * (1 + ratePerPeriod)));
      setAdditionalNeeded(Math.max(0, neededInvestment - investment));
    } else {
      setAdditionalNeeded(0);
    }
  }, [investment, years, goal]);

  // Format currency to Indian style (lakhs/crores)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Generate SVG graph coordinates
  const getGraphPath = () => {
    const width = 450;
    const height = 180;
    const padding = 15;
    const maxVal = Math.max(futureValue, goal) || 1000000;
    const points = [];

    for (let i = 0; i <= years; i++) {
      const t = i;
      const ratePerPeriod = interestRate / 12;
      const totalPeriods = 12 * t;
      const compoundFactor = totalPeriods === 0 ? 0 : (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod;
      const val = Math.round(investment * compoundFactor * (1 + ratePerPeriod));
      
      const x = padding + (i / years) * (width - 2 * padding);
      const y = height - padding - (val / maxVal) * (height - 2 * padding);
      points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
  };

  // Generate straight line for Principal Invested
  const getPrincipalPath = () => {
    const width = 450;
    const height = 180;
    const padding = 15;
    const maxVal = Math.max(futureValue, goal) || 1000000;
    const points = [];

    for (let i = 0; i <= years; i++) {
      const val = investment * 12 * i;
      const x = padding + (i / years) * (width - 2 * padding);
      const y = height - padding - (val / maxVal) * (height - 2 * padding);
      points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
  };

  // Y coordinate of horizontal Goal line
  const getGoalY = () => {
    const height = 180;
    const padding = 15;
    const maxVal = Math.max(futureValue, goal) || 1000000;
    return height - padding - (goal / maxVal) * (height - 2 * padding);
  };

  const handleConsult = () => {
    const text = encodeURIComponent(`Hi ${agentConfig.name.split(' ')[0]}, I used your Wealth Planning Calculator:
- Monthly Investment: ${formatCurrency(investment)}
- Time Period: ${years} Years
- Target Goal: ${formatCurrency(goal)}
- Estimated Wealth: ${formatCurrency(futureValue)}
Please advise on the best LIC plans to achieve this goal.`);
    const whatsappNum = agentConfig.contact.whatsapp?.replace(/\D/g, '') || '';
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="section calculator-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Wealth Projection</span>
          <h2 className="section-title">Financial Planning Calculator</h2>
        </div>

        <div className="grid-2 calculator-grid">
          
          {/* Sliders Input Card */}
          <div className="calculator-input-card glass-panel">
            <h3 className="input-card-title">Define Your Goals</h3>
            
            {/* Input 1: Monthly Saving */}
            <div className="slider-group">
              <div className="slider-info">
                <label className="slider-label">Monthly Investment</label>
                <span className="slider-value text-gold">{formatCurrency(investment)}</span>
              </div>
              <input 
                type="range" 
                min="2000" 
                max="100000" 
                step="1000" 
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-limits">
                <span>₹2,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Input 2: Time Period */}
            <div className="slider-group">
              <div className="slider-info">
                <label className="slider-label">Time Period</label>
                <span className="slider-value text-gold">{years} Years</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                step="1" 
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-limits">
                <span>5 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Input 3: Target Goal */}
            <div className="slider-group">
              <div className="slider-info">
                <label className="slider-label">Target Goal Amount</label>
                <span className="slider-value text-gold">{formatCurrency(goal)}</span>
              </div>
              <input 
                type="range" 
                min="500000" 
                max="30000000" 
                step="50000" 
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-limits">
                <span>₹5 Lakhs</span>
                <span>₹3 Crores</span>
              </div>
            </div>

            <div className="calculator-info-note">
              <Info size={16} className="info-icon text-gold" />
              <span>Assumed wealth growth at 6.8% compounding annually with LIC safety.</span>
            </div>
          </div>

          {/* Results Card */}
          <div className="calculator-results-card glass-panel">
            <h3 className="results-card-title">Wealth Projections</h3>
            
            <div className="results-grid">
              
              <div className="results-stat-box">
                <span className="label">Total Amount Invested</span>
                <span className="value">{formatCurrency(totalInvested)}</span>
              </div>

              <div className="results-stat-box highlight-box">
                <span className="label">Future Value Estimate</span>
                <span className="value text-gradient-gold">{formatCurrency(futureValue)}</span>
              </div>

            </div>

            {/* 3D Scene Viewport and SVG graph together in flex column */}
            <div className="projection-visuals-container">
              {/* 3D Stacking Coins Panel */}
              <ThreeDWealthScene 
                totalInvested={totalInvested}
                futureValue={futureValue}
                goal={goal}
              />

              {/* Animated SVG Graph */}
              <div className="svg-graph-container">
                <svg width="100%" height="100%" viewBox="0 0 450 180" preserveAspectRatio="none" className="graph-svg">
                  {/* Grid Lines */}
                  <line x1="15" y1="15" x2="435" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="15" y1="90" x2="435" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="15" y1="165" x2="435" y2="165" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  
                  {/* Paths */}
                  <path d={getPrincipalPath()} fill="none" stroke="#1b4d8f" strokeWidth="2.5" strokeDasharray="4" />
                  <path d={getGraphPath()} fill="none" stroke="url(#goldGrad)" strokeWidth="3" className="chart-line-draw" />
                  
                  {/* Goal Line */}
                  <line x1="15" y1={getGoalY()} x2="435" y2={getGoalY()} stroke="#10b981" strokeWidth="1.5" strokeDasharray="6,4" />
                  <text x="20" y={Math.max(25, getGoalY() - 6)} fill="#10b981" fontSize="10" fontWeight="bold">Target Goal</text>

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f7d780" />
                      <stop offset="50%" stopColor="#cfa844" />
                      <stop offset="100%" stopColor="#9e7a24" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="graph-legends">
                  <span className="legend-item"><span className="line dash-blue" />Principal</span>
                  <span className="legend-item"><span className="line solid-gold" />Future Wealth</span>
                </div>
              </div>
            </div>

            {/* Goal Outcome Banner */}
            <div className={`goal-banner ${surplusOrShortfall >= 0 ? 'success' : 'shortfall'}`}>
              {surplusOrShortfall >= 0 ? (
                <>
                  <ShieldCheck size={20} className="banner-icon" />
                  <span>
                    <strong>Goal Achieved!</strong> You will exceed your target by <strong>{formatCurrency(surplusOrShortfall)}</strong>.
                  </span>
                </>
              ) : (
                <>
                  <Coins size={20} className="banner-icon" />
                  <span>
                    <strong>Shortfall of {formatCurrency(Math.abs(surplusOrShortfall))}.</strong> Invest <strong>{formatCurrency(additionalNeeded)}/mo</strong> more to reach your goal.
                  </span>
                </>
              )}
            </div>

            <Button variant="primary" onClick={handleConsult} className="calculator-consult-btn">
              Consult {agentConfig.name.split(' ')[0]} & Start Planning <ArrowRight size={16} />
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
