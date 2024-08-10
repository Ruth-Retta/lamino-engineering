import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, 'Please add a project name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  completionDate: {
    type: Date,
    required: [true, 'Please add a completion date'],
  },
  clientName: {
    type: String,
    required: [true, 'Please add a client name'],
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
