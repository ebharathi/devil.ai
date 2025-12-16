'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Group, Vector3 } from 'three'
import { useRef, useState, useEffect } from 'react'

function AnonymousMaskModel() {
  const groupRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow, subtle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      // Very subtle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -5]} scale={[3, 3, 3]}>
      {/* Main mask face - white base */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Nose area */}
      <mesh position={[0, 0.1, 0.7]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Left eye socket */}
      <mesh position={[-0.35, 0.2, 0.5]}>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Right eye socket */}
      <mesh position={[0.35, 0.2, 0.5]}>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Left cheek line */}
      <mesh position={[-0.5, -0.2, 0.4]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Right cheek line */}
      <mesh position={[0.5, -0.2, 0.4]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Mustache area */}
      <mesh position={[0, -0.1, 0.7]}>
        <boxGeometry args={[0.6, 0.1, 0.05]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Goatee area */}
      <mesh position={[0, -0.4, 0.6]}>
        <coneGeometry args={[0.15, 0.3, 6]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Left sideburn */}
      <mesh position={[-0.7, 0, 0.3]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.05, 0.6, 0.05]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Right sideburn */}
      <mesh position={[0.7, 0, 0.3]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.05, 0.6, 0.05]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Glowing red accent in eyes */}
      <pointLight position={[-0.35, 0.2, 0.6]} color="#ff0000" intensity={0.5} distance={2} />
      <pointLight position={[0.35, 0.2, 0.6]} color="#ff0000" intensity={0.5} distance={2} />
    </group>
  )
}

// Simple particle component without complex animation
function SimpleParticles() {
  const particlesRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  // Create static particle positions
  const particlePositions = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * Math.PI * 2
    const radius = 4
    return new Vector3(
      Math.cos(angle) * radius,
      Math.sin(i) * 0.5,
      Math.sin(angle) * radius
    )
  })

  return (
    <group ref={particlesRef}>
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#ff0000"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function AnonymousMask() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none opacity-70">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff0000" />
        <pointLight position={[0, 5, 0]} intensity={0.2} color="#0000ff" />
        
        <AnonymousMaskModel />
        <SimpleParticles />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  )
}