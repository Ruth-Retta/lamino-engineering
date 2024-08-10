import dbConnect from '../../../lib/dbConnect';
import News from '../../../backend/models/News';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const newsItems = await News.find({});
        res.status(200).json({ success: true, data: newsItems });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const newsItem = await News.create(req.body);
        res.status(201).json({ success: true, data: newsItem });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
