import dbConnect from '../../../lib/dbConnect';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single testimonial by ID
    try {
      const testimonial = await Testimonial.findById(id);
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch testimonial' });
    }
  } else if (req.method === 'PUT') {
    // Update a testimonial by ID
    const { author, position, content, image, createdAt } = req.body;
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        id,
        { author, position, content, image, createdAt },
        { new: true, runValidators: true }
      );
      if (!updatedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.status(200).json(updatedTestimonial);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update testimonial', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a testimonial by ID
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
      if (!deletedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete testimonial', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}