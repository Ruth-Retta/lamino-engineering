import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
  },
});

export default mongoose.models.News || mongoose.model('News', NewsSchema);
