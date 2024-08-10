import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  contactInfo: {
    type: String,
    required: [true, 'Please add contact information'],
  },
  partnershipDate: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);
