import dbConnect from "../../../../lib/dbConnect";
import Customer from "../../../../models/Customer";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  
  const { id } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      const customer = await Customer.findById(id);
      if (!customer || !customer.image || !customer.image.data) {
        return res.status(404).json({ message: "Image not found" });
      }

      res.setHeader("Content-Type", customer.image.contentType);
      res.send(customer.image.data);
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
