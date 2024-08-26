import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  institution: {
    type: String,
    required: [true, 'Please add the institution'],
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: false,
  },
  credentialID: {
    type: String,
    required: false,
  },
  credentialURL: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
