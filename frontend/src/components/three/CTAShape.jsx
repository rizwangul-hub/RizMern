import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import useDeviceCapability from '../../hooks/useDeviceCapability'

function FloatingTorus() {
  const meshRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.35
      meshRef.current.rotation.y = t * 0.45
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.25
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3
    }
  })

  return (
    <group>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Central glowing distorted torus */}
        <mesh ref={meshRef} scale={1.2}>
          <torusGeometry args={[1.3, 0.28, 24, 64]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            emissive="#a855f7"
            emissiveIntensity={0.65}
            roughness={0.2}
            metalness={0.7}
            distort={0.32}
            speed={1.8}
          />
        </mesh>

        {/* Orbiting neon cyan satellite ring */}
        <mesh ref={ringRef} scale={1.6}>
          <torusGeometry args={[1.5, 0.03, 16, 80]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.75} />
        </mesh>

        {/* Glowing core sphere */}
        <mesh scale={0.45}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function CTAShape() {
  const { supportsWebGL, reducedMotion, lowPower } = useDeviceCapability()

  if (!supportsWebGL || reducedMotion || lowPower) {
    return null
  }

  return (
    <div
      className="cta-3d-wrapper"
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '320px',
        height: '320px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-3, -2, 2]} intensity={10} color="#06b6d4" />
        <FloatingTorus />
      </Canvas>
    </div>
  )
}
