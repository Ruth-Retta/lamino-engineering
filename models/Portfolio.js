import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
