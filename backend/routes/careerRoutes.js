const express = require('express');
const router = express.Router();
const Career = require('../../models/Career');

// Get all careers
router.get('/', async (req, res) => {
  console.log("getting careers");
  try {
    const careers = await Career.find();
    console.log("second getting careers", careers);
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new career
router.post('/', async (req, res) => {
  console.log("posting careers");
  const { position, applicationStart, applicationEnd, jobDescription, requirements, image } = req.body;
  const career = new Career({ position, applicationStart, applicationEnd, jobDescription, requirements, image });
  console.log("posting careers", career);
  try {
    const newCareer = await career.save();
    console.log("second posting careers", newCareer);
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add other routes as needed

module.exports = router;
