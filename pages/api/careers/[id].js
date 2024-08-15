import dbConnect from '../../../lib/dbConnect';
import Career from '../../../backend/models/Career';

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const career = await Career.findById(id);
                if (!career) {
                    return res.status(404).json({ success: false, message: 'Career not found' });
                }
                res.status(200).json(career);
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Server error fetching career' });
            }
            break;
        case 'PUT':
            try {
                const career = await Career.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!career) {
                    return res.status(404).json({ success: false, message: 'Career not found' });
                }
                res.status(200).json(career);
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Server error updating career' });
            }
            break;
        case 'DELETE':
            try {
                const deletedCareer = await Career.deleteOne({ _id: id });
                if (!deletedCareer) {
                    return res.status(404).json({ success: false, message: 'Career not found' });
                }
                res.status(200).json({ success: true, message: 'Career deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Server error deleting career' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
