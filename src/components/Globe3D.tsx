'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface Location {
  lat: number;
  lng: number;
  city: string;
}

function LocationMarker({ lat, lng, city }: Location) {
  const markerRef = useRef<THREE.Mesh>(null);
  
  // Convert latitude/longitude to 3D coordinates
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -Math.sin(phi) * Math.cos(theta) * 2.1;
  const y = Math.cos(phi) * 2.1;
  const z = Math.sin(phi) * Math.sin(theta) * 2.1;

  // Pulsing animation
  useFrame((state) => {
    if (markerRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      markerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[x, y, z]}>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial 
          color="#0088ff" 
          emissive="#0088ff" 
          emissiveIntensity={1.2}
        />
      </mesh>
      <Text
        position={[0, 0.09, 0]}
        fontSize={0.10}
        color="#e0e7ff"
        anchorX="center"
        anchorY="middle"
        fontWeight="600"
      >
        {city}
      </Text>
    </group>
  );
}

function RotatingGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const textureLoader = useRef(new THREE.TextureLoader());
  
  const locations: Location[] = [
    { lat: 48.86, lng: 2.35, city: 'Paris' },
    { lat: 40.71, lng: -74.01, city: 'New York' },
    { lat: -33.87, lng: 151.21, city: 'Sydney' },
    { lat: 25.20, lng: 55.27, city: 'Dubai' },
    { lat: 35.68, lng: 139.69, city: 'Tokyo' },
    { lat: 51.51, lng: -0.13, city: 'London' },
  ];

  // تکسچر استاندارد روز زمین بدون هیچ خط اضافی
  const earthDayTexture = textureLoader.current.load(
    'https://unpkg.com/three-globe@2.24.13/example/img/earth-day.jpg'
  );

  // Smooth rotation
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      {/* Earth sphere with night map texture */}
      <mesh ref={globeRef.current}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthDayTexture}
          emissive="#050510"
          emissiveIntensity={0.15}
          roughness={0.8}
        />
      </mesh>
      {/* City markers */}
      {locations.map((location) => (
        <LocationMarker key={location.city} {...location} />
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#0088ff" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#ff6b35" />
      
      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Rotating globe */}
      <RotatingGlobe />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={3.5}
        maxDistance={7}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function Globe3D() {
  return (
    <div className="w-full h-[600px] relative bg-gradient-to-b from-gray-900 to-slate-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
      </Canvas>
      <div className="absolute top-6 left-6 text-white z-10">
        <h3 className="text-3xl font-serif mb-2">Where We Operate</h3>
        <p className="text-sm opacity-80">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}