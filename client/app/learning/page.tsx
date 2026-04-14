"use client"

import { Navigation } from "@/components/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { 
  BookOpen, 
  Code, 
  FileText, 
  MessageSquare, 
  Send,
  ChevronRight,
  Play,
  CheckCircle2,
  Circle,
  Sparkles,
  StickyNote,
  Plus,
  X
} from "lucide-react"

const modules = [
  {
    id: 1,
    title: "Data Structures",
    lessons: [
      { id: 1, title: "Arrays & Linked Lists", completed: true },
      { id: 2, title: "Stacks & Queues", completed: true },
      { id: 3, title: "Trees & Graphs", completed: false, active: true },
      { id: 4, title: "Hash Tables", completed: false },
      { id: 5, title: "Heaps", completed: false },
    ]
  },
  {
    id: 2,
    title: "Algorithms",
    lessons: [
      { id: 1, title: "Sorting Algorithms", completed: true },
      { id: 2, title: "Searching Algorithms", completed: false },
      { id: 3, title: "Dynamic Programming", completed: false },
      { id: 4, title: "Graph Algorithms", completed: false },
    ]
  },
  {
    id: 3,
    title: "System Design",
    lessons: [
      { id: 1, title: "Scalability Basics", completed: false },
      { id: 2, title: "Load Balancing", completed: false },
      { id: 3, title: "Caching Strategies", completed: false },
    ]
  }
]

const currentLesson = {
  title: "Trees & Graphs",
  content: `
## Binary Trees

A binary tree is a tree data structure where each node has at most two children, referred to as the left child and right child.

### Properties
- **Height**: The number of edges on the longest path from root to leaf
- **Depth**: The number of edges from the root to a specific node
- **Level**: Depth + 1

### Implementation

\`\`\`python
class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.val)
        inorder_traversal(root.right)
\`\`\`

### Time Complexity
| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search    | O(log n)| O(n)       |
| Insert    | O(log n)| O(n)       |
| Delete    | O(log n)| O(n)       |

### Key Takeaways
- Binary trees are fundamental for understanding more complex data structures
- They provide efficient searching, inserting, and deleting operations
- Understanding tree traversal is crucial for many algorithms
  `
}

