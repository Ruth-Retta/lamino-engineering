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
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const customers = await Customer.find({}, { 'image.data': 0 });
      const customersWithImageId = customers.map(customer => {
        const customerObj = customer.toObject();
        customerObj.imageId = customer.image ? customer._id : null;
        delete customerObj.image;
        return customerObj;
      });
      res.status(200).json(customersWithImageId);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { name, website, date } = fields;
      
      if (!name || !website || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newCustomer = new Customer({
          name: Array.isArray(name) ? name[0] : name,
          website: Array.isArray(website) ? website[0] : website,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newCustomer.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newCustomer.save();
        
        const customerResponse = newCustomer.toObject();
        customerResponse.imageId = newCustomer.image ? newCustomer._id : null;
        delete customerResponse.image;
        
        res.status(201).json(customerResponse);
      } catch (error) {
        console.error('Error saving customer:', error);
        res.status(400).json({ message: 'Failed to create customer', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}