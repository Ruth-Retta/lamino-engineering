import dbConnect from '../../../lib/dbConnect';
import Career from '../../../backend/models/Career';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const careers = await Career.find({});
        res.status(200).json({ success: true, data: careers });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        const career = await Career.create(req.body);
        res.status(201).json({ success: true, data: career });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
