const Delivery = require('../models/Delivery');

exports.createDelivery = async (req, res) => {
    try {
        const { orderId, address, date } = req.body;
        const delivery = new Delivery({ orderId, address, date });
        await delivery.save();
        res.status(201).json(delivery);
    } catch (error) {
        res.status(500).json({ message: 'Error creating delivery', error: error.message });
    }
};

exports.getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find().populate('orderId');
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deliveries', error: error.message });
    }
};

exports.updateDeliveryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const delivery = await Delivery.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: 'Error updating delivery', error: error.message });
    }
};

exports.getDeliveryById = async (req, res) => {
    try {
        const delivery = await Delivery.findById(req.params.id).populate('orderId');
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery', error: error.message });
    }
};

exports.updateDelivery = async (req, res) => {
    try {
        const { orderId, address, date, status } = req.body;
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { orderId, address, date, status },
            { new: true }
        );
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        res.status(200).json(delivery);
    } catch (error) {
        res.status(500).json({ message: 'Error updating delivery', error: error.message });
    }
};

exports.deleteDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.findByIdAndDelete(req.params.id);
        if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
        res.status(200).json({ message: 'Delivery deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting delivery', error: error.message });
    }
};
