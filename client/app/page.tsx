"use client"

import { Navigation } from "@/components/navigation"
import { NeuralNetworkBackground } from "@/components/neural-network-bg"
import { HeroSection } from "@/components/hero-section"
import { ActiveModules } from "@/components/active-modules"
import { ActivityTerminal } from "@/components/activity-terminal"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <NeuralNetworkBackground />
      <Navigation />
      
      <div className="relative z-10">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <ActiveModules />
          
          <FeaturesSection />
          
          <motion.section 
            className="py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Global Activity
                </h2>
                <p className="text-muted-foreground mt-1">
                  Real-time feed from the community
                </p>
              </div>
            </div>
            <ActivityTerminal />
          </motion.section>
        </div>
        
        <Footer />
      </div>
    </main>
  )
}
