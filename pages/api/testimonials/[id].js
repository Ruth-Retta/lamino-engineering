import dbConnect from '../../../lib/dbConnect';
import Testimonial from '../../../models/Testimonial';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const testimonial = await Testimonial.findById(id, { 'image.data': 0 });
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      const testimonialResponse = testimonial.toObject();
      testimonialResponse.imageId = testimonial.image ? testimonial._id : null;
      delete testimonialResponse.image;
      res.status(200).json(testimonialResponse);
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      res.status(500).json({ message: 'Failed to fetch testimonial', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { author, position, content, date } = fields;
      
      let updateData = { 
        author: Array.isArray(author) ? author[0] : author,
        content: Array.isArray(content) ? content[0] : content,
        position: Array.isArray(position) ? position[0] : position,
        date: Array.isArray(date) ? date[0] : date,
      };

      try {
        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          updateData.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedTestimonial) {
          return res.status(404).json({ message: 'Testimonial not found' });
        }
        
        const testimonialResponse = updatedTestimonial.toObject();
        testimonialResponse.imageId = updatedTestimonial.image ? updatedTestimonial._id : null;
        delete testimonialResponse.image;
        
        res.status(200).json(testimonialResponse);
      } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(400).json({ message: 'Failed to update testimonial', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
      if (!deletedTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ message: 'Failed to delete testimonial', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}