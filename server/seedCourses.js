const mongoose = require("mongoose")
require("dotenv").config()

const Course = require("./models/Course")
const Lesson = require("./models/Lesson")
const Question = require("./models/Question")

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("DB connection error:", err)
    process.exit(1)
  })

const seedData = async () => {
  try {
    // Clear old data
    await Course.deleteMany()
    await Lesson.deleteMany()
    await Question.deleteMany()
    console.log("🗑️  Cleared old data")

    // ================================
    // COURSE 1: DSA BASICS
    // ================================
    const dsaCourse = await Course.create({
      title: "DSA Basics",
      description: "Master core data structures and algorithmic thinking from arrays to stacks and queues.",
      subject: "Data Structures & Algorithms",
      isAIGenerated: false,
    })

    const dsaLessonsData = [
      {
        title: "Arrays",
        order: 1,
        content: `Arrays are one of the most fundamental data structures in programming.

An array stores elements in contiguous memory locations, which allows direct access to any element using its index in O(1) time.

Key Properties:
- Fixed size (in most languages)
- Elements are of the same type
- Zero-indexed: first element is at index 0
- Fast random access: O(1)
- Slow insertion/deletion at arbitrary positions: O(n)

Common Operations:
- Access: arr[i]       → O(1)
- Search: linear scan  → O(n)
- Insert at end:       → O(1) amortized (dynamic arrays)
- Insert at position:  → O(n) (shift required)
- Delete at position:  → O(n) (shift required)

Example (JavaScript):
const arr = [10, 20, 30, 40, 50];
console.log(arr[0]); // 10 — O(1) access
arr.push(60);        // O(1) — insert at end
arr.splice(2, 0, 25); // O(n) — insert at index 2

Use arrays when you need fast indexed access and the size is predictable.`,
        questions: [
          {
            question: "What is the time complexity of accessing an element in an array by index?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correctAnswer: "O(1)",
          },
          {
            question: "Which data structure stores elements in contiguous memory locations?",
            options: ["Linked List", "Array", "Binary Tree", "Hash Map"],
            correctAnswer: "Array",
          },
          {
            question: "Array indexing in most programming languages starts from ______",
            options: [],
            correctAnswer: "0",
          },
          {
            question: "What is the time complexity of inserting an element at a specific position in an array?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correctAnswer: "O(n)",
          },
        ],
      },
      {
        title: "Time Complexity",
        order: 2,
        content: `Time complexity describes how an algorithm's runtime grows relative to its input size (n).

We use Big O notation to express this growth:

Common Complexities (fastest to slowest):
O(1)       — Constant   : array index access
O(log n)   — Logarithmic: binary search
O(n)       — Linear     : linear search, single loop
O(n log n) — Linearithmic: merge sort, heap sort
O(n²)      — Quadratic  : nested loops, bubble sort
O(2ⁿ)      — Exponential: recursive subsets

Rules for Analysis:
1. Drop constants:   3n → O(n)
2. Drop lower terms: n² + n → O(n²)
3. Worst case matters most

Examples:
// O(1) — constant, no loops
function getFirst(arr) { return arr[0]; }

// O(n) — grows linearly with input
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) — nested loops
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = 0; j < arr.length - i - 1; j++)
      if (arr[j] > arr[j+1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
}

Understanding time complexity is essential for writing efficient software.`,
        questions: [
          {
            question: "Which time complexity is the fastest?",
            options: ["O(n²)", "O(n)", "O(log n)", "O(n log n)"],
            correctAnswer: "O(log n)",
          },
          {
            question: "O(1) is called ______ time complexity",
            options: [],
            correctAnswer: "constant",
          },
          {
            question: "What is the time complexity of binary search?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
            correctAnswer: "O(log n)",
          },
        ],
      },
      {
        title: "Stack & Queue",
        order: 3,
        content: `Stacks and Queues are linear data structures used everywhere in computing.

━━━━━━━━━━━━━━━━━━━━━━━
STACK — Last In, First Out (LIFO)
━━━━━━━━━━━━━━━━━━━━━━━
Think of a stack of plates: you add to the top and take from the top.

Operations:
- push(x)  — add to top    → O(1)
- pop()    — remove top    → O(1)
- peek()   — view top      → O(1)

Use Cases: function call stack, undo/redo, balanced parentheses check

JavaScript Example:
const stack = [];
stack.push(1);   // [1]
stack.push(2);   // [1, 2]
stack.push(3);   // [1, 2, 3]
stack.pop();     // returns 3 → [1, 2]

━━━━━━━━━━━━━━━━━━━━━━━
QUEUE — First In, First Out (FIFO)
━━━━━━━━━━━━━━━━━━━━━━━
Think of a queue at a ticket counter: first person in is first person served.

Operations:
- enqueue(x) — add to rear  → O(1)
- dequeue()  — remove front → O(1)
- front()    — view front   → O(1)

Use Cases: BFS graph traversal, task scheduling, print spooling

JavaScript Example:
const queue = [];
queue.push("A");    // ["A"]
queue.push("B");    // ["A", "B"]
queue.push("C");    // ["A", "B", "C"]
queue.shift();      // returns "A" → ["B", "C"]`,
        questions: [
          {
            question: "A Stack follows which order?",
            options: ["FIFO", "LIFO", "Random", "Sorted"],
            correctAnswer: "LIFO",
          },
          {
            question: "A Queue follows ______ order",
            options: [],
            correctAnswer: "FIFO",
          },
          {
            question: "Which data structure is used for the function call stack in programming languages?",
            options: ["Queue", "Array", "Stack", "Linked List"],
            correctAnswer: "Stack",
          },
        ],
      },
    ]

    for (const lessonData of dsaLessonsData) {
      const { questions, ...lessonFields } = lessonData
      const lesson = await Lesson.create({ ...lessonFields, course: dsaCourse._id })

      // Push lesson ID into course.lessons
      await Course.findByIdAndUpdate(dsaCourse._id, {
        $push: { lessons: lesson._id },
      })

      // Create questions for this lesson
      for (const q of questions) {
        await Question.create({ ...q, lesson: lesson._id })
      }
    }

    console.log("✅ DSA Basics course seeded")

    // ================================
    // COURSE 2: WEB DEVELOPMENT BASICS
    // ================================
    const webCourse = await Course.create({
      title: "Web Development Basics",
      description: "Build a strong foundation in HTML, CSS, and JavaScript — the three pillars of the web.",
      subject: "Web Development",
      isAIGenerated: false,
    })

    const webLessonsData = [
      {
        title: "HTML Basics",
        order: 1,
        content: `HTML (HyperText Markup Language) is the standard language for creating web pages.

HTML uses elements (tags) to structure content. Every web page you visit is built on HTML.

Core Concepts:
━━━━━━━━━━━━━━━━━━
1. Document Structure
Every HTML file starts with a doctype and has head/body sections:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>

2. Common Tags:
<h1>–<h6>  → Headings (h1 is largest)
<p>        → Paragraph
<a href="">  → Hyperlink
<img src=""> → Image
<div>      → Block container
<span>     → Inline container
<ul>/<ol>  → Unordered/Ordered list
<li>       → List item
<form>     → Input form
<input>    → User input field
<button>   → Clickable button

3. Attributes:
Tags can have attributes for extra info:
<a href="https://google.com" target="_blank">Visit Google</a>
<img src="logo.png" alt="Logo" width="200">

HTML defines the STRUCTURE — CSS styles it, JavaScript makes it interactive.`,
        questions: [
          {
            question: "What does HTML stand for?",
            options: [
              "HyperText Markup Language",
              "HighText Machine Language",
              "HyperTool Multi Language",
              "HyperText Modern Layout",
            ],
            correctAnswer: "HyperText Markup Language",
          },
          {
            question: "HTML is primarily used for the ______ of web pages",
            options: [],
            correctAnswer: "structure",
          },
          {
            question: "Which tag is used to create the largest heading in HTML?",
            options: ["<h6>", "<heading>", "<h1>", "<title>"],
            correctAnswer: "<h1>",
          },
          {
            question: "Which tag is used to create a hyperlink in HTML?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correctAnswer: "<a>",
          },
        ],
      },
      {
        title: "CSS Basics",
        order: 2,
        content: `CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.

CSS Syntax:
selector {
  property: value;
}

Example:
h1 {
  color: blue;
  font-size: 32px;
  font-weight: bold;
}

━━━━━━━━━━━━━━━━━━
3 Ways to Add CSS:
━━━━━━━━━━━━━━━━━━
1. Inline:    <p style="color: red;">Hello</p>
2. Internal:  <style> p { color: red; } </style> (in <head>)
3. External:  <link rel="stylesheet" href="styles.css"> ← preferred

Core Properties:
color          → text color
background     → background color/image
font-size      → text size
font-family    → typeface
margin         → space outside element
padding        → space inside element
border         → element border
width/height   → element dimensions
display        → layout (block, inline, flex, grid)

CSS Box Model:
Every element is a box:
┌──────────────────┐
│     MARGIN       │
│  ┌────────────┐  │
│  │  BORDER    │  │
│  │ ┌────────┐ │  │
│  │ │PADDING │ │  │
│  │ │ CONTENT│ │  │
│  │ └────────┘ │  │
│  └────────────┘  │
└──────────────────┘

Selectors:
element     → p { }        (all <p> tags)
.class      → .card { }   (elements with class="card")
#id         → #header { } (element with id="header")
*           → * { }       (all elements)`,
        questions: [
          {
            question: "What does CSS stand for?",
            options: [
              "Cascading Style Sheets",
              "Computer Style Scripts",
              "Creative Styling System",
              "Cascading Script Sheets",
            ],
            correctAnswer: "Cascading Style Sheets",
          },
          {
            question: "CSS is used for ______ web pages",
            options: [],
            correctAnswer: "styling",
          },
          {
            question: "Which CSS selector targets an element with a specific class name?",
            options: ["#className", ".className", "*className", "className"],
            correctAnswer: ".className",
          },
        ],
      },
      {
        title: "JavaScript Basics",
        order: 3,
        content: `JavaScript (JS) is the programming language of the web — it makes pages interactive and dynamic.

Core Concepts:
━━━━━━━━━━━━━━━━━━━━━━━
1. Variables
━━━━━━━━━━━━━━━━━━━━━━━
let name = "Alice";      // can be reassigned
const PI = 3.14;         // cannot be reassigned
var age = 25;            // old, avoid using

2. Data Types
━━━━━━━━━━━━━━━━━━━━━━━
String:  "hello", 'world'
Number:  42, 3.14
Boolean: true, false
Array:   [1, 2, 3]
Object:  { key: "value" }
null / undefined

3. Functions
━━━━━━━━━━━━━━━━━━━━━━━
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Bob")); // Hello, Bob!

// Arrow function (modern syntax)
const greet = (name) => \`Hello, \${name}!\`;

4. DOM Manipulation
━━━━━━━━━━━━━━━━━━━━━━━
JS can change the page content:
// Select element
const heading = document.getElementById("title");

// Change content
heading.textContent = "New Title";

// Add event listener
document.getElementById("btn").addEventListener("click", () => {
  alert("Button clicked!");
});

5. Conditionals & Loops
━━━━━━━━━━━━━━━━━━━━━━━
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

JavaScript runs in the browser and also on the server (Node.js).`,
        questions: [
          {
            question: "Which keyword is used to declare a constant variable in JavaScript?",
            options: ["var", "let", "const", "def"],
            correctAnswer: "const",
          },
          {
            question: "JavaScript runs in the ______",
            options: [],
            correctAnswer: "browser",
          },
          {
            question: "What does DOM stand for?",
            options: [
              "Document Object Model",
              "Data Object Management",
              "Dynamic Object Module",
              "Document Oriented Model",
            ],
            correctAnswer: "Document Object Model",
          },
          {
            question: "JavaScript is used to add ______ to web pages",
            options: [],
            correctAnswer: "interactivity",
          },
        ],
      },
    ]

    for (const lessonData of webLessonsData) {
      const { questions, ...lessonFields } = lessonData
      const lesson = await Lesson.create({ ...lessonFields, course: webCourse._id })

      await Course.findByIdAndUpdate(webCourse._id, {
        $push: { lessons: lesson._id },
      })

      for (const q of questions) {
        await Question.create({ ...q, lesson: lesson._id })
      }
    }

    console.log("✅ Web Development Basics course seeded")
    console.log("🔥 All courses seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Seed error:", error.message)
    process.exit(1)
  }
}

seedData()