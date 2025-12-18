const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const auth = require('../middleware/auth');

router.get('/', articleController.getArticles);
router.get('/:id', articleController.getArticleById);

// Protected routes
router.post('/', auth, articleController.uploadImage, articleController.createArticle);
router.put('/:id', auth, articleController.uploadImage, articleController.updateArticle);
router.delete('/:id', auth, articleController.deleteArticle);

module.exports = router;
