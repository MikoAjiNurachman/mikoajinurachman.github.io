"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type * as THREE from "three"
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

function GlassCore() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
    ref.current.rotation.x = state.clock.elapsedTime * 0.15
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.3}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1}
          roughness={0.15}
          chromaticAberration={0.05}
          distortion={0.2}
          temporalDistortion={0.1}
          ior={1.35}
          color="#d4c1ff"
          transmission={1}
        />
      </mesh>
    </Float>
  )
}

function OrbitNode({
  radius,
  speed,
  color,
  yOffset,
  scale = 0.22,
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
    <mesh ref={ref} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        metalness={0.2}
        roughness={0.25}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

function SkillsScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 4]} intensity={0.8} color="#e7d9ff" />
      <pointLight position={[-4, -2, 3]} color="#a6e3e9" intensity={1} />
      <pointLight position={[4, 2, -3]} color="#ffd6c2" intensity={0.8} />
      <GlassCore />
      <OrbitNode radius={2.6} speed={0.5} color="#c8b6ff" yOffset={0.6} />
      <OrbitNode radius={2.6} speed={-0.6} color="#a6e3e9" yOffset={-0.5} scale={0.18} />
      <OrbitNode radius={2.4} speed={0.4} color="#ffd6c2" yOffset={0.0} scale={0.2} />
      <OrbitNode radius={2.8} speed={-0.3} color="#bde0fe" yOffset={-0.9} scale={0.16} />
      <Environment preset="dawn" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  )
}

export function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <section id="skills" className="py-28 sm:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight"
          >
            Technical <span className="text-gradient italic font-light">arsenal</span>
          </motion.h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto" />
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
                className="p-6 rounded-3xl glass gradient-border hover:bg-foreground/5 transition-colors"
              >
                <h3 className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-6 flex items-center justify-between">
                  {category}
                  <span className="w-8 h-px bg-gradient-to-r from-primary/60 to-transparent" />
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
                      <div className="h-1.5 w-full bg-foreground/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-tertiary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Visualization */}
          <motion.div
            className="h-[400px] lg:h-full min-h-[500px] relative order-2 hidden lg:block rounded-3xl overflow-hidden glass gradient-border"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.80_0.14_295/0.12)_0%,transparent_70%)]" />
            <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 1.6]}>
              <Suspense fallback={null}>
                <SkillsScene />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
