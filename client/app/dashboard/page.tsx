"use client"

import { Navigation } from "@/components/navigation"
import axios from "axios"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, Shield, Flame } from "lucide-react"
import { useAuthGuard } from "@/hooks/useAuthGuard"

interface UserData {
  name: string
  email: string
  xp: number
  level: number
  streak: number
}

export default function DashboardPage() {
  const { isAuthed } = useAuthGuard()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthed) return

    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) return
        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`)
        setUser(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [isAuthed])

  if (!isAuthed || loading) {
    return (
      <main className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <Navigation />
        <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
      </main>
    )
  }

  const xpToNextLevel = 100 - (user ? user.xp % 100 : 0)
  const xpProgress = user ? user.xp % 100 : 0

  return (
    <main className="min-h-screen bg-[#0B0E14] pb-12">
      <Navigation />

      <div className="pt-28 px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Stats Vault</h1>
          <p className="text-gray-400 mb-10">Your learning progress at a glance.</p>

          {!user ? (
            <div className="text-center py-16 text-gray-400">
              Could not load dashboard data.
            </div>
          ) : (
            <>
              {/* Identity Card */}
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 mb-8 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#FF0055] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Level</span>
                  <p className="text-3xl font-black text-purple-400">{user.level}</p>
                </div>
              </div>

              {/* XP Progress */}
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">XP Progress to Level {user.level + 1}</span>
                  <span className="text-sm text-orange-400 font-semibold">{user.xp} XP total</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF0055] transition-all"
                    style={{ width: `${Math.min(xpProgress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">{xpToNextLevel} XP needed for next level</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard
                  icon={<Zap className="w-6 h-6 text-orange-400" />}
                  label="Total XP"
                  value={user.xp.toString()}
                  color="text-orange-400"
                  bg="from-orange-500/10 to-transparent"
                />
                <StatCard
                  icon={<Shield className="w-6 h-6 text-purple-400" />}
                  label="Current Level"
                  value={user.level.toString()}
                  color="text-purple-400"
                  bg="from-purple-500/10 to-transparent"
                />
                <StatCard
                  icon={<Flame className="w-6 h-6 text-orange-300" />}
                  label="Day Streak"
                  value={`${user.streak} 🔥`}
                  color="text-orange-300"
                  bg="from-red-500/10 to-transparent"
                />
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  bg: string
}) {
  return (
    <div className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${bg} bg-white/5`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-white/5">{icon}</div>
        <span className="text-sm text-gray-400 font-medium">{label}</span>
      </div>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
    </div>
  )
}
