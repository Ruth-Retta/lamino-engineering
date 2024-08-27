import dbConnect from '../../../lib/dbConnect';
import Certification from '../../../models/Certification';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all certification
    try {
      const certifications = await Certification.find();
      res.status(200).json(certifications);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch certifications' });
    }
  } else if (req.method === 'POST') {
    // Create a new certification
    const { author, position, content, image, createdAt, } = req.body;
    try {
      const newCertification = new Certification({
        author,
        position,
        content,
        image,
        createdAt,
      });
      await newCertification.save();
      res.status(201).json(newCertification);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create certification', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}