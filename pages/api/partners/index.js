import dbConnect from "../../../lib/dbConnect";
import Partner from "../../../models/Partner";
import { getSession } from "next-auth/react";
import { IncomingForm } from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const partners = await Partner.find({}, { "image.data": 0 });
      const partnersWithImageId = partners.map((partner) => {
        const partnerObj = partner.toObject();
        partnerObj.imageId = partner.image ? partner._id : null;
        delete partnerObj.image;
        return partnerObj;
      });
      res.status(200).json(partnersWithImageId);
    } catch (error) {
      console.error("Error fetching partners:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch partners", error: error.message });
    }
  } else {
    const session = await getSession({ req });
    if (!session || !session.user.role) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (req.method === "POST") {
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res
            .status(500)
            .json({ error: "Error parsing form data", details: err.message });
        }

        const { name, website, date } = fields;

        if (!name || !website || !date) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        try {
          const newPartner = new Partner({
            name: Array.isArray(name) ? name[0] : name,
            website: Array.isArray(website) ? website[0] : website,
            date: Array.isArray(date) ? date[0] : date,
          });

          if (files.image && files.image[0] && files.image[0].size > 0) {
            const file = files.image[0];
            newPartner.image = {
              data: await fs.readFile(file.filepath),
              contentType: file.mimetype,
            };
          }

          await newPartner.save();

          const partnerResponse = newPartner.toObject();
          partnerResponse.imageId = newPartner.image ? newPartner._id : null;
          delete partnerResponse.image;

          res.status(201).json(partnerResponse);
        } catch (error) {
          console.error("Error saving partner:", error);
          res
            .status(400)
            .json({
              message: "Failed to create partner",
              error: error.message,
            });
        }
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
}
