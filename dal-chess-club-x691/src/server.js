const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const JWT_SECRET =
  "fposhrdg8943tupspgijw30949tgewg())q43fhsafnq43w98fas?2rwf[GF$WF]f4gegihfhuw43r[][)(f4o8fgdsbk";
const bcrypt = require("bcrypt");
const moment = require("moment");
const app = express();
const multer = require("multer");

app.use(cors());
app.use(express.json());

const fs = require("fs");
const path = require("path");
app.use("/src/images", express.static(path.join("src", "images")));
// Parse URL-encoded bodies (for requests with Content-Type: application/x-www-form-urlencoded)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(cors());
app.options("*", cors());



var Client = require("ssh2").Client;
var ssh = new Client();
var mysql = require("mysql2");

const db = new Promise(function (resolve, reject) {
  ssh
    .on("ready", function () {
      ssh.forwardOut(
        // source address, this can usually be any valid address
        "euro.cs.dal.ca",
        // source port, this can be any valid port number
        5001,
        // destination address (localhost here refers to the SSH server)
        "euro.cs.dal.ca",
        // destination port
        3306,
        function (err, stream) {
          if (err) resolve(err);
          let connection = mysql.createConnection({
            host: "euro.cs.dal.ca",
            user: "chessclub",
            password: "Mee5shaong9kaiw4",
            database: "chessclub",
            stream: stream,
          });

          // send connection back in variable depending on success or not
          connection.connect(function (err) {
            if (err) {
              // reject the conenction if there's an error
              reject(err);
            } else {
              // resolve the error
              resolve(connection);
            }
          });
        }
      );
    })
    .connect({
      host: "euro.cs.dal.ca",
      port: 22,
      username: "chessclub",
      password: "eshooRi9oofaVah0",
    });
});

