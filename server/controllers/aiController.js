const { GoogleGenerativeAI } = require("@google/generative-ai");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Question = require("../models/Question");

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// ─── Fallback for when Gemini API key is not set ─────────────────────────────
const getMockCourse = (prompt) => ({
  title: `${prompt}: A Complete Guide`,
  description: `A comprehensive course covering all key concepts of ${prompt}, from fundamentals to advanced applications.`,
  subject: prompt,
  lessons: [
    {
      title: `Introduction to ${prompt}`,
      content: `Welcome to this course on ${prompt}. This lesson introduces the foundational concepts you need to understand before diving deeper.\n\n${prompt} is a broad and important field used in many real-world scenarios. Understanding its core principles will allow you to build, analyze, and improve solutions effectively.\n\nIn this lesson, we explore the history, motivation, and basic terminology used throughout the field. By the end, you will have a clear mental model of what ${prompt} covers and why it matters.\n\nKey takeaway: every expert begins with understanding the fundamentals. This lesson is your starting point.`,
      questions: [
        { question: `What is ${prompt} primarily used for?`, options: [`Problem solving`, `Entertainment only`, `Making databases slower`, `Writing emails`], correctAnswer: `Problem solving` },
        { question: `${prompt} is considered an important skill in software engineering.`, options: [`True`, `False`], correctAnswer: `True` },
        { question: `The first step when learning ${prompt} is to understand its ______.`, options: [], correctAnswer: `fundamentals` },
      ]
    },
    {
      title: `Core Concepts of ${prompt}`,
      content: `This lesson dives into the core concepts that form the backbone of ${prompt}. Understanding these will help you solve problems systematically.\n\nEvery field has fundamental building blocks. In ${prompt}, these include key ideas, standard practices, and widely accepted methodologies. We break each one down with clear explanations and real-world examples.\n\nFor example, in most technical fields, data structures, logic, and abstraction play a critical role. In ${prompt} specifically, being able to reason from first principles allows you to adapt to new challenges without being lost.\n\nPractice Tip: After this lesson, try to identify one core concept in your daily work and apply what you've learned here.`,
      questions: [
        { question: `Which of the following is a core concept in ${prompt}?`, options: [`Abstraction`, `Random guessing`, `Ignoring edge cases`, `None of the above`], correctAnswer: `Abstraction` },
        { question: `Core concepts help engineers solve problems ______.`, options: [], correctAnswer: `systematically` },
        { question: `Building on fundamentals before tackling advanced topics is a recommended approach.`, options: [`True`, `False`], correctAnswer: `True` },
      ]
    },
    {
      title: `Practical Applications of ${prompt}`,
      content: `Theory without practice is incomplete. This lesson explores real-world applications of ${prompt} and how professionals use it every day.\n\nFrom building systems to analyzing performance, ${prompt} appears in many aspects of software engineering. We look at specific use cases and how the core concepts translate to actual implementations.\n\nCase Study: A software team used principles from ${prompt} to reduce system downtime by 40%. By applying systematic reasoning and structured approaches, they identified a bottleneck that had been overlooked for months.\n\nBy the end of this lesson, you'll be able to identify opportunities to apply ${prompt} in your own projects and see clear paths from theory to practice.`,
      questions: [
        { question: `Which of these describes a practical application of ${prompt}?`, options: [`Building efficient systems`, `Avoiding all complexity`, `Writing longer code`, `Ignoring performance`], correctAnswer: `Building efficient systems` },
        { question: `Real-world use of ${prompt} often involves ______ from theory to implementation.`, options: [], correctAnswer: `translating` },
        { question: `Case studies are useful for understanding how concepts are applied in real scenarios.`, options: [`True`, `False`], correctAnswer: `True` },
      ]
    },
    {
      title: `Advanced Topics in ${prompt}`,
      content: `Now that you understand the basics and practical applications, this lesson introduces advanced patterns and techniques used by expert practitioners.\n\nAdvanced ${prompt} involves deeper analysis, optimization strategies, and handling complex edge cases. These skills separate good engineers from great ones.\n\nTopics covered include: performance optimization, handling scale, error resilience, and best practices adopted by industry leaders.\n\nRemember: advanced knowledge is built on strong fundamentals. If any concept here feels unclear, revisit the earlier lessons before proceeding.`,
      questions: [
        { question: `What distinguishes an advanced ${prompt} practitioner from a beginner?`, options: [`Optimization and edge case handling`, `Knowing more syntax`, `Writing more lines of code`, `Avoiding documentation`], correctAnswer: `Optimization and edge case handling` },
        { question: `Advanced topics in ${prompt} include handling ______ and performance.`, options: [], correctAnswer: `scale` },
        { question: `Advanced skills are best learned after mastering the fundamentals.`, options: [`True`, `False`], correctAnswer: `True` },
      ]
    }
  ]
});

