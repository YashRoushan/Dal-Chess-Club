const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

var Client = require("ssh2").Client;
var ssh = new Client();
var mysql = require("mysql");

// Parse URL-encoded bodies (for requests with Content-Type: application/x-www-form-urlencoded)
/*app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

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
  });*/

  var db = new Promise(function(resolve, reject){
    ssh.on('ready', function() {
      ssh.forwardOut(
        // source address, this can usually be any valid address
        'euro.cs.dal.ca',
        // source port, this can be any valid port number
        5000,
        // destination address (localhost here refers to the SSH server)
        'euro.cs.dal.ca',
        // destination port
        3306,
        function (err, stream) {
          if (err) resolve(err);
            connection = mysql.createConnection({
              host     : 'euro.cs.dal.ca',
              user     : 'chessclub',
              password : 'Mee5shaong9kaiw4',
              database : 'chessclub',
              stream: stream
            });
  
            // send connection back in variable depending on success or not
        connection.connect(function(err){
            if (err) {
                // reject the conenction if there's an error
                reject(err);
            } else {
                // resolve the error
                resolve(connection);
            }
        });
      });
    }).connect({
      host: 'euro.cs.dal.ca',
      port: 22,
      username: 'chessclub',
      password: 'eshooRi9oofaVah0'
    });
  });

  /*app.get('/userdata', (req, res) => {
    db.query('SELECT * FROM userdata', (error, results) => {
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
})*/

//REST API for displaying tournaments on tournaments page
app.get("/tournaments", (req, res) => {
  db.then((dbConnection) => {
    const tournamentQuery = "SELECT * FROM tournaments";
    dbConnection.query(tournamentQuery, (err, data) => {
        if (err) {
            console.error("Error fetching tournaments:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).send("Failed to connect to the database");
});
});

  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  