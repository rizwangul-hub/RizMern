import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBox, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { siteData } from '../../data/siteData'
import { THREE_CONFIG } from '../../data/threeConfig'

const SCREEN_WIDTH = 620
const SCREEN_HEIGHT = 390
const SCREEN_SCALE = 2
const SCREEN_COUNT = THREE_CONFIG.laptop.screens.length
const FULL_PROGRESS = [0.04, 0.232, 0.424, 0.616, 0.808, 1]

function roundedRect(context, x, y, width, height, radius, fill, stroke) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
  if (fill) {
    context.fillStyle = fill
    context.fill()
  }
  if (stroke) {
    context.strokeStyle = stroke
    context.stroke()
  }
}

function drawText(context, text, x, y, options = {}) {
  const {
    size = 14,
    color = '#e2e8f0',
    weight = 400,
    family = 'Inter, sans-serif',
    align = 'left',
  } = options
  context.font = `${weight} ${size}px ${family}`
  context.fillStyle = color
  context.textAlign = align
  context.textBaseline = 'top'
  context.fillText(text, x, y)
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, options = {}) {
  context.font = `${options.weight || 400} ${options.size || 14}px ${options.family || 'Inter, sans-serif'}`
  const words = text.split(/\s+/)
  let line = ''
  let lineIndex = 0

  for (const word of words) {
    const nextLine = line ? `${line} ${word}` : word
    if (context.measureText(nextLine).width > maxWidth && line) {
      drawText(context, line, x, y + lineIndex * lineHeight, options)
      line = word
      lineIndex += 1
    } else {
      line = nextLine
    }
  }
  if (line) drawText(context, line, x, y + lineIndex * lineHeight, options)
}

