const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const QuizResult = require('../models/QuizResult');
const { saveData } = require('../utils/storage');
const { generateText, extractJSON } = require('../utils/aiService');

const chatFallbacks = {
    // ... (keeping fallbacks)
  'Interview Simulation': [
    "Great answer! For a stronger response, try using the STAR method — Situation, Task, Action, Result. This gives your answers clear structure. Now, tell me about a time you faced a challenge at work or college and how you handled it.",
    "Good start! Interviewers love specific examples. Can you quantify that result? For instance, 'I improved team efficiency by 30%' is much stronger than 'I improved efficiency'. Try again with a number.",
    "Solid response. One tip — always end your answer by connecting back to the role you are applying for. Why does that experience make you the right fit? Let us try another question: What is your greatest professional strength?",
    "Excellent structure! Now let us try a tricky one: Where do you see yourself in 5 years? Remember — align your answer with the company's growth, not just personal goals.",
    "Good confidence in that answer. For technical interviews, always think out loud — interviewers want to see your thought process, not just the final answer. What area of your skills are you currently improving?"
  ],
  'Grammar Correction': [
    "✏️ ANALYSIS: Your sentence has been reviewed.\n\n✅ CORRECTED VERSION: Please share your sentence and I will identify any grammar errors, explain what was wrong, and provide a professional rewrite.\n\n💡 TIP: Common errors include subject-verb agreement, incorrect tense usage, and missing articles (a, an, the).",
    "✏️ GRAMMAR TIP: Remember that 'I' is always capitalized. Contractions like don't, can't, and won't need apostrophes. Please type your sentence and I will correct it fully.",
    "✏️ QUICK RULE: In professional writing, avoid starting sentences with 'But' or 'And'. Use 'However' or 'Additionally' instead. Share your text for a full correction."
  ],
  'Rephrasing': [
    "🔄 ORIGINAL: Please share the text you want rephrased.\n\n✨ PROFESSIONAL VERSION: I will transform it into formal, email-appropriate language.\n\n📊 FORMAL VERSION: I will also provide a presentation-ready version.\n\nPaste your text and I will rephrase it in multiple professional styles.",
    "🔄 REPHRASING TIP: Replace 'I think' with 'I believe' or 'In my assessment'. Replace 'a lot' with 'significantly'. Replace 'get' with 'obtain' or 'receive'. Share your sentence for a complete professional rewrite.",
    "🔄 EXAMPLE: Casual: 'Can you check this?' → Professional: 'Could you kindly review this at your earliest convenience?' Share your text for a similar transformation."
  ],
  'Presentation Rehearsal': [
    "📊 FEEDBACK: Strong opening! For maximum impact, start with a bold statistic, a surprising fact, or a powerful question. This grabs attention in the first 10 seconds. Try opening with: 'Did you know that...' or 'Imagine if...'",
    "📊 DELIVERY TIP: Speak at 130-150 words per minute — slow enough to be understood, fast enough to keep energy. Record yourself and count. Most nervous speakers rush to 180+ words per minute. What section of your presentation do you want to rehearse?",
    "📊 STRUCTURE CHECK: Every strong presentation has 3 parts — Hook (why should I listen?), Body (what do I need to know?), Call to Action (what should I do next?). Share your opening line and I will give you specific feedback."
  ],
  'Casual Talk': [
    "That is a really interesting point! I would love to hear more about your perspective on this. What experiences have shaped your view on that topic?",
    "Great conversation starter! One tip for natural conversations — ask open-ended questions that cannot be answered with just yes or no. This keeps the dialogue flowing. What do you enjoy talking about most?",
    "You are doing great with your communication! Remember, confident conversation is about being genuinely curious about the other person. What topics are you most comfortable discussing?"
  ]
};