app.get("/api/login", (req, res) => {
  db.then((dbConnection) => {
    const loginQuery = "Select * from admin";
    dbConnection.query(loginQuery, (err, data) => {
      if (err) {
        console.error("Error fetching login information:", err);
        return res.status(500).json(err);
      }

      return res.json(data);
    });
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});



//REST API for displaying tournaments on tournaments page
app.get("/tournaments", (req, res) => {
  //query parameters if filters were used
  const { id, name, price, date } = req.query;

  let tournamentQuery =
      "SELECT * FROM tournaments t, event_images e where t.event_imageID = e.event_imageID AND (t.end_date > NOW() || t.end_date is null) ";

  const queryParams = [];
  //altering query by adding query parameters if filters were used
  if (id) {
    tournamentQuery += ' AND tournamentsID LIKE ?';
    queryParams.push(`%${id}%`);
  }
  if (name) {
    tournamentQuery += ' AND title LIKE ?';
    queryParams.push(`%${name}%`);
  }
  if (price) {
    tournamentQuery += ' AND cost <= ?';
    queryParams.push(price);
  }
  if (date) {
    tournamentQuery += ' AND start_date LIKE ?';
    queryParams.push(`%${date}%`);
  }
  db.then((dbConnection) => {
    dbConnection.query(tournamentQuery, queryParams, (error, data) => {
      if (error) {
        console.error("Error while fetching news with images:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const newsWithImages = data.map((item) => {
          const image = item.image ? getImageUrl(item.image) : null;
          return {
            ...item, // Spread the existing item object
            image: image, // Override the imageUrl property
          };
        });
        return res.json(newsWithImages);
      } else {
        res.status(404).json({ error: "No Tournaments found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  });
});

// past tournaments
app.get("/pastTournaments", (req, res) => {
  //query parameters if filters were used
  const { id, name, price, date } = req.query;

  let tournamentQuery =
      // "SELECT * FROM tournaments t, event_images e where (t.end_date < NOW())";
      "SELECT * FROM tournaments t, event_images e where t.event_imageID = e.event_imageID AND t.end_date <= NOW()";

  const queryParams = [];
  //altering query by adding query parameters if filters were used
  if (id) {
    tournamentQuery += ' AND tournamentsID LIKE ?';
    queryParams.push(`%${id}%`);
  }
  if (name) {
    tournamentQuery += ' AND title LIKE ?';
    queryParams.push(`%${name}%`);
  }
  if (price) {
    tournamentQuery += ' AND cost <= ?';
    queryParams.push(price);
  }
  if (date) {
    tournamentQuery += ' AND start_date LIKE ?';
    queryParams.push(`%${date}%`);
  }
  db.then((dbConnection) => {
    dbConnection.query(tournamentQuery, queryParams, (error, data) => {
      if (error) {
        console.error("Error while fetching news with images:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const newsWithImages = data.map((item) => {
          const image = item.image ? getImageUrl(item.image) : null;
          return {
            ...item, // Spread the existing item object
            image: image, // Override the imageUrl property
          };
        });
        return res.json(newsWithImages);
      } else {
        res.status(404).json({ error: "No Tournaments found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
  });
});

//check if email is in database
app.post("/emailVer", async (req, res) => {
  db.then((dbConnection) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email address is required" });
    }

    const emailQuery = "SELECT * FROM admin WHERE username = ?";
    dbConnection.query(emailQuery, [email], (err, rows) => {
      if (err) {
        console.error("Error checking email:", err);
        return res.status(500).json({ error: "Error checking email" });
      }
      if (rows.length > 0) {
        const user = rows[0];
        const secret = JWT_SECRET + user.password;
        const token = jwt.sign(
          { email: user.username, id: user.adminID },
          secret,
          { expiresIn: "5m" }
        );
        const link = `http://localhost:3000/chessclub/resetPassword/${user.adminID}/${token}`;
        console.log(link);

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "this@gmail.com",
            pass: "123123",
          },
        });
        var mailContent = {
          from: "ouremail@gmail.com",
          to: email,
          subject: "Password Reset Link",
          text: link,
        };
        transporter.sendMail(mailContent, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).send("Failed to connect to the database");
  });
});

//API for displaying content on improve page
app.get("/improve", (req, res) => {
  db.then((dbConnection) => {
    console.log(dbConnection);
    const eventQuery = "SELECT events.*, ei.image AS eventImage, s.*, pi.image AS speakerImage, c.*, l.* FROM events JOIN event_images ei ON events.event_imageID = ei.event_imageID JOIN speaker s ON events.speakerID = s.speakerID JOIN people_images pi ON s.people_imageID = pi.people_imageID JOIN category c ON events.categoryID = c.categoryID JOIN location l ON events.locationID = l.locationID";

    dbConnection.query(eventQuery, (err, data) => {
      if (err) {
        console.error("Error fetching events:", err);
        return res.status(500).json(err);
      }

      const eventsWithImages = data.map((item) => {
        const eventImage = item.eventImage ? getImageUrl(item.eventImage) : null;
        const speakerImage = item.speakerImage ? getImageUrl(item.speakerImage) : null;

        return {
          ...item,
          eventImage: eventImage,
          speakerImage: speakerImage,
        };
      });

      return res.json(eventsWithImages);
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).send("Failed to connect to the database");
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import BASE_URL and getImageUrl from config.js in server.js
// Now you can use BASE_URL and getImageUrl in your server.js file
const { getImageUrl } = require('./config.js');
const { File } = require("buffer");
const { Upload } = require("@mui/icons-material");


// News Page

// Read all news
app.get("/api/news/getAllNews", (req, res) => {
  console.log("/api/news/getAllNews");

  const sql = `SELECT news.newsTitle,news.date, news.text, event_images.image as imgurl, event_images.alt_text 
  FROM news
  LEFT JOIN event_images ON news.event_imageID = event_images.event_imageID`;
  db.then((dbConnection) => {
    dbConnection.query(sql, (error, data) => {
      if (error) {
        console.error("Error while fetching news with images:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const newsWithImages = data.map((item) => ({
          id: item.newsId,
          title: item.newsTitle,
          date: moment(item.date).format("MMMM DD, YYYY hh:mm A"),
          text: item.text,
          imageUrl: getImageUrl(item.imgurl), // Use the getImageUrl function
        }));
        return res.json(newsWithImages);
      } else {
        res.status(404).json({ error: "No news articles found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
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
            image: getImageUrl(item.image),
          };
        });
        return res.json(slideData);
      } else {
        res.status(404).json({ error: "No data found" });
      }
    });
  }).catch((err) => {
    console.error(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
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
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const slideData = data.map((item) => ({
          id: item.event_imageID,
          content: item.alt_text,
          title: item.alt_text,
          image: getImageUrl(item.image),
        }));
        return res.json(slideData);
      } else {
        res.status(404).json({ error: "No data found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  });
});

//About Us page

app.get("/api/about-us/getMembers", (req, res) => {
  console.log("/api/about-us/getMembers");
  const sql = `
    SELECT 
      m.memberID,
      m.bio,
      p.description AS position,
      pi.image AS imageUrl,
      pi.alt_text AS imageAltText
    FROM 
      members m
      JOIN positions p ON m.positionID = p.positionID
      LEFT JOIN people_images pi ON m.people_imageID = pi.people_imageID
  `;

  db.then((dbConnection) => {
    dbConnection.query(sql, (error, data) => {
      if (error) {
        console.error("Error fetching member data:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const membersData = data.map((item) => ({
          memberId: item.memberID,
          position: item.position,
          bio: item.bio,
          imageUrl: getImageUrl(item.imageUrl),
        }));
        return res.json(membersData);
      } else {
        res.status(404).json({ error: "No member data found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  });
});

// FAQ Page
app.get("/api/faq/getAllFaqs", (req, res) => {
  console.log("/api/faq/getAllFaqs");

  const sql = `
    SELECT 
      faqID AS id, 
      question, 
      answer 
    FROM 
      faq
  `;

  db.then((dbConnection) => {
    dbConnection.query(sql, (error, data) => {
      if (error) {
        console.error("Error while fetching FAQs:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {
        const formattedData = data.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }));
        return res.json(formattedData);
      } else {
        res.status(404).json({ error: "No FAQs found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  });
});


// About US Page

// Adding member data in About US page
app.post('/api/members/add', (req, res) => {
  const { name, positionID, bio, people_imageID } = req.body;
  const status = 1; // New members always have status 1

  const sqlInsertMember = 'INSERT INTO members (name, positionID, status, bio, people_imageID) VALUES (?, ?, ?, ?, ?)';

  db.then((dbConnection) => {
    dbConnection.query(sqlInsertMember, [name, positionID, status, bio, people_imageID], (error, result) => {
      if (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Member added successfully', memberID: result.insertId });
      }
    });
  }).catch((error) => {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// Getting member positions 
app.get('/api/positions', (req, res) => {
  const sqlSelectPositions = 'SELECT * FROM positions';

  db.then((dbConnection) => {
    dbConnection.query(sqlSelectPositions, (error, results) => {
      if (error) {
        console.error('Error fetching positions:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(results);
      }
    });
  }).catch((error) => {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// Changing the status of the previous member with the chosen position
app.put('/api/members/updateStatus/:positionID', (req, res) => {
  const { positionID } = req.params;
  const { status } = req.body;

  const sqlUpdateStatus = 'UPDATE members SET status = ? WHERE positionID = ?';

  db.then((dbConnection) => {
    dbConnection.query(sqlUpdateStatus, [status, positionID], (error, result) => {
      if (error) {
        console.error('Error updating member status:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Member status updated successfully', result });
      }
    });
  }).catch((error) => {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});


// Fetch all members
app.get('/api/members', (req, res) => {
  const sqlSelectAllBooks = "SELECT memberID, name, positionID, people_imageID, bio, status FROM members";

  db.then((dbConnection) => {
    dbConnection.query(sqlSelectAllBooks, (error, result) => {
      if (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Delete a member from the members table
app.delete('/api/members/delete/:id', (req, res) => {
  const { id } = req.params;
  const sqlDeleteMember = "DELETE FROM members WHERE memberID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlDeleteMember, [id], (error, result) => {
      if (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'member not found' });
      } else {
        res.status(200).json({ success: true, message: 'member deleted successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Editing member data in About US page
app.put('/api/members/update/:id', (req, res) => {
  const { id } = req.params;
  const memberID = id;
  const status = 1; // default status is active unless someone else takes over that position
  const { positionID, bio, people_imageID, name } = req.body;
  const sqlUpdateMembers = "UPDATE members SET positionID = ?, status = ?, bio = ?, people_imageID = ?, name = ? WHERE memberID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlUpdateMembers, [positionID, status, bio, people_imageID, name, memberID], (error, result) => {
      if (error) {
        console.error('Error updating members:', error);
        res.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'member not found' });
      } else {
        res.status(200).json({ message: 'member updated successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});



// Adding event images
app.post('/api/event_images/add', (req, res) => {
  const { image, alt_text } = req.body;
  const sqlInsertImage = "INSERT INTO event_images (image, alt_text) VALUES (?, ?)";

  db.then((dbConnection) => {
    dbConnection.query(sqlInsertImage, [image, alt_text], (error, result) => {
      if (error) {
        console.error('Error adding event image:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Event image added successfully', event_imageID: result.insertId });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Adding people images
app.post('/api/people_images/add', (req, res) => {
  const { speakerImage, alt_text } = req.body;
  const sqlInsertImage = "INSERT INTO people_images (image, alt_text) VALUES (?, ?)";

  db.then((dbConnection) => {
    dbConnection.query(sqlInsertImage, [speakerImage, alt_text], (error, result) => {
      if (error) {
        console.error('Error adding people image:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'People image added successfully', people_imageID: result.insertId });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});


// Adding news data
app.post('/api/news/add', (req, res) => {
  const { newsTitle, text, event_imageID } = req.body;
  const sqlInsertNews = "INSERT INTO news (newsTitle, date, text, event_imageID) VALUES (?, NOW(), ?, ?)";

  db.then((dbConnection) => {
    dbConnection.query(sqlInsertNews, [newsTitle, text, event_imageID], (error, result) => {
      if (error) {
        console.error('Error adding news:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'News added successfully', result });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Adding speaker data
app.post('/api/speaker/add', (req, res) => {
  const { name, specialty, bio, people_imageID } = req.body;
  const sqlInsertNews = "INSERT INTO speaker (name, speciality, bio, people_imageID) VALUES (?, ?, ?, ?)";

  db.then((dbConnection) => {
    dbConnection.query(sqlInsertNews, [name, specialty, bio, people_imageID], (error, result) => {
      if (error) {
        console.error('Error adding Speaker:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Speaker added successfully', result });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});


// Editing news data in News page
app.put('/api/members/edit/:newsID', async (req, res) => {
  try {
    const { newsTitle, date, text, event_imageID } = req.body;
    const { newsID } = req.params;
    const sqlUpdate = "UPDATE news SET newsTitle = ?, date = ?, text = ?, event_imageID = ? WHERE newsID = ?";
    const [result] = await require('./database').query(sqlUpdate, [newsTitle, date, text, event_imageID, newsID]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Deleting news data in News page
app.delete('/api/news/delete/:newsID', async (req, res) => {
  try {
    const { newsID } = req.params;
    const sqlDelete = "DELETE FROM news WHERE newsID = ?";
    const [result] = await require('./database').query(sqlDelete, [newsID]);
    res.status(200).json({ message: 'News item deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

//faq Page

// Fetch a single FAQ by id
app.get('/api/faq/:id', (req, res) => {
  const { id } = req.params;
  const sqlSelectFAQ = "SELECT faqID, question, answer FROM faq WHERE faqID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlSelectFAQ, [id], (error, result) => {
      if (error) {
        console.error('Error fetching FAQ:', error);
        res.status(500).json({ error: error.message });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'FAQ not found' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});


// Get all items from the faq table
app.get('/api/faq', (req, res) => {
  const sqlSelect = "SELECT faqID, question, answer FROM faq";

  db.then((dbConnection) => {
    dbConnection.query(sqlSelect, (error, result) => {
      if (error) {
        console.error('Error fetching faq:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Delete an item from the faq table
app.delete('/api/faq/delete/:id', (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM faq WHERE faqID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlDelete, [id], (error, result) => {
      if (error) {
        console.error('Error deleting faq item:', error);
        res.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(200).json({ success: true, message: 'Item deleted successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Adding faq data in faq page
app.post('/api/faq/add', (req, res) => {
  const {question, answer} = req.body;
  const sqlInsertNews = "INSERT INTO faq (question, answer) VALUES (?, ?)";

  db.then((dbConnection) => {
    dbConnection.query(sqlInsertNews, [question, answer], (error, result) => {
      if (error) {
        console.error('Error adding FAQ:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'FAQ added successfully', result });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Updating faq data
app.put('/api/faq/update/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const sqlUpdateFAQ = "UPDATE faq SET question = ?, answer = ? WHERE faqID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlUpdateFAQ, [question, answer, id], (error, result) => {
      if (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'FAQ not found' });
      } else {
        res.status(200).json({ message: 'FAQ updated successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

//Tournaments Page

// Getting tournmanets data
app.get('/api/tournaments', (req, res) => {
  const sqlSelect = 'SELECT * FROM tournaments';
  
  db.then((dbConnection) => {
    dbConnection.query(sqlSelect, (error, results) => {
      if (error) {
        console.error('Error retrieving tournaments:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(results);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

const tournamentImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb (null, 'src/images/')
  },
  filename: function (req, file, cb) {
    cb (null, file.originalname)
  }
})

const tournamentImageUpload = multer({storage: tournamentImageStorage})
// Adding tournaments data in Tournaments page
app.post('/api/tournaments/add', tournamentImageUpload.single('tournamentImage'), (req, res) => {
  const { title, description, cost, registration_link, start_date, end_date,num_of_participants, location, requirements, prizes, tournament_typeID, registration_deadline, cfc_required } = req.body;
  
  const imagePath = `/src/images/${req.file.originalname}`;
  const alt_text = `${req.file.originalname} not found`;

  const imageInsert = `INSERT INTO event_images (image, alt_text) VALUES (?, ?)`;

  db.then((dbConnection) => {
    dbConnection.query(imageInsert, [imagePath, alt_text], (error, result) => {
      if (error) {
        console.error('Error adding event image data:', error);
        return res.status(500).json({ error: error.message });
      }
      
      const event_imageID = result.insertId;

      const sqlInsertTournament = `
        INSERT INTO tournaments 
        (title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, location, requirements, prizes, tournament_typeID, registration_deadline, cfc_required) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      dbConnection.query(sqlInsertTournament, [title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, location, requirements, prizes, tournament_typeID, registration_deadline, cfc_required], (error, result) => {
        if (error) {
          console.error('Error adding tournament data:', error);
          return res.status(500).json({ error: error.message });
        }

        res.status(200).json(result);
      });
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Editing tournaments data in Tournaments page
app.put('/api/tournaments/edit/:tournamentsID', async (req, res) => {
  try {
    const { title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, location, requirements, prizes, tournament_typeID, registration_deadline, cfc_required } = req.body;
    const { tournamentsID } = req.params;
    const sqlUpdate = `
    UPDATE tournaments 
    SET title = ?, description = ?, cost = ?, event_imageID = ?, registration_link = ?, start_date = ?, end_date = ?, num_of_participants = ?, location = ?, requirements = ?, prizes = ?, tournament_typeID = ?, registration_deadline = ?, cfc_required = ? 
    WHERE tournamentsID = ?`;
    const [result] = await require('./database').query(sqlUpdate, [title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, location, requirements, prizes, tournament_typeID, registration_deadline, cfc_required, tournamentsID]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Deleting tournaments data in Tournaments page
app.delete('/api/tournaments/delete/:tournamentsID', async (req, res) => {
try {
  const { tournamentsID } = req.params;
  const sqlDelete = "DELETE FROM tournaments WHERE tournamentsID = ?";
  const [result] = await require('./database').query(sqlDelete, [tournamentsID]);
  res.status(200).json({ message: 'Tournament entry deleted successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});*/


// Live Tournament Page
app.get('/api/live-tournaments', (req, res) => {
  db.then((dbConnection) => {
    dbConnection.query('SELECT * FROM tournament_scores', (error, rows) => {
      if (error) {
        console.error('Error fetching live tournaments:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.json(rows);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

app.get('/api/live-tournaments/:id', (req, res) => {
  db.then((dbConnection) => {
    dbConnection.query('SELECT * FROM tournament_scores WHERE game_id = ?', [req.params.id], (error, rows) => {
      if (error) {
        console.error('Error fetching tournament data:', error);
        res.status(500).json({ error: error.message });
      } else if (rows.length === 0) {
        res.status(404).json({ error: 'Tournament not found' });
      } else {
        res.json(rows[0]);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Adding live tournaments data in live Tournaments page
app.post('/api/live-tournaments/add', (req, res) => {
  const { game_id, Player1, Player2, Player1_time, Player2_time, Player1_score, Player2_score, game_date } = req.body;
  const sqlInsert = `
  INSERT INTO tournament_scores 
  (game_id, Player1, Player2, Player1_time, Player2_time, Player1_score, Player2_score, game_date) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.then((dbConnection) => {
    dbConnection.query(sqlInsert, [game_id, Player1, Player2, Player1_time, Player2_time, Player1_score, Player2_score, game_date], (error, result) => {
      if (error) {
        console.error('Error adding live tournament data:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Editing live-tournaments data in live-Tournaments page
app.put('/api/live-tournaments/edit/:game_id', (req, res) => {
  const { Pairings, Standings } = req.body;
  const { game_id } = req.params;

  const sqlCheckTournamentPresent = `SELECT * FROM tournament_scores WHERE game_id = ?`;
  const sqlUpdate = `
  UPDATE tournament_scores
  SET Pairings = ?, Standings = ?
  WHERE game_id = ?`;
  const sqlInsert = `
  INSERT INTO tournament_scores (game_id, Pairings, Standings)
  VALUES (?, ?, ?)`;

  db.then((dbConnection) => {
    dbConnection.query(sqlCheckTournamentPresent, [game_id], (error, result) => {
      if (error) {
        console.error('Error inserting live tournament data:', error);
        res.status(500).json({ error: error.message });
      } else if (result.length > 0) {
        // Tournament already exists, therefore performing an update
        dbConnection.query(sqlUpdate, [Pairings,Standings, game_id], (error, result) => {
          if (error) {
            console.error('Error editing live tournament data:', error);
            res.status(500).json({ error: error.message });
          } else {
            res.status(200).json(result);
          }
        });
      } else {
        // Tournament not present, performing insert
        dbConnection.query(sqlInsert, [game_id, Pairings, Standings], (error, result) => {
          if (error) {
            console.error('Error adding live tournament data:', error);
            res.status(500).json({ error: error.message });
          } else {
            res.status(201).json(result);
          }
        });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

//Events Page

// Getting events data
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await require('./database').query('SELECT * FROM events');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Addding events data in Tournaments page
app.post('/api/events/add', async (req, res) => {
  try {
    const { title, event_imageID, start_date, end_date, description, cost, locationID, categoryID, speakerID, num_of_attendees, registration_deadline } = req.body;
    const sqlInsert = `
    INSERT INTO events 
    (title, event_imageID, start_date, end_date, description, cost, locationID, categoryID, speakerID, num_of_attendees, registration_deadline) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await require('./database').query(sqlInsert, [title, event_imageID, start_date, end_date, description, cost, locationID, categoryID, speakerID, num_of_attendees, registration_deadline]);
    res.status(201).json({ message: 'Event added successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editing events data in Tournaments page
app.put('/api/events/edit/:eventID', async (req, res) => {
  try {
    const { eventID } = req.params;
    const { title, event_imageID, start_date, end_date, description, cost, locationID, categoryID, speakerID, num_of_attendees, registration_deadline } = req.body;
    const sqlUpdate = `
    UPDATE events 
    SET title = ?, event_imageID = ?, start_date = ?, end_date = ?, description = ?, cost = ?, locationID = ?, categoryID = ?, speakerID = ?, num_of_attendees = ?, registration_deadline = ? 
    WHERE eventsID = ?`;
    const [result] = await require('./database').query(sqlUpdate, [title, event_imageID, start_date, end_date, description, cost, locationID, categoryID, speakerID, num_of_attendees, registration_deadline, eventID]);
    res.status(200).json({ message: 'Event updated successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Deleting events data in Tournaments page
app.delete('/api/events/delete/:eventID', async (req, res) => {
try {
  const { eventID } = req.params;
  const sqlDelete = "DELETE FROM events WHERE eventsID = ?";
  const [result] = await require('./database').query(sqlDelete, [eventID]);
  res.status(200).json({ message: 'Event deleted successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});*/

//Trainers Event Page

// Getting trainer data
app.get('/api/speaker', (req, res) => {
  const sqlSelectAllSpeakers = "SELECT * FROM speaker";
  db.then((dbConnection) => {
    dbConnection.query(sqlSelectAllSpeakers, (error, result) => {
      if (error) {
        console.error('Error getting speakers:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// getting single speaker
app.get('/api/speaker/:speakerID', (req, res) => {
  const { speakerID } = req.params;
  const sqlSelectSingleSpeaker = "SELECT * FROM speaker WHERE speakerID = ?";
  db.then((dbConnection) => {
    dbConnection.query(sqlSelectSingleSpeaker, [speakerID], (error, result) => {
      if (error) {
        console.error(`Error getting speaker: ${speakerID}`, error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Editing trainer data in Events page
app.put('/api/speaker/edit/:speakerID', (req, res) => {
  const { speakerID } = req.params;
  const { name, speciality, bio, people_imageID } = req.body;
  const sqlUpdate = "UPDATE speaker SET name = ?, speciality = ?, bio = ?, people_imageID = ? WHERE speakerID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlUpdate, [name, speciality, bio, people_imageID, speakerID], (error, result) => {
      if (error) {
        console.error('Error updating speaker:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: 'Speaker updated successfully', result });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

 // Deleting trainer data in Events page
app.delete('/api/speaker/delete/:speakerID', (req, res) => {
  const { speakerID } = req.params;
  const sqlDelete = "DELETE FROM speaker WHERE speakerID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlDelete, [speakerID], (err, result) => {
      if (err) {
        console.error('Error deleting speaker:', err);
        res.status(500).json({ error: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Speaker not found' });
      } else {
        res.status(200).json({ message: 'Speaker deleted successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

//Library Page




// Adding books data in Library page
app.post('/api/library/add', (req, res) => {
  const { title, author, image, available, description } = req.body;
  const sqlInsert = "INSERT INTO library (title, author, image, available, description) VALUES (?, ?, ?, ?, ?)";
  
  db.then((dbConnection) => {
    dbConnection.query(sqlInsert, [title, author, image, available, description], (error, result) => {
      if (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json({ message: 'Book added successfully', result });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});




// Update a library item
app.put('/api/library/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, image, available, description } = req.body;
  const sqlUpdateLibrary = "UPDATE library SET title = ?, author = ?, image = ?, available = ?, description = ? WHERE booksID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlUpdateLibrary, [title, author, image, available, description, id], (error, result) => {
      if (error) {
        console.error('Error updating library item:', error);
        res.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Library item not found' });
      } else {
        res.status(200).json({ message: 'Library item updated successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});


// Delete a book from the library
app.delete('/api/library/delete/:id', (req, res) => {
  const { id } = req.params;
  const sqlDeleteBook = "DELETE FROM library WHERE booksID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlDeleteBook, [id], (error, result) => {
      if (error) {
        console.error('Error deleting library book:', error);
        res.status(500).json({ error: error.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.status(200).json({ success: true, message: 'Book deleted successfully' });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});


// APIs for news page

//getting all news
app.get('/api/news', (req, res) => {
  const sqlSelectAllNews = "select * from news";
  db.then((dbConnection) => {
    dbConnection.query(sqlSelectAllNews, (error, result) => {
      if (error) {
        console.error('Error deleting news item:', error);
        res.status(500).json({ error: error.message });
      }
      else{
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  })
})

// adding news
app.post('/api/news/add', (req, res) => {
  const { newsTitle, date, text, event_imageID } = req.body;
  console.log(req.body);
  const sqlInsert = "insert into news (newsTitle, date, text, event_imageID) values (?,?,?,?)";

  db.then((dbConnection) => {
    dbConnection.query(sqlInsert, [newsTitle, date, text, event_imageID], (error, result) => {
      if (error) {
        console.error('Error adding news item:', error);
        res.status(500).json({ error: error.message });
      } else{
        res.status(201).json(result);
        console.log('Successfully added new item:', result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// fetching a single news
app.get('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const sqlSelectNewsItem = "select * from news where newsID = ?";
  db.then((dbConnection) => {
    dbConnection.query(sqlSelectNewsItem, [id], (error, result) => {
      if (error) {
        console.error('Error fetching news item:', error);
        res.status(500).json({ error: error.message });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'Library item not found' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// updating news

app.put('/api/news/update/:id', (req, res) => {
  const { id } = req.params;
  const { newsTitle, date, text, event_imageID } = req.body;
  const sqlUpdateNews = "update news set newsTitle = ?, date = ?, text = ?, event_imageID = ? WHERE newsID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlUpdateNews, [newsTitle, date, text, event_imageID, id], (error, result) => {
      if (error) {
        console.error('Error updating news item:', error);
        res.status(500).json({ error: error.message });
      } else if(result.length === 0) {
        res.status(404).json({ error: 'Library item not found' });
      } else{
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

app.delete('/api/news/delete/:id', (req, res) => {
  const { id } = req.params;
  const sqlDeleteNews = "delete from news where newsID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlDeleteNews, [id], (error, result) => {
      if (error) {
        console.error('Error deleting news item:', error);
        res.status(500).json({ error: error.message });
      } else if(result.length === 0) {
        res.status(404).json({ error: 'Library item not found' });
      } else{
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

app.post('/api/subscribe/add', async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertQuery = `INSERT INTO mailing_list (first_name, last_name, email) VALUES (?, ?, ?)`;


  db.then((dbConnection) => {
    dbConnection.query(insertQuery, [first_name, last_name, email], (error, data) => {
      if (error) {
        console.error('Failed to insert subscriber:', error);
        return res.status(500).json({ error: 'Database insertion failed' });
      }
      res.status(200).json({ message: 'Subscription successful', id: data.insertId });
    })

  });
});

// Test
app.get('/api/subscribe/list', async (req, res) => {
  const sql = "SELECT * FROM mailing_list";
  db.then((dbConnection) => {
    dbConnection.query(sql, (error, data) => {
      if (error) {
        console.error("Error while fetching FAQs:", error);
        return res
          .status(500)
          .json({ error: "Internal Server Error", message: error.message });
      }
      if (data.length > 0) {

        return res.json(data);
      } else {
        res.status(404).json({ error: "No FAQs found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  });

})

// Subscribers List
app.get('/api/subscribers', async (req, res) => {
  const sql = "SELECT id, first_name, last_name, email FROM mailing_list";
  db.then((dbConnection) => {
    dbConnection.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching subscribers:", error);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
      }
      console.log(results);
      if (results.length > 0) {
        const subscribers = results.map(subscriber => ({

          id: `${subscriber.id}`,
          first_name: `${subscriber.first_name}`,
          last_name: `${subscriber.last_name}`,
          name: `${subscriber.first_name} ${subscriber.last_name}`,
          email: `${subscriber.email}`,
        }));
        res.json(subscribers);
      } else {
        res.status(404).json({ error: "No subscribers found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Delete subscriber by email
app.delete('/api/subscribers/delete', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Email is required" });
  }

  const deleteQuery = "DELETE FROM mailing_list WHERE id = ?";
  db.then((dbConnection) => {
    dbConnection.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting subscriber:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Subscriber not found" });
      }
      res.status(200).json({ message: "Subscriber deleted successfully" });
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Registration test
app.get('/api/registration', async (req, res) => {
  const sql = "SELECT id, tournamentsID, fullname, email, cfcID, entry_date FROM user";
  db.then((dbConnection) => {
    dbConnection.query(sql, (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
      }
      console.log(results);
      if (results.length > 0) {
        const users = results.map(user => ({

          id: `${user.id}`,
          tournamentsID: `${user.tournamentsID}`,
          fullname: `${user.fullname}`,
          email: `${user.email}`,
          cfcID: `${user.cfcID}`,
          entry_date: `${user.entry_date}`,
        }));
        res.json(users);
      } else {
        res.status(404).json({ error: "No users found" });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

app.post('/api/registration/add', async (req, res) => {
  const { fullname, email, cfcID, cfcRating, entry_date, tournamentsID } = req.body;

  console.log('Received data:', req.body); // Add this line for debugging

  // Check for required fields
  if (!fullname || !email || !tournamentsID) {
      return res.status(400).json({ message: 'Fullname, email, and tournament ID are required' });
  }

  // SQL Query to insert the new registration into the 'user' table
  const insertQuery = `
      INSERT INTO user (fullname, email, entry_date, cfcID, cfcRating, tournamentsID)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.then((dbConnection) => {
      dbConnection.query(insertQuery, [fullname, email, entry_date, cfcID || null, cfcRating || null, tournamentsID], (error, results) => {
          if (error) {
              console.error('Failed to insert registration:', error);
              return res.status(500).json({ error: 'Database insertion failed', message: error.message });
          }
          res.status(200).json({ message: 'Registration successful', id: results.insertId });
      });
  }).catch((error) => {
      console.error('Database connection error:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
  });
});

// Count number of Participants
app.get('/api/tournaments/:id/participants', async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT COUNT(*) as participantCount FROM user WHERE tournamentsID = ?";
  db.then((dbConnection) => {
    dbConnection.query(sql, [id], (error, results) => {
      if (error) {
        console.error("Error fetching participants:", error);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
      }
      const participantCount = results[0].participantCount;
      res.json({ participantCount });
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});


// Fetch all grand prix data
app.get('/api/grand-prix', (req, res) => {
  db.then((dbConnection) => {
    dbConnection.query('SELECT * FROM grand_prix', (error, rows) => {
      if (error) {
        console.error('Error fetching grand prix:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.json(rows);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Fetch specific grand prix data by id
app.get('/api/grand-prix/:idgrand_prix', (req, res) => {
  const { idgrand_prix } = req.params;

  db.then((dbConnection) => {
    dbConnection.query('SELECT * FROM grand_prix WHERE idgrand_prix = ?', [idgrand_prix], (error, rows) => {
      if (error) {
        console.error('Error fetching grand prix data:', error);
        res.status(500).json({ error: error.message });
      } else if (rows.length === 0) {
        res.status(404).json({ error: 'Grand prix not found' });
      } else {
        res.json(rows[0]);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Edit grand prix data
app.put('/api/grand-prix/edit/:idgrand_prix', (req, res) => {
  const { iframe_link } = req.body;
  const { idgrand_prix } = req.params;

  const sqlCheckTournamentPresent = 'SELECT * FROM grand_prix WHERE idgrand_prix = ?';
  const sqlUpdate = 'UPDATE grand_prix SET iframe_link = ? WHERE idgrand_prix = ?';
  const sqlInsert = 'INSERT INTO grand_prix (idgrand_prix, iframe_link) VALUES (?, ?)';

  db.then((dbConnection) => {
    dbConnection.query(sqlCheckTournamentPresent, [idgrand_prix], (error, result) => {
      if (error) {
        console.error('Error checking grand prix presence:', error);
        res.status(500).json({ error: error.message });
      } else if (result.length > 0) {
        // Grand prix already exists, performing an update
        dbConnection.query(sqlUpdate, [iframe_link, idgrand_prix], (error) => {
          if (error) {
            console.error('Error updating grand prix data:', error);
            res.status(500).json({ error: error.message });
          } else {
            res.status(200).json({ success: true });
          }
        });
      } else {
        // Grand prix not present, performing insert
        dbConnection.query(sqlInsert, [idgrand_prix, iframe_link], (error) => {
          if (error) {
            console.error('Error adding grand prix data:', error);
            res.status(500).json({ error: error.message });
          } else {
            res.status(201).json({ success: true });
          }
        });
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});
// making apis for champions


app.post('/api/champions/add', (req, res) => {
  const { name, year } = req.body;
  const sql = 'INSERT INTO champions (name, year) VALUES (?, ?)';
  db.then((dbConnection) => {
    dbConnection.query(sql, [name, year], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error adding new champion');
      } else {
        res.status(201).send(`Champion added with ID: ${result.insertId}`);
      }
    });
  });
});
// Fetch all books from the library
app.get('/api/library', (req, res) => {
  const sqlSelectAllBooks = "SELECT booksID, title, author, image, available, description FROM library";

  db.then((dbConnection) => {
    dbConnection.query(sqlSelectAllBooks, (error, result) => {
      if (error) {
        console.error('Error fetching library books:', error);
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json(result);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// Fetch a single library item by id
app.get('/api/library/:id', (req, res) => {
  const { id } = req.params;
  const sqlSelectLibraryItem = "SELECT booksID, title, author, image, available, description FROM library WHERE booksID = ?";

  db.then((dbConnection) => {
    dbConnection.query(sqlSelectLibraryItem, [id], (error, result) => {
      if (error) {
        console.error('Error fetching library item:', error);
        res.status(500).json({ error: error.message });
      } else if (result.length === 0) {
        res.status(404).json({ error: 'Library item not found' });
      } else {
        res.status(200).json(result[0]);
      }
    });
  }).catch((error) => {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  });
});

// getting all champions
app.get('/api/champions', (req, res) => {
  const sql = 'SELECT * FROM champions';
  db.then((dbConnection) => {
    dbConnection.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving champions');
      } else {
        res.status(200).json(results);
      }
    });
  })

});

// getting single champion
app.get('/api/champions/:id', (req, res) => {
  const sql = 'SELECT * FROM champions WHERE id = ?';
  db.then((dbConnection) => {
    dbConnection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving champion');
      } else {
        res.status(200).json(result);
      }
    });
  })
});

//updating champions
app.put('/api/champions/edit/:id', (req, res) => {
  const {id} = req.params;
  const { name, year } = req.body;
  const sql = 'UPDATE champions SET name = ?, year = ? WHERE id = ?';
  db.then((dbConnection) => {
    dbConnection.query(sql, [name, year, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating champion');
      } else {
        res.status(200).send(`Champion updated successfully`);
      }
    });
  })
});

//deleting champions
app.delete('/api/champions/delete/:id', (req, res) => {
  const sql = 'DELETE FROM champions WHERE id = ?';
  db.then((dbConnection) => {
    dbConnection.query(sql, [req.params.id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting champion');
      } else {
        res.status(200).send('Champion deleted successfully');
      }
    });
  })
});
