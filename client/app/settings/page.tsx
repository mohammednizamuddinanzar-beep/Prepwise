"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Settings, Trophy, User, LogOut } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    window.location.href = "/auth/login"
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    // Apply to html
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />
      
      <div className="max-w-md mx-auto mt-20 p-6">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3 mx-auto">
            <Settings className="w-10 h-10 text-orange-400" />
            Settings
          </h1>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Theme</h3>
                <span className="text-gray-400">{theme === "dark" ? "Dark" : "Light"}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-medium"
              >
                <span className="w-5 h-5">{theme === "dark" ? "☀️" : "🌙"}</span>
                Switch to {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl hover:from-red-600 hover:to-orange-700 transition-all font-semibold shadow-xl hover:shadow-red-500/25"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
