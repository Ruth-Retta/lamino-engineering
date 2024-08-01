import dbConnect from '../../../utils/dbConnect';
import Certification from '../../../models/Certification';

dbConnect();

export default async (req, res) => {
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        const certification = await Certification.findById(id);
        if (!certification) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(certification);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const certification = await Certification.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!certification) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json(certification);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedCertification = await Certification.deleteOne({ _id: id });
        if (!deletedCertification) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
