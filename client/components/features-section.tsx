"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Flame, 
  Trophy, 
  LineChart, 
  Sparkles
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Generate personalized courses instantly using AI.",
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#06B6D4]"
  },
  {
    icon: Flame,
    title: "Streak Tracking",
    description: "Maintain daily learning streaks and stay consistent.",
    color: "#FF4D00",
    gradient: "from-[#FF4D00] to-[#FF0055]"
  },
  {
    icon: Trophy,
    title: "XP & Level System",
    description: "Earn XP and level up as you complete lessons and quizzes.",
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#FF4D00]"
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Track your learning progress and performance.",
    color: "#06B6D4",
    gradient: "from-[#06B6D4] to-[#10B981]"
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get AI-based recommendations for what to learn next.",
    color: "#FF0055",
    gradient: "from-[#FF0055] to-[#8B5CF6]"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export function FeaturesSection() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-sm font-medium text-[#8B5CF6]">
            Features
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Learn Smarter with PrepWise
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          AI-powered learning platform designed to make your journey faster and engaging.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="glass-card p-6"
          >
            <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${feature.gradient}`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {feature.title}
            </h3>

            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}