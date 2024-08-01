const mongoose = require('mongoose');
const { Schema } = mongoose;

const CertificationSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  certifyingOrganization: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Certification', CertificationSchema);
