import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},
image: {
    data: Buffer,
    contentType: String,
},
website: {
    type: String,
    required: true,
},
date: {
  type: Date,
  required: true,
},
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
