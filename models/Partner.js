import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
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

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);
