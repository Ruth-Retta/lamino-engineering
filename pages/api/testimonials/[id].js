import dbConnect from '../../../lib/dbConnect';
import Testimonial from '../../../backend/models/Testimonials';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const testimonial = await Testimonial.findById(id);
        if (!testimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      try {
        const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!testimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedTestimonial = await Testimonial.deleteOne({ _id: id });
        if (!deletedTestimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
