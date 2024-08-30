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
  imageUrl: {
    type: String,
    required: true,
  },
});

<<<<<<< HEAD
module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
=======
export default mongoose.models.Portfolio ||
  mongoose.model("Portfolio", PortfolioSchema);
>>>>>>> 0ca557c6be986e8a86bf90063081e312361e61c1
