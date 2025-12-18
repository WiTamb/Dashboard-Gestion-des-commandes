const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    address: { type: String, required: true },
    date: { type: Date },
    status: {
        type: String,
        enum: ['Preparing', 'In Progress', 'Delivered'],
        default: 'Preparing'
    }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', DeliverySchema);
