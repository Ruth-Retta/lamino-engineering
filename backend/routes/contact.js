const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');


router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const newContact = new Contact({
    name,
    email,
    phone,
    subject,
    message,
  });

  try {
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact form data', error });
  }
});

module.exports = router;
