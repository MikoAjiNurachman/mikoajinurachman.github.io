"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei"
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react"
import { Suspense, useRef } from "react"
import type * as THREE from "three"
import { motion } from "framer-motion"

function GlassCrystal() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.25
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.4}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={1.2}
          roughness={0.1}
          chromaticAberration={0.04}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.15}
          ior={1.4}
          color="#e7d9ff"
          transmission={1}
        />
      </mesh>
    </Float>
  )
}

function OrbitingShard({
  radius,
  speed,
  color,
  yOffset = 0,
  scale = 0.18,
}: {
  radius: number
  speed: number
  color: string
  yOffset?: number
  scale?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = yOffset + Math.sin(t * 1.5) * 0.2
    ref.current.rotation.y = t
    ref.current.rotation.x = t * 0.6
  })
  return (
    <mesh ref={ref} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.2}
        roughness={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function SoftRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[2.4, 0.012, 16, 120]} />
      <meshBasicMaterial color="#c8b6ff" transparent opacity={0.35} />
    </mesh>
  )
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e7d9ff" />
      <pointLight position={[-5, -3, 4]} intensity={1} color="#a6e3e9" />
      <pointLight position={[5, 3, -4]} intensity={0.8} color="#ffd6c2" />
      <GlassCrystal />
      <SoftRing />
      <OrbitingShard radius={2.4} speed={0.6} color="#c8b6ff" yOffset={0.1} />
      <OrbitingShard radius={2.6} speed={-0.4} color="#a6e3e9" yOffset={-0.3} scale={0.14} />
      <OrbitingShard radius={2.2} speed={0.5} color="#ffd6c2" yOffset={0.4} scale={0.16} />
      <Environment preset="dawn" />
    </>
  )
}

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden grain"
    >
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.6]}>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Soft aurora wash */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.16_0.04_275/0.7)_100%)]" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary/40 via-accent/30 to-tertiary/40 blur-xl opacity-70 animate-aurora" />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden gradient-border bg-card/40 backdrop-blur-md">
              <img
                src="/professional-portrait-asian-male-software-engineer.jpg"
                alt="Miko Aji Nurachman"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs font-medium tracking-[0.25em] uppercase text-primary/90"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Software Engineer
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-semibold mb-6 tracking-tight leading-[1.05]"
        >
          <span className="text-foreground/95">Miko Aji</span>
          <br />
          <span className="text-gradient">Nurachman</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-foreground/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Crafting calm, resilient systems with{" "}
          <span className="text-primary font-medium">Go</span>,{" "}
          <span className="text-accent font-medium">React</span>, and{" "}
          <span className="text-foreground/90 underline decoration-primary/40 underline-offset-4">
            Enterprise Middleware
          </span>{" "}
          for banking platforms.
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-14">
          {[
            { icon: Github, href: "https://github.com/mikoajinurachman", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/miko-nurachman-9927a4369/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:mikoajin14@gmail.com", label: "Email" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl glass hover:bg-primary/15 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-foreground/60 hover:text-primary transition-colors group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Discover</span>
            <div className="p-2 rounded-full glass animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
