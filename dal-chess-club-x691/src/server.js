const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const moment = require('moment');
const app = express();

app.use(cors());
app.use(express.json());
const fs = require('fs');
const path = require('path');
require('dotenv').config();
app.use('/src/images', express.static(path.join('src', 'images')));
// Parse URL-encoded bodies (for requests with Content-Type: application/x-www-form-urlencoded)
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());
app.options('*', cors());

var Client = require('ssh2').Client;
var ssh = new Client();
var mysql = require('mysql');

const db = new Promise(function(resolve, reject){
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
          let connection = mysql.createConnection({
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

app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await require('./database').query('SELECT * FROM my_table');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM admin WHERE username = ?', [username]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful!' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  //REST API for displaying tournaments on tournaments page
  app.get("/tournaments", (req, res) => {
    db.then((dbConnection) => {
      const tournamentQuery = "SELECT * FROM tournaments t, event_images e where t.event_imageID = e.event_imageID";
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

//API for displaying content on improve page
app.get("/improve", (req, res) => {
  db.then((dbConnection) => {
    const eventQuery = "SELECT * FROM events JOIN event_images ei ON events.event_imageID = ei.event_imageID JOIN speaker s ON events.speakerID = s.speakerID JOIN people_images pi ON s.people_imageID = pi.people_imageID JOIN category c ON events.categoryID = c.categoryID JOIN location l ON events.locationID = l.locationID";
    dbConnection.query(eventQuery, (err, data) => {
        if (err) {
            console.error("Error fetching events:", err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
}).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).send("Failed to connect to the database");
});
});

//Method to test connection
// db.then((dbConnection) => {
//   dbConnection.query('SHOW TABLES', function (error, results) {
//       if (error) throw error;
//       console.log('Tables: ', results);
//   });
// }).catch((error) => {
//   console.log(error);
// });
 

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// News Page

// Read all news
app.get("/api/news/getAllNews", (req, res) => {
  console.log("/api/news/getAllNews");
  
  const sql = `SELECT news.newsTitle,news.date, news.text, event_images.image as imgurl, event_images.alt_text 
  FROM news
  LEFT JOIN event_images ON news.event_imageID = event_images.event_imageID
  LIMIT 3`;
  db.then((dbConnection) => {
    dbConnection.query(sql, (error, data) => {
      if (error) {
        console.error("Error while fetching news with images:", error);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const newsWithImages = data.map((item) => ({
          id: item.newsId,
          title: item.newsTitle,
          date: moment(item.date).format('MMMM DD, YYYY hh:mm A'),
          text: item.text,
          imageUrl: `http://localhost:5000${item.imgurl}`,
        }));
        return res.json(newsWithImages);
      } else {
        res.status(404).json({ error: "No news articles found" });
      }
    });
  }).catch((error) => {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

//Homepage

// For getting homepage cards
app.get("/api/home/homePageCards", (req, res) => {
  db.then((dbConnection) => {
    const sql = "SELECT * from event_images LIMIT 3";
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