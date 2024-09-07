import dbConnect from '../../../lib/dbConnect';
import Career from '../../../models/Career';
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
      const careers = await Career.find({}, { 'image.data': 0 });
      const careersWithImageId = careers.map(career => {
        const careerObj = career.toObject();
        careerObj.imageId = career.image ? career._id : null;
        delete careerObj.image;
        return careerObj;
      });
      res.status(200).json(careersWithImageId);
    } catch (error) {
      console.error('Error fetching careers:', error);
      res.status(500).json({ message: 'Failed to fetch careers', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { position, description, requirement, startDate, endDate, date } = fields;
      
      if (!position || !description || !requirement || !startDate || !endDate || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newCareer = new Career({
          position: Array.isArray(position) ? position[0] : position,
          description: Array.isArray(description) ? description[0] : description,
          startDate: Array.isArray(startDate) ? startDate[0] : startDate,
          endDate: Array.isArray(endDate) ? endDate[0] : endDate,
          requirement: Array.isArray(requirement) ? requirement[0] : requirement,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newCareer.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newCareer.save();
        
        const careerResponse = newCareer.toObject();
        careerResponse.imageId = newCareer.image ? newCareer._id : null;
        delete careerResponse.image;
        
        res.status(201).json(careerResponse);
      } catch (error) {
        console.error('Error saving career:', error);
        res.status(400).json({ message: 'Failed to create career', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}