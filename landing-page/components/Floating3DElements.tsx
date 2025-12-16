'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[-3, 0, 0]}>
      <meshStandardMaterial 
        color="#7C3AED" 
        emissive="#7C3AED"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + 1) * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]} position={[3, 0, 0]}>
      <meshStandardMaterial 
        color="#10B981" 
        emissive="#10B981"
        emissiveIntensity={0.5}
        metalness={0.7}
        roughness={0.3}
      />
    </Sphere>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + 2) * 0.5
    }
  })

  return (
    <Torus ref={meshRef} args={[0.6, 0.2, 16, 100]} position={[0, 0, -2]}>
      <meshStandardMaterial 
        color="#F59E0B" 
        emissive="#F59E0B"
        emissiveIntensity={0.5}
        metalness={0.6}
        roughness={0.4}
      />
    </Torus>
  )
}

function AIText() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Center position={[0, -2, 0]}>
      <Text3D
        ref={meshRef}
        font="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/helvetiker_regular.typeface.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        AI
        <meshStandardMaterial 
          color="#7C3AED" 
          emissive="#7C3AED"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </Text3D>
    </Center>
  )
}

export default function Floating3DElements() {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10B981" />
        <pointLight position={[0, 10, 0]} intensity={0.3} color="#F59E0B" />
        
        <FloatingCube />
        <FloatingSphere />
        <FloatingTorus />
        <AIText />
      </Canvas>
    </div>
  )
}