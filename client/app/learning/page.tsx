"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { BookOpen, Sparkles, Play } from "lucide-react"
import { useAuthGuard } from "@/hooks/useAuthGuard"

export default function LearningPage() {
  const { isAuthed } = useAuthGuard()
  const router = useRouter()

  const [predefinedCourses, setPredefinedCourses] = useState<any[]>([])
  const [aiCourses, setAiCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthed) return

    const fetchCourses = async () => {
      try {
        const [predRes, aiRes] = await Promise.all([
          axios.get("http://localhost:5000/api/courses?isAIGenerated=false"),
          axios.get("http://localhost:5000/api/courses?isAIGenerated=true"),
        ])
        setPredefinedCourses(predRes.data)
        setAiCourses(aiRes.data)
      } catch (err) {
        console.error("Failed to fetch courses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [isAuthed])

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

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Focus Lab</h1>
          <p className="text-gray-400">
            Choose a course to start mastering new skills.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
          </div>
        ) : (
          <>
            {/* ─── SECTION A: Predefined Courses ─── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-14"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#FF4D00]/10">
                  <BookOpen className="w-5 h-5 text-[#FF4D00]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Predefined Courses</h2>
                  <p className="text-sm text-gray-400">Curated courses to build your foundations</p>
                </div>
              </div>

              {predefinedCourses.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No predefined courses found. Run the seed script:{" "}
                  <code className="text-orange-400">node seedCourses.js</code>
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {predefinedCourses.map((course, i) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      index={i}
                      onClick={() => router.push(`/learning/${course._id}`)}
                    />
                  ))}
                </div>
              )}
            </motion.section>

            {/* ─── SECTION B: AI Generated Courses ─── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Generated Courses</h2>
                  <p className="text-sm text-gray-400">
                    Courses you created with AI.{" "}
                    <button
                      onClick={() => router.push("/recommendations")}
                      className="text-[#FF4D00] hover:underline"
                    >
                      Generate a new one →
                    </button>
                  </p>
                </div>
              </div>

              {aiCourses.length === 0 ? (
                <div className="p-8 bg-white/5 rounded-xl border border-white/10 text-center">
                  <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3 opacity-50" />
                  <p className="text-gray-400 mb-4">You haven't generated any AI courses yet.</p>
                  <button
                    onClick={() => router.push("/recommendations")}
                    className="px-6 py-2 bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white rounded-lg font-medium hover:opacity-90 transition"
                  >
                    Generate AI Course
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aiCourses.map((course, i) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      index={i}
                      onClick={() => router.push(`/learning/${course._id}`)}
                      isAI
                    />
                  ))}
                </div>
              )}
            </motion.section>
          </>
        )}

        <Footer />
      </div>
    </main>
  )
}

function CourseCard({
  course,
  index,
  onClick,
  isAI = false,
}: {
  course: any
  index: number
  onClick: () => void
  isAI?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-white group-hover:text-[#FF4D00] transition-colors">
          {course.title}
        </h3>
        {isAI && (
          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30 flex-shrink-0 ml-2">
            AI
          </span>
        )}
      </div>

      <p className="text-gray-400 text-sm mb-5 line-clamp-3">
        {course.description}
      </p>

      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-[#FF4D00] text-white rounded-lg text-sm font-medium hover:bg-[#ff5e1a] transition-colors"
      >
        <Play className="w-4 h-4" />
        Start Learning
      </button>
    </motion.div>
  )
}
