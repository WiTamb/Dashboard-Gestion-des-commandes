const Order = require('../models/Order');
const Article = require('../models/Article');

exports.createOrder = async (req, res) => {
    try {
        const { customerName, items, total } = req.body;

        // Create the order
        const order = new Order({
            customerName,
            items,
            total,
            status: 'Pending'
        });

        await order.save();

        // Update stock for each item
        for (const item of items) {
            await Article.findByIdAndUpdate(item.articleId, {
                $inc: { quantity: -item.quantity }
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.articleId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { customerName, items, total, status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { customerName, items, total, status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
