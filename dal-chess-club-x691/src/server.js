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
app.get("/api/home/homePageCards", (req, res) => {
  db.then((dbConnection) => {
    const sql = "select * from event_images LIMIT 3";
    dbConnection.query(sql, (error, data) => {
      console.log("/homePageCards called");
      if (error) {
        console.error("Error while fetching Homepage data:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }

      if (data.length > 0) {
        console.log("/homePageCards data found");
        const slideData = data.map((item) => {
          return {
            id: item.event_imageID,
            content: item.alt_text,
            title: item.alt_text,
            image: `http://localhost:5000${item.image}`,
          };
        });
        return res.json(slideData);
      } else {
        res.status(404).json({ error: "No data found" });
      }
    });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  });
});


// For creating a homepage slide
app.post("/api/home/createHomePageSlide", (req, res) => {
  console.log("createHomePageSlide called");
  const { image, alt_text } = req.body;
  const sql = 'INSERT INTO event_images (image, alt_text) VALUES (?, ?)';
  
  db.then((dbConnection) => {
      dbConnection.query(sql, [image, alt_text], (err, result) => {
          if (err) {
              console.error('Error creating homepage slide:', err);
              return res.status(500).json({ error: 'Internal Server Error', message: err.message });
          }
          res.json({ id: result.insertId, image, alt_text });
      });
  }).catch((error) => {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// For getting homepage cards
app.get("/api/home/getHomePageCards", (req, res) => {
  const sql = 'SELECT * FROM people_images LIMIT 3';
  console.log("/api/home/getHomePageCards");
  db.then((dbConnection) => {
      dbConnection.query(sql, (err, data) => {
          if (err) {
              console.error('Error fetching homepage card data:', err);
              return res.status(500).json({ error: 'Internal Server Error', message: err.message });
          }
          if (data.length > 0) {
              const cardImgData = data.map(item => ({
                  id: item.people_imageID,
                  alt_text: item.alt_text,
                  image: `http://localhost:5000${item.image}`
              }));
              return res.json(cardImgData);
          } else {
              return res.status(404).json({ error: 'No data found' });
          }
      });
  }).catch((error) => {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// For updating a homepage slide
app.put("/api/home/updateHomePageSlide/:id", (req, res) => {
  console.log("/api/home/updateHomePageSlide/:id");
  const { id } = req.params;
  const { alt_text, image } = req.body;
  const sql = 'UPDATE event_images SET alt_text = ?, image = ? WHERE event_imageID = ?';

  db.then((dbConnection) => {
      dbConnection.query(sql, [alt_text, image, id], (err, result) => {
          if (err) {
              console.error('Error updating homepage slide:', err);
              return res.status(500).json({ error: 'Internal Server Error', message: err.message });
          }
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: `Slide with id ${id} not found` });
          }
          res.json({ id, alt_text, image });
      });
  }).catch((error) => {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// For deleting a homepage slide
app.delete("/api/home/deleteHomePageSlide/:id", (req, res) => {
  console.log("/api/home/deleteHomePageSlide/:id");
  const { id } = req.params;
  const sql = 'DELETE FROM event_images WHERE event_imageID = ?';

  db.then((dbConnection) => {
      dbConnection.query(sql, [id], (err, result) => {
          if (err) {
              console.error('Error deleting homepage slide:', err);
              return res.status(500).json({ error: 'Internal Server Error', message: err.message });
          }
          if (result.affectedRows === 0) {
              return res.status(404).json({ error: `Slide with id ${id} not found` });
          }
          res.json({ message: `Slide with id ${id} deleted successfully` });
      });
  }).catch((error) => {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// For getting homepage slides
app.get("/api/home/getHomePageSlides", (req, res) => {
  console.log("/api/home/getHomePageSlides");
  const sql = "SELECT * FROM event_images LIMIT 3";

  db.then((dbConnection) => {
      dbConnection.query(sql, (error, data) => {
          if (error) {
              console.error("Error while fetching homepage slides:", error);
              return res.status(500).json({ error: "Internal Server Error", message: error.message });
          }
          if (data.length > 0) {
              const slideData = data.map((item) => ({
                  id: item.event_imageID,
                  content: item.alt_text,
                  title: item.alt_text,
                  image: `http://localhost:5000${item.image}`,
              }));
              return res.json(slideData);
          } else {
              res.status(404).json({ error: "No data found" });
          }
      });
  }).catch((error) => {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  