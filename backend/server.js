require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form data:', req.body);
    const newContact = new Contact(req.body);
    await newContact.save();

    // Send email
    const mailOptions = {
      from: `"Lamino Engineering" <${process.env.SMTP_USER}>`,
      to: 'your_email@example.com',
      subject: 'New Contact Form Submission',
      text: `You have a new contact form submission from ${req.body.name}.\n\nMessage: ${req.body.message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });

    res.status(201).send('Contact saved successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
