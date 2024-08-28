import dbConnect from '../../../lib/dbConnect';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single service by ID
    try {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch service' });
    }
  } else if (req.method === 'PUT') {
    // Update a service by ID
    const { title, description, image } = req.body;
    try {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { title, description, image },
        { new: true, runValidators: true }
      );
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json(updatedService);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update service', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a service by ID
    try {
      const deletedService = await Service.findByIdAndDelete(id);
      if (!deletedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete service', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}