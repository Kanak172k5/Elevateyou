const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const OutfitScan = require('../models/OutfitScan');
const { saveData } = require('../utils/storage');
const { analyzeImage, generateText, extractJSON } = require('../utils/aiService');

const outfitFallbacks = {
  Interview: {
    score: 8,
    summary: "Your outfit shows a professional approach suitable for an interview setting. Based on your input, you have made thoughtful style choices.",
    strengths: ["Professional color choice that signals credibility", "Appropriate formality level for the context", "Clean and well-maintained appearance", "Good footwear selection for the occasion"],
    improvements: ["Consider adding a structured blazer or jacket for authority", "Ensure all clothes are freshly ironed with no creases", "A subtle watch or accessory can elevate the overall look"],
    risks: ["Overly casual pieces can undermine first impressions", "Bright or distracting patterns may shift focus away from you", "Wrinkled or ill-fitted clothing signals lack of preparation"],
    groomingTips: ["Keep hair neatly styled and away from face", "Ensure shoes are clean and polished", "Subtle fragrance only — nothing overpowering in a closed room"]
  },
  Presentation: {
    score: 7,
    summary: "Your presentation outfit strikes a good balance between professional and approachable. This style works well for engaging an audience.",
    strengths: ["Smart casual level is appropriate for most presentations", "Solid colors help you stand out against slide backgrounds", "Comfortable enough for standing and moving around", "Approachable yet professional appearance"],
    improvements: ["Add a blazer to instantly increase perceived authority", "Choose colors that contrast well with your slide theme", "Avoid any noisy jewelry that moves when you gesture"],
    risks: ["White shirts can blend into white presentation backgrounds", "Overly formal attire can create distance with your audience", "Uncomfortable shoes will affect your confidence and posture"],
    groomingTips: ["Check appearance in a mirror right before presenting", "Keep hair secured so it does not fall over your face", "Minimal accessories to avoid distraction during gestures"]
  },
  Party: {
    score: 9,
    summary: "Your outfit is fun, stylish and perfectly appropriate for a social occasion. You have made choices that balance personality with appropriateness.",
    strengths: ["Shows personality while remaining tasteful", "Good balance of style and comfort for a social setting", "Color and style choices are fun and occasion-appropriate", "Accessory choices add character without overdoing it"],
    improvements: ["A statement piece like bold shoes or a jacket could elevate this", "Layer with a stylish outer piece for versatility", "Consider adding one bold accessory as a conversation starter"],
    risks: ["Overly formal attire can make you feel out of place", "Too casual may seem like you did not make an effort", "Uncomfortable clothing affects your mood and confidence"],
    groomingTips: ["Style your hair in a way that holds throughout the evening", "A good fragrance is essential for social events", "Keep a small touch-up kit for longer events"]
  },
  Wedding: {
    score: 8,
    summary: "Your wedding guest outfit is elegant and respectful of the occasion. You have made appropriate choices that honor the event without overshadowing the couple.",
    strengths: ["Formality level is appropriate for a wedding", "Color choices are respectful and occasion-suitable", "Overall presentation shows effort and consideration", "Style is elegant without being overdressed"],
    improvements: ["Ensure the outfit is absolutely wrinkle-free for photos", "Add elegant accessories to complete the formal look", "A pocket square or corsage adds a celebratory touch"],
    risks: ["Never wear white, ivory or cream to a wedding", "Overly casual outfits disrespect the formality of the occasion", "Uncomfortable shoes are a problem at events with dancing"],
    groomingTips: ["Get a fresh haircut or style a few days before", "Dress shoes must be polished to a shine", "Keep formal grooming standards throughout the day"]
  },
  Office: {
    score: 7,
    summary: "Your office outfit is professional and workplace appropriate. The choices you have made align well with a business environment.",
    strengths: ["Professional and clean style choice", "Color palette is suitable for a professional setting", "Footwear choice aligns with workplace standards", "Appropriate level of formality for the office"],
    improvements: ["Ensure consistent fit across all pieces (no bagginess)", "A professional timepiece is a good addition", "Matching your leathers (belt and shoes) adds polish"],
    risks: ["Overly flashy accessories can be distracting", "Wrinkled shirts undermine your professional image", "Dirty or unpolished shoes are noticeable in meetings"],
    groomingTips: ["Maintain a clean, professional haircut", "Keep nails clean and neat", "A subtle, professional scent is appropriate"]
  }
};

