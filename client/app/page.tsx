"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { useAuthGuard } from "@/hooks/useAuthGuard"

export default function HomePage() {
  const { isAuthed } = useAuthGuard()

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen relative bg-[#0B0E14]">
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  )
}