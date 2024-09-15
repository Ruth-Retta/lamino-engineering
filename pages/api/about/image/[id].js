import dbConnect from "../../../../lib/dbConnect";
import About from "../../../../models/About";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || !session.user.role) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { id } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      const about = await About.findById(id);
      if (!about || !about.image || !about.image.data) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.setHeader("Content-Type", about.image.contentType);
      res.send(about.image.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch image", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
