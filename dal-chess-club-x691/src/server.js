const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

/*
app.get('/api/data', async (req, res) => {
    try {
      const [rows] = await require('./database').query('SELECT * FROM my_table');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });*/

  //REST API for displaying tournaments on tournaments page
  app.get("/tournaments", (req,res) => {
    const query = "SELECT * FROM tournaments"
    pool.query(query, (err,data) => {
      if (err) return res.json(err)
      return res.json(data)
    })
  })

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  /*
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/
