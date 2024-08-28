import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../models/Partner';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all partners
    try {
      const partners = await Partner.find();
      res.status(200).json(partners);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch partners' });
    }
  } else if (req.method === 'POST') {
    // Create a new partner
    const { name, logo, website } = req.body;
    try {
      const newPartner = new Partner({
        name, 
        logo, 
        website,
      });
      await newPartner.save();
      res.status(201).json(newPartner);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create partner', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}