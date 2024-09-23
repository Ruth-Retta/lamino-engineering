import dbConnect from "../../../lib/dbConnect";
import Certification from "../../../models/Certification";
import { IncomingForm } from "formidable";
import { getSession } from "next-auth/react";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      const certification = await Certification.findById(id, {
        "image.data": 0,
      });
      if (!certification) {
        return res.status(404).json({ message: "Certification not found" });
      }
      const certificationResponse = certification.toObject();
      certificationResponse.imageId = certification.image
        ? certification._id
        : null;
      delete certificationResponse.image;
      res.status(200).json(certificationResponse);
    } catch (error) {
      console.error("Error fetching certification:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch certification",
          error: error.message,
        });
    }
  } else {
    const session = await getSession({ req });
    if (!session || !session.user.role) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (req.method === "PUT") {
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res
            .status(500)
            .json({ error: "Error parsing form data", details: err.message });
        }

        const { title, description, certifyingOrganization, date } = fields;

        let updateData = {
          title: Array.isArray(title) ? title[0] : title,
          description: Array.isArray(description)
            ? description[0]
            : description,
          certifyingOrganization: Array.isArray(certifyingOrganization)
            ? certifyingOrganization[0]
            : certifyingOrganization,
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

          const updatedCertification = await Certification.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
          );
          if (!updatedCertification) {
            return res.status(404).json({ message: "Certification not found" });
          }

          const certificationResponse = updatedCertification.toObject();
          certificationResponse.imageId = updatedCertification.image
            ? updatedCertification._id
            : null;
          delete certificationResponse.image;

          res.status(200).json(certificationResponse);
        } catch (error) {
          console.error("Error updating certification:", error);
          res
            .status(400)
            .json({
              message: "Failed to update certification",
              error: error.message,
            });
        }
      });
    } else if (req.method === "DELETE") {
      try {
        const deletedCertification = await Certification.findByIdAndDelete(id);
        if (!deletedCertification) {
          return res.status(404).json({ message: "Certification not found" });
        }
        res.status(200).json({ message: "Certification deleted successfully" });
      } catch (error) {
        console.error("Error deleting certification:", error);
        res
          .status(500)
          .json({
            message: "Failed to delete certification",
            error: error.message,
          });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
}
