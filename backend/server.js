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
let partnersCollection;
let customersCollection;
let servicesCollection;
let testimonialsCollection;


client.connect().then(() => {

  const db = client.db('lamino');

  careersCollection = db.collection('careers');
  partnersCollection = db.collection('partners');
  customersCollection = db.collection('customers');
  servicesCollection = db.collection('services');
  testimonialsCollection = db.collection('testimonials');

  console.log('Connected to MongoDB');

}).catch(err => console.error(err));

// careers collection
app.get('/api/careers', async (req, res) => {
  try {
    const careers = await careersCollection.find().toArray();
    res.json(careers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch careers' });
  }
});

// partners collection

app.get('/api/partners', async (req, res) => {
  try {
    const partners = await partnersCollection.find().toArray();
    res.json(partners);
  } catch (err) {
    console.error('Error fetching partners:', err);
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
});

// customers collection

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await customersCollection.find().toArray();
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// services collection

app.get('/api/services', async (req, res) => {
  try {
    const services = await servicesCollection.find().toArray();
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// testimonials collection

app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await testimonialsCollection.find().toArray();
    res.json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
