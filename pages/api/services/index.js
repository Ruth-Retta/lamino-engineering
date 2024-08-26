import dbConnect from '../../../lib/dbConnect';
import Service from '../../../models/Services';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const services = await Service.find({});
        res.status(200).json({ success: true, data: services });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, data: service });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
