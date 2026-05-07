"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"

const PALETTE = ["#7ad7ff", "#a8e6ff", "#4facfe", "#5b8bff"]

function EnergyDust({ count = 350 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = PALETTE.map((c) => new THREE.Color(c))

    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 16
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.025
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.12
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.9}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingShard({
  position,
  color,
  scale = 0.6,
  speed = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.3
    ref.current.rotation.y = t * 0.5
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Toon body */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshToonMaterial color={color} />
      </mesh>
      {/* Outline (back-faces, slightly larger) — anime cel-shading look */}
      <mesh scale={1.06}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#0a0a1a" side={THREE.BackSide} />
      </mesh>
      {/* Soft glow halo */}
      <mesh scale={1.6}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </group>
  )
}

function GradientRamp() {
  return null
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#bfe6ff" />
      <directionalLight position={[-5, -3, 4]} intensity={0.6} color="#5b8bff" />

      <EnergyDust count={400} />

      <FloatingShard position={[-7, 2, -5]} color="#7ad7ff" scale={0.9} speed={0.6} />
      <FloatingShard position={[7, -1, -4]} color="#4facfe" scale={0.8} speed={-0.7} />
      <FloatingShard position={[0, -4, -7]} color="#5b8bff" scale={1.1} speed={0.5} />
      <FloatingShard position={[5, 4, -6]} color="#a8e6ff" scale={0.6} speed={-0.8} />
      <FloatingShard position={[-6, -3, -3]} color="#7ad7ff" scale={0.5} speed={0.9} />

      <Sparkles count={70} scale={[20, 12, 20]} size={4} speed={0.4} color="#bfe6ff" opacity={0.6} />

      <GradientRamp />
    </>
  )
}

export function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Aurora wash + grid */}
      <div className="absolute inset-0 aurora animate-aurora" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.07_0.04_265/0.7)_100%)]" />
    </div>
  )
}
