import FloatingBackground from './three/FloatingBackground'

export default function BackgroundEffects() {
  return (
    <>
      <FloatingBackground />
      <div className="background-effects" aria-hidden="true">
        <span className="ambient-blob ambient-blob--one" />
        <span className="ambient-blob ambient-blob--two" />
        <div className="ambient-grid" />
      </div>
    </>
  )
}
