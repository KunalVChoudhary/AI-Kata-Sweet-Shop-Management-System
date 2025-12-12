const mongoose = require('mongoose');
const { connectDb, disconnectDb } = require('../services/databaseConnection');

module.exports = {
  async setup() {
    // Connect to test DB
    await connectDb();
  },

  async deleteDB() {
    // Drop the test database and disconnect
    try {
      if (mongoose.connection && mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
      }
    } catch (err) {
      
    }
    await disconnectDb();
  },

  async clearCollection() {
    // Clear all collections between tests
    const collections = Object.keys(mongoose.connection.collections);
    for (const name of collections) {
      try {
        await mongoose.connection.collections[name].deleteMany({});
      } catch (err) {
        
      }
    }
  }
};
