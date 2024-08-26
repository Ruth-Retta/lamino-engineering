import dbConnect from '../../../lib/dbConnect';
import Career from '../../../models/Career';

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === 'GET') {
    // Get a single career by ID
    try {
      const career = await Career.findById(id);
      if (!career) {
        return res.status(404).json({ message: 'Career not found' });
      }
      res.status(200).json(career);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch career' });
    }
  } else if (req.method === 'PUT') {
    // Update a career by ID
    const { position, startDate, endDate, description, requirements } = req.body;
    try {
      const updatedCareer = await Career.findByIdAndUpdate(
        id,
        { position, startDate, endDate, description, requirements },
        { new: true, runValidators: true }
      );
      if (!updatedCareer) {
        return res.status(404).json({ message: 'Career not found' });
      }
      res.status(200).json(updatedCareer);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update career', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete a career by ID
    try {
      const deletedCareer = await Career.findByIdAndDelete(id);
      if (!deletedCareer) {
        return res.status(404).json({ message: 'Career not found' });
      }
      res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete career', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// import dbConnect from '../../../lib/dbConnect';
// import Career from '../../../models/Career';

// export default async function handler(req, res) {
//     // await dbConnect();
//     // const { id } = req.query;

//     // switch (req.method) {
//     //     case 'GET':
//     //         try {
//     //             const career = await Career.findById(id);
//     //             if (!career) {
//     //                 return res.status(404).json({ success: false, message: 'Career not found' });
//     //             }
//     //             res.status(200).json(career);
//     //         } catch (error) {
//     //             console.error(error);
//     //             res.status(500).json({ success: false, message: 'Server error fetching career' });
//     //         }
//     //         break;
//     //     case 'PUT':
//     //         try {
//     //             const career = await Career.findByIdAndUpdate(id, req.body, {
//     //                 new: true,
//     //                 runValidators: true,
//     //             });
//     //             if (!career) {
//     //                 return res.status(404).json({ success: false, message: 'Career not found' });
//     //             }
//     //             res.status(200).json(career);
//     //         } catch (error) {
//     //             console.error(error);
//     //             res.status(500).json({ success: false, message: 'Server error updating career' });
//     //         }
//     //         break;
//     //     case 'DELETE':
//     //         try {
//     //             const deletedCareer = await Career.deleteOne({ _id: id });
//     //             if (!deletedCareer) {
//     //                 return res.status(404).json({ success: false, message: 'Career not found' });
//     //             }
//     //             res.status(200).json({ success: true, message: 'Career deleted successfully' });
//     //         } catch (error) {
//     //             console.error(error);
//     //             res.status(500).json({ success: false, message: 'Server error deleting career' });
//     //         }
//     //         break;
//     //     default:
//     //         res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//     //         res.status(405).end(`Method ${req.method} Not Allowed`);
//     // }
// }
