import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
