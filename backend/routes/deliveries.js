const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const auth = require('../middleware/auth');

router.get('/', auth, deliveryController.getDeliveries);
router.post('/', auth, deliveryController.createDelivery);
router.put('/:id/status', auth, deliveryController.updateDeliveryStatus);

module.exports = router;
