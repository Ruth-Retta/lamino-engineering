import dbConnect from '../../../lib/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single portfolio by ID
    try {
      const portfolio = await Portfolio.findById(id);
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      res.status(200).json(portfolio);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch portfolio' });
    }
  } else if (req.method === 'PUT') {
    // Update a portfolio by ID
    const { title, description, imageUrl, createdAt } = req.body;
    try {
      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        id,
        { title, description, imageUrl, createdAt },
        { new: true, runValidators: true }
      );
      if (!updatedPortfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update portfolio', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a portfolio by ID
    try {
      const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
      if (!deletedPortfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete portfolio', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}