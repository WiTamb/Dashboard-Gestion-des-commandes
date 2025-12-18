const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/', auth, orderController.getOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/', orderController.createOrder); // Public for clients (optional)
router.put('/:id/status', auth, orderController.updateOrderStatus);
router.put('/:id', auth, orderController.updateOrder);
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
