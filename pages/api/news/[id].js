import dbConnect from '../../../lib/dbConnect';
import News from '../../../models/News';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single news by ID
    try {
      const news = await News.findById(id);
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch news' });
    }
  } else if (req.method === 'PUT') {
    // Update a news by ID
    const { title, content, image, date } = req.body;
    try {
      const updatedNews = await News.findByIdAndUpdate(
        id,
        { title, content, image, date },
        { new: true, runValidators: true }
      );
      if (!updatedNews) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(200).json(updatedNews);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update news', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a news by ID
    try {
      const deletedNews = await News.findByIdAndDelete(id);
      if (!deletedNews) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete news', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}