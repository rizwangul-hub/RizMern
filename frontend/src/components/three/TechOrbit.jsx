import { Float, RoundedBox, Text } from '@react-three/drei'
import { useMemo } from 'react'

const orbitItems = [
  { label: 'React', color: '#61dafb', position: [-2.3, 1.25, 0.9] },
  { label: 'Node', color: '#7dd3fc', position: [2.3, 1.6, 0.5] },
  { label: 'Mongo', color: '#4ade80', position: [2.1, -1.35, 0.7] },
  { label: 'JS', color: '#facc15', position: [-2.1, -1.4, 0.8] },
  { label: 'React Native', color: '#c084fc', position: [0, 2.4, 0.4] },
]

export default function TechOrbit() {
  const cards = useMemo(() => orbitItems, [])

  return (
    <group>
      {cards.map((item, index) => (
        <Float
          key={item.label}
          position={item.position}
          rotationIntensity={0.8}
          floatIntensity={0.8}
          speed={1.5 + index * 0.18}
        >
          <RoundedBox args={[1.12, 0.58, 0.14]} radius={0.09} smoothness={4}>
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.7}
              metalness={0.2}
              roughness={0.35}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.13]}
            fontSize={0.13}
            color="#f8fafc"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
          >
            {item.label}
          </Text>
        </Float>
      ))}
    </group>
  )
}
