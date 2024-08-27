import dbConnect from '../../../lib/dbConnect';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all testimonials
    try {
      const testimonials = await Testimonial.find();
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
  } else if (req.method === 'POST') {
    // Create a new testimonial
    const { author, position, content, image, createdAt } = req.body;
    try {
      const newTestimonial = new Testimonial({
        author, 
        position, 
        content, 
        image, 
        createdAt,
      });
      await newTestimonial.save();
      res.status(201).json(newTestimonial);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create testimonial', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}