// routes/homeRoutes.js

const express = require('express');
const router = express.Router();
const homePageController = require('../controllers/homePageController');

// GET /api/homePageCards
router.get('/api/homePageCards', homePageController.getHomePageCards);

// GET /api/homePageSlides
router.get('/api/homePageSlides', homePageController.getHomePageSlides);

// POST /api/createHomePageSlides
router.post('/api/createHomePageSlides', homePageController.createHomePageSlide);

// PUT /api/homePageSlides/:id
router.put('/api/updHomePageSlides/:id', homePageController.updateHomePageSlide);

// DELETE /api/homePageSlides/:id
router.delete('/api/delHomePageSlides/:id', homePageController.deleteHomePageSlide);


module.exports = router;
