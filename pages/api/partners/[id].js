import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../models/Partner';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single partner by ID
    try {
      const partner = await Partner.findById(id);
      if (!partner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      res.status(200).json(partner);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch partner' });
    }
  } else if (req.method === 'PUT') {
    // Update a partner by ID
    const { name, logo, website } = req.body;
    try {
      const updatedPartner = await Partner.findByIdAndUpdate(
        id,
        { name, logo, website },
        { new: true, runValidators: true }
      );
      if (!updatedPartner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      res.status(200).json(updatedPartner);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update partner', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a partner by ID
    try {
      const deletedPartner = await Partner.findByIdAndDelete(id);
      if (!deletedPartner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete partner', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}