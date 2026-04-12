const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

const addLesson = async (req, res) => {
  try {
    const { title, content, course, order } = req.body;

    const lesson = await Lesson.create({ title, content, course, order });

    await Course.findByIdAndUpdate(course, {
      $push: { lessons: lesson._id },
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addLesson };