const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateText, extractJSON } = require('../utils/aiService');

// POST /api/event/guide
router.post('/guide', auth, async (req, res) => {
  const { eventType, guideType } = req.body;

  try {
    const prompt = `Provide a detailed ${guideType} guide for a ${eventType}. 
    If guideType is 'outfit', include: clothing suggestions, color combinations, footwear, accessories, and a grooming checklist.
    If guideType is 'communication', include: conversation starters, tone and voice tips, sample answers, and mistakes to avoid.
    If guideType is 'bodyLanguage', include: posture, eye contact, gestures, facial expressions, and walking confidence.
    Return only a structured JSON object with fields as appropriate for the content. Do NOT use markdown code blocks.`;

    const aiText = await generateText(prompt, "You are a professional life coach and style consultant.");
    res.status(200).json(extractJSON(aiText));
  } catch (error) {
    console.error('Event Guide error:', error);
    res.status(500).json({ message: 'Error generating guide' });
  }
});

module.exports = router;
