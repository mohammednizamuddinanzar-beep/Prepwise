const Question = require("../models/Question");

const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, lesson } = req.body;
    const newQuestion = await Question.create({ question, options, correctAnswer, lesson });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsByLesson = async (req, res) => {
  try {
    const questions = await Question.find({ lesson: req.params.lessonId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addQuestion, getQuestionsByLesson };