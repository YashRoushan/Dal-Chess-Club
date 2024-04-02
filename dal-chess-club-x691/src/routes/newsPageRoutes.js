// newsPageRoutes.js

const express = require('express');
const router = express.Router();
const newsPageController = require('../controllers/newsPageController');

// Define routes for newsPage
router.get('/api/newsPage', newsPageController.getAllNews);

module.exports = router;