import dbConnect from '../../../lib/dbConnect';
import Testimonial from '../../../backend/models/Testimonials';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const testimonials = await Testimonial.find({});
        res.status(200).json({ success: true, data: testimonials });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
