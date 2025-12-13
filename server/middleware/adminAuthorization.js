const User = require('../models/user')

//middleware to check if user in admin for protected routes (Admin on;y)
const adminAuthorization = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: 'Not Admin' });
    }
    const user = await User.findById(req.user.userId)
    req.user=user

    //role check
    if (!req.user || req.user.role !== 'ADMIN') {
      return res.status(400).json({ message: 'Only admin can add sweets' });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: 'Authorization failed' });
  }
};

module.exports = { adminAuthorization };