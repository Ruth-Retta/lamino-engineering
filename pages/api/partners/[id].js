import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../models/Partner';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const partner = await Partner.findById(id, { 'image.data': 0 });
      if (!partner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      const partnerResponse = partner.toObject();
      partnerResponse.imageId = partner.image ? partner._id : null;
      delete partnerResponse.image;
      res.status(200).json(partnerResponse);
    } catch (error) {
      console.error('Error fetching partner:', error);
      res.status(500).json({ message: 'Failed to fetch partner', error: error.message });
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

        const updatedPartner = await Partner.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedPartner) {
          return res.status(404).json({ message: 'Partner not found' });
        }
        
        const partnerResponse = updatedPartner.toObject();
        partnerResponse.imageId = updatedPartner.image ? updatedPartner._id : null;
        delete partnerResponse.image;
        
        res.status(200).json(partnerResponse);
      } catch (error) {
        console.error('Error updating partner:', error);
        res.status(400).json({ message: 'Failed to update partner', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedPartner = await Partner.findByIdAndDelete(id);
      if (!deletedPartner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error) {
      console.error('Error deleting partner:', error);
      res.status(500).json({ message: 'Failed to delete partner', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}