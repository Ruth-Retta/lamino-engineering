import dbConnect from "../../../../lib/dbConnect";
import Portfolio from "../../../../models/Portfolio";
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
      const portfolio = await Portfolio.findById(id);
      if (!portfolio || !portfolio.image || !portfolio.image.data) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.setHeader("Content-Type", portfolio.image.contentType);
      res.send(portfolio.image.data);
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
