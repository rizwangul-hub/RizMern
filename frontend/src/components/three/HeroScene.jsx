import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'
import useDeviceCapability from '../../hooks/useDeviceCapability'
import { THREE_CONFIG } from '../../data/threeConfig'
import Particles from './Particles'
import TechOrbit from './TechOrbit'

function OrbitingTech({ isMobile }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) return

    const scrollY = typeof window !== 'undefined' ? window.scrollY || 0 : 0
    const scrollFactor = Math.min(scrollY / 600, 1)

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.45 + state.pointer.x * 0.5
    groupRef.current.rotation.x = state.pointer.y * 0.22 - scrollFactor * 0.2
    groupRef.current.position.x = state.pointer.x * 0.35
    groupRef.current.position.y = state.pointer.y * 0.2 - scrollFactor * 0.4
    const targetScale = Math.max(0.85, 1 - scrollFactor * 0.15)
    groupRef.current.scale.set(targetScale, targetScale, targetScale)
  })

  return (
    <group ref={groupRef}>
      <Float speed={2.1} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh scale={1.7}>
          <icosahedronGeometry args={[1.05, 2]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#8b5cf6"
            emissiveIntensity={0.55}
            speed={1.7}
            distort={0.42}
            radius={1.1}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.4]}>
        <torusGeometry args={[2.1, 0.025, 16, 120]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.7} />
      </mesh>

      <mesh rotation={[0.7, 0.5, 0.3]} position={[0, 0, -0.2]}>
        <torusKnotGeometry args={[1.5, 0.035, 160, 24]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      </mesh>

      <TechOrbit />
      <Particles
        count={isMobile ? THREE_CONFIG.hero.mobileParticles : THREE_CONFIG.hero.particles}
        size={2.5}
        scale={[9, 9, 9]}
        color="#a5f3fc"
      />
    </group>
  )
}

export default function HeroScene() {
  const { supportsWebGL, reducedMotion, lowPower, isMobile } = useDeviceCapability()

  if (!supportsWebGL || reducedMotion || lowPower) {
    return (
      <div className="three-hero-fallback" aria-hidden="true">
        <div className="three-hero-orb" />
      </div>
    )
  }

  return (
    <div className="three-hero-shell" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.7} color="#8b5cf6" />
        <pointLight position={[-4, -2, 3]} intensity={20} color="#22d3ee" />
        <pointLight position={[3, 2, 4]} intensity={18} color="#8b5cf6" />
        <OrbitingTech isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