// POST /api/trainer/quiz/generate
router.post('/quiz/generate', auth, async (req, res) => {
  const { topic, level } = req.body;

  try {
    const prompt = `Generate a 5-question multiple-choice quiz for a ${level} level on the topic of ${topic}. 
Each question must have: "text", "options" (array of 4 strings), and "correctAnswer" (index 0-3), and "explanation" (string). 
Provide JSON format with a "questions" field. Return only the JSON.`;

    const aiText = await generateText(prompt, "You are an expert educational content creator.");
    res.status(200).json({ questions: extractJSON(aiText).questions });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ 
      message: 'Quiz generation failed',
      error: error.message 
    });
  }
});

// POST /api/trainer/quiz/submit
// ... (keeping implementation as is)
router.post('/quiz/submit', auth, async (req, res) => {
  const { topic, level, score, weakAreas, suggestions } = req.body;
  const User = require('../models/User');

  try {
    let savedResult = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const newResult = new QuizResult({
          userId: req.userData.userId,
          topic,
          level,
          score,
          weakAreas,
          suggestions
        });
        savedResult = await newResult.save();

        const user = await User.findById(req.userData.userId);
        if (user) {
          const xpGain = score * 10;
          user.xp += xpGain;
          const levels = ['Starter', 'Intermediate', 'Advanced', 'Professional', 'Master'];
          if (user.xp >= user.nextLevelXp) {
            let currentIdx = levels.indexOf(user.level);
            if (currentIdx < levels.length - 1) {
              user.level = levels[currentIdx + 1];
              user.nextLevelXp = user.nextLevelXp * 1.5;
            }
          }
          await user.save();
        }
      } catch (e) {
        console.error('DB Submit error:', e);
      }
    }

    if (!savedResult) {
      savedResult = saveData('quiz_results', {
        userId: req.userData.userId,
        topic,
        level,
        score,
        weakAreas,
        suggestions
      });
    }

    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: 'Error saving result' });
  }
});

// POST /api/trainer/chat
router.post('/chat', auth, async (req, res) => {
  const { message, mode, history } = req.body;

  const systemPrompts = {
    'Interview Simulation': `You are a strict but helpful interviewer conducting a professional job interview. Ask one interview question at a time based on the user's responses. Give brief, specific feedback on their answer quality (1-2 sentences), then ask your next question. Vary your questions across: behavioral (STAR method), technical, situational, and competency-based. Be professional, encouraging but direct. Never ask about multiple things at once.`,
    'Grammar Correction': `You are an expert English grammar teacher. When the user sends a sentence or paragraph: 1) Identify specific grammar errors (be precise about what's wrong) 2) Show the corrected version 3) Explain WHY it was wrong in simple terms 4) Provide a more professional/formal version. Format your response clearly.`,
    'Rephrasing': `You are a professional business communication expert. Rephrase the user's casual/informal text into a professional email version and a formal presentation version.`,
    'Presentation Rehearsal': `You are an expert presentation coach. Give specific, actionable feedback on the user's presentation content or delivery description.`,
    'Casual Talk': `You are a friendly, engaging conversation partner helping someone practice natural English conversation.`
  };

  try {
    const formattedHistory = (history || []).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
    }));

    const responseText = await generateText(message, systemPrompts[mode] || systemPrompts['Casual Talk'], formattedHistory);
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Chat error:', error.message);
    const fallbackMode = req.body.mode || 'Interview Simulation';
    const responses = chatFallbacks[fallbackMode] || chatFallbacks['Interview Simulation'];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return res.status(200).json({ 
      response: randomResponse, 
      isFallback: true 
    });
  }
});

// GET /api/trainer/progress/:userId
router.get('/progress/:userId', auth, async (req, res) => {
  try {
    let quizHistory = [];
    
    if (mongoose.connection.readyState === 1) {
      try {
        quizHistory = await QuizResult.find({ userId: req.params.userId }).sort({ date: 1 });
      } catch (e) {
        console.error('DB Fetch error, falling back to JSON:', e);
      }
    }

    // Combine with local data
    const localHistory = readData('quiz_results').filter(q => q.userId === req.params.userId);
    const combined = [...quizHistory, ...localHistory].sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({ 
      quizCount: combined.length, 
      quizHistory: combined 
    });
  } catch (error) {
    res.status(200).json({ quizCount: 0, quizHistory: [] });
  }
});

module.exports = router;
