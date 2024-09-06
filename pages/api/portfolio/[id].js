import dbConnect from '../../../lib/dbConnect';
import Portfolio from '../../../models/Portfolio';
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
      const portfolio = await Portfolio.findById(id, { 'image.data': 0 });
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      const portfolioResponse = portfolio.toObject();
      portfolioResponse.imageId = portfolio.image ? portfolio._id : null;
      delete portfolioResponse.image;
      res.status(200).json(portfolioResponse);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      res.status(500).json({ message: 'Failed to fetch portfolio', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { title, description, date } = fields;
      
      let updateData = { 
        title: Array.isArray(title) ? title[0] : title,
        description: Array.isArray(description) ? description[0] : description,
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

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedPortfolio) {
          return res.status(404).json({ message: 'Portfolio not found' });
        }
        
        const portfolioResponse = updatedPortfolio.toObject();
        portfolioResponse.imageId = updatedPortfolio.image ? updatedPortfolio._id : null;
        delete portfolioResponse.image;
        
        res.status(200).json(portfolioResponse);
      } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(400).json({ message: 'Failed to update portfolio', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
      if (!deletedPortfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      res.status(500).json({ message: 'Failed to delete portfolio', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}