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


// GET /api/sweets/search
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};

    // search by name (partial, case-insensitive)
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    // search by category
    if (category) {
      query.category = category;
    }

    // search by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);

    return res.status(200).json(sweets);
  } catch (err) {
    return res.status(400).json({ message: 'Could not search sweets' });
  }
};


module.exports = { createSweet, getAllSweets, searchSweets};
