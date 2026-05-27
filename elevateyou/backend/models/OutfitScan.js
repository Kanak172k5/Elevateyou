const mongoose = require('mongoose');

const outfitScanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: String, required: true },
  inputType: { type: String, enum: ['image', 'text'], required: true },
  imageUrl: { type: String },
  outfitDescription: { type: String },
  aiResponse: {
    summary: { type: String },
    strengths: [String],
    risks: [String],
    improvements: [String],
    groomingTips: [String],
    score: { type: Number, min: 0, max: 10 }
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OutfitScan', outfitScanSchema);
