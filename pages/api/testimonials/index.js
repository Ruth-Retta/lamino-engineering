import dbConnect from "../../../lib/dbConnect";
import Testimonial from "../../../models/Testimonial";
import { IncomingForm } from "formidable";
import { getSession } from "next-auth/react";
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
      const testimonials = await Testimonial.find({}, { "image.data": 0 });
      const testimonialsWithImageId = testimonials.map((testimonial) => {
        const testimonialObj = testimonial.toObject();
        testimonialObj.imageId = testimonial.image ? testimonial._id : null;
        delete testimonialObj.image;
        return testimonialObj;
      });
      res.status(200).json(testimonialsWithImageId);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res
        .status(500)
        .json({
          message: "Failed to fetch testimonials",
          error: error.message,
        });
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

        const { author, position, content, date } = fields;

        if (!author || !position || !content || !date) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        try {
          const newTestimonial = new Testimonial({
            author: Array.isArray(author) ? author[0] : author,
            position: Array.isArray(position) ? position[0] : position,
            content: Array.isArray(content) ? content[0] : content,
            date: Array.isArray(date) ? date[0] : date,
          });

          if (files.image && files.image[0] && files.image[0].size > 0) {
            const file = files.image[0];
            newTestimonial.image = {
              data: await fs.readFile(file.filepath),
              contentType: file.mimetype,
            };
          }

          await newTestimonial.save();

          const testimonialResponse = newTestimonial.toObject();
          testimonialResponse.imageId = newTestimonial.image
            ? newTestimonial._id
            : null;
          delete testimonialResponse.image;

          res.status(201).json(testimonialResponse);
        } catch (error) {
          console.error("Error saving testimonial:", error);
          res
            .status(400)
            .json({
              message: "Failed to create testimonial",
              error: error.message,
            });
        }
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
}
