import dbConnect from '../../../lib/dbConnect';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all services
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch services' });
    }
  } else if (req.method === 'POST') {
    // Create a new service
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newService = new Service({
        title, 
        description, 
        image,
      });
      await newService.save();
      res.status(201).json(newService);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create service', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}