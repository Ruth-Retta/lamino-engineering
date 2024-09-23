import dbConnect from "../../../lib/dbConnect";
import About from "../../../models/About";
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
      const about = await About.findById(id, { "image.data": 0 });
      if (!about) {
        return res.status(404).json({ message: "About not found" });
      }
      const aboutResponse = about.toObject();
      aboutResponse.imageId = about.image ? about._id : null;
      delete aboutResponse.image;
      res.status(200).json(aboutResponse);
    } catch (error) {
      console.error("Error fetching about:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch about", error: error.message });
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

        const { aboutLamino, date } = fields;

        let updateData = {
          aboutLamino: Array.isArray(aboutLamino)
            ? aboutLamino[0]
            : aboutLamino,
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

          const updatedAbout = await About.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
          });
          if (!updatedAbout) {
            return res.status(404).json({ message: "About not found" });
          }

          const aboutResponse = updatedAbout.toObject();
          aboutResponse.imageId = updatedAbout.image ? updatedAbout._id : null;
          delete aboutResponse.image;

          res.status(200).json(aboutResponse);
        } catch (error) {
          console.error("Error updating about:", error);
          res
            .status(400)
            .json({ message: "Failed to update about", error: error.message });
        }
      });
    } else if (req.method === "DELETE") {
      try {
        const deletedAbout = await About.findByIdAndDelete(id);
        if (!deletedAbout) {
          return res.status(404).json({ message: "About not found" });
        }
        res.status(200).json({ message: "About deleted successfully" });
      } catch (error) {
        console.error("Error deleting about:", error);
        res
          .status(500)
          .json({ message: "Failed to delete about", error: error.message });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
}
