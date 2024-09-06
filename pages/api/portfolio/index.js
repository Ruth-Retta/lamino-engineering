import dbConnect from "../../../lib/dbConnect";
import Portfolio from "../../../models/Portfolio";
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
      const portfolios = await Portfolio.find({}, { 'image.data': 0 });
      const portfoliosWithImageId = portfolios.map(portfolio => {
        const portfolioObj = portfolio.toObject();
        portfolioObj.imageId = portfolio.image ? portfolio._id : null;
        delete portfolioObj.image;
        return portfolioObj;
      });
      res.status(200).json(portfoliosWithImageId);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      res.status(500).json({ message: 'Failed to fetch portfolios', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { title, description, certifyingOrganization, date } = fields;
      
      if (!title || !description || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newPortfolio = new Portfolio({
          title: Array.isArray(title) ? title[0] : title,
          description: Array.isArray(description) ? description[0] : description,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newPortfolio.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newPortfolio.save();
        
        const portfolioResponse = newPortfolio.toObject();
        portfolioResponse.imageId = newPortfolio.image ? newPortfolio._id : null;
        delete portfolioResponse.image;
        
        res.status(201).json(portfolioResponse);
      } catch (error) {
        console.error('Error saving portfolio:', error);
        res.status(400).json({ message: 'Failed to create portfolio', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}