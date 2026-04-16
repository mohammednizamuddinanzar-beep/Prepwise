"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * Reusable auth guard hook.
 * - Immediately redirects to /auth/login if token or userId is missing.
 * - Returns { isAuthed } so pages can suppress rendering until auth is confirmed.
 */
export function useAuthGuard() {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    if (!token || !userId) {
      router.push("/auth/login")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  return { isAuthed }
}
