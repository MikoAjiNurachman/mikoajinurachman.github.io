import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Miko Aji Nurachman - Software Engineer",
  description:
    "Software Engineer specializing in Go, React, and Cloud Technologies. 4+ years of experience building scalable applications.",
  generator: "Next.js",
  keywords: ["Software Engineer", "Golang", "React", "Kubernetes", "Docker", "Full Stack Developer"],
  authors: [{ name: "Miko Aji Nurachman" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
