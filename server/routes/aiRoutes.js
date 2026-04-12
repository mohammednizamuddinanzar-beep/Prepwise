const express = require("express");
const router = express.Router();

const { generateCourseFromPrompt } = require("../controllers/aiController");

router.post("/generate", generateCourseFromPrompt);

module.exports = router;