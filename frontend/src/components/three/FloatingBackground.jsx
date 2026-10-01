import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import useDeviceCapability from '../../hooks/useDeviceCapability'
import Particles from './Particles'

function BackgroundShapes() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1} position={[-3.2, 1.3, -2.5]}>
        <mesh scale={0.9}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.4} distort={0.4} speed={1.1} />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.4} position={[3.5, -1.6, -2.6]}>
        <mesh scale={1.1}>
          <torusKnotGeometry args={[0.85, 0.16, 120, 20]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} roughness={0.15} metalness={0.7} />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.25} floatIntensity={1} position={[0, 2.8, -2.8]}>
        <mesh scale={0.7}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} roughness={0.2} metalness={0.6} />
        </mesh>
      </Float>

      <Particles count={80} size={1.7} scale={[12, 8, 8]} color="#c4b5fd" />
    </group>
  )
}

export default function FloatingBackground() {
  const { supportsWebGL, reducedMotion, lowPower } = useDeviceCapability()

  if (!supportsWebGL || reducedMotion || lowPower) {
    return <div className="floating-background-glow" aria-hidden="true" />
  }

  return (
    <div className="floating-background" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.2]} gl={{ antialias: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 4]} intensity={0.8} color="#8b5cf6" />
        <BackgroundShapes />
      </Canvas>
    </div>
  )
}
