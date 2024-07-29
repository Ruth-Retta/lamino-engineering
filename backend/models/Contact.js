const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Contact', ContactSchema);

