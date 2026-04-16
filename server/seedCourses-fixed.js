const mongoose = require("mongoose")
require("dotenv").config()

const Course = require("./models/Course")
const Lesson = require("./models/Lesson")
const Question = require("./models/Question")

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

const seedData = async () => {
  try {
    await Course.deleteMany()
    await Lesson.deleteMany()
    await Question.deleteMany()

    // COURSE 1: DSA Basics
    const dsaCourse = await Course.create({
      title: "DSA Basics",
      description: "Learn core data structures and problem solving",
      subject: "Data Structures & Algorithms"
    })

    const dsaLessons = [
      {
        title: "Arrays",
        content: "Arrays store elements in contiguous memory locations and allow fast access using index."
      },
      {
        title: "Time Complexity",
        content: "Time complexity measures how fast an algorithm runs as input size grows."
      },
      {
        title: "Stack & Queue",
        content: "Stack follows LIFO. Queue follows FIFO."
      }
    ]

    for (let lessonData of dsaLessons) {
      const lesson = await Lesson.create({
        ...lessonData,
        course: dsaCourse._id
      })

      let questions = []

      if (lesson.title === "Arrays") {
        questions = [
          {
            question: "Time complexity of array access?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correctAnswer: "O(1)"
          },
          {
            question: "Which uses contiguous memory?",
            options: ["Linked List", "Array", "Stack", "Queue"],
            correctAnswer: "Array"
          },
          {
            question: "Array indexing starts from ______",
            correctAnswer: "0"
          }
        ]
      }

      if (lesson.title === "Time Complexity") {
        questions = [
          {
            question: "Which is fastest?",
            options: ["O(n²)", "O(n)", "O(log n)", "O(n log n)"],
            correctAnswer: "O(log n)"
          },
          {
            question: "O(1) is called ______ complexity",
            correctAnswer: "constant"
          }
        ]
      }

      if (lesson.title === "Stack & Queue") {
        questions = [
          {
            question: "Stack follows?",
            options: ["FIFO", "LIFO"],
            correctAnswer: "LIFO"
          },
          {
            question: "Queue follows ______",
            correctAnswer: "FIFO"
          }
        ]
      }

      for (let q of questions) {
        await Question.create({
          ...q,
          lesson: lesson._id
        })
      }
    }

    // COURSE 2: Web Dev
    const webCourse = await Course.create({
      title: "Web Development Basics",
      description: "Learn HTML, CSS, and JavaScript fundamentals",
      subject: "Web Development"
    })

    const webLessons = [
      {
        title: "HTML Basics",
        content: "HTML structures web pages using tags like <h1>, <p>, <div>."
      },
      {
        title: "CSS Basics",
        content: "CSS is used for styling web pages like colors, layouts, and fonts."
      },
      {
        title: "JavaScript Basics",
        content: "JavaScript adds interactivity to web pages."
      }
    ]

    for (let lessonData of webLessons) {
      const lesson = await Lesson.create({
        ...lessonData,
        course: webCourse._id
      })

      let questions = []

      if (lesson.title === "HTML Basics") {
        questions = [
          {
            question: "What does HTML stand for?",
            options: [
              "HyperText Markup Language",
              "HighText Machine Language",
              "HyperTool Multi Language"
            ],
            correctAnswer: "HyperText Markup Language"
          },
          {
            question: "HTML is used for ______ of web pages",
            correctAnswer: "structure"
          }
        ]
      }

      if (lesson.title === "CSS Basics") {
        questions = [
          {
            question: "CSS is used for?",
            options: ["Logic", "Styling", "Database"],
            correctAnswer: "Styling"
          },
          {
            question: "CSS stands for ______",
            correctAnswer: "Cascading Style Sheets"
          }
        ]
      }

      if (lesson.title === "JavaScript Basics") {
        questions = [
          {
            question: "JavaScript is used for?",
            options: ["Styling", "Structure", "Interactivity"],
            correctAnswer: "Interactivity"
          },
          {
            question: "JavaScript runs in the ______",
            correctAnswer: "browser"
          }
        ]
      }

      for (let q of questions) {
        await Question.create({
          ...q,
          lesson: lesson._id
        })
      }
    }

    console.log("✅ Seeding Complete!")
    process.exit()
  } catch (error) {
    console.error("❌ Seeding Error:", error)
    process.exit(1)
  }
}

seedData()
