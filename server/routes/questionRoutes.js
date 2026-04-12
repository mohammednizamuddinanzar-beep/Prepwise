const express = require("express");
const router = express.Router();
const { addQuestion, getQuestionsByLesson } = require("../controllers/questionController");

router.post("/add", addQuestion);
router.get("/lesson/:lessonId", getQuestionsByLesson);

module.exports = router;