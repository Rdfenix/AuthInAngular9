const ProductController = require('../controllers/ProductController');
const PersonController = require('../controllers/PersonController');
const express = require('express');
const router = express.Router();

router.get('/people', PersonController.all);
router.get('/products', ProductController.all);

module.exports = router;
