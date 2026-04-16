"use client"

import { Navigation } from "@/components/navigation"
import axios from "axios"
import { useState, useEffect } from "react"

interface UserData {
  name: string
  email: string
  xp: number
  level: number
  streak: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-600 rounded-full border-t-white animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0E14] p-8">
      <Navigation />
      
      <div className="max-w-2xl mx-auto mt-16">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Dashboard
          </h1>
          
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white/5 rounded-xl">
                <h2 className="text-xl font-bold text-white mb-4">Name</h2>
                <p className="text-2xl text-gray-200">{user.name}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <h2 className="text-xl font-bold text-white mb-4">Email</h2>
                <p className="text-lg text-gray-200">{user.email}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <h2 className="text-xl font-bold text-white mb-4">XP</h2>
                <p className="text-2xl font-bold text-orange-400">{user.xp}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <h2 className="text-xl font-bold text-white mb-4">Level</h2>
                <p className="text-2xl font-bold text-purple-400">{user.level}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl md:col-span-2">
                <h2 className="text-xl font-bold text-white mb-4">Streak</h2>
                <p className="text-4xl font-black text-orange-400">{user.streak} days</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 text-gray-400">
              Dashboard data unavailable
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
