"use client"

import { motion } from "framer-motion"

interface StreakFlameProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

const sizes = {
  sm: { width: 24, height: 30 },
  md: { width: 40, height: 50 },
  lg: { width: 64, height: 80 },
  xl: { width: 96, height: 120 },
}

export function StreakFlame({ size = "md", animated = true, className = "" }: StreakFlameProps) {
  const { width, height } = sizes[size]

  return (
    <motion.div
      className={`relative ${className}`}
      animate={animated ? {
        scale: [1, 1.05, 1],
        filter: [
          "drop-shadow(0 0 8px rgba(255, 77, 0, 0.5))",
          "drop-shadow(0 0 16px rgba(255, 77, 0, 0.7))",
          "drop-shadow(0 0 8px rgba(255, 77, 0, 0.5))"
        ]
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF0055" />
            <stop offset="50%" stopColor="#FF4D00" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          <linearGradient id="innerFlameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF4D00" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
          <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer flame */}
        <motion.path
          d="M12 0C12 0 2 8 2 16C2 22 6.5 28 12 30C17.5 28 22 22 22 16C22 8 12 0 12 0Z"
          fill="url(#flameGradient)"
          filter="url(#flameGlow)"
          animate={animated ? {
            d: [
              "M12 0C12 0 2 8 2 16C2 22 6.5 28 12 30C17.5 28 22 22 22 16C22 8 12 0 12 0Z",
              "M12 1C12 1 3 9 3 16C3 21 7 27 12 29C17 27 21 21 21 16C21 9 12 1 12 1Z",
              "M12 0C12 0 2 8 2 16C2 22 6.5 28 12 30C17.5 28 22 22 22 16C22 8 12 0 12 0Z"
            ]
          } : {}}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner flame */}
        <motion.path
          d="M12 8C12 8 6 14 6 18C6 22 8.5 26 12 28C15.5 26 18 22 18 18C18 14 12 8 12 8Z"
          fill="url(#innerFlameGradient)"
          animate={animated ? {
            d: [
              "M12 8C12 8 6 14 6 18C6 22 8.5 26 12 28C15.5 26 18 22 18 18C18 14 12 8 12 8Z",
              "M12 9C12 9 7 14 7 18C7 21 9 25 12 27C15 25 17 21 17 18C17 14 12 9 12 9Z",
              "M12 8C12 8 6 14 6 18C6 22 8.5 26 12 28C15.5 26 18 22 18 18C18 14 12 8 12 8Z"
            ]
          } : {}}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1
          }}
        />
        
        {/* Core glow */}
        <motion.ellipse
          cx="12"
          cy="20"
          rx="3"
          ry="4"
          fill="#FFFDE7"
          opacity={0.8}
          animate={animated ? {
            opacity: [0.6, 1, 0.6],
            ry: [4, 5, 4]
          } : {}}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Particles */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4,
                height: 4,
                background: "#FF4D00",
                left: `${40 + Math.random() * 20}%`,
                bottom: "10%",
              }}
              animate={{
                y: [-10, -40],
                x: [0, (Math.random() - 0.5) * 20],
                opacity: [1, 0],
                scale: [1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
