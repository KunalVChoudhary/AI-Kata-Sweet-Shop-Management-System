const { Router } = require('express');
const { createSweet, getAllSweets, searchSweets, updateSweet, deleteSweet } = require('../controller/sweet');
const { userAuthorization } = require('../middleware/userAuthorization');
const { adminAuthorization } = require('../middleware/adminAuthorization');

const router = Router();

//protected route to let admin create asweet item in db
router.post('/api/sweets', userAuthorization, adminAuthorization, createSweet);

//route for fetching the list of available sweets
router.get('/api/sweets', getAllSweets)

//route for fetching the list of sweets based on filter params
router.get('/api/sweets/search', searchSweets);

//route for Updating a sweet's details
router.put('/api/sweets/:id', userAuthorization, adminAuthorization, updateSweet)

//route for deleting a sweet (admin only)
router.delete('/api/sweets/:id', userAuthorization, adminAuthorization, deleteSweet)

module.exports = router;
