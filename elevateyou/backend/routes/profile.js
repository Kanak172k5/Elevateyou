const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const OutfitScan = require('../models/OutfitScan');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const { readData } = require('../utils/storage');

// GET /api/profile/:userId
router.get('/:userId', auth, async (req, res) => {
  try {
    let user = null;
    let scanCount = 0;
    let quizCount = 0;

    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(req.params.userId).select('-password');
        scanCount = await OutfitScan.countDocuments({ userId: req.params.userId });
        quizCount = await QuizResult.countDocuments({ userId: req.params.userId });
      } catch (e) {
        console.error('DB Profile Load error:', e);
      }
    }

    if (!user) {
      // Return a professional mock user if DB fails
      user = { 
        _id: req.params.userId,
        name: 'Professional User', 
        level: 'Starter', 
        xp: 150, 
        nextLevelXp: 1000, 
        streak: 1 
      };
    }

    // Add local counts (ensuring we use the correct collection name)
    const localScans = readData('outfit_scans').filter(s => s.userId === req.params.userId).length;
    const localQuizzes = readData('quiz_results').filter(q => q.userId === req.params.userId).length;

    res.status(200).json({ 
      user, 
      stats: { 
        scans: scanCount + localScans, 
        quizzes: quizCount + localQuizzes 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// PUT /api/profile/:userId
router.put('/:userId', auth, async (req, res) => {
  const { name, level } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (level) user.level = level;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
