import dbConnect from '../../../lib/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const portfolioItem = await Portfolio.findById(id);
        if (!portfolioItem) {
          return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }
        res.status(200).json({ success: true, data: portfolioItem });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      try {
        const portfolioItem = await Portfolio.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!portfolioItem) {
          return res.status(404).json({ success: false, message: 'Portfolio item not found' });
        }
        res.status(200).json({ success: true, data: portfolioItem });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedPortfolioItem = await Portfolio.deleteOne({ _id: id });
        if (!deletedPortfolioItem) {
          return res.status(404).json({ success: false, message: 'Portfolio item not found' });
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
