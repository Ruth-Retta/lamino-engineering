import dbConnect from '../../../lib/dbConnect';
import Services from '../../../models/Services';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single services by ID
    try {
      const services = await Services.findById(id);
      if (!services) {
        return res.status(404).json({ message: 'Services not found' });
      }
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch services' });
    }
  } else if (req.method === 'PUT') {
    // Update a services by ID
    const { title, description, image } = req.body;
    try {
      const updatedServices = await Services.findByIdAndUpdate(
        id,
        { title, description, image },
        { new: true, runValidators: true }
      );
      if (!updatedServices) {
        return res.status(404).json({ message: 'Services not found' });
      }
      res.status(200).json(updatedServices);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update services', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a services by ID
    try {
      const deletedServices = await Services.findByIdAndDelete(id);
      if (!deletedServices) {
        return res.status(404).json({ message: 'Services not found' });
      }
      res.status(200).json({ message: 'Services deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete services', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}