import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  aboutLamino: {
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

export default mongoose.models.About || mongoose.model('About', AboutSchema);