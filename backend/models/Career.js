import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  requirements: {
    type: [String],
    required: [true, 'Please add the requirements'],
  },
});

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
