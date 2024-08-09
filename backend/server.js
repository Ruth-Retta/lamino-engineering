const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());

// Replace with your MongoDB connection string
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let careersCollection;

client.connect().then(() => {
    const db = client.db('lamino'); 
    careersCollection = db.collection('careers'); // Replace with your collection name
    console.log('Connected to MongoDB');
}).catch(err => console.error(err));
