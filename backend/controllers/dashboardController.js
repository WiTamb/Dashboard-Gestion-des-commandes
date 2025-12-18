const Article = require('../models/Article');
const Order = require('../models/Order');

exports.getStats = async (req, res) => {
    try {
        const totalArticles = await Article.countDocuments();
        const totalOrders = await Order.countDocuments();

        const ordersByStatus = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const outOfStock = await Article.find({ quantity: { $lte: 5 } }); // Alert for stock <= 5

        const salesOverTime = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalSales: { $sum: "$total" }
                }
            },
            { $sort: { "_id": 1 } },
            { $limit: 7 }
        ]);

        res.status(200).json({
            totalArticles,
            totalOrders,
            ordersByStatus,
            outOfStockCount: outOfStock.length,
            outOfStockArticles: outOfStock,
            salesOverTime
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};
