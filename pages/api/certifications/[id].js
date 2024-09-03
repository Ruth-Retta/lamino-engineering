import dbConnect from '../../../lib/dbConnect';
import Certification from '../../../models/Certification';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single certification by ID
    try {
      const certification = await Certification.findById(id);
      if (!certification) {
        return res.status(404).json({ message: 'certification not found' });
      }
      res.status(200).json(certification);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch certification' });
    }
  } else if (req.method === 'PUT') {
    // Update a certification by ID
    const { title, imageUrl, description, certifingOrganization, date  } = req.body;
    try {
      const updatedCertification = await Certification.findByIdAndUpdate(
        id,
        { title, imageUrl, description, certifingOrganization, date  },
        { new: true, runValidators: true }
      );
      if (!updatedCertification) {
        return res.status(404).json({ message: 'Certification not found' });
      }
      res.status(200).json(updatedCertification);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update Certification', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a certification by ID
    try {
      const deletedCertification = await Certification.findByIdAndDelete(id);
      if (!deletedCertification) {
        return res.status(404).json({ message: 'Certification not found' });
      }
      res.status(200).json({ message: 'Certification deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete certification', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}