import dbConnect from '../../../lib/dbConnect';
import Certification from '../../../models/Certifications';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const certification = await Certification.findById(id);
        if (!certification) {
          return res.status(404).json({ success: false, message: 'Certification not found' });
        }
        res.status(200).json({ success: true, data: certification });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      try {
        const certification = await Certification.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!certification) {
          return res.status(404).json({ success: false, message: 'Certification not found' });
        }
        res.status(200).json({ success: true, data: certification });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedCertification = await Certification.deleteOne({ _id: id });
        if (!deletedCertification) {
          return res.status(404).json({ success: false, message: 'Certification not found' });
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
