import dbConnect from '../../../lib/dbConnect';
import Career from '../../../models/Career';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Get all careers
    try {
      const careers = await Career.find();
      res.status(200).json(careers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch careers' });
    }
  } else if (req.method === 'POST') {
    // Create a new career
    const { position, startDate, endDate, description, requirements } = req.body;
    try {
      const newCareer = new Career({
        position,
        startDate,
        endDate,
        description,
        requirements,
      });
      await newCareer.save();
      res.status(201).json(newCareer);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create career', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


// import dbConnect from '../../../lib/dbConnect';
// import Career from '../../../models/Career';

// export default async function handler(req, res) {
//     // await dbConnect();

//     // switch (req.method) {
//     //     case 'GET':
//     //         try {
//     //             const careers = await Career.find({});
//     //             res.status(200).json(careers);
//     //         } catch (error) {
//     //             console.error(error);
//     //             res.status(500).json({ success: false, message: 'Server error fetching careers' });
//     //         }
//     //         break;
//     //     case 'POST':
//     //         try {
//     //             const { position, startDate, endDate, description, requirements } = req.body;
                
                
//     //             if (!position || !startDate || !endDate || !description || !requirements) {
//     //                 return res.status(400).json({ message: 'Missing required fields' });
//     //             }

//     //             const newCareer = new Career({
//     //                 position,
//     //                 startDate,
//     //                 endDate,
//     //                 description,
//     //                 requirements
//     //             });

//     //             await newCareer.save();
//     //             res.status(201).json(newCareer);
//     //         } catch (error) {
//     //             console.error(error);
//     //             res.status(500).json({ success: false, message: 'Server error creating career' });
//     //         }
//     //         break;
//     //     default:
//     //         res.setHeader('Allow', ['GET', 'POST']);
//     //         res.status(405).end(`Method ${req.method} Not Allowed`);
//     // }
// }
