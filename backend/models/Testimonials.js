import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  designation: {
    type: String,
    required: [true, 'Please add a designation'],
  },
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
