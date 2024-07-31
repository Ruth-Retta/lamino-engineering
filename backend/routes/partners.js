const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // add timestamp to the file name
  }
});

const upload = multer({ storage: storage });

// Use multer in your POST route
router.post('/', upload.single('logo'), async (req, res) => {
  const partner = new Partner({
    name: req.body.name,
    logo: req.file.path, // Save the file path
    website: req.body.website
  });
  try {
    const newPartner = await partner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
