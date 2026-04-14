"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Users,
  Star,
  Play,
  Bookmark,
  Filter,
  TrendingUp,
  Zap,
  Target
} from "lucide-react"

interface Course {
  id: number
  title: string
  description: string
  image: string
  matchScore: number
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  enrolled: number
  rating: number
  tags: string[]
  instructor: string
}

const courses: Course[] = [
  {
    id: 1,
    title: "Advanced System Design",
    description: "Learn to design scalable distributed systems from scratch",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    matchScore: 95,
    difficulty: "Hard",
    duration: "12h 30m",
    enrolled: 2450,
    rating: 4.9,
    tags: ["Architecture", "Scalability", "Microservices"],
    instructor: "Alex Chen"
  },
  {
    id: 2,
    title: "Database Optimization Mastery",
    description: "Master query optimization, indexing, and performance tuning",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    matchScore: 92,
    difficulty: "Medium",
    duration: "8h 45m",
    enrolled: 1890,
    rating: 4.8,
    tags: ["SQL", "NoSQL", "Performance"],
    instructor: "Sarah Johnson"
  },
  {
    id: 3,
    title: "Kubernetes Deep Dive",
    description: "Container orchestration for production environments",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
    matchScore: 88,
    difficulty: "Hard",
    duration: "15h 00m",
    enrolled: 3200,
    rating: 4.7,
    tags: ["DevOps", "Containers", "Cloud"],
    instructor: "Mike Williams"
  },
  {
    id: 4,
    title: "Machine Learning Foundations",
    description: "Build intelligent systems with modern ML techniques",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    matchScore: 85,
    difficulty: "Medium",
    duration: "20h 00m",
    enrolled: 5600,
    rating: 4.9,
    tags: ["AI", "Python", "Neural Networks"],
    instructor: "Dr. Emily Zhang"
  },
  {
    id: 5,
    title: "GraphQL API Development",
    description: "Design and build flexible APIs with GraphQL",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    matchScore: 82,
    difficulty: "Easy",
    duration: "6h 15m",
    enrolled: 1200,
    rating: 4.6,
    tags: ["API", "Backend", "Node.js"],
    instructor: "James Miller"
  },
  {
    id: 6,
    title: "Security Engineering",
    description: "Protect systems from modern cyber threats",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    matchScore: 78,
    difficulty: "Hard",
    duration: "18h 30m",
    enrolled: 890,
    rating: 4.8,
    tags: ["Security", "Cryptography", "Hacking"],
    instructor: "Lisa Park"
  }
]

const categories = [
  { id: "all", label: "All Courses", icon: Sparkles },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "quick", label: "Quick Wins", icon: Zap },
  { id: "challenges", label: "Challenges", icon: Target },
]

const difficultyColors = {
  Easy: { bg: "bg-[#10B981]/20", text: "text-[#10B981]", border: "border-[#10B981]/30" },
  Medium: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]", border: "border-[#F59E0B]/30" },
  Hard: { bg: "bg-[#FF0055]/20", text: "text-[#FF0055]", border: "border-[#FF0055]/30" },
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const difficultyStyle = difficultyColors[course.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative flex-shrink-0 w-[320px] md:w-[360px]"
    >
      <div className="glass-card overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
          
          {/* Match Score */}
          <motion.div 
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF4D00] to-[#FF0055] text-white text-sm font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            {course.matchScore}% Match
          </motion.div>
          
          {/* Bookmark */}
          <motion.button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isBookmarked 
                ? "bg-[#FF4D00] text-white" 
                : "bg-black/40 text-white hover:bg-black/60"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
          </motion.button>
          
          {/* Difficulty Badge */}
          <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-medium border ${difficultyStyle.bg} ${difficultyStyle.text} ${difficultyStyle.border}`}>
            {course.difficulty}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#FF4D00] transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-white/5 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolled.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-[#F59E0B]" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Instructor & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-sm text-muted-foreground">
              by <span className="text-foreground">{course.instructor}</span>
            </span>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF4D00]/10 text-[#FF4D00] text-sm font-medium hover:bg-[#FF4D00]/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4" />
              Start
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Carousel({ title, courses }: { title: string; courses: Course[] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll)
      return () => carousel.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 380
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg transition-colors ${
              canScrollLeft 
                ? "bg-white/5 hover:bg-white/10 text-foreground" 
                : "bg-white/5 text-muted-foreground cursor-not-allowed"
            }`}
            whileHover={canScrollLeft ? { scale: 1.05 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-lg transition-colors ${
              canScrollRight 
                ? "bg-white/5 hover:bg-white/10 text-foreground" 
                : "bg-white/5 text-muted-foreground cursor-not-allowed"
            }`}
            whileHover={canScrollRight ? { scale: 1.05 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div 
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course, index) => (
          <div key={course.id} className="snap-start">
            <CourseCard course={course} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

function AnimatedCounter({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" })
    return controls.stop
  }, [count, value])

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest))
  }, [rounded])

  return <span>{displayValue}</span>
}

export default function RecommendationsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const topMatches = [...courses].sort((a, b) => b.matchScore - a.matchScore).slice(0, 4)
  const trending = [...courses].sort((a, b) => b.enrolled - a.enrolled).slice(0, 4)
  const quickWins = courses.filter(c => c.difficulty === "Easy" || parseInt(c.duration) < 10)

  return (
    <main className="min-h-screen bg-[#0B0E14]">
      <Navigation />
      
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#FF0055]">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              AI Scout
            </h1>
          </div>
          <p className="text-muted-foreground">
            Personalized course recommendations powered by AI
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-streak mb-1">
                <AnimatedCounter value={156} />
              </div>
              <p className="text-sm text-muted-foreground">Courses Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-cyber mb-1">
                <AnimatedCounter value={95} />%
              </div>
              <p className="text-sm text-muted-foreground">Top Match Score</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#06B6D4] mb-1">
                <AnimatedCounter value={12} />
              </div>
              <p className="text-sm text-muted-foreground">New This Week</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#10B981] mb-1">
                <AnimatedCounter value={8} />
              </div>
              <p className="text-sm text-muted-foreground">In Your Watchlist</p>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-[#FF4D00] text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </motion.button>
          ))}
          
          <div className="flex-1" />
          
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-4 h-4" />
            Filters
          </motion.button>
        </motion.div>

        {/* Course Carousels */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Carousel title="🎯 Top Matches for You" courses={topMatches} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Carousel title="🔥 Trending Now" courses={trending} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Carousel title="⚡ Quick Wins" courses={quickWins} />
          </motion.div>

          {/* All Courses Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              All Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </main>
  )
}
