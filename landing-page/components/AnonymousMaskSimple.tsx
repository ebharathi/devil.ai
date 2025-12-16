'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { useRef } from 'react'

function AnonymousMaskModel() {
  const groupRef = useRef<Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow, subtle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -8]} scale={[4, 4, 4]}>
      {/* Main mask face - simplified sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Eye holes - black spheres */}
      <mesh position={[-0.35, 0.2, 0.7]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0.35, 0.2, 0.7]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#000000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Red glowing eyes */}
      <pointLight position={[-0.35, 0.2, 0.8]} color="#ff0000" intensity={1} distance={3} />
      <pointLight position={[0.35, 0.2, 0.8]} color="#ff0000" intensity={1} distance={3} />
    </group>
  )
}

export default function AnonymousMaskSimple() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff0000" />
        
        <AnonymousMaskModel />
        
        {/* Subtle fog for depth */}
        <fog attach="fog" args={['#000000', 5, 20]} />
      </Canvas>
    </div>
  )
}