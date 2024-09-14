import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('Please define ADMIN_EMAIL and ADMIN_PASSWORD environment variables inside .env.local');
}

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    default: 'admin',
    required: true
  }
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function addAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const newAdmin = new Admin({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();
    console.log('Admin user added successfully');
  } catch (error) {
    console.error('Error adding admin user:', error);
  } finally {
    await mongoose.connection.close();
  }
}

addAdminUser();