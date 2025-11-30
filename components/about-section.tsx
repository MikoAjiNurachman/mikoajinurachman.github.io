"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#4fd1c5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 3D Element - hidden on small screens */}
          <div className="h-[250px] sm:h-[300px] md:h-[400px] relative order-2 md:order-1 hidden sm:block">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <AnimatedSphere />
              </Suspense>
            </Canvas>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <div className="h-1 w-20 bg-primary mb-6 sm:mb-8 rounded-full" />

            <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                I am a seasoned Software Engineer with over{" "}
                <span className="text-foreground font-semibold">4 years of experience</span> in developing robust
                software solutions. My expertise spans across a diverse range of technologies, including{" "}
                <span className="text-primary font-semibold">Go (Golang)</span>,{" "}
                <span className="text-primary font-semibold">React.js</span>, and{" "}
                <span className="text-primary font-semibold">Docker</span>.
              </p>

              <p>
                I am also well-versed in container orchestration tools such as{" "}
                <span className="text-primary font-semibold">Kubernetes</span>, which allows me to build scalable and
                efficient applications.
              </p>

              <p>
                My technical skill set includes working with{" "}
                <span className="text-foreground font-semibold">Redis, Elasticsearch, and RabbitMQ</span> to enhance
                system performance and reliability. Additionally, I have a strong background in using PostgreSQL for
                database management and developing Android applications with Kotlin and Jetpack Compose.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl sm:text-3xl font-bold text-primary">4+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl sm:text-3xl font-bold text-primary">10+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
