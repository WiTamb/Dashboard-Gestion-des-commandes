const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    customerName: { type: String, required: true },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    items: [{
        articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
        name: String,
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
