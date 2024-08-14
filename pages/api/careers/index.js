import dbConnect from '../../../lib/dbConnect';
import Career from '../../../backend/models/Career';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (req.method === 'GET') {
          const careers = await Career.find({});
          return res.status(200).json({ data: careers });
      } else if (req.method === 'POST') {
          const { position, startDate, endDate, description, requirements } = req.body;

          if (!position || !startDate || !endDate || !description || !requirements) {
              return res.status(400).json({ message: 'Missing required fields' });
          }

          const newCareer = new Career({
              position,
              startDate,
              endDate,
              description,
              requirements,
          });

          await newCareer.save();
          return res.status(201).json({ message: 'Career created successfully' });
      } else {
          return res.status(405).json({ message: 'Method Not Allowed' });
      }
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
      }
      break;

    case 'POST':
      try {
        const career = await Career.create(req.body);
        res.status(201).json({ success: true, data: career });
      } catch (error) {
        res.status(400).json({ success: false, error: 'Bad Request - Invalid data' });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid request method' });
      break;
  }
}