// models/Partner.js
const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true // This will store the path to the image
  },
  website: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Partner', PartnerSchema);
