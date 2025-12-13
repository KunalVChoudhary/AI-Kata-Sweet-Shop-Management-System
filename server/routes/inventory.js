const { Router } = require('express');
const { userAuthorization } = require('../middleware/userAuthorization');
const { adminAuthorization } = require('../middleware/adminAuthorization');
const { purchaseSweet, restockSweet } = require('../controller/inventory');


const router = Router();


//route to let user purchase a sweet
router.post('/api/sweets/:id/purchase', userAuthorization, purchaseSweet );

//route to let admin restock sweet
router.post('/api/sweets/:id/restock', userAuthorization, adminAuthorization, restockSweet );

module.exports = router;