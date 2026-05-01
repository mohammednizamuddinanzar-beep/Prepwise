const Question = require("../models/Question");
const User = require("../models/User");

const submitQuiz = async (req, res) => {
  try {
    const { userId, lessonId, answers } = req.body;

    const questions = await Question.find({ lesson: lessonId });

    let correct = 0;
    answers.forEach(({ questionId, selectedAnswer }) => {
      const question = questions.find((q) => q._id.toString() === questionId);
      if (question && question.correctAnswer === selectedAnswer) {
        correct++;
      }
    });

    const total = questions.length;
    const score = total > 0 ? Math.floor((correct / total) * 100) : 0;

    // Gamification: Update user XP, level, streak
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scoreNum = Math.floor(score);
    const newXp = Math.floor(user.xp) + scoreNum;
    const newLevel = Math.floor(newXp / 100) + 1;

    // Streak logic
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart.getTime() - 86400000);
    let newStreak = 1;
    if (user.lastSubmission && new Date(user.lastSubmission) >= yesterdayStart && new Date(user.lastSubmission) < todayStart) {
      newStreak = user.streak + 1;
    }

    await User.findByIdAndUpdate(
      userId,
      { 
        xp: newXp, 
        level: newLevel, 
        streak: newStreak, 
        lastSubmission: now 
      },
      { new: true }
    );

    res.status(200).json({ 
      totalQuestions: total, 
      correctAnswers: correct, 
      score: scoreNum,
      updated: {
        xp: newXp,
        level: newLevel,
        streak: newStreak
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitQuiz };