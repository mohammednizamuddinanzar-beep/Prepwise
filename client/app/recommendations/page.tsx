"use client"

import { useEffect } from "react"
import axios from "axios"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { useState } from "react"
import { Sparkles, Play } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RecommendationsPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
  }, [router])

  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")

  const handleGenerate = async () => {
    try {
      setLoading(true)

      const userId = localStorage.getItem("userId") || "69d503994c9166869e388f74"
      const res = await axios.post("http://localhost:5000/api/ai/generate", {
        userId,
        prompt: prompt
      })

      console.log("API RESPONSE:", res.data)

      setCourses([res.data])

    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />

      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF0055]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              AI Course Generator
            </h1>
          </div>
          <p className="text-muted-foreground">
            Generate personalized courses using AI
          </p>
        </motion.div>

        {/* Input */}
        <div className="glass-card p-6 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter what you want to learn (e.g., React, DSA, Python)"
            className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white mb-4 outline-none"
          />

          <button
            onClick={handleGenerate}
            className="px-6 py-2 rounded-lg bg-[#FF4D00] text-white font-medium hover:bg-[#ff5e1a]"
          >
            Generate Course
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-muted-foreground">
            Generating course...
          </p>
        )}

        {/* Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses && courses.map((course, index) => (
            <motion.div
              key={index}
              className="glass-card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                {course?.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {course?.description}
              </p>

              {/* 🔥 UPDATED BUTTON */}
              <button
                onClick={() => router.push(`/learning/${course._id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00]/10 text-[#FF4D00] rounded-lg"
              >
                <Play className="w-4 h-4" />
                Start Learning
              </button>

            </motion.div>
          ))}
        </div>

        <Footer />
      </div>
    </main>
  )
}