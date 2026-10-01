import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import LaptopModel from './LaptopModel'

export function LaptopScene({ scrollProgressRef, onStageChange, isVisible = true }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={isVisible ? 'always' : 'never'}
      camera={{ position: [0, 1.2, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#f8fafc" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#8548e7" />

      {/* Subtle Purple & Cyan Rim Lights */}
      <pointLight position={[-3, 2, -2]} intensity={2.5} color="#9333ea" distance={10} />
      <pointLight position={[3, 2, -1]} intensity={2.0} color="#06b6d4" distance={10} />

      {/* Reflective Studio Floor Plane */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial
          color="#06070c"
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Floor Glow Ring */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 3.2, 64]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.12} />
      </mesh>

      <Suspense fallback={null}>
        <LaptopModel scrollProgressRef={scrollProgressRef} onStageChange={onStageChange} />
      </Suspense>
    </Canvas>
  )
}

export default LaptopScene
