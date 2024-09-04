import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const upload = multer({
  storage: multer.diskStorage({
    destination: '../../public/uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

const ensureDirectoryExists = async (dir) => {
  try {
    await promisify(fs.access)(dir);
  } catch (error) {
    await promisify(fs.mkdir)(dir, { recursive: true });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    await ensureDirectoryExists('./public/uploads');

    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: `Error uploading file: ${err.message}` });
      }
      res.status(200).json({ file: req.file });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
