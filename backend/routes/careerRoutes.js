const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// Get all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new career
router.post('/', async (req, res) => {
  const { position, applicationStart, applicationEnd, jobDescription, requirements, image } = req.body;
  const career = new Career({ position, applicationStart, applicationEnd, jobDescription, requirements, image });

  try {
    const newCareer = await career.save();
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add other routes as needed

module.exports = router;
