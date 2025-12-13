const { Router } = require('express');
const { createSweet } = require('../controller/sweet');
const { userAuthorization } = require('../middleware/userAuthorization');
const { adminAuthorization } = require('../middleware/adminAuthorization');

const router = Router();

//protected route to let admin create asweet item in db
router.post('/api/sweets', userAuthorization, adminAuthorization, createSweet);

module.exports = router;
