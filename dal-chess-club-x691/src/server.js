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
var mysql = require("mysql");

const db = new Promise(function (resolve, reject) {
  ssh
    .on("ready", function () {
      ssh.forwardOut(
        // source address, this can usually be any valid address
        "euro.cs.dal.ca",
        // source port, this can be any valid port number
        5000,
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
  const tournamentQuery =
      "SELECT * FROM tournaments t, event_images e where t.event_imageID = e.event_imageID";
  db.then((dbConnection) => {
    dbConnection.query(tournamentQuery, (error, data) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Import BASE_URL and getImageUrl from config.js in server.js
// Now you can use BASE_URL and getImageUrl in your server.js file
const {getImageUrl } = require('./config.js');


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

// Adding member data in About US page
app.post('/api/members/add', async (req, res) => {
  try {
    const { positionID, status, bio, people_imageID, name } = req.body;
    const sqlInsert = "INSERT INTO members (positionID, status, bio, people_imageID, name) VALUES (?, ?, ?, ?, ?)";
    const [result] = await require('./database').query(sqlInsert, [positionID, status, bio, people_imageID, name]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editing member data in About US page
app.put('/api/members/edit/:memberID', async (req, res) => {
  try {
    const { positionID, status, bio, people_imageID, name } = req.body;
    const { memberID } = req.params;
    const sqlUpdate = "UPDATE members SET positionID = ?, status = ?, bio = ?, people_imageID = ?, name = ? WHERE memberID = ?";
    const [result] = await require('./database').query(sqlUpdate, [positionID, status, bio, people_imageID, name, memberID]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*Deleting member data in About US page
app.delete('/api/members/delete/:memberID', async (req, res) => {
try {
  const { memberID } = req.params;
  const sqlDelete = "DELETE FROM members WHERE memberID = ?";
  const [result] = await require('./database').query(sqlDelete, [memberID]);
  res.status(200).json({ message: 'Member deleted successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});*/

//News page

//Getting news data 
app.get('/api/news', async (req, res) => {
try {
  const [rows] = await require('./database').query('SELECT * FROM news');
  res.json(rows);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

//Adding news data in News page
app.post('/api/news/add', async (req, res) => {
try {
  const { newsTitle, date, text, event_imageID } = req.body;
  const sqlInsert = "INSERT INTO news (newsTitle, date, text, event_imageID) VALUES (?, ?, ?, ?)";
  const [result] = await require('./database').query(sqlInsert, [newsTitle, date, text, event_imageID]);
  res.status(200).json(result);
} catch (error) {
  res.status(500).json({ error: error.message });
}
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

//Getting faq data
app.get('/api/faq', async (req, res) => {
try {
  const [rows] = await require('./database').query('SELECT * FROM faq');
  res.json(rows);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Adding faq data in faq page
app.post('/api/faq/add', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const sqlInsert = "INSERT INTO faq (question, answer) VALUES (?, ?)";
    const [result] = await require('./database').query(sqlInsert, [question, answer]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editing faq data in faq page
app.put('/api/faq/edit/:faqID', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const { faqID } = req.params;
    const sqlUpdate = "UPDATE faq SET question = ?, answer = ? WHERE faqID = ?";
    const [result] = await require('./database').query(sqlUpdate, [question, answer, faqID]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Deleting faq data in faq page
app.delete('/api/faq/delete/:faqID', async (req, res) => {
  try {
    const { faqID } = req.params;
    const sqlDelete = "DELETE FROM faq WHERE faqID = ?";
    const [result] = await require('./database').query(sqlDelete, [faqID]);
    res.status(200).json({ message: 'FAQ entry deleted successfully', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

//Tournaments Page

// Getting tournmanets data
app.get('/api/tournaments', async (req, res) => {
try {
  const [rows] = await require('./database').query('SELECT * FROM tournaments');
  res.json(rows);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Adding tournaments data in Tournaments page
app.post('/api/tournaments/add', async (req, res) => {
try {
  const { title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required } = req.body;
  const sqlInsert = `
    INSERT INTO tournaments 
    (title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await require('./database').query(sqlInsert, [title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required]);
  res.status(200).json(result);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Editing tournaments data in Tournaments page
app.put('/api/tournaments/edit/:tournamentsID', async (req, res) => {
try {
  const { title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required } = req.body;
  const { tournamentsID } = req.params;
  const sqlUpdate = `
    UPDATE tournaments 
    SET title = ?, description = ?, cost = ?, event_imageID = ?, registration_link = ?, start_date = ?, end_date = ?, num_of_participants = ?, locationID = ?, requirements = ?, prizes = ?, tournament_typeID = ?, registration_deadline = ?, cfc_required = ? 
    WHERE tournamentsID = ?`;
  const [result] = await require('./database').query(sqlUpdate, [title, description, cost, event_imageID, registration_link, start_date, end_date, num_of_participants, locationID, requirements, prizes, tournament_typeID, registration_deadline, cfc_required, tournamentsID]);
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
app.get('/api/speakers', async (req, res) => {
try {
  const [rows] = await require('./database').query('SELECT * FROM speaker');
  res.json(rows);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Adding trainer data in Events page
app.post('/api/speakers/add', async (req, res) => {
try {
  const { name, specialty, bio, people_imageID } = req.body;
  const sqlInsert = "INSERT INTO speaker (name, specialty, bio, people_imageID) VALUES (?, ?, ?, ?)";
  const [result] = await require('./database').query(sqlInsert, [name, specialty, bio, people_imageID]);
  res.status(201).json({ message: 'Speaker added successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Editing trainer data in Events page
app.put('/api/speakers/edit/:speakerID', async (req, res) => {
try {
  const { speakerID } = req.params;
  const { name, specialty, bio, people_imageID } = req.body;
  const sqlUpdate = "UPDATE speaker SET name = ?, specialty = ?, bio = ?, people_imageID = ? WHERE speakerID = ?";
  const [result] = await require('./database').query(sqlUpdate, [name, specialty, bio, people_imageID, speakerID]);
  res.status(200).json({ message: 'Speaker updated successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

/* Deleting trainer data in Events page
app.delete('/api/speakers/delete/:speakerID', async (req, res) => {
try {
  const { speakerID } = req.params;
  const sqlDelete = "DELETE FROM speaker WHERE speakerID = ?";
  const [result] = await require('./database').query(sqlDelete, [speakerID]);
  res.status(200).json({ message: 'Speaker deleted successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});*/

//Library Page

// Getting books data
app.get('/api/library', async (req, res) => {
try {
  const [rows] = await require('./database').query('SELECT * FROM library');
  res.json(rows);
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Adding books data in Library page
app.post('/api/library/add', async (req, res) => {
try {
  const { title, author, image, available, description } = req.body;
  const sqlInsert = "INSERT INTO library (title, author, image, available, description) VALUES (?, ?, ?, ?, ?)";
  const [result] = await require('./database').query(sqlInsert, [title, author, image, available, description]);
  res.status(201).json({ message: 'Book added successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

// Editing books data in Library page
app.put('/api/library/edit/:booksID', async (req, res) => {
try {
  const { booksID } = req.params;
  const { title, author, image, available, description } = req.body;
  const sqlUpdate = "UPDATE library SET title = ?, author = ?, image = ?, available = ?, description = ? WHERE booksID = ?";
  const [result] = await require('./database').query(sqlUpdate, [title, author, image, available, description, booksID]);
  res.status(200).json({ message: 'Book updated successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

/* Deleting books data in Library page
app.delete('/api/library/delete/:booksID', async (req, res) => {
try {
  const { booksID } = req.params;
  const sqlDelete = "DELETE FROM library WHERE booksID = ?";
  const [result] = await require('./database').query(sqlDelete, [booksID]);
  res.status(200).json({ message: 'Book deleted successfully', result });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});*/

app.post('/api/subscribe', async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const sqlInsert = "INSERT INTO mailing_list (first_name, last_name, email) VALUES (?, ?, ?)";
    const [result] = await require('./database').query(sqlInsert, [first_name, last_name, email]);

    res.status(201).json({ message: 'Subscription successful', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

