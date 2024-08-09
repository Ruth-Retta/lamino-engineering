import dbConnect from '../../../lib/dbConnect';
import Career from '../../../backend/models/Career';

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'DELETE') {
        await Career.findByIdAndDelete(id);
        res.status(204).end(); // No Content
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
