import dbConnect from '../../../lib/dbConnect';
import Customer from '../../../models/Customer';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single customer by ID
    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch customer' });
    }
  } else if (req.method === 'PUT') {
    // Update a customer by ID
    const { name, email, phone, address, joinedDate } = req.body;
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { name, email, phone, address, joinedDate },
        { new: true, runValidators: true }
      );
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update Customer', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a Customer by ID
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete customer', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}