import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Attempting to connect to MongoDB...');
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, 
      connectTimeoutMS: 20000,     
      socketTimeoutMS: 60000,
      dbName: "Lamino",
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    mongoose.connection.once('open', () => {
      console.log('Connection opened');
    });
    mongoose.connection.on('error', (err) => {
      console.error('Connection error:', err);
    });
    return cached.conn;
  } catch (error) {
    cached.promise = null; 
    throw error;
  }
}

export default dbConnect;
