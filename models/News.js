import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
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

export default mongoose.models.News || mongoose.model('News', NewsSchema);
