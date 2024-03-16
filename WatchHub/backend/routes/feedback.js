const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { productId, rating, feedback, userName } = req.body;

    const newFeedback = new Feedback({
      productId,
      rating,
      feedback,
      userName,
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/feedback/:productId
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const productFeedback = await Feedback.find({ productId });
    res.json(productFeedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
