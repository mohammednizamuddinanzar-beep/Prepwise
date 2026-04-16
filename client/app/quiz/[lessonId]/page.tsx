"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function QuizPage() {
  const { lessonId } = useParams()

  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<any[]>([])
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get(`http://localhost:5000/api/questions/lesson/${lessonId}`)
      setQuestions(res.data)
    }

    if (lessonId) fetchQuestions()
  }, [lessonId])

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionId !== questionId),
      { questionId, selectedAnswer: option }
    ])
  }

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/quiz/submit", {
      userId: localStorage.getItem("userId") || "69d503994c9166869e388f74",
      lessonId,
      answers
    })

    setResult(res.data)
  }

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl mb-4">Quiz</h1>

      {questions.map((q) => (
        <div key={q._id} className="mb-6">
          <p className="font-semibold">{q.question}</p>

          {q.options.map((opt: string, i: number) => (
            <div key={i}>
              <input
                type="radio"
                name={q._id}
                onChange={() => handleSelect(q._id, opt)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-[#FF4D00] px-6 py-2 rounded"
      >
        Submit Quiz
      </button>

      {result && (
  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
    
    <p className="text-lg font-semibold">
      Score: {result.score}%
    </p>

    <p>Correct: {result.correctAnswers}</p>

    {/* 🔥 NEW */}
    <p className="mt-2 text-[#FF4D00]">
      XP: {result.updated?.xp}
    </p>

    <p>Level: {result.updated?.level}</p>

    <p>Streak: {result.updated?.streak} 🔥</p>

  </div>
)}
    </div>
  )
}