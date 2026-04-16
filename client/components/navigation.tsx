"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  BookOpen,
  BarChart3,
  Sparkles,
  Zap,
  Menu,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Command Center", icon: Home },
  { href: "/learning", label: "Focus Lab", icon: BookOpen },
  { href: "/dashboard", label: "Stats Vault", icon: BarChart3 },
  { href: "/recommendations", label: "AI Scout", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      setIsLoggedIn(!!(token && userId))
    }
    checkAuth()
    const handleStorageChange = () => checkAuth()
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleNavClick = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    setIsLoggedIn(false)
    setOpen(false)
    router.push("/auth/login")
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-card mx-4 mt-4 md:mx-8">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF0055] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold hidden sm:block">
              PrepWise
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                      isActive ? "text-[#FF4D00] bg-[#FF4D00]/10" : "text-gray-400 hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden lg:block">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Auth Section - Desktop */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 bg-gradient-to-br from-[#FF4D00] to-[#FF0055] rounded-full text-white text-sm font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                  title="User Menu"
                >
                  U
                </button>

                {open && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50"
                  >
                    <button
                      onClick={() => handleNavClick("/profile")}
                      className="block w-full text-left px-4 py-3 hover:bg-white/10 transition-colors text-sm"
                    >
                      👤 Profile
                    </button>
                    <button
                      onClick={() => handleNavClick("/dashboard")}
                      className="block w-full text-left px-4 py-3 hover:bg-white/10 transition-colors text-sm"
                    >
                      📊 Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick("/settings")}
                      className="block w-full text-left px-4 py-3 hover:bg-white/10 transition-colors text-sm"
                    >
                      ⚙️ Settings
                    </button>
                    <div className="border-t border-white/20 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white px-4 py-2 rounded-lg hover:from-[#ff5e1a] hover:to-[#ff3d2e] transition-all font-medium shadow-lg hover:shadow-xl text-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/10 px-4 pb-4"
          >
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="block py-3 px-2 rounded-lg flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full mt-2 py-3 px-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all flex items-center gap-3"
              >
                🚪 Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="w-full block mt-2 py-3 px-2 bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white rounded-lg hover:from-[#ff5e1a] hover:to-[#ff3d2e] transition-all text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