// ─── Gemini AI generation with strict JSON prompt ─────────────────────────────
const generateCourseFromAI = async (prompt) => {
  if (!genAI) return getMockCourse(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = `
You are an expert curriculum designer and educator.

Create a comprehensive, educational course for the topic: "${prompt}"

The response MUST be ONLY valid JSON — no markdown, no code fences, no explanation. Start directly with {

Use this exact schema:
{
  "title": "Full course title",
  "description": "2-3 sentence course overview",
  "subject": "${prompt}",
  "lessons": [
    {
      "title": "Lesson title",
      "content": "At least 4 paragraphs of detailed, educational content. Include real explanations, examples, and insights. DO NOT use placeholder text. Each paragraph should be separated by a blank line (\\n\\n).",
      "questions": [
        {
          "question": "A clear quiz question",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Option A"
        },
        {
          "question": "A fill-in-the-blank question where the answer is a single word or phrase",
          "options": [],
          "correctAnswer": "the correct word or phrase"
        }
      ]
    }
  ]
}

Requirements:
- Include 4 to 6 lessons
- Each lesson must have rich, readable educational content (minimum 3 paragraphs, each 2-4 sentences)
- Each lesson must have 3 to 5 quiz questions
- Mix MCQ (options array with 3-4 choices) and fill-in-the-blank (empty options array)
- correctAnswer for MCQ must exactly match one of the options strings
- correctAnswer for fill-in-the-blank should be a short answer (1-5 words)
- Content must be genuinely educational — not placeholder text

Respond with ONLY the JSON object. No other text.
`;

  try {
    const result = await model.generateContent(fullPrompt);
    let text = result.response.text().trim();

    // Strip markdown code fences if present
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    const parsed = JSON.parse(text);

    // Validate structure — if Gemini omits questions, use mock lesson questions
    if (!parsed.lessons || parsed.lessons.length === 0) {
      return getMockCourse(prompt);
    }

    parsed.lessons = parsed.lessons.map((lesson, i) => ({
      ...lesson,
      content: lesson.content && lesson.content.length > 50 ? lesson.content : getMockCourse(prompt).lessons[i % 4].content,
      questions: Array.isArray(lesson.questions) && lesson.questions.length > 0
        ? lesson.questions
        : getMockCourse(prompt).lessons[i % 4].questions
    }));

    return parsed;
  } catch (err) {
    console.error("Gemini parse error, using mock:", err.message);
    return getMockCourse(prompt);
  }
};

// ─── Main controller ──────────────────────────────────────────────────────────
const generateCourseFromPrompt = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ message: "userId and prompt required" });
    }

    const aiCourse = await generateCourseFromAI(prompt);

    // 1. Create course (no lessons yet)
    const course = await Course.create({
      title: aiCourse.title,
      description: aiCourse.description,
      subject: aiCourse.subject || prompt,
      createdBy: userId,
      isAIGenerated: true,
      sourcePrompt: prompt,
      lessons: []
    });

    // 2. Create lessons + questions for each lesson sequentially
    const lessonIds = [];

    for (let i = 0; i < aiCourse.lessons.length; i++) {
      const l = aiCourse.lessons[i];

      const lesson = await Lesson.create({
        title: l.title,
        content: l.content,
        order: i + 1,
        course: course._id
      });

      lessonIds.push(lesson._id);

      // 3. Create questions linked to this lesson
      if (Array.isArray(l.questions) && l.questions.length > 0) {
        const validQuestions = l.questions.filter(
          (q) => q.question && q.correctAnswer
        );

        await Promise.all(
          validQuestions.map((q) =>
            Question.create({
              question: q.question,
              options: Array.isArray(q.options) ? q.options : [],
              correctAnswer: q.correctAnswer,
              lesson: lesson._id
            })
          )
        );
      }
    }

    // 4. Push all lesson IDs into course
    course.lessons = lessonIds;
    await course.save();

    // 5. Return fully populated course
    const populated = await Course.findById(course._id).populate("lessons");

    res.status(201).json(populated);
  } catch (error) {
    console.error("AI course generation error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateCourseFromPrompt };