import dbConnect from '../../../lib/dbConnect';
import About from '../../../models/About';
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
      const about = await About.find({}, { 'image.data': 0 });
      const aboutWithImageId = about.map(about => {
        const aboutObj = about.toObject();
        aboutObj.imageId = about.image ? about._id : null;
        delete aboutObj.image;
        return aboutObj;
      });
      res.status(200).json(aboutWithImageId);
    } catch (error) {
      console.error('Error fetching about:', error);
      res.status(500).json({ message: 'Failed to fetch about', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { aboutLamino, date } = fields;
      
      if (!aboutLamino || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newAbout = new About({
          aboutLamino: Array.isArray(aboutLamino) ? aboutLamino[0] : aboutLamino,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newAbout.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newAbout.save();
        
        const aboutResponse = newAbout.toObject();
        aboutResponse.imageId = newAbout.image ? newAbout._id : null;
        delete aboutResponse.image;
        
        res.status(201).json(aboutResponse);
      } catch (error) {
        console.error('Error saving about:', error);
        res.status(400).json({ message: 'Failed to create about', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}