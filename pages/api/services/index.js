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
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const services = await Service.find({}, { 'image.data': 0 });
      const servicesWithImageId = services.map(service => {
        const serviceObj = service.toObject();
        serviceObj.imageId = service.image ? service._id : null;
        delete serviceObj.image;
        return serviceObj;
      });
      res.status(200).json(servicesWithImageId);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Failed to fetch services', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      console.log('Received fields:', fields);
      console.log('Received files:', files);

      const { title, description, date } = fields;
      
      if (!title || !description || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newService = new Service({
          title: Array.isArray(title) ? title[0] : title,
          description: Array.isArray(description) ? description[0] : description,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newService.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newService.save();
        
        const serviceResponse = newService.toObject();
        serviceResponse.imageId = newService.image ? newService._id : null;
        delete serviceResponse.image;
        
        res.status(201).json(serviceResponse);
      } catch (error) {
        console.error('Error saving service:', error);
        res.status(400).json({ message: 'Failed to create service', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}