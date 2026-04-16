"use client"

import { Navigation } from "@/components/navigation"
import axios from "axios"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { useAuthGuard } from "@/hooks/useAuthGuard"

interface UserData {
  name: string
  email: string
}

export default function ProfilePage() {
  const { isAuthed } = useAuthGuard()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isAuthed) return

    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) return
        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`)
        setUser({ name: res.data.name, email: res.data.email })
      } catch (err: any) {
        setError("Failed to load profile.")
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

  return (
    <main className="min-h-screen bg-[#0B0E14] pb-12">
      <Navigation />

      <div className="pt-28 px-4 sm:px-6 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400 mb-10">Your account details.</p>

          {error ? (
            <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300">
              {error}
            </div>
          ) : user ? (
            <div className="bg-white/5 rounded-xl border border-white/10 p-8">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4 pb-8 border-b border-white/10 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF4D00] to-[#FF0055] flex items-center justify-center text-4xl font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">PrepWise Member</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              No profile data available.
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
