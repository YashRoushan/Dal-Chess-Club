const express = require("express");

const app = express();
const port = 5000;
const mysql = require("mysql2");

const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.options("*", cors());
// Parse JSON bodies (for requests with Content-Type: application/json)
app.use(express.json({ limit: "20mb" }));

// Parse URL-encoded bodies (for requests with Content-Type: application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(bodyParser.json());
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

const path = require("path");
require("dotenv").config();
const connectDB = require("./Database");
connectDB().catch((error) => {
  console.error("Error connecting to Mysql:", error);
});
const pool = mysql.createPool({
  host: "euro.cs.dal.ca",
  user: "chessclub",
  password: "#Mee5shaong9kaiw4",
  database: "chessclub",
});

app.use("/src/images", express.static(path.join("src", "images")));
//will log when the server is running

app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await require("./database").query("SELECT * FROM my_table");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/api/homePageSlides", (req, res) => {
  const sql = "select * from event_images LIMIT 3";
  pool.query(sql, (error, data) => {
    console.log("/homePageCards called");
    if (error) {
      console.error("Error while fetching user data:", error);
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
});

app.get("/api/homePageCards", (req, res) => {
  const sql = "select * from people_images  LIMIT 3";
  pool.query(sql, (err, data) => {
    console.log("/homePageCards called");
    if (err) {
      console.error("Error while fetching user data:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }

    if (data.length > 0) {
      console.log("/homePageCards data found");
      const cardImgData = data.map((item) => {
        return {
          id: item.people_imageID,
          alt_text: item.alt_text,
          image: `http://localhost:5000${item.image}`,
        };
      });
      return res.json(cardImgData);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
