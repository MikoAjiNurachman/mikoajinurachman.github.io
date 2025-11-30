"use client"

import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

const skills = {
  Languages: [
    { name: "Go", level: 90, icon: "🐹" },
    { name: "JavaScript", level: 85, icon: "JS" },
    { name: "TypeScript", level: 85, icon: "TS" },
    { name: "Kotlin", level: 70, icon: "K" },
    { name: "SQL", level: 80, icon: "DB" },
  ],
  Frontend: [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 80, icon: "N" },
    { name: "HTML/CSS", level: 85, icon: "🎨" },
    { name: "Tailwind CSS", level: 85, icon: "💨" },
  ],
  "Backend & DevOps": [
    { name: "Docker", level: 85, icon: "🐳" },
    { name: "Kubernetes", level: 80, icon: "☸️" },
    { name: "Redis", level: 85, icon: "⚡" },
    { name: "PostgreSQL", level: 85, icon: "🐘" },
    { name: "Elasticsearch", level: 75, icon: "🔍" },
    { name: "RabbitMQ", level: 75, icon: "🐰" },
  ],
}

function RotatingRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const points = 8
  return (
    <group ref={ref}>
      {Array.from({ length: points }).map((_, i) => {
        const angle = (i / points) * Math.PI * 2
        return (
          <Float key={i} speed={2} floatIntensity={0.5}>
            <mesh position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
              <boxGeometry args={[0.15, 0.15, 0.15]} />
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function CenterSphere() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#4fd1c5" metalness={0.8} roughness={0.2} wireframe />
      </mesh>
    </Float>
  )
}

function SkillsVisualization() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingRing radius={1.5} speed={0.3} color="#4fd1c5" />
      <RotatingRing radius={2.2} speed={-0.2} color="#38b2ac" />
      <RotatingRing radius={2.9} speed={0.15} color="#319795" />
      <CenterSphere />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Technical <span className="text-primary">Skills</span>
        </h2>
        <div className="h-1 w-20 bg-primary mb-8 sm:mb-12 rounded-full mx-auto" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 3D Visualization - hidden on small screens */}
          <div className="h-[250px] sm:h-[300px] lg:h-[400px] order-2 lg:order-1 hidden sm:block">
            <Canvas camera={{ position: [0, 0, 6] }}>
              <Suspense fallback={null}>
                <SkillsVisualization />
              </Suspense>
            </Canvas>
          </div>

          {/* Skills List */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">{category}</h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-foreground text-sm sm:text-base flex items-center gap-2">
                          <span className="text-xs sm:text-sm">{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground text-xs sm:text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
