import dbConnect from '../../../lib/dbConnect';
import Career from '../../../models/Career';
import { IncomingForm } from 'formidable';
import fs from 'fs/promises';
import { getSession } from "next-auth/react";

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
      const career = await Career.findById(id, { 'image.data': 0 });
      if (!career) {
        return res.status(404).json({ message: 'Career not found' });
      }
      const careerResponse = career.toObject();
      careerResponse.imageId = career.image ? career._id : null;
      delete careerResponse.image;
      res.status(200).json(careerResponse);
    } catch (error) {
      console.error('Error fetching career:', error);
      res.status(500).json({ message: 'Failed to fetch career', error: error.message });
    }
  } else if (req.method === 'PUT') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { position, description, requirements, startDate, endDate, date } = fields;
      
      let updateData = { 
        position: Array.isArray(position) ? position[0] : position,
        description: Array.isArray(description) ? description[0] : description,
        startDate: Array.isArray(startDate) ? startDate[0] : startDate,
        endDate: Array.isArray(endDate) ? endDate[0] : endDate,
        requirements: Array.isArray(requirements) ? requirements[0] : requirements,
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

        const updatedCareer = await Career.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        if (!updatedCareer) {
          return res.status(404).json({ message: 'Career not found' });
        }
        
        const careerResponse = updatedCareer.toObject();
        careerResponse.imageId = updatedCareer.image ? updatedCareer._id : null;
        delete careerResponse.image;
        
        res.status(200).json(careerResponse);
      } catch (error) {
        console.error('Error updating career:', error);
        res.status(400).json({ message: 'Failed to update career', error: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const deletedCareer = await Career.findByIdAndDelete(id);
      if (!deletedCareer) {
        return res.status(404).json({ message: 'Career not found' });
      }
      res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
      console.error('Error deleting career:', error);
      res.status(500).json({ message: 'Failed to delete career', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
