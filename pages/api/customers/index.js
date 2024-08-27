import dbConnect from '../../../lib/dbConnect';
import Customer from '../../../models/Customer';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all customers
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch customers' });
    }
  } else if (req.method === 'POST') {
    // Create a new customer
    const { name, email, phone, address, joinedDate } = req.body;
    try {
      const newCustomer = new Customer({
        name,
        email,
        phone,
        address,
        joinedDate,
      });
      await newCustomer.save();
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create customer', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}