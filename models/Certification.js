import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  certifyingOrganization: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);