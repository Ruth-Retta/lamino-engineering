import dbConnect from '../../../lib/dbConnect';
import Customer from '../../../backend/models/Customers';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const customer = await Customer.findById(id);
        if (!customer) {
          return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, data: customer });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      try {
        const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!customer) {
          return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        res.status(200).json({ success: true, data: customer });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      try {
        const deletedCustomer = await Customer.deleteOne({ _id: id });
        if (!deletedCustomer) {
          return res.status(404).json({ success: false, message: 'Customer not found' });
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
