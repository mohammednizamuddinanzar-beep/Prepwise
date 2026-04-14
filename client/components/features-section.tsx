"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Flame, 
  Trophy, 
  LineChart, 
  Sparkles,
  Users
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized content adapted to your learning style and pace. Our AI understands how you learn best.",
    color: "#8B5CF6",
    gradient: "from-[#8B5CF6] to-[#06B6D4]"
  },
  {
    icon: Flame,
    title: "Streak Tracking",
    description: "Build consistency with daily streaks. Watch your flame grow as you maintain your learning momentum.",
    color: "#FF4D00",
    gradient: "from-[#FF4D00] to-[#FF0055]"
  },
  {
    icon: Trophy,
    title: "Achievements & XP",
    description: "Earn experience points and unlock achievements as you progress through your learning journey.",
    color: "#F59E0B",
    gradient: "from-[#F59E0B] to-[#FF4D00]"
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    description: "Track your growth with detailed analytics. Visualize your skills with radar charts and heatmaps.",
    color: "#06B6D4",
    gradient: "from-[#06B6D4] to-[#10B981]"
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Get course recommendations based on your goals, current skills, and learning history.",
    color: "#FF0055",
    gradient: "from-[#FF0055] to-[#8B5CF6]"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Learn alongside thousands of engineers. Share knowledge, compete on leaderboards, and grow together.",
    color: "#10B981",
    gradient: "from-[#10B981] to-[#06B6D4]"
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
      duration: 0.5,
      ease: "easeOut"
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
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-sm font-medium text-[#8B5CF6]">
            Powerful Features
          </span>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
          Everything You Need to
          <br />
          <span className="gradient-text-cyber">Excel in Engineering</span>
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Built by engineers, for engineers. Every feature is designed to accelerate 
          your learning and help you achieve mastery.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className="glass-card p-6 h-full transition-all duration-300 hover:border-white/10">
              {/* Gradient background on hover */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}08 0%, transparent 50%)`
                }}
              />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${feature.gradient}`}
                  style={{
                    boxShadow: `0 0 20px ${feature.color}30`
                  }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <motion.div
                  className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: feature.color }}
                  whileHover={{ x: 4 }}
                >
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
