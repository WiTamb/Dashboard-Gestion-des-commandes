const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: 'placeholder.jpg' }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
