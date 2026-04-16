"use client"

import { useEffect } from "react"
import axios from "axios"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { useState } from "react"
import { Sparkles, Play, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuthGuard } from "@/hooks/useAuthGuard"

export default function RecommendationsPage() {
  const { isAuthed } = useAuthGuard()
  const router = useRouter()

  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      router.push("/auth/login")
      return
    }

    if (!prompt.trim()) {
      setError("Please enter a topic to generate a course.")
      return
    }

    try {
      setError("")
      setLoading(true)

      const res = await axios.post("http://localhost:5000/api/ai/generate", {
        userId,
        prompt: prompt.trim(),
      })

      setCourses([res.data])
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to generate course. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF0055]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              AI Course Generator
            </h1>
          </div>
          <p className="text-gray-400">
            Enter any topic and we'll generate a complete course for you instantly.
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white/5 rounded-xl border border-white/10 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleGenerate()}
              placeholder="e.g. React Hooks, Machine Learning, SQL Basics..."
              className="flex-1 p-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-[#FF4D00]/60 transition placeholder:text-gray-500"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-red-400 text-sm">{error}</p>
          )}
        </motion.div>

        {/* Generated Course */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {courses.map((course, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/[0.08] transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{course?.title}</h3>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30 flex-shrink-0 ml-2">
                    AI
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-5 line-clamp-3">
                  {course?.description}
                </p>

                <button
                  onClick={() => router.push(`/learning/${course._id}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/30 rounded-lg text-sm font-medium hover:bg-[#FF4D00]/20 transition"
                >
                  <Play className="w-4 h-4" />
                  Start Learning
                </button>
              </div>
            ))}
          </motion.div>
        )}

        <Footer />
      </div>
    </main>
  )
}