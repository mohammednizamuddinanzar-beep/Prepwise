"use client"

import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setIsLoading(true)

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data._id)
      
      router.push("/")
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0E14] p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-lg">
        
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg px-3">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-transparent text-white outline-none"
                placeholder="Enter your password"
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
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-[#FF4D00] hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </main>
  )
}
