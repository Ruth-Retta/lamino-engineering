import dbConnect from '../../../lib/dbConnect';
import News from '../../../models/News';
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
      const news = await News.find({}, { 'image.data': 0 });
      const newsWithImageId = news.map(certification => {
        const certificationObj = certification.toObject();
        certificationObj.imageId = certification.image ? certification._id : null;
        delete certificationObj.image;
        return certificationObj;
      });
      res.status(200).json(newsWithImageId);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ message: 'Failed to fetch news', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { title, content, date } = fields;
      
      if (!title || !content || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newCertification = new News({
          title: Array.isArray(title) ? title[0] : title,
          content: Array.isArray(content) ? content[0] : content,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newCertification.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newCertification.save();
        
        const certificationResponse = newCertification.toObject();
        certificationResponse.imageId = newCertification.image ? newCertification._id : null;
        delete certificationResponse.image;
        
        res.status(201).json(certificationResponse);
      } catch (error) {
        console.error('Error saving certification:', error);
        res.status(400).json({ message: 'Failed to create certification', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}