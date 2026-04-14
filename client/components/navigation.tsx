"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Command Center", icon: Home },
  { href: "/learning", label: "Focus Lab", icon: BookOpen },
  { href: "/dashboard", label: "Stats Vault", icon: BarChart3 },
  { href: "/recommendations", label: "AI Scout", icon: Sparkles },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-card mx-4 mt-4 md:mx-8">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF0055] flex items-center justify-center glow-orange">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <motion.div 
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF0055] opacity-50 blur-md"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xl font-bold gradient-text-streak hidden sm:block">
              PrepWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      "relative px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                      isActive 
                        ? "text-[#FF4D00]" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[#FF4D00]/10 rounded-lg border border-[#FF4D00]/20"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-4 h-4 relative z-10" />
                    <span className="text-sm font-medium relative z-10">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* User XP Badge */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="text-sm font-medium text-[#8B5CF6]">Level 12</span>
              <span className="text-xs text-muted-foreground">2,450 XP</span>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0 
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    className={cn(
                      "px-4 py-3 rounded-lg flex items-center gap-3 transition-colors",
                      isActive 
                        ? "bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
            
            {/* Mobile XP Badge */}
            <div className="pt-2 border-t border-white/5 mt-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                <span className="text-sm font-medium text-[#8B5CF6]">Level 12</span>
                <span className="text-xs text-muted-foreground">2,450 XP</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
