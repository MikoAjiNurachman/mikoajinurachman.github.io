import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "../styles/globals.css" // Changed to match local style path preference

// Inter is the spec-recommended substitute for SF Pro (Apple proprietary).
// Loading 300/400/600 to match the Apple type ladder (no 500 — deliberately
// absent in the Apple system).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "MIKO AJI | AI Native Engineer",
  description:
    "AI Native Engineer with 6+ years experience in Banking Middleware (IBM ACE/MQ), Go (Golang), and React. Building high-performance mission-critical systems.",
  generator: "Next.js",
  keywords: ["AI Native Engineer", "Middleware Engineer", "IBM ACE", "IBM MQ", "Golang", "Go Developer", "Banking Systems", "Microservices", "React"],
  authors: [{ name: "Miko Aji Nurachman" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
