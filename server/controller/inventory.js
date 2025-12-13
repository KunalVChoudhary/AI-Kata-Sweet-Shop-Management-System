const Sweet = require('../models/sweet');
const User = require('../models/user');

//controller function for  POST /api/sweets/:id/purchase to manage users purchase request
const purchaseSweet = async (req, res) => {
    try {

        //check if user is logged in
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: 'Please Login' });
        }
        const user = await User.findById(req.user.userId)
        req.user=user

        //role check
        if (!req.user || req.user.role !== 'USER') {
            return res.status(400).json({ message: 'Only USER can purchase a sweets' });
        }

        const { id } = req.params;

        //check if any sweeet exists with this id
        const sweet = await Sweet.findById(id);
        if (!sweet) {
        return res.status(400).json({ message: 'Sweet not found' });
        }

        //verifying if quanity is not zero 
        if (sweet.quantity <= 0) {
        return res.status(400).json({ message: 'Sweet out of stock' });
        }

        //saaving the updated values
        sweet.quantity = sweet.quantity - 1;
        await sweet.save();

        return res.status(200).json({
        id: sweet._id,
        name: sweet.name,
        quantity: sweet.quantity
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Could not purchase sweet' });
    }
};



// controller function fot  POST /api/sweets/:id/restock to  Restock a sweet, increasing its quantity (Admin only)
const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { change } = req.body;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(400).json({ message: 'Sweet not found' });
    }

    // increase quantity
    sweet.quantity = sweet.quantity + change;
    await sweet.save();

    return res.status(200).json({
      id: sweet._id,
      quantity: sweet.quantity
    });
  } catch (err) {
    return res.status(400).json({ message: 'Could not restock sweet' });
  }
};

module.exports = { purchaseSweet, restockSweet};
