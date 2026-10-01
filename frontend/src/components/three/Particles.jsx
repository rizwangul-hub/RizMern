import { Sparkles } from '@react-three/drei'

export default function Particles({ count = 150, size = 2.4, scale = [10, 10, 10], color = '#7dd3fc' }) {
  return (
    <Sparkles
      count={count}
      scale={scale}
      size={size}
      speed={0.45}
      opacity={0.8}
      color={color}
      noise={0.8}
    />
  )
}
