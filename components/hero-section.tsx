"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Center, Environment, Stars } from "@react-three/drei"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function FloatingCode() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Center>
        <group ref={groupRef}>
          {/* Left bracket < - two bars meeting at a point on the right */}
          <mesh position={[-0.75, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#4fd1c5" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-0.75, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#4fd1c5" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Forward slash / - diagonal line in center */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 5]}>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color="#4fd1c5" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Right bracket > - two bars meeting at a point on the left */}
          <mesh position={[0.75, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#4fd1c5" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.75, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#4fd1c5" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </Center>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingCode />
      <Environment preset="night" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 sm:px-4 z-10">
          <div className="mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/50 shadow-lg shadow-primary/20">
              <img
                src="/professional-portrait-asian-male-software-engineer.jpg"
                alt="Miko Aji Nurachman"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-primary font-mono text-xs sm:text-sm mb-2 tracking-wider">Hello, I'm</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 text-foreground">
            <span className="text-balance">Miko Aji</span>
            <br />
            <span className="text-primary">Nurachman</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-pretty px-4">
            Software Engineer specializing in <span className="text-primary font-semibold">Go</span> &{" "}
            <span className="text-primary font-semibold">React</span>
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <a
              href="https://github.com/mikoajinurachman"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/miko-nurachman-9927a4369/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="mailto:mikoajin14@gmail.com"
              className="p-2.5 sm:p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>

          <a
            href="#about"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
          >
            <span className="text-xs sm:text-sm">Scroll Down</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
