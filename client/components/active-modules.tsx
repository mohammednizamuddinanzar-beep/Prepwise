"use client"

import { motion } from "framer-motion"
import { 
  Database, 
  Cpu, 
  Network, 
  Lock, 
  Layers,
  GitBranch,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const modules = [
  {
    id: 1,
    title: "Database Concurrency",
    description: "Master ACID properties, locks, and transactions",
    icon: Database,
    progress: 78,
    color: "#FF4D00",
    difficulty: "Advanced",
    estimatedTime: "2h 30m"
  },
  {
    id: 2,
    title: "OS Virtual Memory",
    description: "Page tables, TLBs, and memory management",
    icon: Cpu,
    progress: 45,
    color: "#8B5CF6",
    difficulty: "Intermediate",
    estimatedTime: "1h 45m"
  },
  {
    id: 3,
    title: "Network Protocols",
    description: "TCP/IP stack, HTTP/3, and WebSockets",
    icon: Network,
    progress: 92,
    color: "#06B6D4",
    difficulty: "Intermediate",
    estimatedTime: "3h 00m"
  },
  {
    id: 4,
    title: "Cryptography Basics",
    description: "Symmetric, asymmetric encryption & hashing",
    icon: Lock,
    progress: 30,
    color: "#10B981",
    difficulty: "Beginner",
    estimatedTime: "1h 15m"
  },
  {
    id: 5,
    title: "System Design",
    description: "Scalability patterns and distributed systems",
    icon: Layers,
    progress: 60,
    color: "#FF0055",
    difficulty: "Advanced",
    estimatedTime: "4h 00m"
  },
  {
    id: 6,
    title: "Version Control",
    description: "Git internals, branching strategies & workflows",
    icon: GitBranch,
    progress: 85,
    color: "#F59E0B",
    difficulty: "Beginner",
    estimatedTime: "45m"
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

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export function ActiveModules() {
  return (
    <section className="py-12">
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Active Modules
          </h2>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey
          </p>
        </div>
        <Link href="/learning">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {modules.map((module) => (
          <motion.div
            key={module.id}
            variants={cardVariants}
            whileHover={{ 
              y: -4, 
              transition: { duration: 0.2 } 
            }}
            className="group relative"
          >
            <div 
              className="glass-card p-5 h-full cursor-pointer transition-all duration-300 hover:border-white/10"
              style={{
                boxShadow: `0 0 0 0 ${module.color}00`,
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 30px ${module.color}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0 ${module.color}00`
              }}
            >
              {/* 3D-style depth effect */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${module.color}05 0%, transparent 50%)`
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${module.color}15` }}
                    whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                  >
                    <module.icon 
                      className="w-6 h-6" 
                      style={{ color: module.color }}
                    />
                  </motion.div>
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${module.color}15`,
                      color: module.color
                    }}
                  >
                    {module.difficulty}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span style={{ color: module.color }}>{module.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: module.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-muted-foreground">
                    {module.estimatedTime} remaining
                  </span>
                  <motion.div
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: module.color }}
                    whileHover={{ x: 4 }}
                  >
                    Continue
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
