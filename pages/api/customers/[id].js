import dbConnect from '../../../lib/dbConnect';
import Customer from '../../../models/Customer';
import { IncomingForm } from 'formidable';
import { getSession } from "next-auth/react";
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || !session.user.role) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const customer = await Customer.findById(id, { 'image.data': 0 });
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      const customerResponse = customer.toObject();
      customerResponse.imageId = customer.image ? customer._id : null;
      delete customerResponse.image;
      res.status(200).json(customerResponse);
    } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({ message: 'Failed to fetch customer', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { name, website, date } = fields;
      
      let updateData = { 
        name: Array.isArray(name) ? name[0] : name,
        website: Array.isArray(website) ? website[0] : website,
        date: Array.isArray(date) ? date[0] : date,
      };

      try {
        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          updateData.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedCustomer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
        
        const customerResponse = updatedCustomer.toObject();
        customerResponse.imageId = updatedCustomer.image ? updatedCustomer._id : null;
        delete customerResponse.image;
        
        res.status(200).json(customerResponse);
      } catch (error) {
        console.error('Error updating customer:', error);
        res.status(400).json({ message: 'Failed to update customer', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ message: 'Failed to delete customer', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}