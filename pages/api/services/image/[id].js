import dbConnect from '../../../../lib/dbConnect';
import Service from '../../../../models/Service';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const service = await Service.findById(id);
      if (!service || !service.image || !service.image.data) {
        return res.status(404).json({ message: 'Image not found' });
      }

      res.setHeader('Content-Type', service.image.contentType);
      res.send(service.image.data);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Failed to fetch image', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}