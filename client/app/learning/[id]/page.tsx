"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { ChevronRight, BookOpen } from "lucide-react"
import { useAuthGuard } from "@/hooks/useAuthGuard"

export default function CourseDetailPage() {
  const { isAuthed } = useAuthGuard()
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()

  const [course, setCourse] = useState<any>(null)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthed || !id) return

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`)
        setCourse(res.data)
      } catch (err) {
        console.error("Error fetching course:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [isAuthed, id])

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

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
          </div>
        )}

        {!loading && !course && (
          <div className="text-center py-24">
            <p className="text-red-400 text-lg mb-4">Failed to load course.</p>
            <button
              onClick={() => router.push("/learning")}
              className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
            >
              ← Back to Focus Lab
            </button>
          </div>
        )}

        {!loading && course && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <button
                onClick={() => router.push("/learning")}
                className="hover:text-white transition"
              >
                Focus Lab
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{course.title}</span>
            </div>

            {/* Course Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-3">{course.title}</h1>
              <p className="text-gray-400 text-lg">{course.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ── Lesson List ── */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[#FF4D00]" />
                  <h2 className="text-lg font-semibold text-white">Lessons</h2>
                  <span className="text-xs text-gray-400 ml-auto">
                    {course.lessons?.length || 0} total
                  </span>
                </div>

                {course.lessons?.length === 0 ? (
                  <p className="text-gray-400 text-sm">No lessons available.</p>
                ) : (
                  <div className="space-y-2">
                    {course.lessons?.map((lesson: any, index: number) => {
                      const isSelected = selectedLesson?._id === lesson._id
                      return (
                        <button
                          key={lesson._id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-[#FF4D00]/10 border-[#FF4D00]/40 text-white"
                              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isSelected
                                  ? "bg-[#FF4D00] text-white"
                                  : "bg-white/10 text-gray-400"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <span className="text-sm font-medium leading-snug">
                              {lesson.title}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* ── Lesson Content ── */}
              <div className="lg:col-span-2">
                {!selectedLesson ? (
                  <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-xl border border-white/10 text-center">
                    <BookOpen className="w-10 h-10 text-gray-600 mb-3" />
                    <p className="text-gray-400">Select a lesson from the list to begin.</p>
                  </div>
                ) : (
                  <motion.div
                    key={selectedLesson._id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/5 rounded-xl border border-white/10 p-8"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">
                      {selectedLesson.title}
                    </h2>

                    <div className="text-gray-300 text-sm leading-7 whitespace-pre-line font-mono bg-black/20 rounded-lg p-6 border border-white/5 mb-8 max-h-96 overflow-y-auto">
                      {selectedLesson.content}
                    </div>

                    <button
                      onClick={() => router.push(`/quiz/${selectedLesson._id}`)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-[#FF4D00]/20"
                    >
                      Take Quiz →
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <Footer />
      </div>
    </main>
  )
}