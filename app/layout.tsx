import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../styles/globals.css" // Changed to match local style path preference

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MIKO AJI | Systems Architect & Middleware Engineer",
  description:
    "Expert Software Engineer with 6+ years experience in Banking Middleware (IBM ACE/MQ), Go (Golang), and React. Building high-performance mission-critical systems.",
  generator: "Next.js",
  keywords: ["Systems Architect", "Middleware Engineer", "IBM ACE", "IBM MQ", "Golang", "Go Developer", "Banking Systems", "Microservices", "React"],
  authors: [{ name: "Miko Aji Nurachman" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1830",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background selection:bg-primary/40 selection:text-foreground`}>
        {children}
      </body>
    </html>
  )
}
