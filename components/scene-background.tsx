"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const palette = [
      new THREE.Color("#c8b6ff"), // lavender
      new THREE.Color("#a6e3e9"), // aqua mint
      new THREE.Color("#ffd6c2"), // peach
      new THREE.Color("#bde0fe"), // baby blue
    ]

    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
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
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.85}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GlowOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      <mesh position={position} scale={scale * 0.6}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <Particles count={550} />
      <GlowOrb position={[-6, 2, -4]} color="#c8b6ff" scale={1.6} />
      <GlowOrb position={[6, -1, -3]} color="#a6e3e9" scale={1.4} />
      <GlowOrb position={[0, -4, -6]} color="#ffd6c2" scale={1.8} />
    </>
  )
}

export function SceneBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Soft aurora CSS layer */}
      <div className="absolute inset-0 aurora animate-aurora" />

      {/* 3D particles + glow orbs */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Vignette + grain over everything */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.10_0.04_275/0.6)_100%)]" />
    </div>
  )
}