interface Note {
  id: number
  content: string
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function LearningPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  
  const [activeModule, setActiveModule] = useState(1)
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: "Remember: Inorder traversal gives sorted order for BST" },
    { id: 2, content: "Practice BFS vs DFS implementations" }
  ])
  const [newNote, setNewNote] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI learning assistant. Ask me anything about Trees & Graphs!" }
  ])
  const [chatInput, setChatInput] = useState("")
  const [showChat, setShowChat] = useState(false)

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote }])
      setNewNote("")
    }
  }

  const removeNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const sendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { role: "user", content: chatInput }])
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: "assistant", 
          content: "That's a great question! In binary trees, the time complexity for search operations depends on the tree's balance. For a balanced BST, it's O(log n), but for a skewed tree, it can degrade to O(n)." 
        }])
      }, 1000)
      setChatInput("")
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />
      
      {/* Progress Bar */}
      <div className="fixed top-[88px] left-0 right-0 z-40 h-1 bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#FF4D00] to-[#FF0055]"
          style={{ width: progressWidth }}
        />
      </div>

      <div className="pt-28 pb-8 h-screen">
        <div className="h-full max-w-[1800px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-4">
          
          {/* Sidebar - Module Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4 overflow-y-auto hidden lg:block"
          >
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[#FF4D00]" />
              <h2 className="font-semibold text-foreground">Course Modules</h2>
            </div>
            
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id}>
                  <button
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeModule === module.id 
                        ? "bg-[#FF4D00]/10 text-[#FF4D00] border border-[#FF4D00]/20" 
                        : "hover:bg-white/5 text-muted-foreground"
                    }`}
                  >
                    <span className="font-medium text-sm">{module.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      activeModule === module.id ? "rotate-90" : ""
                    }`} />
                  </button>
                  
                  {activeModule === module.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="ml-4 mt-2 space-y-1"
                    >
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                            lesson.active 
                              ? "bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20" 
                              : lesson.completed
                                ? "text-[#10B981]"
                                : "text-muted-foreground hover:bg-white/5"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : lesson.active ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-y-auto"
          >
            <div className="sticky top-0 z-10 p-4 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#8B5CF6]/10">
                    <FileText className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground">{currentLesson.title}</h1>
                    <p className="text-sm text-muted-foreground">Data Structures • Lesson 3 of 5</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Reading time: 15 min</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <article className="prose prose-invert max-w-none">
                {/* Render markdown-like content */}
                <h2 className="text-2xl font-bold gradient-text-cyber mb-4">Binary Trees</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A binary tree is a tree data structure where each node has at most two children, 
                  referred to as the left child and right child.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3">Properties</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#FF4D00] mt-1">•</span>
                    <span><strong className="text-foreground">Height:</strong> The number of edges on the longest path from root to leaf</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#FF4D00] mt-1">•</span>
                    <span><strong className="text-foreground">Depth:</strong> The number of edges from the root to a specific node</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-[#FF4D00] mt-1">•</span>
                    <span><strong className="text-foreground">Level:</strong> Depth + 1</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Implementation</h3>
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border-b border-white/10">
                    <Code className="w-4 h-4 text-[#06B6D4]" />
                    <span className="text-sm text-muted-foreground font-mono">python</span>
                  </div>
                  <pre className="p-4 bg-black/40 overflow-x-auto">
                    <code className="text-sm font-mono">
                      <span className="text-[#8B5CF6]">class</span> <span className="text-[#06B6D4]">TreeNode</span>:{"\n"}
                      {"    "}<span className="text-[#8B5CF6]">def</span> <span className="text-[#10B981]">__init__</span>(<span className="text-[#FF4D00]">self</span>, val=<span className="text-[#F59E0B]">0</span>):{"\n"}
                      {"        "}self.val = val{"\n"}
                      {"        "}self.left = <span className="text-[#8B5CF6]">None</span>{"\n"}
                      {"        "}self.right = <span className="text-[#8B5CF6]">None</span>{"\n"}
                      {"\n"}
                      <span className="text-[#8B5CF6]">def</span> <span className="text-[#10B981]">inorder_traversal</span>(root):{"\n"}
                      {"    "}<span className="text-[#8B5CF6]">if</span> root:{"\n"}
                      {"        "}inorder_traversal(root.left){"\n"}
                      {"        "}<span className="text-[#10B981]">print</span>(root.val){"\n"}
                      {"        "}inorder_traversal(root.right)
                    </code>
                  </pre>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">Time Complexity</h3>
                <div className="rounded-xl overflow-hidden border border-white/10 mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Operation</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Average</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Worst Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-sm text-muted-foreground">Search</td>
                        <td className="px-4 py-3 text-sm text-[#10B981] font-mono">O(log n)</td>
                        <td className="px-4 py-3 text-sm text-[#FF4D00] font-mono">O(n)</td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-sm text-muted-foreground">Insert</td>
                        <td className="px-4 py-3 text-sm text-[#10B981] font-mono">O(log n)</td>
                        <td className="px-4 py-3 text-sm text-[#FF4D00] font-mono">O(n)</td>
                      </tr>
                      <tr className="border-t border-white/5">
                        <td className="px-4 py-3 text-sm text-muted-foreground">Delete</td>
                        <td className="px-4 py-3 text-sm text-[#10B981] font-mono">O(log n)</td>
                        <td className="px-4 py-3 text-sm text-[#FF4D00] font-mono">O(n)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">Key Takeaways</h3>
                <div className="space-y-3">
                  {[
                    "Binary trees are fundamental for understanding more complex data structures",
                    "They provide efficient searching, inserting, and deleting operations",
                    "Understanding tree traversal is crucial for many algorithms"
                  ].map((takeaway, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] mt-0.5" />
                      <span className="text-foreground">{takeaway}</span>
                    </motion.div>
                  ))}
                </div>
              </article>
            </div>
          </motion.div>

          {/* Right Sidebar - Notes & AI Chat */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card overflow-hidden hidden lg:flex flex-col"
          >
            {/* Tab Toggle */}
            <div className="flex border-b border-white/5">
              <button
                onClick={() => setShowChat(false)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
                  !showChat ? "text-[#FF4D00] bg-[#FF4D00]/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <StickyNote className="w-4 h-4" />
                Notes
              </button>
              <button
                onClick={() => setShowChat(true)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium transition-colors ${
                  showChat ? "text-[#8B5CF6] bg-[#8B5CF6]/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Chat
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {!showChat ? (
                // Notes View
                <div className="space-y-3">
                  {notes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative p-3 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20"
                    >
                      <p className="text-sm text-foreground pr-6">{note.content}</p>
                      <button
                        onClick={() => removeNote(note.id)}
                        className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Chat View
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[90%] p-3 rounded-xl text-sm ${
                        message.role === "user"
                          ? "bg-[#8B5CF6] text-white"
                          : "bg-white/5 text-foreground border border-white/10"
                      }`}>
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                            <span className="text-xs text-[#8B5CF6] font-medium">AI Assistant</span>
                          </div>
                        )}
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5">
              {!showChat ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder="Add a quick note..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#FF4D00]/50"
                  />
                  <button
                    onClick={addNote}
                    className="p-2 rounded-lg bg-[#FF4D00] text-white hover:bg-[#FF4D00]/80 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask AI anything..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#8B5CF6]/50"
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#8B5CF6]/80 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  )
}
