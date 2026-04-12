const express = require('express');
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseById
} = require('../controllers/courseController');

router.post('/create', createCourse);

// ✅ NEW ROUTES
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

module.exports = router;