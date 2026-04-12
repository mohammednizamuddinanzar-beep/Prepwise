const express = require('express');
const router = express.Router();

const { addLesson } = require('../controllers/lessonController');

router.post('/add', addLesson);

module.exports = router;