import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express, { json } from 'express';
import { MongoClient } from 'mongodb';
const app = express();
app.use(json());

const uri = process.env.MONGODB_URI; 
console.log('MongoDB URI:', uri);
const client = new MongoClient(uri);

let careersCollection;

client.connect().then(() => {
  const db = client.db('lamino');
  careersCollection = db.collection('careers');
  console.log('Connected to MongoDB');
}).catch(err => console.error(err));

app.get('/api/careers', async (req, res) => {
  try {
    const careers = await careersCollection.find().toArray();
    res.json(careers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch careers' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
