const Sweet = require('../models/sweet');

// POST /api/sweets to Add a new sweet
const createSweet = async (req, res) => {
  try {

    const { name, price, quantity, category } = req.body;

    // basic validation
    if (!name || price == null || quantity == null) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const sweet = await Sweet.create({
      name,
      price,
      quantity,
      category
    });

    return res.status(200).json({
      id: sweet._id,
      name: sweet.name,
      price: sweet.price,
      quantity: sweet.quantity,
      category: sweet.category
    });

  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Could not create sweet' });
  }
};


// GET /api/sweets View a list of all available sweets
const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    return res.status(200).json(sweets);
  } catch (err) {
    return res.status(400).json({ message: 'Could not fetch sweets' });
  }
};

module.exports = { createSweet, getAllSweets};
