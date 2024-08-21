import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../backend/models/Partners';

export default async function handler(req, res) {
    await dbConnect();

    try {
        if (req.method === 'GET') {
            const partners = await Partner.find({});
            return res.status(200).json(partners);
        } else if (req.method === 'POST') {
            const { name, logo, website } = req.body;

            if (!name || !logo || !website) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const newPartner = new Partner({
                name,
                logo,
                website,
            });

            await newPartner.save();
            return res.status(201).json({ message: 'Partner created successfully' });
        } else {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error in /api/partners:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
