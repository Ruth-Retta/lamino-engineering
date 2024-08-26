import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../models/Partners';

export default async function handler(req, res) {
    const { id } = req.query;
    await dbConnect();

    try {
        if (req.method === 'GET') {
            const partner = await Partner.findById(id);

            if (!partner) {
                return res.status(404).json({ message: 'Partner not found' });
            }

            return res.status(200).json(partner);
        } else if (req.method === 'PUT') {
            const { name, logo, website } = req.body;

            if (!name || !logo || !website) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const updatedPartner = await Partner.findByIdAndUpdate(
                id,
                { name, logo, website },
                { new: true, runValidators: true }
            );

            if (!updatedPartner) {
                return res.status(404).json({ message: 'Partner not found' });
            }

            return res.status(200).json(updatedPartner);
        } else if (req.method === 'DELETE') {
            const deletedPartner = await Partner.findByIdAndDelete(id);

            if (!deletedPartner) {
                return res.status(404).json({ message: 'Partner not found' });
            }

            return res.status(200).json({ message: 'Partner deleted successfully' });
        } else {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error in /api/partners/[id]:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
