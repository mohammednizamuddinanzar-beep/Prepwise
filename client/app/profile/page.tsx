"use client"

import { Navigation } from "@/components/navigation"
import axios from "axios"
import { useState, useEffect } from "react"
import { User, Mail } from "lucide-react"

interface UserData {
  name: string
  email: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) return

        const res = await axios.get(`http://localhost:5000/api/auth/${userId}`)
        setUser({
          name: res.data.name,
          email: res.data.email
        })
      } catch (err: any) {
        setError("Failed to load profile")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0B0E14] p-8">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-gray-600 rounded-full animate-spin border-t-white"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0E14] p-8">
      <Navigation />
      
      <div className="max-w-md mx-auto mt-16">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Profile
          </h1>
          
          {error ? (
            <div className="text-red-400 text-center p-8">
              {error}
            </div>
          ) : user ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-white/5 rounded-xl">
                <User className="w-16 h-16 text-gray-400 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 text-gray-400">
              No profile data available
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
