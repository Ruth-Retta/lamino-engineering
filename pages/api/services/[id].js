import dbConnect from '../../../lib/dbConnect';
import Service from '../../../models/Service';
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
      const service = await Service.findById(id, { 'image.data': 0 });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      const serviceResponse = service.toObject();
      serviceResponse.imageId = service.image ? service._id : null;
      delete serviceResponse.image;
      res.status(200).json(serviceResponse);
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ message: 'Failed to fetch service', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { title, description } = fields;
      
      let updateData = { 
        title: Array.isArray(title) ? title[0] : title,
        description: Array.isArray(description) ? description[0] : description
      };

      try {
        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          updateData.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        const updatedService = await Service.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedService) {
          return res.status(404).json({ message: 'Service not found' });
        }
        
        const serviceResponse = updatedService.toObject();
        serviceResponse.imageId = updatedService.image ? updatedService._id : null;
        delete serviceResponse.image;
        
        res.status(200).json(serviceResponse);
      } catch (error) {
        console.error('Error updating service:', error);
        res.status(400).json({ message: 'Failed to update service', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedService = await Service.findByIdAndDelete(id);
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Failed to delete service', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}