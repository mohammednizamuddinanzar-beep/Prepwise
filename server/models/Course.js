// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title:          { type: String, required: true, trim: true },
    description:    { type: String, trim: true },
    subject:        { type: String, required: true, trim: true },

    createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    lessons:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],

    isAIGenerated:  { type: Boolean, default: false },
    sourcePrompt:   { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);