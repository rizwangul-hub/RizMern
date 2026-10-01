import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { THREE_CONFIG } from '../../data/threeConfig'

function createDotPositions(count, landMask = null) {
  const radius = THREE_CONFIG.globe.radius
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  const positions = []
  const colors = []
  const baseColor = new THREE.Color(THREE_CONFIG.globe.colors.dots)
  const highlightColor = new THREE.Color(THREE_CONFIG.globe.colors.dotHighlight)

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2
    const ringRadius = Math.sqrt(1 - y * y)
    const theta = goldenAngle * index
    const x = Math.cos(theta) * ringRadius
    const z = Math.sin(theta) * ringRadius
    const latitude = Math.asin(y)
    const longitude = Math.atan2(x, z)

    if (landMask) {
      const u = ((longitude / (Math.PI * 2)) + 0.5) * landMask.width
      const v = (0.5 - latitude / Math.PI) * landMask.height
      const sampleX = Math.floor(u) % landMask.width
      const sampleY = Math.min(landMask.height - 1, Math.max(0, Math.floor(v)))
      const pixel = (sampleY * landMask.width + sampleX) * 4
      const isLand = landMask.data[pixel + 3] > 32 &&
        (landMask.data[pixel] + landMask.data[pixel + 1] + landMask.data[pixel + 2]) / 3 > 100
      if (!isLand) continue
    }

    positions.push(x * radius, y * radius, z * radius)
    const shade = 0.72 + ((index * 17) % 29) / 100
    const color = baseColor.clone().lerp(highlightColor, (shade - 0.72) / 0.29)
    colors.push(color.r, color.g, color.b)
  }

  return { positions: new Float32Array(positions), colors: new Float32Array(colors) }
}

function readLandMask(path) {
  return fetch(path)
    .then((response) => response.ok ? response.blob() : null)
    .then(async (blob) => {
      if (!blob) return null

      const bitmap = await createImageBitmap(blob)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        bitmap.close()
        return null
      }

      context.drawImage(bitmap, 0, 0)
      const { data } = context.getImageData(0, 0, bitmap.width, bitmap.height)
      bitmap.close()
      return { data, width: canvas.width, height: canvas.height }
    })
}

export default function GlobeDots({ count }) {
  const [landMask, setLandMask] = useState(null)
  const dotData = useMemo(() => createDotPositions(count, landMask), [count, landMask])

  useEffect(() => {
    let active = true
    readLandMask(THREE_CONFIG.globe.landMaskPath)
      .then((mask) => {
        if (active && mask) setLandMask(mask)
      })
      .catch(() => {
        // The mask is optional; the globe remains evenly dotted when it is unavailable.
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[dotData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[dotData.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.023}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.94}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
