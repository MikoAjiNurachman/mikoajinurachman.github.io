"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, Sparkles, Edges, Trail } from "@react-three/drei"
import { Suspense, useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

const skills = {
  Languages: [
    { name: "Go", level: 90, icon: "🐹" },
    { name: "TypeScript", level: 85, icon: "TS" },
    { name: "SQL", level: 85, icon: "DB" },
    { name: "Java", level: 75, icon: "☕" },
  ],
  Frontend: [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 80, icon: "N" },
    { name: "Tailwind CSS", level: 85, icon: "💨" },
    { name: "Framer Motion", level: 80, icon: "✨" },
  ],
  Infrastructure: [
    { name: "Docker", level: 85, icon: "🐳" },
    { name: "Kubernetes", level: 80, icon: "☸️" },
    { name: "Redis", level: 85, icon: "⚡" },
    { name: "PostgreSQL", level: 85, icon: "🐘" },
  ],
  Middleware: [
    { name: "IBM MQ", level: 80, icon: "📨" },
    { name: "IBM ACE", level: 75, icon: "🔗" },
    { name: "TCP/IP", level: 80, icon: "🌐" },
    { name: "RabbitMQ", level: 75, icon: "🐰" },
  ],
}

function ToonTorusKnot() {
  const inner = useRef<THREE.Mesh>(null)
  const outline = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (inner.current) {
      inner.current.rotation.x = t * 0.35
      inner.current.rotation.y = t * 0.5
    }
    if (outline.current) {
      outline.current.rotation.x = t * 0.35
      outline.current.rotation.y = t * 0.5
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
      <group>
        <mesh ref={outline} scale={1.04}>
          <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />
          <meshBasicMaterial color="#0a0a1a" side={THREE.BackSide} />
        </mesh>
        <mesh ref={inner}>
          <torusKnotGeometry args={[0.9, 0.28, 128, 16]} />
          <meshToonMaterial color="#7ad7ff" />
          <Edges threshold={20} color="#bfe6ff" />
        </mesh>
        {/* Glow */}
        <mesh scale={1.6}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshBasicMaterial color="#7ad7ff" transparent opacity={0.10} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  )
}

function OrbitNode({
  radius,
  speed,
  color,
  yOffset,
  scale = 0.18,
}: {
  radius: number
  speed: number
  color: string
  yOffset: number
  scale?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = yOffset
    ref.current.rotation.y = t
  })
  return (
    <Trail width={0.4} length={3} color={new THREE.Color(color)} attenuation={(t) => t * t}>
      <mesh ref={ref} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshToonMaterial color={color} />
      </mesh>
    </Trail>
  )
}

function SkillsScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#bfe6ff" />
      <pointLight position={[-5, -3, 4]} color="#ff6fbf" intensity={1.1} />
      <pointLight position={[5, 3, -4]} color="#ffe27a" intensity={0.7} />

      <ToonTorusKnot />

      <OrbitNode radius={2.6} speed={0.55} color="#7ad7ff" yOffset={0.6} />
      <OrbitNode radius={2.6} speed={-0.65} color="#ff6fbf" yOffset={-0.5} scale={0.16} />
      <OrbitNode radius={2.4} speed={0.4} color="#ffe27a" yOffset={0.0} scale={0.18} />
      <OrbitNode radius={2.8} speed={-0.3} color="#a98bff" yOffset={-0.9} scale={0.14} />

      <Sparkles count={70} scale={[7, 7, 7]} size={5} speed={0.5} color="#bfe6ff" opacity={0.85} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  )
}

export function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { y: 16, opacity: 0, scale: 0.96 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 220, damping: 22 },
    },
  }

  return (
    <section id="skills" className="py-28 sm:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass neon-border text-[10px] font-bold uppercase tracking-[0.28em] text-primary mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Loadout / 03
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
          >
            Technical <span className="text-anime italic font-light">arsenal</span>
          </motion.h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Skills Grid */}
          <motion.div
            className="grid sm:grid-cols-2 gap-5 order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(skills).map(([category, items]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl glass neon-border hover:neon-glow transition-shadow"
              >
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.28em] mb-6 flex items-center justify-between">
                  {category}
                  <span className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
                </h3>
                <div className="flex flex-col gap-4">
                  {items.map((skill) => (
                    <div key={skill.name} className="group flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-foreground/90 font-medium flex items-center gap-2">
                          <span className="text-base">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-foreground/40 font-mono">{skill.level}%</span>
                      </div>
                      <div className="relative h-1.5 w-full bg-foreground/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-tertiary relative overflow-hidden"
                        >
                          {/* shimmer */}
                          <span
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
                              backgroundSize: "200% 100%",
                              animation: "shimmer-x 2.4s linear infinite",
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D */}
          <motion.div
            className="h-[400px] lg:h-full min-h-[500px] relative order-2 hidden lg:block rounded-3xl overflow-hidden glass neon-border scanlines"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.78_0.18_220/0.15)_0%,transparent_70%)]" />
            <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 1.6]}>
              <Suspense fallback={null}>
                <SkillsScene />
              </Suspense>
            </Canvas>

            {/* HUD label */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-strong neon-border text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
              ◇ stack.core
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full glass-strong text-[10px] font-mono text-accent">
              v6.0
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
