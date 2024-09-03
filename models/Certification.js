import mongoose from 'mongoose';

const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
},
imageUrl: {
    type: String,
    required: true,
},
description: {
    type: String,
    required: true,
},
certifyingOrganization: {
    type: String,
    required: true,
},
date: {
    type: Date,
    required: true,
}
});

export default mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