function createBaseScreen(context, badge) {
  const gradient = context.createLinearGradient(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  gradient.addColorStop(0, '#0b1020')
  gradient.addColorStop(0.58, '#090d19')
  gradient.addColorStop(1, '#10102a')
  context.fillStyle = gradient
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

  const glow = context.createRadialGradient(535, 25, 5, 535, 25, 280)
  glow.addColorStop(0, 'rgba(34, 211, 238, 0.16)')
  glow.addColorStop(1, 'rgba(34, 211, 238, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

  roundedRect(context, 14, 12, SCREEN_WIDTH - 28, 34, 8, 'rgba(255,255,255,.045)', 'rgba(255,255,255,.09)')
  context.fillStyle = '#fb7185'
  context.beginPath()
  context.arc(29, 29, 4, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#fbbf24'
  context.beginPath()
  context.arc(43, 29, 4, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#34d399'
  context.beginPath()
  context.arc(57, 29, 4, 0, Math.PI * 2)
  context.fill()
  drawText(context, siteData.brand, 76, 19, { size: 14, weight: 700, color: '#c4b5fd' })
  roundedRect(context, SCREEN_WIDTH - 205, 16, 175, 26, 13, 'rgba(139,92,246,.18)', 'rgba(167,139,250,.33)')
  drawText(context, badge, SCREEN_WIDTH - 117.5, 22, { size: 14, weight: 700, color: '#d8b4fe', align: 'center' })
}

function drawPlanScreen(context) {
  const copy = THREE_CONFIG.laptop
  createBaseScreen(context, copy.screens[0].badge)
  drawText(context, copy.labels.planHeading, 25, 60, { size: 14, weight: 700, color: '#67e8f9' })
  roundedRect(context, 24, 85, 572, 74, 11, 'rgba(255,255,255,.045)', 'rgba(255,255,255,.1)')
  drawText(context, copy.labels.prompt, 39, 98, { size: 14, weight: 700, color: '#a78bfa' })
  drawWrappedText(context, copy.planPrompt, 39, 118, 540, 18, { size: 14, color: '#f1f5f9' })

  roundedRect(context, 24, 171, 572, 197, 11, 'rgba(124,58,237,.09)', 'rgba(167,139,250,.24)')
  drawText(context, copy.labels.aiName, 40, 185, { size: 14, weight: 700, color: '#c4b5fd' })
  drawText(context, copy.planReply, 40, 207, { size: 14, color: '#cbd5e1' })
  copy.planTree.forEach((line, index) => {
    drawText(context, line, 42, 231 + index * 14, {
      size: 14,
      color: index < 2 ? '#67e8f9' : '#cbd5e1',
      family: 'ui-monospace, Consolas, monospace',
    })
  })
}

function drawFrontendScreen(context) {
  const copy = THREE_CONFIG.laptop
  createBaseScreen(context, copy.screens[1].badge)
  roundedRect(context, 18, 57, 136, 273, 8, '#0d1322', 'rgba(255,255,255,.08)')
  drawText(context, copy.labels.explorer, 30, 69, { size: 14, weight: 700, color: '#94a3b8' })
  copy.fileTree.forEach((line, index) => {
    drawText(context, line, 30, 94 + index * 22, { size: 14, color: index ? '#cbd5e1' : '#67e8f9', family: 'ui-monospace, Consolas, monospace' })
  })
  roundedRect(context, 165, 57, 437, 34, 7, '#141a2a', 'rgba(255,255,255,.08)')
  copy.tabs.forEach((tab, index) => {
    roundedRect(context, 174 + index * 120, 63, 112, 23, 5, index === 0 ? 'rgba(139,92,246,.24)' : 'transparent')
    drawText(context, tab, 184 + index * 120, 68, { size: 14, color: index === 0 ? '#e9d5ff' : '#94a3b8', family: 'ui-monospace, Consolas, monospace' })
  })
  roundedRect(context, 165, 100, 437, 230, 7, '#080d18', 'rgba(56,189,248,.12)')
  copy.codeLines.forEach((line, index) => {
    drawText(context, String(index + 1).padStart(2, '0'), 180, 114 + index * 22, { size: 14, color: '#64748b', family: 'ui-monospace, Consolas, monospace' })
    drawText(
      context,
      line.text
        .replace('{courseTagline}', siteData.courseTagline)
        .replace('{demoCtaText}', siteData.demoCtaText),
      207,
      112 + index * 22,
      { size: 14, color: line.color, family: 'ui-monospace, Consolas, monospace' }
    )
  })
  let badgeX = 20
  siteData.courseTechList.forEach((badge) => {
    const width = badge.length * 8 + 22
    roundedRect(context, badgeX, 344, width, 26, 13, 'rgba(34,211,238,.09)', 'rgba(34,211,238,.24)')
    drawText(context, badge, badgeX + width / 2, 351, { size: 14, weight: 600, color: '#a5f3fc', align: 'center' })
    badgeX += width + 8
  })
}

function drawBackendScreen(context) {
  const copy = THREE_CONFIG.laptop
  createBaseScreen(context, copy.screens[2].badge)
  roundedRect(context, 20, 60, 350, 280, 10, '#050912', 'rgba(52,211,153,.24)')
  drawText(context, copy.labels.terminal, 37, 73, { size: 14, weight: 700, color: '#6ee7b7' })
  copy.backendLines.forEach((line, index) => {
    drawText(context, line, 38, 112 + index * 38, {
      size: 14,
      color: index === 2 ? '#86efac' : index === 3 ? '#67e8f9' : '#e2e8f0',
      family: 'ui-monospace, Consolas, monospace',
    })
  })
  const badgeX = [403, 492, 403]
  const badgeY = [112, 182, 252]
  const badgeColors = ['#86efac', '#67e8f9', '#a5b4fc']
  copy.backendBadges.forEach((badge, index) => {
    roundedRect(context, badgeX[index], badgeY[index], 150, 38, 12, 'rgba(15,23,42,.9)', 'rgba(103,232,249,.28)')
    drawText(context, badge, badgeX[index] + 75, badgeY[index] + 11, { size: 14, weight: 700, color: badgeColors[index], align: 'center' })
    if (index < copy.backendBadges.length - 1) {
      context.strokeStyle = 'rgba(34,211,238,.62)'
      context.lineWidth = 2
      context.beginPath()
      context.moveTo(badgeX[index] + 75, badgeY[index] + 38)
      context.lineTo(badgeX[index + 1] + 75, badgeY[index + 1])
      context.stroke()
    }
  })
}

function drawLiveScreen(context) {
  const copy = THREE_CONFIG.laptop
  createBaseScreen(context, copy.screens[3].badge)
  roundedRect(context, 18, 57, 584, 35, 8, '#111827', 'rgba(255,255,255,.1)')
  drawText(context, THREE_CONFIG.laptop.labels.lock, 31, 66, { size: 14, color: '#86efac' })
  drawText(context, siteData.siteUrl, 57, 67, { size: 14, color: '#cbd5e1', family: 'ui-monospace, Consolas, monospace' })
  roundedRect(context, 33, 111, 346, 230, 12, 'rgba(255,255,255,.035)', 'rgba(167,139,250,.2)')
  roundedRect(context, 51, 129, 108, 28, 8, 'rgba(139,92,246,.2)')
  drawText(context, siteData.brand, 105, 136, { size: 14, weight: 700, color: '#e9d5ff', align: 'center' })
  roundedRect(context, 295, 133, 65, 25, 13, 'rgba(34,197,94,.16)', 'rgba(74,222,128,.42)')
  drawText(context, copy.liveBadge, 327, 136, { size: 14, weight: 800, color: '#86efac', align: 'center' })
  drawWrappedText(context, siteData.courseTagline, 53, 184, 290, 27, { size: 20, weight: 700, family: 'Poppins, sans-serif', color: '#f8fafc' })
  roundedRect(context, 53, 270, 190, 37, 10, 'rgba(139,92,246,.55)', 'rgba(192,132,252,.5)')
  drawText(context, siteData.demoCtaText, 148, 279, { size: 14, weight: 700, color: '#fff', align: 'center' })
  roundedRect(context, 397, 111, 185, 230, 12, 'rgba(4,10,20,.68)', 'rgba(255,255,255,.1)')
  drawText(context, copy.labels.launchChecklist, 413, 128, { size: 14, weight: 700, color: '#94a3b8' })
  copy.liveChecklist.forEach((item, index) => {
    const y = 164 + index * 39
    context.fillStyle = '#34d399'
    context.beginPath()
    context.arc(422, y + 8, 7, 0, Math.PI * 2)
    context.fill()
    drawText(context, copy.labels.liveCheck, 422, y, { size: 14, weight: 700, color: '#052e2b', align: 'center' })
    drawText(context, item, 439, y, { size: 14, color: '#d1fae5' })
  })
}

function drawSummaryScreen(context) {
  const copy = THREE_CONFIG.laptop
  createBaseScreen(context, copy.screens[4].badge)
  const glow = context.createRadialGradient(310, 185, 20, 310, 185, 300)
  glow.addColorStop(0, 'rgba(139,92,246,.2)')
  glow.addColorStop(1, 'rgba(139,92,246,0)')
  context.fillStyle = glow
  context.fillRect(0, 48, SCREEN_WIDTH, SCREEN_HEIGHT - 48)
  drawText(context, copy.summaryEyebrow, SCREEN_WIDTH / 2, 71, { size: 14, weight: 700, color: '#67e8f9', align: 'center' })
  drawWrappedText(context, siteData.courseName, 55, 101, 510, 30, { size: 22, weight: 700, family: 'Poppins, sans-serif', color: '#f8fafc' })

  const details = [
    [siteData.duration, siteData.classFormat],
    [siteData.experienceLevel, `${copy.summaryInstructorLabel}: ${siteData.instructor}`],
  ]
  details.forEach((row, rowIndex) => {
    row.forEach((item, columnIndex) => {
      const x = 55 + columnIndex * 265
      const y = 197 + rowIndex * 56
      roundedRect(context, x, y, 245, 42, 10, 'rgba(255,255,255,.045)', 'rgba(255,255,255,.1)')
      drawText(context, item, x + 15, y + 13, { size: 14, weight: 600, color: '#dbeafe' })
    })
  })
  roundedRect(context, 174, 323, 272, 42, 12, 'rgba(124,58,237,.62)', 'rgba(192,132,252,.55)')
  drawText(context, siteData.demoCtaText, 310, 336, { size: 14, weight: 700, color: '#fff', align: 'center' })
}

function createScreenTexture(screenIndex) {
  const canvas = document.createElement('canvas')
  canvas.width = SCREEN_WIDTH * SCREEN_SCALE
  canvas.height = SCREEN_HEIGHT * SCREEN_SCALE
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create the laptop screen canvas texture.')
  context.scale(SCREEN_SCALE, SCREEN_SCALE)

  const screenDrawers = [drawBootScreen, drawPlanScreen, drawFrontendScreen, drawBackendScreen, drawLiveScreen, drawSummaryScreen]
  screenDrawers[screenIndex](context)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}

function drawBootScreen(context) {
  const gradient = context.createLinearGradient(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  gradient.addColorStop(0, '#090b1b')
  gradient.addColorStop(0.55, '#141039')
  gradient.addColorStop(1, '#071628')
  context.fillStyle = gradient
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  const glow = context.createRadialGradient(310, 130, 5, 310, 150, 210)
  glow.addColorStop(0, 'rgba(168,85,247,.48)')
  glow.addColorStop(1, 'rgba(34,211,238,0)')
  context.fillStyle = glow
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  drawBrandMark(context, 310, 116, 78)
  drawText(context, siteData.brand, 310, 180, { size: 33, weight: 800, family: 'Poppins, sans-serif', color: '#fff', align: 'center' })
  drawText(context, siteData.courseTagline, 310, 229, { size: 14, weight: 500, color: '#cbd5e1', align: 'center' })
  drawText(context, THREE_CONFIG.laptop.loadingLabel, 310, 306, { size: 14, color: '#a5b4fc', align: 'center' })
  roundedRect(context, 195, 337, 230, 6, 3, 'rgba(255,255,255,.13)')
  const progress = context.createLinearGradient(195, 0, 425, 0)
  progress.addColorStop(0, '#a855f7')
  progress.addColorStop(1, '#22d3ee')
  roundedRect(context, 195, 337, 112, 6, 3, progress)
}

function drawBrandMark(context, centerX, centerY, size) {
  const x = centerX - size / 2
  const y = centerY - size / 2
  context.save()
  context.shadowColor = 'rgba(139,92,246,.8)'
  context.shadowBlur = 24
  const gradient = context.createLinearGradient(x, y, x + size, y + size)
  gradient.addColorStop(0, '#a855f7')
  gradient.addColorStop(0.55, '#6366f1')
  gradient.addColorStop(1, '#06b6d4')
  roundedRect(context, x, y, size, size, 20, gradient)
  context.shadowBlur = 0
  drawText(context, 'R', centerX, y + size * 0.17, { size: size * 0.58, weight: 800, family: 'Poppins, sans-serif', color: '#fff', align: 'center' })
  context.restore()
}

function createLogoTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create the laptop lid logo texture.')
  context.scale(2, 2)
  drawBrandMark(context, 128, 84, 86)
  drawText(context, siteData.brand, 128, 137, { size: 22, weight: 800, family: 'Poppins, sans-serif', color: '#f8fafc', align: 'center' })
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function createKeyboardTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create the laptop keyboard texture.')
  context.fillStyle = '#0a0b12'
  context.fillRect(0, 0, 512, 256)
  const rows = 5
  const columns = 14
  const padding = 8
  const keyWidth = (512 - padding * (columns + 1)) / columns
  const keyHeight = (256 - padding * (rows + 1)) / rows
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = padding + column * (keyWidth + padding)
      const y = padding + row * (keyHeight + padding)
      roundedRect(context, x, y, keyWidth, keyHeight, 4, '#161824', 'rgba(255,255,255,.08)')
    }
  }
  return new THREE.CanvasTexture(canvas)
}

function ScreenDisplay({ screenIndex, width, height }) {
  const screenRef = useRef(null)
  const previousScreenRef = useRef(null)
  const revealRef = useRef(null)
  const currentTextureRef = useRef(null)
  const previousTextureRef = useRef(null)
  const transitionRef = useRef({ elapsed: 1 })

  useEffect(() => {
    const nextTexture = createScreenTexture(screenIndex)
    const screen = screenRef.current
    const reveal = revealRef.current
    if (!screen || !reveal) {
      nextTexture.dispose()
      return undefined
    }

    if (!currentTextureRef.current) {
      currentTextureRef.current = nextTexture
      screen.material.map = nextTexture
      screen.material.opacity = 1
      screen.material.needsUpdate = true
      reveal.visible = screenIndex !== 0
      reveal.scale.y = 1
      reveal.position.y = 0
      transitionRef.current.elapsed = screenIndex === 0 ? 1 : 0
      return undefined
    }

    previousTextureRef.current?.dispose()
    previousTextureRef.current = currentTextureRef.current
    previousScreenRef.current.material.map = previousTextureRef.current
    previousScreenRef.current.material.opacity = 1
    previousScreenRef.current.material.needsUpdate = true
    currentTextureRef.current = nextTexture
    screen.material.map = nextTexture
    screen.material.opacity = 0
    screen.material.needsUpdate = true
    reveal.visible = true
    reveal.scale.y = 1
    reveal.position.y = 0
    transitionRef.current.elapsed = 0
    return undefined
  }, [screenIndex])

  useEffect(() => () => {
    currentTextureRef.current?.dispose()
    previousTextureRef.current?.dispose()
  }, [])

  useFrame((_, delta) => {
    const screen = screenRef.current
    const reveal = revealRef.current
    if (!screen || !reveal || transitionRef.current.elapsed >= 1) return

    transitionRef.current.elapsed = Math.min(1, transitionRef.current.elapsed + delta / 0.85)
    const progress = transitionRef.current.elapsed
    screen.material.opacity = Math.min(1, progress * 2.6)
    if (previousScreenRef.current) previousScreenRef.current.material.opacity = 1 - progress
    const remainingHeight = Math.max(0, 1 - progress)
    reveal.scale.y = remainingHeight
    reveal.position.y = -height / 2 + (remainingHeight * height) / 2

    if (progress === 1) {
      reveal.visible = false
      previousTextureRef.current?.dispose()
      previousTextureRef.current = null
      if (previousScreenRef.current) {
        previousScreenRef.current.material.map = null
        previousScreenRef.current.material.opacity = 0
      }
    }
  })

  return (
    <group>
      <mesh position={[0, 0, 0.004]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.055} depthWrite={false} />
      </mesh>
      <mesh ref={previousScreenRef} position={[0, 0, 0.005]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.006]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <mesh
        ref={revealRef}
        position={[0, 0, 0.008]}
        visible={false}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#080b16" depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.035} depthWrite={false} />
      </mesh>
    </group>
  )
}

function FloatingInfoChip({ label, position, index, visible }) {
  const groupRef = useRef(null)
  const { viewport } = useThree()
  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const mobile = viewport.width < 6.8
    const targetOpacity = mobile ? (index < 2 ? 0.88 : 0) : visible ? 0.88 : 0
    groupRef.current.visible = true
    groupRef.current.position.x = position[0] + pointer.x * 0.08
    groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.7 + index) * 0.055 + pointer.y * 0.06
    groupRef.current.traverse((child) => {
      if (child.material?.transparent) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.08)
      }
    })
  })

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox args={[1.38, 0.38, 0.06]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#15142b"
          emissive="#5634a0"
          emissiveIntensity={0.38}
          transparent
          opacity={0}
          roughness={0.25}
        />
      </RoundedBox>
      <Text position={[0, 0, 0.045]} fontSize={0.105} color="#e9ddff" anchorX="center" anchorY="middle" maxWidth={1.3}>
        {label}
      </Text>
    </group>
  )
}

