const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });


router.post('/', upload.single('logo'), async (req, res) => {
  const partner = new Partner({
    name: req.body.name,
    logo: req.file.path,
    website: req.body.website
  });
  try {
    const newPartner = await partner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
