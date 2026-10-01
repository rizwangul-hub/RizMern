import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Html } from '@react-three/drei'
import { THREE_CONFIG } from '../../data/threeConfig'

/**
 * ScreenContent component renders the reactive UI inside the laptop display
 * depending on which scroll stage is currently active.
 */
function ScreenContent({ stageIndex }) {
  const currentStage = THREE_CONFIG.stages[stageIndex] || THREE_CONFIG.stages[0]

  return (
    <div
      style={{
        width: '620px',
        height: '390px',
        background: '#090a13',
        borderRadius: '6px',
        padding: '16px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        color: '#f1f5f9',
        fontFamily: 'Inter, system-ui, sans-serif',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'inset 0 0 25px rgba(147, 51, 234, 0.15)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
      }}
    >
      {/* Top Window Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
        </div>
        <div
          style={{
            fontSize: '11px',
            color: '#94a3b8',
            fontFamily: 'monospace',
            letterSpacing: '0.5px',
          }}
        >
          {stageIndex === 0 && '⚡ RizMern • AI Architecture Planner'}
          {stageIndex === 1 && '⚛️ App.jsx — React Component'}
          {stageIndex === 2 && '⚙️ node src/server.js (Production)'}
          {stageIndex === 3 && '🌐 https://rizmern.com (Live)'}
        </div>
        <span
          style={{
            fontSize: '10px',
            padding: '2px 8px',
            borderRadius: '12px',
            fontWeight: 700,
            background: stageIndex === 3 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(168, 85, 247, 0.2)',
            color: stageIndex === 3 ? '#34d399' : '#c084fc',
            border: `1px solid ${stageIndex === 3 ? '#10b981' : '#a855f7'}`,
          }}
        >
          {currentStage.badge}
        </span>
      </div>

      {/* Stage 0: Plan with AI */}
      {stageIndex === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '12px',
              color: '#cbd5e1',
            }}
          >
            <div style={{ color: '#a855f7', fontWeight: 600, marginBottom: '4px' }}>💬 Prompt:</div>
            &ldquo;Plan a full-stack MERN &amp; React Native course app with authentication, student progress tracking, and cloud deployment.&rdquo;
          </div>
          <div
            style={{
              background: 'rgba(168, 85, 247, 0.08)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              fontSize: '11px',
              lineHeight: 1.5,
              color: '#e2e8f0',
              fontFamily: 'monospace',
            }}
          >
            <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '6px' }}>✨ Architecture Blueprint:</div>
            <div>├── Models: Student, CourseContent, CourseProgress</div>
            <div>├── Backend: Express 5 + JWT + MongoDB Atlas</div>
            <div>├── Client: React 19 + Framer Motion + Tailwind</div>
            <div>└── Mobile: React Native cross-platform APK</div>
          </div>
        </div>
      )}

      {/* Stage 1: Build the Frontend */}
      {stageIndex === 1 && (
        <div
          style={{
            background: '#040509',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            fontFamily: 'monospace',
            fontSize: '11.5px',
            lineHeight: '1.6',
            color: '#e2e8f0',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <div><span style={{ color: '#ec4899' }}>import</span> React <span style={{ color: '#ec4899' }}>from</span> <span style={{ color: '#a5f3fc' }}>&apos;react&apos;</span></div>
          <div><span style={{ color: '#ec4899' }}>import</span> &#123; motion &#125; <span style={{ color: '#ec4899' }}>from</span> <span style={{ color: '#a5f3fc' }}>&apos;framer-motion&apos;</span></div>
          <div style={{ height: '6px' }} />
          <div><span style={{ color: '#818cf8' }}>export function</span> <span style={{ color: '#fbbf24' }}>StudentHero</span>() &#123;</div>
          <div style={{ paddingLeft: '16px' }}><span style={{ color: '#ec4899' }}>return</span> (</div>
          <div style={{ paddingLeft: '32px' }}>&lt;<span style={{ color: '#38bdf8' }}>motion.div</span> <span style={{ color: '#c084fc' }}>className</span>=<span style={{ color: '#a5f3fc' }}>&quot;interactive-card&quot;</span>&gt;</div>
          <div style={{ paddingLeft: '48px' }}>&lt;<span style={{ color: '#38bdf8' }}>h1</span>&gt;Build Modern Web &amp; Apps&lt;/<span style={{ color: '#38bdf8' }}>h1</span>&gt;</div>
          <div style={{ paddingLeft: '48px' }}>&lt;<span style={{ color: '#38bdf8' }}>ProjectGallery</span> <span style={{ color: '#c084fc' }}>interactive</span>=&#123;<span style={{ color: '#f59e0b' }}>true</span>&#125; /&gt;</div>
          <div style={{ paddingLeft: '32px' }}>&lt;/<span style={{ color: '#38bdf8' }}>motion.div</span>&gt;</div>
          <div style={{ paddingLeft: '16px' }}>)</div>
          <div>&#125;</div>
        </div>
      )}

      {/* Stage 2: Connect Backend and Database */}
      {stageIndex === 2 && (
        <div
          style={{
            background: '#030509',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontFamily: 'monospace',
            fontSize: '11px',
            lineHeight: '1.7',
            color: '#a7f3d0',
            flex: 1,
          }}
        >
          <div style={{ color: '#94a3b8' }}>$ node src/server.js</div>
          <div style={{ color: '#38bdf8' }}>◇ loaded environment configuration (.env)</div>
          <div>✔ Express server initialized on TCP port 5000</div>
          <div>✔ MongoDB Atlas cluster connected: ac-pfod3ja-shard-00</div>
          <div>✔ JWT Authentication middleware active</div>
          <div>✔ Course Modules, Lessons &amp; Student collections synchronized</div>
          <div style={{ color: '#fbbf24', marginTop: '6px' }}>⚡ Ready to accept client requests at /api/health</div>
        </div>
      )}

      {/* Stage 3: Go Live with Your Domain */}
      {stageIndex === 3 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flex: 1,
            background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05), rgba(147, 51, 234, 0.08))',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '6px 12px',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontSize: '11px', color: '#6ee7b7', fontFamily: 'monospace' }}>🔒 https://rizmern.com</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.18)',
                padding: '2px 8px',
                borderRadius: '8px',
              }}
            >
              ● LIVE DEPLOYED
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '8px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px',
                letterSpacing: '-0.5px',
              }}
            >
              RizMern<span style={{ color: '#a855f7' }}>.com</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, maxWidth: '280px' }}>
              Full-Stack MERN &amp; React Native Production Deployment Complete
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Creates a procedural keyboard grid texture
 */
function createKeyboardTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // Background plate
  ctx.fillStyle = '#0a0b12'
  ctx.fillRect(0, 0, 512, 256)

  // Keys grid
  const rows = 5
  const cols = 14
  const paddingX = 8
  const paddingY = 8
  const keyWidth = (512 - paddingX * (cols + 1)) / cols
  const keyHeight = (256 - paddingY * (rows + 1)) / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = paddingX + c * (keyWidth + paddingX)
      const y = paddingY + r * (keyHeight + paddingY)

      ctx.fillStyle = '#161824'
      ctx.beginPath()
      ctx.roundRect(x, y, keyWidth, keyHeight, 4)
      ctx.fill()

      // Subtle key highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  return texture
}

export function LaptopModel({ scrollProgressRef, onStageChange }) {
  const laptopGroupRef = useRef()
  const hingeGroupRef = useRef()
  const currentStageIndexRef = useRef(0)

  const keyboardTexture = useMemo(() => createKeyboardTexture(), [])

  // Materials with dark metallic look and subtle neon edge sheen
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(THREE_CONFIG.colors.laptopBody),
        metalness: THREE_CONFIG.colors.laptopMetallic,
        roughness: THREE_CONFIG.colors.laptopRoughness,
      }),
    []
  )

  const edgeNeonMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(THREE_CONFIG.colors.neonEdgePurple),
      }),
    []
  )

  const trackpadMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(THREE_CONFIG.colors.trackpad),
        metalness: 0.5,
        roughness: 0.4,
      }),
    []
  )

  const logoGlowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(THREE_CONFIG.colors.logoBackGlow),
      }),
    []
  )

  // Floating particles around the laptop
  const particlesCount = 45
  const particlesPositions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = Math.random() * 4 - 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [])

  const [activeStage, setActiveStage] = React.useState(0)

  // Smooth lerp frame loop
  useFrame((state, delta) => {
    const progress = scrollProgressRef ? scrollProgressRef.current : 0

    // Determine current stage: 0 to 0.25 (0), 0.25 to 0.5 (1), 0.5 to 0.75 (2), 0.75 to 1.0 (3)
    let stage = 0
    let localT = 0

    if (progress < 0.25) {
      stage = 0
      localT = progress / 0.25
    } else if (progress < 0.5) {
      stage = 1
      localT = (progress - 0.25) / 0.25
    } else if (progress < 0.75) {
      stage = 2
      localT = (progress - 0.5) / 0.25
    } else {
      stage = 3
      localT = Math.min((progress - 0.75) / 0.25, 1.0)
    }

    if (currentStageIndexRef.current !== stage) {
      currentStageIndexRef.current = stage
      setActiveStage(stage)
      if (onStageChange) onStageChange(stage)
    }

    // Interpolate transform targets between current stage and next stage
    const currentCfg = THREE_CONFIG.stages[stage].transform
    const nextCfg = THREE_CONFIG.stages[Math.min(stage + 1, 3)].transform

    const targetRotX = THREE.MathUtils.lerp(currentCfg.rotX, nextCfg.rotX, localT)
    const targetRotY = THREE.MathUtils.lerp(currentCfg.rotY, nextCfg.rotY, localT)
    const targetRotZ = THREE.MathUtils.lerp(currentCfg.rotZ, nextCfg.rotZ, localT)
    const targetLid = THREE.MathUtils.lerp(currentCfg.lidAngle, nextCfg.lidAngle, localT)
    const targetCamZ = THREE.MathUtils.lerp(currentCfg.camZ, nextCfg.camZ, localT)
    const targetCamY = THREE.MathUtils.lerp(currentCfg.camY, nextCfg.camY, localT)

    const lerpSpeed = Math.min(delta * 6, 0.25)

    if (laptopGroupRef.current) {
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, targetRotX, lerpSpeed)
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, targetRotY, lerpSpeed)
      laptopGroupRef.current.rotation.z = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.z, targetRotZ, lerpSpeed)
    }

    if (hingeGroupRef.current) {
      hingeGroupRef.current.rotation.x = THREE.MathUtils.lerp(hingeGroupRef.current.rotation.x, targetLid, lerpSpeed)
    }

    // Gentle camera damping
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, lerpSpeed)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, lerpSpeed)
    state.camera.lookAt(0, 0.4, 0)
  })

  const { baseWidth, baseDepth, baseHeight, lidWidth, lidDepth, lidHeight, trackpadWidth, trackpadDepth } =
    THREE_CONFIG.dimensions

  return (
    <group ref={laptopGroupRef} position={[0, 0, 0]}>
      {/* 1. LAPTOP BASE */}
      <group position={[0, baseHeight / 2, 0]}>
        {/* Main Base Body */}
        <RoundedBox args={[baseWidth, baseHeight, baseDepth]} radius={0.03} smoothness={4} material={bodyMaterial} />

        {/* Subtle Neon Edge Rim under the base */}
        <mesh position={[0, -baseHeight / 2 + 0.005, 0]}>
          <boxGeometry args={[baseWidth * 1.008, 0.012, baseDepth * 1.008]} />
          <primitive object={edgeNeonMaterial} />
        </mesh>

        {/* Keyboard Area */}
        <mesh position={[0, baseHeight / 2 + 0.001, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.7, 1.2]} />
          <meshBasicMaterial map={keyboardTexture} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, baseHeight / 2 + 0.002, 0.62]}>
          <boxGeometry args={[trackpadWidth, 0.005, trackpadDepth]} />
          <primitive object={trackpadMaterial} />
        </mesh>
      </group>

      {/* 2. LAPTOP LID & HINGE */}
      {/* The hinge pivot is positioned at the back edge of the base: z = -baseDepth / 2 */}
      <group ref={hingeGroupRef} position={[0, baseHeight, -baseDepth / 2 + 0.05]}>
        {/* Lid Mesh: offset by lidDepth / 2 so it pivots on its bottom edge */}
        <group position={[0, lidDepth / 2, 0]}>
          <RoundedBox args={[lidWidth, lidDepth, lidHeight]} radius={0.03} smoothness={4} material={bodyMaterial} />

          {/* Glowing RizMern Logo on Back of the Lid */}
          <mesh position={[0, 0, -lidHeight / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.22, 32]} />
            <primitive object={logoGlowMaterial} />
          </mesh>

          {/* Screen Display Bezel */}
          <mesh position={[0, 0, lidHeight / 2 + 0.001]}>
            <planeGeometry args={[3.2, 2.05]} />
            <meshBasicMaterial color="#080911" />
          </mesh>

          {/* Interactive Screen HTML Viewport */}
          <Html
            transform
            occlude
            position={[0, 0, lidHeight / 2 + 0.003]}
            distanceFactor={1.9}
            style={{
              transition: 'opacity 0.25s ease',
              pointerEvents: 'none',
            }}
          >
            <ScreenContent stageIndex={activeStage} />
          </Html>
        </group>
      </group>

      {/* Floating Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={particlesPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#c084fc" transparent opacity={0.65} />
      </points>
    </group>
  )
}

export default LaptopModel
