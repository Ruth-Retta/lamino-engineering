import dbConnect from '../../../lib/dbConnect';
import News from '../../../models/News';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const newsItem = await News.findById(id);
        if (!newsItem) {
          return res.status(404).json({ success: false, message: 'News item not found' });
        }
        res.status(200).json({ success: true, data: newsItem });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      try {
        const newsItem = await News.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!newsItem) {
          return res.status(404).json({ success: false, message: 'News item not found' });
        }
        res.status(200).json({ success: true, data: newsItem });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedNewsItem = await News.deleteOne({ _id: id });
        if (!deletedNewsItem) {
          return res.status(404).json({ success: false, message: 'News item not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
