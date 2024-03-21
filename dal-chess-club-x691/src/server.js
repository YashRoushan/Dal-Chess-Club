const express = require('express');

const app = express();
const port = 5000;
//const mysql = require('mysql2');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.options('*', cors());
// Parse JSON bodies (for requests with Content-Type: application/json)
app.use(express.json({ limit: '20mb' }));

// Parse URL-encoded bodies (for requests with Content-Type: application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(cors());
app.options('*', cors());


const fs = require('fs');
const path = require('path');
require('dotenv').config();

const createPool = require("./Database");




const homePageController = require('./controllers/homePageController');

// Import homePageRoutes
const homePageRoutes = require('./routes/homePageRoutes');

// Use homePageRoutes
app.use('/api', homePageRoutes);
// Routes
app.get('/api/homePageCards', homePageController.getHomePageCards);
app.get('/api/homePageSlides', homePageController.getHomePageSlides);
app.post('/api/createHomePageSlides', homePageController.createHomePageSlide);
app.post('/api/updHomePageSlides/:id', homePageController.updateHomePageSlide);
app.delete('/api/delHomePageSlides/:id', homePageController.deleteHomePageSlide);

app.use('/src/images', express.static(path.join('src', 'images')));


//will log when the server is running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
})

app.get('/userdata', (req, res) => {
    pool.query('SELECT * FROM userdata', (error, results) => {
        if (error) {
            console.error('Error while fetching user data:', error);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }

        if (Array.isArray(results) && results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    });
})

 
  

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });