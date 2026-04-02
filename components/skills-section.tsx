"use client"

import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, MeshDistortMaterial, Icosahedron } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const skills = {
  "Languages": [
    { name: "Go", level: 90, icon: "🐹" },
    { name: "TypeScript", level: 85, icon: "TS" },
    { name: "SQL", level: 85, icon: "DB" },
    { name: "Java", level: 75, icon: "☕" },
  ],
  "Frontend": [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 80, icon: "N" },
    { name: "Tailwind CSS", level: 85, icon: "💨" },
    { name: "Framer Motion", level: 80, icon: "✨" },
  ],
  "Infrastructure": [
    { name: "Docker", level: 85, icon: "🐳" },
    { name: "Kubernetes", level: 80, icon: "☸️" },
    { name: "Redis", level: 85, icon: "⚡" },
    { name: "PostgreSQL", level: 85, icon: "🐘" },
  ],
  "Middleware": [
    { name: "IBM MQ", level: 80, icon: "📨" },
    { name: "IBM ACE", level: 75, icon: "🔗" },
    { name: "TCP/IP", level: 80, icon: "🌐" },
    { name: "RabbitMQ", level: 75, icon: "🐰" },
  ],
}

function CenterSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#00f2fe" 
          metalness={1} 
          roughness={0.1} 
          wireframe 
          emissive="#00f2fe"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function SkillsVisualization() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#4facfe" intensity={1} />
      <CenterSphere />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </>
  )
}

export function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 relative bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
          >
            Technical <span className="text-primary italic">Arsenal</span>
          </motion.h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Skills Grid */}
          <motion.div 
            className="grid sm:grid-cols-2 gap-6 order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Object.entries(skills).map(([category, items]) => (
              <motion.div 
                key={category} 
                variants={itemVariants}
                className="p-6 rounded-2xl bg-secondary/30 border border-white/5 backdrop-blur-sm shadow-xl"
              >
                <h3 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                  {category}
                  <span className="w-8 h-[1px] bg-primary/20" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <div 
                      key={skill.name}
                      className="group relative flex flex-col gap-1 w-full"
                    >
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-foreground font-medium flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground/50">{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${skill.level}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-gradient-to-r from-primary to-accent"
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
            className="h-[400px] lg:h-full relative order-2 hidden lg:block rounded-3xl overflow-hidden bg-secondary/10 border border-white/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.05)_0%,transparent_70%)]" />
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <SkillsVisualization />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
