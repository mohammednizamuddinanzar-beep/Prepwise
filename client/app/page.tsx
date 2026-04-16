"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([])
  const router = useRouter()

  // 🔐 Auth Protection
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }
  }, [router])

  // 📦 Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses")
        setCourses(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCourses()
  }, [])

  return (
    <main className="min-h-screen relative bg-[#0B0E14]">
      <Navigation />

      <div className="relative z-10">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* 🔥 COURSES SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Available Courses
            </h2>

            {courses.length === 0 ? (
              <p className="text-gray-400">Loading courses...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
                  >
                    <h2 className="text-xl text-white font-bold mb-2">
                      {course.title}
                    </h2>

                    <p className="text-gray-400 mb-4">
                      {course.description}
                    </p>

                    <button
                      onClick={() =>
                        router.push(`/learning/${course._id}`)
                      }
                      className="bg-[#FF4D00] px-4 py-2 rounded text-white hover:bg-[#ff5e1a]"
                    >
                      Start Learning
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.section>

        </div>

        <Footer />
      </div>
    </main>
  )
}