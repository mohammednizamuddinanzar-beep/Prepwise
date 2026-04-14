"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  connections: number[]
}

export function NeuralNetworkBackground() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    // Generate random nodes
    const nodeCount = Math.min(25, Math.floor((dimensions.width * dimensions.height) / 50000))
    const newNodes: Node[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        connections: []
      })
    }

    // Create connections between nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          )
          if (distance < 300 && node.connections.length < 3) {
            node.connections.push(j)
          }
        }
      })
    })

    setNodes(newNodes)
  }, [dimensions])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FF4D00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF0055" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => {
            const targetNode = nodes[connectionId]
            if (!targetNode) return null
            return (
              <motion.line
                key={`${node.id}-${connectionId}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  pathLength: { duration: 2, delay: Math.random() * 2 },
                  opacity: { duration: 4, repeat: Infinity, delay: Math.random() * 2 }
                }}
              />
            )
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g key={node.id}>
            {/* Outer glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill="none"
              stroke="#FF4D00"
              strokeWidth="1"
              opacity="0.2"
              animate={{
                r: [8, 12, 8],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
            {/* Core node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={3}
              fill="#FF4D00"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                scale: { duration: 0.5, delay: Math.random() * 1 },
                opacity: { duration: 2, repeat: Infinity, delay: Math.random() * 2 }
              }}
            />
          </motion.g>
        ))}

        {/* Traveling data pulses */}
        {nodes.slice(0, 5).map((node) =>
          node.connections.slice(0, 1).map((connectionId) => {
            const targetNode = nodes[connectionId]
            if (!targetNode) return null
            return (
              <motion.circle
                key={`pulse-${node.id}-${connectionId}`}
                r={2}
                fill="#06B6D4"
                filter="url(#glow)"
                initial={{ 
                  cx: node.x, 
                  cy: node.y,
                  opacity: 0 
                }}
                animate={{
                  cx: [node.x, targetNode.x],
                  cy: [node.y, targetNode.y],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  repeatDelay: 3
                }}
              />
            )
          })
        )}
      </svg>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0E14]/80" />
    </div>
  )
}
