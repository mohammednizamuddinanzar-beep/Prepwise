const { GoogleGenerativeAI } = require("@google/generative-ai");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// fallback mock (if API not available)
const getMockCourse = (prompt) => ({
  title: `Course: ${prompt}`,
  description: `A course generated for ${prompt}`,
  subject: "General",
  lessons: [
    { title: "Intro", content: `Basics of ${prompt}` },
    { title: "Core Concepts", content: `Important concepts of ${prompt}` },
    { title: "Practice", content: `Hands-on practice for ${prompt}` },
    { title: "Advanced", content: `Advanced topics of ${prompt}` }
  ]
});

const generateCourseFromAI = async (prompt) => {
  if (!genAI) return getMockCourse(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fullPrompt = `
You are an expert curriculum designer.

Create a course for: "${prompt}"

Return ONLY valid JSON:
{
  "title": "",
  "description": "",
  "subject": "",
  "lessons": [
    { "title": "", "content": "" }
  ]
}
`;

  const result = await model.generateContent(fullPrompt);
  const text = result.response.text();

  const parsed = JSON.parse(text);
  return parsed;
};

const generateCourseFromPrompt = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.status(400).json({ message: "userId and prompt required" });
    }

    const aiCourse = await generateCourseFromAI(prompt);

    const course = await Course.create({
      title: aiCourse.title,
      description: aiCourse.description,
      subject: aiCourse.subject,
      createdBy: userId,
      isAIGenerated: true,
      sourcePrompt: prompt
    });

    const lessons = await Promise.all(
      aiCourse.lessons.map((l, i) =>
        Lesson.create({
          title: l.title,
          content: l.content,
          order: i + 1,
          course: course._id
        })
      )
    );

    course.lessons = lessons.map(l => l._id);
    await course.save();

    const populated = await Course.findById(course._id).populate("lessons");

    res.status(201).json(populated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateCourseFromPrompt };