const Sweet = require('../../models/sweet');
const sweetsList = require('./sweetData.json')

const seedSweets = async () => {
  try {

    const count= await Sweet.countDocuments();
    if (count == 0){
        // insert new sweets
        await Sweet.insertMany(sweetsList);
    }

    console.log('SweetList seeded successfully');
  } catch (err) {
    console.error('Error seeding sweets:', err);
  }
};

module.exports = { seedSweets };