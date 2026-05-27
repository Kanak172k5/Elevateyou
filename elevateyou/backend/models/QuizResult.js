const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  level: { type: String, enum: ['Basic', 'Intermediate', 'Professional'], required: true },
  score: { type: Number, required: true },
  weakAreas: [{ type: String }],
  suggestions: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
