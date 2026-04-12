const Course = require('../models/Course');

const createCourse = async (req, res) => {
  try {
    const { title, description, subject, createdBy } = req.body;

    if (!title || !subject)
      return res.status(400).json({ message: 'Title and subject are required.' });

    const course = await Course.create({ title, description, subject, createdBy });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons');

    if (!course)
      return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCourse, getAllCourses, getCourseById };