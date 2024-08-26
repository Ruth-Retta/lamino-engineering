import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    requirements: {
        type: [String],
        required: [true, 'Requirements are required']
    }
}, {
    timestamps: true
});

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);
