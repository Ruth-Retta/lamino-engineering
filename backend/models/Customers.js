import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
