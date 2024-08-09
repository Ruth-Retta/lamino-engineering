import dbConnect from '../../../lib/dbConnect';
import Partner from '../../../backend/models/Partners';  // Assuming you have a Partner model

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const partners = await Partner.find({});
                res.status(200).json({ success: true, data: partners });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const partner = await Partner.create(req.body);
                res.status(201).json({ success: true, data: partner });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
