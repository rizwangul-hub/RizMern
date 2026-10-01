import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { THREE_CONFIG } from '../../data/threeConfig'
import useDeviceCapability from '../../hooks/useDeviceCapability'
import GlobeArcs from './GlobeArcs'
import GlobeDots from './GlobeDots'
import GlobeMarker from './GlobeMarker'
import Particles from './Particles'

function Atmosphere() {
  return (
    <>
      <mesh scale={1.08}>
        <sphereGeometry args={[THREE_CONFIG.globe.radius, 48, 48]} />
        <meshBasicMaterial
          color={THREE_CONFIG.globe.colors.atmosphere}
          transparent
          opacity={0.075}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.13}>
        <sphereGeometry args={[THREE_CONFIG.globe.radius, 40, 40]} />
        <meshBasicMaterial
          color={THREE_CONFIG.globe.colors.atmosphereAccent}
          transparent
          opacity={0.035}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export default function GlobeScene({ isVisible }) {
  const { isMobile } = useDeviceCapability()
  const [dragging, setDragging] = useState(false)
  const [tabVisible, setTabVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible'
  )
  const dotCount = isMobile
    ? THREE_CONFIG.globe.mobileDotCount
    : THREE_CONFIG.globe.desktopDotCount

  useEffect(() => {
    const updateVisibility = () => setTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 38 }}
      dpr={isMobile ? [1, 1.2] : [1, 1.5]}
      frameloop={isVisible && tabVisible ? 'always' : 'never'}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor('#070b15', 0)
      }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[-3, 2, 4]} color="#8b5cf6" intensity={22} />
      <pointLight position={[3, -2, 3]} color="#06b6d4" intensity={16} />
      <group>
        <GlobeDots count={dotCount} />
        <Atmosphere />
        <GlobeArcs />
        <GlobeMarker />
      </group>
      <Particles count={isMobile ? 90 : 150} size={1.8} scale={[9, 7, 7]} color="#c4b5fd" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!dragging}
        autoRotateSpeed={THREE_CONFIG.globe.rotationSpeed}
        rotateSpeed={0.65}
        minPolarAngle={Math.PI * 0.22}
        maxPolarAngle={Math.PI * 0.78}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      />
    </Canvas>
  )
}
