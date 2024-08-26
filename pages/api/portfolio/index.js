import dbConnect from '../../../lib/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const portfolioItems = await Portfolio.find({});
        res.status(200).json({ success: true, data: portfolioItems });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const portfolioItem = await Portfolio.create(req.body);
        res.status(201).json({ success: true, data: portfolioItem });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
