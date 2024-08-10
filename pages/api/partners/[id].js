import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../backend/models/Partners';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const partner = await Partner.findById(id);
        if (!partner) {
          return res.status(404).json({ success: false, message: 'Partner not found' });
        }
        res.status(200).json({ success: true, data: partner });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      try {
        const partner = await Partner.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!partner) {
          return res.status(404).json({ success: false, message: 'Partner not found' });
        }
        res.status(200).json({ success: true, data: partner });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedPartner = await Partner.deleteOne({ _id: id });
        if (!deletedPartner) {
          return res.status(404).json({ success: false, message: 'Partner not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
