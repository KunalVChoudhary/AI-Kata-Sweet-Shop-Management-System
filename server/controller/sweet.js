const Sweet = require('../models/sweet');

// POST /api/sweets to Add a new sweet
const createSweet = async (req, res) => {
  try {
    
    // role check
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(400).json({ message: 'Only admin can add sweets' });
    }

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
    return res.status(400).json({ message: 'Could not create sweet' });
  }
};

module.exports = { createSweet };
