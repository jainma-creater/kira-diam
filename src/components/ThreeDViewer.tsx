'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface ThreeDViewerProps {
  modelPath?: string;
  title?: string;
}

export default function ThreeDViewer({
  modelPath = '/sample_2026-06-12T090722.421.glb',
  title = '3D Model Viewer'
}: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup with gradient background
    const scene = new THREE.Scene();
    // Create gradient background (dark charcoal to black)
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#2a2a3e');
    gradient.addColorStop(0.5, '#1a1a2e');
    gradient.addColorStop(1, '#0d0d15');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    const texture = new THREE.CanvasTexture(canvas);
    scene.background = texture;
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced Lighting for realistic rendering
    const light1 = new THREE.DirectionalLight(0xffffff, 1.0);
    light1.position.set(8, 6, 8);
    light1.castShadow = true;
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xf0e6d2, 0.8);
    light2.position.set(-8, 3, -8);
    light2.castShadow = true;
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0x87ceeb, 0.5);
    light3.position.set(0, 10, 5);
    scene.add(light3);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Load GLB 3D model
    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();

    const loadGLB = async () => {
      try {
        const gltf = await loader.loadAsync(modelPath);
        model = gltf.scene;
        
        // Use original materials from GLB file - enhance lighting for better appearance
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Enhance existing materials without changing colors
            if (child.material instanceof THREE.Material) {
              child.material.side = THREE.DoubleSide;
              // Only set metalness and roughness on MeshStandardMaterial
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.metalness = 0.8;
                child.material.roughness = 0.2;
              }
            }
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;

        model.position.sub(center);
        model.scale.multiplyScalar(scale);
        
        scene.add(model);
        console.log('GLB model loaded successfully with original colors:', modelPath);
      } catch (error) {
        console.warn('Failed to load GLB model, using fallback geometry', error);
        // Fallback: create a solitaire engagement ring matching reference image
        
        // Create band - larger torus for proper ring size
        const bandRadius = 3.5;
        const bandThickness = 0.35;
        const ringGeometry = new THREE.TorusGeometry(bandRadius, bandThickness, 32, 128);
        const ringMaterial = new THREE.MeshPhongMaterial({
          color: 0xF4D03F, // Richer, more saturated gold
          shininess: 180,
          emissive: 0x9B7D1F,
          side: THREE.DoubleSide,
        });
        model = new THREE.Mesh(ringGeometry, ringMaterial);
        model.rotation.x = Math.PI * 0.15; // Tilt slightly to show diamond
        scene.add(model);

        // Add large solitaire diamond - much bigger to match reference
        const diamondGeometry = new THREE.OctahedronGeometry(1.25, 4);
        const diamondMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          shininess: 230,
          emissive: 0x666666,
          side: THREE.DoubleSide,
        });
        const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
        diamond.position.z = 1.7;
        diamond.scale.set(1.1, 1.1, 1.5); // Make it taller and more visible
        scene.add(diamond);

        // Add diamond bezel (gold setting around diamond)
        const bezelGeometry = new THREE.CylinderGeometry(1.55, 1.4, 0.5, 32);
        const bezelMaterial = new THREE.MeshPhongMaterial({
          color: 0xE8C547, // Slightly darker gold for bezel
          shininess: 160,
        });
        const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
        bezel.position.z = 0.7;
        scene.add(bezel);
      }
    };

    loadGLB();

    // Mouse tracking for full 360° rotation
    let isMouseOver = false;
    let isDragging = false;
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let rotationX = 0;
    let rotationY = 0;
    let autoRotationTime = 0;

    const handleMouseEnter = () => {
      isMouseOver = true;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
      isDragging = false;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'default';
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      if (containerRef.current && isMouseOver) {
        containerRef.current.style.cursor = 'grab';
      } else if (containerRef.current) {
        containerRef.current.style.cursor = 'default';
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      if (isDragging) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        
        // Full 360° rotation with higher sensitivity
        rotationY += deltaX * 0.01; // Rotate around Y axis (left-right)
        rotationX += deltaY * 0.01; // Rotate around X axis (up-down)
        
        // Clamp rotation to prevent excessive vertical spin
        rotationX = Math.max(-Math.PI * 0.4, Math.min(Math.PI * 0.4, rotationX));
        
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      isDragging = true;
      lastMouseX = event.touches[0].clientX;
      lastMouseY = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDragging) return;
      const deltaX = event.touches[0].clientX - lastMouseX;
      const deltaY = event.touches[0].clientY - lastMouseY;
      
      rotationY += deltaX * 0.01;
      rotationX += deltaY * 0.01;
      rotationX = Math.max(-Math.PI * 0.4, Math.min(Math.PI * 0.4, rotationX));
      
      lastMouseX = event.touches[0].clientX;
      lastMouseY = event.touches[0].clientY;
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
      containerRef.current.addEventListener('mousedown', handleMouseDown);
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseup', handleMouseUp);
      containerRef.current.addEventListener('touchstart', handleTouchStart);
      containerRef.current.addEventListener('touchend', handleTouchEnd);
      containerRef.current.addEventListener('touchmove', handleTouchMove);
      containerRef.current.style.cursor = 'default';
    }

    // Animation loop - auto-rotate when idle, mouse-controlled when dragging
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (model) {
        if (!isDragging && isMouseOver) {
          // Gently auto-rotate when mouse is over but not dragging
          autoRotationTime += 0.003;
          rotationY = autoRotationTime;
        }
        
        // Apply smooth rotation
        model.rotation.y = rotationY;
        model.rotation.x = rotationX;
        model.rotation.z = 0;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseup', handleMouseUp);
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchend', handleTouchEnd);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
      }
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose all meshes in the scene
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-[#F5F7FB] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold text-[#2F428C] mb-2 font-serif">
            {title}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm max-w-2xl mx-auto">
            Interactive 3D jewelry showcase - rotate to explore
          </p>
        </div>

        {/* 3D Viewer Container */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2F428C]/10 bg-gray-900">
          <div
            ref={containerRef}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
            style={{ position: 'relative' }}
          />

          {/* Premium Badge */}
          <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20 pointer-events-none">
            <div className="inline-block bg-[#D4AF37]/20 backdrop-blur-md text-[#D4AF37] px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-[#D4AF37]/30">
              ✨ 3D Interactive View
            </div>
          </div>

          {/* Info */}
          <div className="absolute bottom-4 left-4 text-xs md:text-sm text-gray-400 pointer-events-none">
            Powered by Three.js
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] text-lg">↻</span>
            </div>
            <h3 className="text-sm font-semibold text-[#2F428C] mb-1">360° View</h3>
            <p className="text-xs text-gray-600">Interactive rotation</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] text-lg">✨</span>
            </div>
            <h3 className="text-sm font-semibold text-[#2F428C] mb-1">Premium Quality</h3>
            <p className="text-xs text-gray-600">High-fidelity rendering</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
              <span className="text-[#D4AF37] text-lg">⚡</span>
            </div>
            <h3 className="text-sm font-semibold text-[#2F428C] mb-1">Fast Loading</h3>
            <p className="text-xs text-gray-600">Optimized performance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