function InfoChips({ stageIndex }) {
  const labels = [
    siteData.duration,
    siteData.demoChipText,
    THREE_CONFIG.laptop.chipLabels[0],
    THREE_CONFIG.laptop.chipLabels[1],
  ]
  const positions = [[-2.35, 1.15, 0.15], [2.25, 1.42, 0.1], [-2.45, -0.6, 0.1], [2.3, -0.65, 0.1]]
  return labels.map((label, index) => (
    <FloatingInfoChip
      key={label}
      label={label}
      position={positions[index]}
      index={index}
      visible={stageIndex >= 0 && ((stageIndex + index) % 2 === 0)}
    />
  ))
}

export function LaptopModel({ scrollProgressRef, onStageChange }) {
  const laptopGroupRef = useRef(null)
  const hingeGroupRef = useRef(null)
  const currentStageIndexRef = useRef(-1)
  const screenIndexRef = useRef(-1)
  const [screenIndex, setScreenIndex] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const keyboardTexture = useMemo(() => createKeyboardTexture(), [])
  const logoTexture = useMemo(() => createLogoTexture(), [])
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: THREE_CONFIG.colors.laptopBody,
    metalness: THREE_CONFIG.colors.laptopMetallic,
    roughness: THREE_CONFIG.colors.laptopRoughness,
  }), [])
  const edgeMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: THREE_CONFIG.colors.neonEdgePurple }), [])
  const trackpadMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: THREE_CONFIG.colors.trackpad,
    metalness: 0.5,
    roughness: 0.4,
  }), [])
  const { baseWidth, baseDepth, baseHeight, lidWidth, lidDepth, lidHeight, screenWidth, screenHeight, trackpadWidth, trackpadDepth } =
    THREE_CONFIG.dimensions
  const screenStages = THREE_CONFIG.laptop.screens

  useEffect(() => () => {
    keyboardTexture.dispose()
    logoTexture.dispose()
    bodyMaterial.dispose()
    edgeMaterial.dispose()
    trackpadMaterial.dispose()
  }, [bodyMaterial, edgeMaterial, keyboardTexture, logoTexture, trackpadMaterial])

  useFrame((state, delta) => {
    const progress = scrollProgressRef?.current || 0
    const screenIndex = progress < FULL_PROGRESS[0]
      ? 0
      : Math.min(SCREEN_COUNT, 1 + Math.floor((progress - FULL_PROGRESS[0]) / ((1 - FULL_PROGRESS[0]) / SCREEN_COUNT)))
    const normalizedIndex = Math.min(SCREEN_COUNT, screenIndex)
    const activeStage = Math.min(SCREEN_COUNT - 1, Math.max(0, normalizedIndex - 1))

    if (screenIndexRef.current !== normalizedIndex) {
      screenIndexRef.current = normalizedIndex
      setScreenIndex(normalizedIndex)
    }
    if (currentStageIndexRef.current !== activeStage) {
      currentStageIndexRef.current = activeStage
      setStageIndex(activeStage)
      onStageChange?.(activeStage)
    }

    const bootTarget = THREE_CONFIG.laptop.bootTransform
    const screenTarget = screenStages[activeStage].transform
    const from = normalizedIndex === 0 ? bootTarget : screenTarget
    const nextScreenIndex = Math.min(SCREEN_COUNT - 1, activeStage + 1)
    const to = normalizedIndex === 0 ? screenStages[0].transform : screenStages[nextScreenIndex].transform
    const localStart = normalizedIndex === 0 ? 0 : FULL_PROGRESS[0] + ((normalizedIndex - 1) * (1 - FULL_PROGRESS[0])) / SCREEN_COUNT
    const localSpan = normalizedIndex === 0 ? FULL_PROGRESS[0] : (1 - FULL_PROGRESS[0]) / SCREEN_COUNT
    const localT = THREE.MathUtils.clamp((progress - localStart) / localSpan, 0, 1)
    const smoothT = localT * localT * (3 - 2 * localT)
    const target = {}
    for (const key of ['rotX', 'rotY', 'rotZ', 'lidAngle', 'camZ', 'camY']) {
      target[key] = THREE.MathUtils.lerp(from[key], to[key], smoothT)
    }

    const damping = Math.min(delta * 5, 0.22)
    if (laptopGroupRef.current) {
      laptopGroupRef.current.rotation.x = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.x, target.rotX, damping)
      laptopGroupRef.current.rotation.y = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.y, target.rotY, damping)
      laptopGroupRef.current.rotation.z = THREE.MathUtils.lerp(laptopGroupRef.current.rotation.z, target.rotZ, damping)
    }
    if (hingeGroupRef.current) {
      hingeGroupRef.current.rotation.x = THREE.MathUtils.lerp(hingeGroupRef.current.rotation.x, target.lidAngle, damping)
    }
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, target.camZ, damping)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, target.camY, damping)
    state.camera.lookAt(0, 0.4, 0)
  })

  return (
    <group ref={laptopGroupRef}>
      <group position={[0, baseHeight / 2, 0]}>
        <RoundedBox args={[baseWidth, baseHeight, baseDepth]} radius={0.03} smoothness={4} material={bodyMaterial} />
        <mesh position={[0, -baseHeight / 2 + 0.005, 0]}>
          <boxGeometry args={[baseWidth * 1.008, 0.012, baseDepth * 1.008]} />
          <primitive object={edgeMaterial} />
        </mesh>
        <mesh position={[0, baseHeight / 2 + 0.001, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.7, 1.2]} />
          <meshBasicMaterial map={keyboardTexture} />
        </mesh>
        <mesh position={[0, baseHeight / 2 + 0.002, 0.62]}>
          <boxGeometry args={[trackpadWidth, 0.005, trackpadDepth]} />
          <primitive object={trackpadMaterial} />
        </mesh>
      </group>

      <group ref={hingeGroupRef} position={[0, baseHeight, -baseDepth / 2 + 0.05]}>
        <group position={[0, lidDepth / 2, 0]}>
          <RoundedBox args={[lidWidth, lidDepth, lidHeight]} radius={0.03} smoothness={4} material={bodyMaterial} />
          <mesh position={[0, 0, -lidHeight / 2 - 0.003]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.25, 0.78]} />
            <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, lidHeight / 2 + 0.001]}>
            <planeGeometry args={[screenWidth + 0.09, screenHeight + 0.08]} />
            <meshBasicMaterial color={THREE_CONFIG.colors.screenBezel} />
          </mesh>
          <ScreenDisplay screenIndex={screenIndex} width={screenWidth} height={screenHeight} />
        </group>
      </group>

      <InfoChips stageIndex={stageIndex} />
    </group>
  )
}

export default LaptopModel
