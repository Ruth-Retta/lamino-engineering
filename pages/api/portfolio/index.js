import dbConnect from "../../../lib/dbConnect";
import Portfolio from "../../../models/Portfolio";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    // Get all portfolios
    try {
      const portfolios = await Portfolio.find();
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolios" });
    }
  } else if (req.method === "POST") {
    // Create a new portfolio
    const { title, description, imageUrl } = req.body;
    try {
      const newPortfolio = new Portfolio({
        title,
        description,
        imageUrl,
      });
      await newPortfolio.save();
      res.status(201).json(newPortfolio);
    } catch (error) {
      res.status(400).json({ message: "Failed to create portfolio", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}