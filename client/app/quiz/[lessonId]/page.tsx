"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function QuizPage() {
  const { isAuthed } = useAuthGuard()
  const { lessonId } = useParams()
  const router = useRouter()

  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthed || !lessonId) return

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/questions/lesson/${lessonId}`
        )
        setQuestions(res.data)
      } catch (err) {
        setError("Failed to load questions.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [isAuthed, lessonId])

  const handleMCQ = (questionId: string, option: string) => {
    if (result) return // locked after submit
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }

  const handleFillIn = (questionId: string, value: string) => {
    if (result) return
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      router.push("/auth/login")
      return
    }

    if (questions.length === 0) return

    setIsSubmitting(true)
    setError("")

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: answers[q._id] || "",
      }))

      const res = await axios.post("http://localhost:5000/api/quiz/submit", {
        userId,
        lessonId,
        answers: formattedAnswers,
      })

      setResult(res.data)
    } catch (err: any) {
      setError("Submission failed. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
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

      <div className="pt-28 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Quiz</h1>
          <p className="text-gray-400 mb-10">
            Answer all questions and submit to see your score.
          </p>

          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-2 border-gray-600 rounded-full border-t-[#FF4D00] animate-spin" />
            </div>
          )}

          {error && !loading && (
            <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 mb-6">
              {error}
            </div>
          )}

          {!loading && questions.length === 0 && !error && (
            <div className="text-center py-16 text-gray-400">
              No questions found for this lesson.
            </div>
          )}

          {/* Questions */}
          {!loading && questions.length > 0 && (
            <div className="space-y-8">
              {questions.map((q, index) => {
                const isFillIn = !q.options || q.options.length === 0
                const selectedAnswer = answers[q._id]

                return (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="p-6 bg-white/5 rounded-xl border border-white/10"
                  >
                    <p className="text-white font-semibold mb-1 text-xs text-gray-400 uppercase tracking-widest">
                      Question {index + 1}
                    </p>
                    <p className="text-white text-lg mb-5">{q.question}</p>

                    {isFillIn ? (
                      /* Fill-in-the-blank */
                      <input
                        type="text"
                        value={selectedAnswer || ""}
                        onChange={(e) => handleFillIn(q._id, e.target.value)}
                        disabled={!!result}
                        placeholder="Type your answer..."
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white outline-none focus:border-[#FF4D00]/60 transition disabled:opacity-60"
                      />
                    ) : (
                      /* MCQ */
                      <div className="space-y-3">
                        {q.options.map((opt: string, i: number) => {
                          const isSelected = selectedAnswer === opt

                          // After submit — highlight correct/wrong
                          let optClass =
                            "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all "
                          if (result) {
                            if (opt === q.correctAnswer) {
                              optClass += "border-green-500/50 bg-green-500/10 text-green-300"
                            } else if (isSelected && opt !== q.correctAnswer) {
                              optClass += "border-red-500/50 bg-red-500/10 text-red-300"
                            } else {
                              optClass += "border-white/10 bg-white/5 text-gray-400"
                            }
                          } else {
                            optClass += isSelected
                              ? "border-[#FF4D00]/60 bg-[#FF4D00]/10 text-white"
                              : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:text-white"
                          }

                          return (
                            <label key={i} className={optClass}>
                              <input
                                type="radio"
                                name={q._id}
                                value={opt}
                                checked={isSelected}
                                onChange={() => handleMCQ(q._id, opt)}
                                disabled={!!result}
                                className="accent-[#FF4D00]"
                              />
                              <span className="text-sm">{opt}</span>
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )
              })}

              {/* Submit */}
              {!result && (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(answers).length === 0}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white rounded-xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#FF4D00]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quiz"
                  )}
                </button>
              )}

              {/* Result Panel */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-6">
                    {result.score >= 60 ? (
                      <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {result.score >= 60 ? "Well done!" : "Keep practicing!"}
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {result.correctAnswers} of {result.totalQuestions} correct
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <StatBox label="Score" value={`${result.score}%`} color="text-white" />
                    <StatBox label="XP Earned" value={`+${Math.round(result.score)}`} color="text-orange-400" />
                    <StatBox label="Level" value={result.updated?.level} color="text-purple-400" />
                    <StatBox label="Streak" value={`${result.updated?.streak} 🔥`} color="text-orange-300" />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => router.back()}
                      className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition font-medium"
                    >
                      ← Back to Lesson
                    </button>
                    <button
                      onClick={() => router.push("/learning")}
                      className="flex-1 py-3 bg-[#FF4D00]/20 text-[#FF4D00] rounded-xl hover:bg-[#FF4D00]/30 transition font-medium"
                    >
                      More Courses
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string
  value: any
  color: string
}) {
  return (
    <div className="p-4 bg-white/5 rounded-xl text-center border border-white/10">
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  )
}