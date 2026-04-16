"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LearningPage() {
  const params = useParams()
  const id = params?.id as string

  const router = useRouter()

  const [course, setCourse] = useState<any>(null)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/courses/${id}`
        )
        setCourse(res.data)
      } catch (err) {
        console.error("Error fetching course:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCourse()
  }, [id])

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />

      <div className="pt-28 px-6 max-w-4xl mx-auto">

        {/* Loading */}
        {loading && (
          <p className="text-white text-center">Loading course...</p>
        )}

        {/* Course */}
        {!loading && course && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-white">
              {course.title}
            </h1>

            <p className="text-gray-400 mb-6">
              {course.description}
            </p>

            {/* Lessons */}
            <h2 className="text-xl font-semibold mb-4 text-white">
              Lessons
            </h2>

            {course.lessons?.length === 0 && (
              <p className="text-gray-400">No lessons found</p>
            )}

            <div className="space-y-4">
              {course.lessons?.map((lesson: any, index: number) => (
                <div
                  key={lesson._id}
                  onClick={() => setSelectedLesson(lesson)}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition"
                >
                  <h3 className="font-semibold text-white">
                    {index + 1}. {lesson.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {lesson.content?.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Lesson */}
            {selectedLesson && (
              <div className="mt-10 p-6 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {selectedLesson.title}
                </h2>

                <p className="text-gray-300 whitespace-pre-line">
                  {selectedLesson.content}
                </p>

                <button
                  onClick={() =>
                    router.push(`/quiz/${selectedLesson._id}`)
                  }
                  className="mt-6 px-6 py-2 bg-[#FF4D00] text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Take Quiz
                </button>
              </div>
            )}
          </>
        )}

        {/* Error fallback */}
        {!loading && !course && (
          <p className="text-red-500 text-center">
            Failed to load course
          </p>
        )}

        <Footer />
      </div>
    </main>
  )
}