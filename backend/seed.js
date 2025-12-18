require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Article = require('./models/Article');
const Order = require('./models/Order');
const Delivery = require('./models/Delivery');

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Article.deleteMany({});
        await Order.deleteMany({});
        await Delivery.deleteMany({});

        // Create Admin User
        const admin = new User({ username: 'admin', password: 'password123' });
        await admin.save();
        console.log('Admin user created: admin / password123');

        // Create Sample Articles - Tunisian Market
        const articles = await Article.insertMany([
            // Électronique
            { name: 'iPhone 15 Pro', description: 'Smartphone Apple dernière génération, 256GB', price: 4299, quantity: 12, category: 'Électronique' },
            { name: 'Samsung Galaxy S24', description: 'Smartphone Samsung avec IA intégrée', price: 3199, quantity: 8, category: 'Électronique' },
            { name: 'MacBook Air M3', description: 'Ordinateur portable Apple ultra-léger', price: 5499, quantity: 5, category: 'Électronique' },
            { name: 'Smart TV Samsung 55"', description: 'Téléviseur 4K UHD avec Tizen OS', price: 2899, quantity: 15, category: 'Électronique' },
            { name: 'PlayStation 5', description: 'Console de jeu Sony dernière génération', price: 1899, quantity: 7, category: 'Électronique' },
            { name: 'AirPods Pro 2', description: 'Écouteurs sans fil avec réduction de bruit', price: 899, quantity: 25, category: 'Électronique' },

            // Mode
            { name: 'Jellaba Traditionnelle', description: 'Jellaba brodée à la main, style tunisien', price: 189, quantity: 30, category: 'Mode' },
            { name: 'Chemise Lin Homme', description: 'Chemise en lin naturel, fabrication locale', price: 79, quantity: 45, category: 'Mode' },
            { name: 'Robe Été Femme', description: 'Robe légère en coton, collection été', price: 129, quantity: 35, category: 'Mode' },
            { name: 'Chaussures Cuir Artisanal', description: 'Babouches en cuir fait main de Sfax', price: 149, quantity: 20, category: 'Mode' },
            { name: 'Foulard Soie', description: 'Foulard en soie naturelle, motifs traditionnels', price: 89, quantity: 40, category: 'Mode' },

            // Maison
            { name: 'Tapis Kairouan', description: 'Tapis tissé à la main de Kairouan, 2x3m', price: 599, quantity: 8, category: 'Maison' },
            { name: 'Service à Thé Nabeul', description: 'Service en céramique peint à la main', price: 129, quantity: 25, category: 'Maison' },
            { name: 'Lampe Fer Forgé', description: 'Lampe artisanale en fer forgé de Sidi Bou Said', price: 249, quantity: 18, category: 'Maison' },
            { name: 'Coussin Brodé', description: 'Coussin traditionnel avec broderie tunisienne', price: 49, quantity: 60, category: 'Maison' },
            { name: 'Cafetière Italienne', description: 'Cafetière Bialetti 6 tasses', price: 89, quantity: 30, category: 'Maison' },

            // Sport
            { name: 'Maillot Espérance ST', description: 'Maillot officiel Espérance Sportive de Tunis', price: 129, quantity: 50, category: 'Sport' },
            { name: 'Maillot Club Africain', description: 'Maillot officiel Club Africain', price: 129, quantity: 45, category: 'Sport' },
            { name: 'Nike Air Max', description: 'Chaussures de sport Nike, édition limitée', price: 449, quantity: 3, category: 'Sport' },
            { name: 'Vélo VTT', description: 'Vélo tout terrain 21 vitesses', price: 899, quantity: 10, category: 'Sport' },
            { name: 'Raquette Tennis', description: 'Raquette Wilson Pro Staff', price: 399, quantity: 15, category: 'Sport' }
        ]);
        console.log('Sample articles created (21 products).');

        // Tunisian customer names and addresses
        const customers = [
            { name: 'Mohamed Ben Ali', address: '15 Avenue Habib Bourguiba, Tunis 1000' },
            { name: 'Fatma Bouazizi', address: '23 Rue de la Liberté, Sfax 3000' },
            { name: 'Ahmed Khelifi', address: '8 Boulevard 14 Janvier, Sousse 4000' },
            { name: 'Sarra Trabelsi', address: '45 Avenue de la République, Monastir 5000' },
            { name: 'Youssef Gharbi', address: '12 Rue Ibn Khaldoun, Bizerte 7000' },
            { name: 'Leila Mansouri', address: '67 Avenue Farhat Hached, Gabès 6000' },
            { name: 'Karim Hammami', address: '3 Rue de Carthage, La Marsa 2078' },
            { name: 'Nour Eljene', address: '89 Boulevard de l\'Environnement, Ariana 2080' },
            { name: 'Amine Jebali', address: '34 Avenue de l\'Indépendance, Nabeul 8000' },
            { name: 'Hiba Chouchane', address: '56 Rue Tahar Sfar, Ben Arous 2013' }
        ];

        // Create Sample Orders with various statuses
        const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
        const orders = [];

        for (let i = 0; i < 10; i++) {
            const customer = customers[i];
            const numItems = Math.floor(Math.random() * 3) + 1;
            const orderItems = [];
            let total = 0;

            for (let j = 0; j < numItems; j++) {
                const article = articles[Math.floor(Math.random() * articles.length)];
                const qty = Math.floor(Math.random() * 2) + 1;
                orderItems.push({
                    articleId: article._id,
                    name: article.name,
                    quantity: qty,
                    price: article.price
                });
                total += article.price * qty;
            }

            const order = new Order({
                customerName: customer.name,
                total: total,
                status: statuses[i % statuses.length],
                items: orderItems,
                date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date in last 7 days
            });
            await order.save();
            orders.push({ order, address: customer.address });
        }
        console.log('Sample orders created (10 orders).');

        // Create Sample Deliveries for shipped/delivered orders
        const deliveryStatuses = ['Preparing', 'In Progress', 'Delivered'];
        for (const { order, address } of orders) {
            if (['Shipped', 'Delivered'].includes(order.status)) {
                const delivery = new Delivery({
                    orderId: order._id,
                    address: address,
                    date: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000), // Random date in next 3 days
                    status: order.status === 'Delivered' ? 'Delivered' : deliveryStatuses[Math.floor(Math.random() * 2)]
                });
                await delivery.save();
            }
        }
        console.log('Sample deliveries created.');

        console.log('\n✅ Seeding completed successfully!');
        console.log('📊 Summary:');
        console.log('   - 1 Admin user');
        console.log('   - 21 Articles (Tunisian market)');
        console.log('   - 10 Orders');
        console.log('   - Multiple deliveries');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();

