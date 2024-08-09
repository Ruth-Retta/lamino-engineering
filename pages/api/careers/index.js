import dbConnect from '../../../lib/dbConnect';
import Career from '../../../models/Career';

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const careers = await Career.find({});
                res.status(200).json(careers);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                const career = await Career.create(req.body);
                res.status(201).json(career);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
