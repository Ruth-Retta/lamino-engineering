import dbConnect from '../../../lib/dbConnect';
import News from '../../../models/News';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all newss
    try {
      const news = await News.find();
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch news' });
    }
  } else if (req.method === 'POST') {
    // Create a new news
    const { title, content, image, date } = req.body;
    try {
      const newNews = new News({
        title, 
        content, 
        image, 
        date,
      });
      await newNews.save();
      res.status(201).json(newNews);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create news', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}