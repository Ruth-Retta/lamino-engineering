import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);