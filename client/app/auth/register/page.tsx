"use client"

import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react"

interface FormData {
  name: string
  email: string
  password: string
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    try {
      setIsLoading(true)

      await axios.post("http://localhost:5000/api/auth/register", formData)

      router.push("/auth/login")
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0E14] p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-lg">
        
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg px-3">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-transparent text-white outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg px-3">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-transparent text-white outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Password</label>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg px-3">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-transparent text-white outline-none"
                placeholder="Create password (min 8 chars)"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF4D00] hover:bg-[#ff5e1a] disabled:opacity-50 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FF4D00] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
