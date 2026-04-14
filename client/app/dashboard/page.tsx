"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { 
  Flame, 
  Zap, 
  Trophy, 
  TrendingUp,
  Target,
  Clock,
  Calendar,
  Star
} from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts"

const skillData = [
  { subject: "Data Structures", value: 85, fullMark: 100 },
  { subject: "Algorithms", value: 70, fullMark: 100 },
  { subject: "System Design", value: 55, fullMark: 100 },
  { subject: "Databases", value: 78, fullMark: 100 },
  { subject: "Networking", value: 65, fullMark: 100 },
  { subject: "Security", value: 45, fullMark: 100 },
]

const heatmapData = [
  [3, 2, 4, 1, 3, 5, 2],
  [4, 3, 2, 5, 4, 3, 1],
  [2, 5, 3, 4, 2, 4, 3],
  [5, 4, 5, 3, 5, 2, 4],
]

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first module", icon: Star, unlocked: true },
  { id: 2, title: "Week Warrior", description: "7-day learning streak", icon: Flame, unlocked: true },
  { id: 3, title: "Knowledge Seeker", description: "Complete 10 modules", icon: Trophy, unlocked: true },
  { id: 4, title: "Speed Demon", description: "Complete a module in under 30 min", icon: Zap, unlocked: false },
  { id: 5, title: "Perfectionist", description: "Score 100% on any quiz", icon: Target, unlocked: false },
  { id: 6, title: "Night Owl", description: "Study past midnight", icon: Clock, unlocked: true },
]

const recentActivity = [
  { id: 1, action: "Completed", item: "Binary Search Trees", xp: 150, time: "2 hours ago" },
  { id: 2, action: "Started", item: "Graph Algorithms", xp: 0, time: "3 hours ago" },
  { id: 3, action: "Achieved", item: "Week Warrior Badge", xp: 500, time: "1 day ago" },
  { id: 4, action: "Completed", item: "Hash Tables Quiz", xp: 200, time: "1 day ago" },
]

export default function DashboardPage() {
  const currentStreak = 14
  const currentLevel = 12
  const currentXP = 2450
  const nextLevelXP = 3000
  const xpProgress = (currentXP / nextLevelXP) * 100

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />
      
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Stats Vault
          </h1>
          <p className="text-muted-foreground">
            Track your progress and achievements
          </p>
        </motion.div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Streak Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-1"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/10 via-transparent to-[#FF0055]/10" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Current Streak</h3>
                <motion.div 
                  className="heat-shimmer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#FF0055] glow-orange pulse-glow">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="text-7xl md:text-8xl font-bold gradient-text-streak mb-2"
                >
                  {currentStreak}
                </motion.div>
                <p className="text-muted-foreground">days in a row</p>
              </div>

              {/* Mini heatmap */}
              <div className="mt-6">
                <p className="text-xs text-muted-foreground mb-3">7-Day Activity</p>
                <div className="flex gap-1">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const intensity = heatmapData[3][i]
                    return (
                      <motion.div
                        key={day}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex-1 text-center"
                      >
                        <div 
                          className="h-8 rounded-md mb-1 heat-shimmer cursor-pointer transition-transform hover:scale-110"
                          style={{
                            background: `rgba(255, 77, 0, ${intensity * 0.2})`,
                            border: `1px solid rgba(255, 77, 0, ${intensity * 0.3})`
                          }}
                        />
                        <span className="text-xs text-muted-foreground">{day[0]}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* XP Level-Up Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#06B6D4]/10" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Experience Level</h3>
                <div className="p-2 rounded-lg bg-[#8B5CF6]/20">
                  <Zap className="w-5 h-5 text-[#8B5CF6]" />
                </div>
              </div>

              <div className="flex items-end justify-between mb-4">
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-5xl font-bold gradient-text-cyber"
                  >
                    {currentLevel}
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#06B6D4]">{currentXP}</div>
                  <p className="text-xs text-muted-foreground">/ {nextLevelXP} XP</p>
                </div>
              </div>

              {/* Liquid fill progress bar */}
              <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full rounded-full liquid-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
              </div>
              
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {nextLevelXP - currentXP} XP to Level {currentLevel + 1}
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#10B981]/20">
                    <Trophy className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <span className="text-sm text-muted-foreground">Modules Completed</span>
                </div>
                <span className="text-lg font-bold text-[#10B981]">24</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#06B6D4]/20">
                    <Clock className="w-4 h-4 text-[#06B6D4]" />
                  </div>
                  <span className="text-sm text-muted-foreground">Total Study Time</span>
                </div>
                <span className="text-lg font-bold text-[#06B6D4]">42h</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#F59E0B]/20">
                    <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <span className="text-sm text-muted-foreground">Avg. Quiz Score</span>
                </div>
                <span className="text-lg font-bold text-[#F59E0B]">87%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skill Spider Chart & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Skill Spider Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Skill Proficiency</h3>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Learning Heatmap</h3>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last 4 weeks</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex gap-2">
                  <span className="text-xs text-muted-foreground w-12">
                    Week {4 - weekIndex}
                  </span>
                  <div className="flex gap-1 flex-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={dayIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + (weekIndex * 7 + dayIndex) * 0.02 }}
                        className="flex-1 h-10 rounded-md heat-shimmer cursor-pointer transition-transform hover:scale-110"
                        style={{
                          background: `rgba(255, 77, 0, ${day * 0.2})`,
                          border: `1px solid rgba(255, 77, 0, ${day * 0.3})`
                        }}
                        title={`${day} sessions`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-xs text-muted-foreground">Less</span>
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className="w-4 h-4 rounded-sm"
                    style={{
                      background: `rgba(255, 77, 0, ${level * 0.2})`,
                      border: `1px solid rgba(255, 77, 0, ${level * 0.3})`
                    }}
                  />
                ))}
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Achievements</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`relative p-4 rounded-xl text-center transition-all ${
                    achievement.unlocked 
                      ? "bg-[#F59E0B]/10 border border-[#F59E0B]/20 cursor-pointer hover:bg-[#F59E0B]/20" 
                      : "bg-white/5 border border-white/10 opacity-50"
                  }`}
                  whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
                >
                  <div className={`inline-flex p-3 rounded-full mb-3 ${
                    achievement.unlocked ? "bg-[#F59E0B]/20" : "bg-white/10"
                  }`}>
                    <achievement.icon className={`w-6 h-6 ${
                      achievement.unlocked ? "text-[#F59E0B]" : "text-muted-foreground"
                    }`} />
                  </div>
                  <h4 className={`text-sm font-medium mb-1 ${
                    achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {achievement.description}
                  </p>
                  
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0E14]/60 rounded-xl">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      activity.action === "Completed" 
                        ? "bg-[#10B981]/20" 
                        : activity.action === "Achieved"
                          ? "bg-[#F59E0B]/20"
                          : "bg-[#8B5CF6]/20"
                    }`}>
                      {activity.action === "Completed" ? (
                        <Trophy className="w-4 h-4 text-[#10B981]" />
                      ) : activity.action === "Achieved" ? (
                        <Star className="w-4 h-4 text-[#F59E0B]" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{activity.action}</span>
                        <span className="text-sm font-medium text-foreground">{activity.item}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                  {activity.xp > 0 && (
                    <span className="text-sm font-medium text-[#10B981]">+{activity.xp} XP</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </main>
  )
}
