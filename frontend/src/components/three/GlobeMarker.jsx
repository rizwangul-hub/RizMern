import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { THREE_CONFIG } from '../../data/threeConfig'

const latitude = THREE.MathUtils.degToRad(30.4)
const longitude = THREE.MathUtils.degToRad(69.3)
const markerPosition = [
  THREE_CONFIG.globe.radius * Math.cos(latitude) * Math.sin(longitude) * 1.025,
  THREE_CONFIG.globe.radius * Math.sin(latitude) * 1.025,
  THREE_CONFIG.globe.radius * Math.cos(latitude) * Math.cos(longitude) * 1.025,
]

export default function GlobeMarker() {
  const markerRef = useRef(null)
  const rippleRef = useRef(null)
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 64
    const context = canvas.getContext('2d')
    if (!context) return null

    context.fillStyle = 'rgba(5, 14, 31, 0.88)'
    context.strokeStyle = 'rgba(103, 232, 249, 0.8)'
    context.lineWidth = 2
    context.beginPath()
    context.roundRect(2, 2, 252, 60, 30)
    context.fill()
    context.stroke()
    context.fillStyle = '#e0fbff'
    context.font = '600 30px Inter, sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('RizMern', 128, 33)

    return new THREE.CanvasTexture(canvas)
  }, [])

  useEffect(() => () => labelTexture?.dispose(), [labelTexture])

  useFrame(({ clock }) => {
    if (markerRef.current) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 4) * 0.18
      markerRef.current.scale.setScalar(pulse)
    }

    if (rippleRef.current) {
      const phase = (clock.elapsedTime * 0.55) % 1
      rippleRef.current.scale.setScalar(0.5 + phase * 1.4)
      rippleRef.current.material.opacity = 0.75 * (1 - phase)
    }
  })

  return (
    <group position={markerPosition}>
      <mesh ref={rippleRef}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial
          color={THREE_CONFIG.globe.colors.marker}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={markerRef}>
        <sphereGeometry args={[0.065, 20, 20]} />
        <meshBasicMaterial
          color={THREE_CONFIG.globe.colors.marker}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={THREE_CONFIG.globe.colors.marker} intensity={1.1} distance={0.7} />
      {labelTexture && (
        <sprite position={[0.24, 0.13, 0]} scale={[0.86, 0.22, 1]}>
          <spriteMaterial map={labelTexture} transparent depthTest={false} />
        </sprite>
      )}
    </group>
  )
}
