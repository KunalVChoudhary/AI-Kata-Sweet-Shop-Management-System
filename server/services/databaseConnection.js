// src/db.js
const mongoose = require('mongoose');
require('dotenv').config();

//helper function to get uri of db based on node env 
function getDbUri() {
  if (process.env.NODE_ENV === 'test') {
    return process.env.MONGODB_URI_TEST;
  }
  return process.env.MONGODB_URI;
}

//function to connect to db
async function connectDb() {
  const uri = getDbUri();
  if (!uri) {
    throw new Error('MongoDB URI missing in environment variables');
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB:', uri);
  } catch (err) {
    console.error('DB Connection Error:', err);
    throw err;
  }
}

//function to disconnect the db
async function disconnectDb() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('DB Disconnect Error:', err);
  }
}

module.exports = { connectDb, disconnectDb };
