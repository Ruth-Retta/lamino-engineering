import dbConnect from "../../../../lib/dbConnect";
import Career from "../../../../models/Career";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      const career = await Career.findById(id);
      if (!career || !career.image || !career.image.data) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.setHeader("Content-Type", career.image.contentType);
      res.send(career.image.data);
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
