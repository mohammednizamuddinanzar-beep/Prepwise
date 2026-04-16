"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { isAuthed } = useAuthGuard()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    router.push("/auth/login")
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0E14] pb-12">
      <Navigation />

      <div className="pt-28 px-4 sm:px-6 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl font-bold text-white">Settings</h1>
          </div>
          <p className="text-gray-400 mb-10">Manage your preferences.</p>

          <div className="space-y-4">
            {/* Theme Toggle */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Theme</h3>
                  <p className="text-gray-400 text-sm">
                    Currently: {theme === "dark" ? "Dark mode" : "Light mode"}
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition text-sm font-medium"
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl hover:from-red-600 hover:to-orange-700 transition-all font-semibold shadow-xl shadow-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
