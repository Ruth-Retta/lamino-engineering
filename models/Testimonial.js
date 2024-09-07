import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
