import dbConnect from '../../../lib/dbConnect';
import Certification from '../../../models/Certification';
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
      const certifications = await Certification.find({}, { 'image.data': 0 });
      const certificationsWithImageId = certifications.map(certification => {
        const certificationObj = certification.toObject();
        certificationObj.imageId = certification.image ? certification._id : null;
        delete certificationObj.image;
        return certificationObj;
      });
      res.status(200).json(certificationsWithImageId);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      res.status(500).json({ message: 'Failed to fetch certifications', error: error.message });
    }
  } else if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data', details: err.message });
      }

      const { title, description, certifyingOrganization, date } = fields;
      
      if (!title || !description || !certifyingOrganization || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        const newCertification = new Certification({
          title: Array.isArray(title) ? title[0] : title,
          description: Array.isArray(description) ? description[0] : description,
          certifyingOrganization: Array.isArray(certifyingOrganization) ? certifyingOrganization[0] : certifyingOrganization,
          date: Array.isArray(date) ? date[0] : date,
        });

        if (files.image && files.image[0] && files.image[0].size > 0) {
          const file = files.image[0];
          newCertification.image = {
            data: await fs.readFile(file.filepath),
            contentType: file.mimetype,
          };
        }

        await newCertification.save();
        
        const certificationResponse = newCertification.toObject();
        certificationResponse.imageId = newCertification.image ? newCertification._id : null;
        delete certificationResponse.image;
        
        res.status(201).json(certificationResponse);
      } catch (error) {
        console.error('Error saving certification:', error);
        res.status(400).json({ message: 'Failed to create certification', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}