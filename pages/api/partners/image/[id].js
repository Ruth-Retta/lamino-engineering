import dbConnect from "../../../../lib/dbConnect";
import Partner from "../../../../models/Partner";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      const partner = await Partner.findById(id);
      if (!partner || !partner.image || !partner.image.data) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.setHeader("Content-Type", partner.image.contentType);
      res.send(partner.image.data);
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
