"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Center, Environment, Stars } from "@react-three/drei"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { motion } from "framer-motion"

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
          {/* Left bracket < */}
          <mesh position={[-0.75, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#00f2fe" metalness={0.8} roughness={0.1} emissive="#00f2fe" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.75, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#00f2fe" metalness={0.8} roughness={0.1} emissive="#00f2fe" emissiveIntensity={0.5} />
          </mesh>

          {/* Forward slash / */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 5]}>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshStandardMaterial color="#4facfe" metalness={0.8} roughness={0.1} emissive="#4facfe" emissiveIntensity={0.5} />
          </mesh>

          {/* Right bracket > */}
          <mesh position={[0.75, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#00f2fe" metalness={0.8} roughness={0.1} emissive="#00f2fe" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.75, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, 0.45, 0.08]} />
            <meshStandardMaterial color="#00f2fe" metalness={0.8} roughness={0.1} emissive="#00f2fe" emissiveIntensity={0.5} />
          </mesh>
        </group>
      </Center>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#4facfe" intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <FloatingCode />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  }

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <motion.div 
        className="relative z-10 text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 hover:border-primary transition-colors duration-500">
              <img
                src="/professional-portrait-asian-male-software-engineer.jpg"
                alt="Miko Aji Nurachman"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110"
              />
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="text-primary font-mono text-sm mb-4 tracking-[0.3em] uppercase">
          Software Engineer
        </motion.p>
        
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-foreground">Miko Aji</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nurachman
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Specializing in <span className="text-primary font-medium">Go</span>, <span className="text-primary font-medium">React</span>, and <span className="text-foreground border-b border-primary/30">Enterprise Middleware</span> for Banking Systems.
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mb-16">
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
              className="p-4 rounded-full bg-secondary/50 backdrop-blur-md border border-white/5 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest font-medium opacity-50 group-hover:opacity-100 transition-opacity">Discover</span>
            <div className="p-2 rounded-full border border-muted-foreground/20 group-hover:border-primary/50 animate-bounce">
              <ChevronDown className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </motion.div>

      {/* Vignette & Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
    </section>
  )
}
