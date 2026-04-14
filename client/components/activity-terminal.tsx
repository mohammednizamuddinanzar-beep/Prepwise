"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Terminal, 
  CheckCircle2, 
  Trophy, 
  Flame, 
  Zap,
  Clock,
  User
} from "lucide-react"

interface Activity {
  id: number
  type: "completion" | "streak" | "level_up" | "achievement"
  user: string
  message: string
  timestamp: string
  xp?: number
}

const initialActivities: Activity[] = [
  {
    id: 1,
    type: "completion",
    user: "alex_dev",
    message: "completed Database Indexing module",
    timestamp: "2m ago",
    xp: 150
  },
  {
    id: 2,
    type: "streak",
    user: "sarah_codes",
    message: "achieved 30-day learning streak!",
    timestamp: "5m ago"
  },
  {
    id: 3,
    type: "level_up",
    user: "mike_engineer",
    message: "reached Level 15",
    timestamp: "8m ago",
    xp: 500
  },
  {
    id: 4,
    type: "achievement",
    user: "priya_dev",
    message: "unlocked \"Memory Master\" badge",
    timestamp: "12m ago"
  },
  {
    id: 5,
    type: "completion",
    user: "james_sys",
    message: "completed OS Scheduling module",
    timestamp: "15m ago",
    xp: 200
  }
]

const newActivities: Activity[] = [
  {
    id: 100,
    type: "streak",
    user: "new_user_42",
    message: "started a new learning streak!",
    timestamp: "just now"
  },
  {
    id: 101,
    type: "completion",
    user: "tech_ninja",
    message: "completed Network Security module",
    timestamp: "just now",
    xp: 175
  },
  {
    id: 102,
    type: "level_up",
    user: "code_wizard",
    message: "reached Level 20",
    timestamp: "just now",
    xp: 750
  }
]

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "completion":
      return CheckCircle2
    case "streak":
      return Flame
    case "level_up":
      return Zap
    case "achievement":
      return Trophy
    default:
      return CheckCircle2
  }
}

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "completion":
      return "#10B981"
    case "streak":
      return "#FF4D00"
    case "level_up":
      return "#8B5CF6"
    case "achievement":
      return "#F59E0B"
    default:
      return "#06B6D4"
  }
}

export function ActivityTerminal() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [newActivityIndex, setNewActivityIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (newActivityIndex < newActivities.length) {
        const newActivity = {
          ...newActivities[newActivityIndex],
          id: Date.now()
        }
        setActivities(prev => [newActivity, ...prev.slice(0, 6)])
        setNewActivityIndex(prev => prev + 1)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [newActivityIndex])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="terminal-bg rounded-xl overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#FF4D00]/20 bg-black/40">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF0055]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="w-4 h-4 text-[#FF4D00]" />
          <span className="font-mono">global_activity.log</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto font-mono text-sm">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type)
            const color = getActivityColor(activity.type)
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 group"
              >
                {/* Timestamp */}
                <span className="text-[#06B6D4] min-w-[60px] text-xs mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.timestamp}
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="mt-0.5"
                >
                  <Icon 
                    className="w-4 h-4 heat-shimmer" 
                    style={{ color }}
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-[#8B5CF6] flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {activity.user}
                  </span>
                  <span className="text-muted-foreground mx-2">→</span>
                  <span className="text-foreground">{activity.message}</span>
                  {activity.xp && (
                    <motion.span 
                      className="ml-2 text-[#10B981]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      +{activity.xp} XP
                    </motion.span>
                  )}
                </div>

                {/* Decorative line */}
                <div 
                  className="w-1 h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <motion.div 
          className="flex items-center gap-2 text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-[#FF4D00]">$</span>
          <span>listening for new events</span>
          <span className="flex gap-1">
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >.</motion.span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