// POST /api/outfit/scan-image
// Body: { event: string, imageBase64: string (data URI) }
router.post('/scan-image', auth, async (req, res) => {
  const { event, imageBase64 } = req.body;

  if (!imageBase64 || !event) {
    return res.status(400).json({ message: 'Image and event are required.' });
  }

  try {
    const prompt = `You are a professional fashion and style consultant. Analyze this outfit image for a ${event} event. 
Return a JSON object with EXACTLY these keys:
{
  "score": number (1-10),
  "summary": "overall assessment",
  "strengths": ["list", "of", "strengths"],
  "improvements": ["list", "of", "improvements"],
  "risks": ["potential", "risks"],
  "groomingTips": ["tips"]
}`;

    const aiText = await analyzeImage(imageBase64, prompt);
    const aiResData = extractJSON(aiText);

    const savedResult = {
      userId: req.userData.userId,
      event,
      inputType: 'image', // Critical: Added for schema validation
      aiResponse: aiResData,
      date: new Date()
    };

    // Save to DB if connected, else filesystem
    if (mongoose.connection.readyState === 1) {
      await OutfitScan.create(savedResult);
    } else {
      console.log('MongoDB not connected, saving to local JSON');
      saveData('outfit_scans.json', savedResult);
    }

    res.status(200).json(savedResult);

  } catch (error) {
    console.error('Image analysis error DETAILS:', error);
    // Use fallback based on event
    const fallback = outfitFallbacks[event] || outfitFallbacks['Office'];
    res.status(200).json({
      aiResponse: fallback,
      isFallback: true,
      message: `AI Error: ${error.message}. Using offline analysis.`
    });
  }
});

// POST /api/outfit/scan-text
// Body: { event: string, outfitDescription: string }
router.post('/scan-text', auth, async (req, res) => {
  const { event, outfitDescription } = req.body;

  if (!outfitDescription || !event) {
    return res.status(400).json({ message: 'Description and event are required.' });
  }

  try {
    const systemPrompt = `You are a professional fashion consultant. Analyze the text description of an outfit and provide structured feedback.`;
    const prompt = `Analyzer this outfit for a ${event}: ${outfitDescription}. 
Return a JSON object with EXACTLY these keys:
{
  "score": number (1-10),
  "summary": "string",
  "strengths": [],
  "improvements": [],
  "risks": [],
  "groomingTips": []
}`;

    const aiText = await generateText(prompt, systemPrompt);
    const aiResData = extractJSON(aiText);

    const savedResult = {
      userId: req.userData.userId,
      event,
      inputType: 'text', // Critical: Added for schema validation
      aiResponse: aiResData,
      date: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      await OutfitScan.create(savedResult);
    } else {
      saveData('outfit_scans.json', savedResult);
    }

    res.status(200).json(savedResult);

  } catch (error) {
    console.error('Description analysis error:', error);
    const fallback = outfitFallbacks[event] || outfitFallbacks['Office'];
    res.status(200).json({
      aiResponse: fallback,
      isFallback: true
    });
  }
});

// GET /api/outfit/history/:userId
router.get('/history/:userId', auth, async (req, res) => {
  try {
    let history = [];
    
    if (mongoose.connection.readyState === 1) {
      try {
        history = await OutfitScan.find({ userId: req.params.userId }).sort({ date: -1 });
      } catch (e) {
        console.error('DB Fetch error, falling back to JSON:', e);
      }
    }

    // Combine with local data for seamless transition
    const { readData } = require('../utils/storage');
    const localHistory = readData('outfit_scans').filter(s => s.userId === req.params.userId);
    
    // Use a Map to de-duplicate if necessary, or just concat
    const combined = [...history, ...localHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(combined);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(200).json([]);
  }
});

module.exports = router;
