import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TiltCard({ children, className = '', intensity = 14, disabled = false, style = {} }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  if (disabled) {
    return <div className={`tilt-card ${className}`.trim()} style={style}>{children}</div>
  }

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5

    setTilt({
      x: offsetY * intensity,
      y: offsetX * intensity * -1,
    })
  }

  return (
    <motion.div
      className={`tilt-card ${className}`.trim()}
      style={{
        ...style,
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-3px)`,
      }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <span className="tilt-card__glow" aria-hidden="true" />
      {children}
    </motion.div>
  )
}
