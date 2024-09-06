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
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const news = await News.findById(id, { 'image.data': 0 });
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }
      const newsResponse = news.toObject();
      newsResponse.imageId = news.image ? news._id : null;
      delete newsResponse.image;
      res.status(200).json(newsResponse);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ message: 'Failed to fetch news', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { title, content, date } = fields;
      
      let updateData = { 
        title: Array.isArray(title) ? title[0] : title,
        description: Array.isArray(description) ? description[0] : description,
        certifyingOrganization: Array.isArray(certifyingOrganization) ? certifyingOrganization[0] : certifyingOrganization,
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

        const updatedNews = await News.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedNews) {
          return res.status(404).json({ message: 'News not found' });
        }
        
        const newsResponse = updatedNews.toObject();
        newsResponse.imageId = updatedNews.image ? updatedNews._id : null;
        delete newsResponse.image;
        
        res.status(200).json(newsResponse);
      } catch (error) {
        console.error('Error updating news:', error);
        res.status(400).json({ message: 'Failed to update news', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedNews = await News.findByIdAndDelete(id);
      if (!deletedNews) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
      console.error('Error deleting news:', error);
      res.status(500).json({ message: 'Failed to delete news', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}