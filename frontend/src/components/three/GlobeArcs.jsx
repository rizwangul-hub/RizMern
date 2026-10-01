import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { THREE_CONFIG } from '../../data/threeConfig'

const pakistan = { latitude: 30.4, longitude: 69.3 }

function pointOnGlobe({ latitude, longitude }, radius) {
  const lat = THREE.MathUtils.degToRad(latitude)
  const lon = THREE.MathUtils.degToRad(longitude)
  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon)
  )
}

function Arc({ destination, index, radius }) {
  const lineRef = useRef(null)
  const glowRef = useRef(null)
  const curve = useMemo(() => {
    const start = pointOnGlobe(pakistan, radius * 1.015)
    const end = pointOnGlobe(destination, radius * 1.015)
    const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.62)
    return new THREE.QuadraticBezierCurve3(start, middle, end)
  }, [destination, radius])
  const points = useMemo(() => curve.getPoints(80), [curve])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({
      color: THREE_CONFIG.globe.colors.arcs,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
    }),
    []
  )

  useFrame(({ clock }) => {
    const progress = (clock.elapsedTime * 0.2 + index * 0.22) % 1
    if (lineRef.current) lineRef.current.geometry.setDrawRange(0, Math.max(2, Math.floor(points.length * progress)))
    if (glowRef.current) {
      const position = curve.getPointAt(progress)
      glowRef.current.position.copy(position)
      glowRef.current.scale.setScalar(0.72 + Math.sin(clock.elapsedTime * 5 + index) * 0.2)
    }
  })

  return (
    <>
      <line ref={lineRef} geometry={geometry} material={lineMaterial} />
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color={THREE_CONFIG.globe.colors.arcs}
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  )
}

export default function GlobeArcs() {
  return (
    <group>
      {THREE_CONFIG.globe.arcDestinations.map((destination, index) => (
        <Arc
          key={`${destination.latitude}-${destination.longitude}`}
          destination={destination}
          index={index}
          radius={THREE_CONFIG.globe.radius}
        />
      ))}
    </group>
  )
}
