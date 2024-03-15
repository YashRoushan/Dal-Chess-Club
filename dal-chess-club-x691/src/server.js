const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');
const { Client } = require('ssh2');
const sshClient = new Client();

const app = express();

app.use(cors());
app.use(express.json());

const sshConfig = {
  host: 'euro.cs.dal.ca:22',
  port: 22, // Standard SSH port
  username: 'chessclub',
  privateKey: "C:\Users\natal\.ssh\id_rsa",
  password: 'eshooRi9oofaVah0',
};

const db = mysql.createConnection({
  host: "euro.cs.dal.ca",
  user: "chessclub",
  password: "Mee5shaong9kaiw4",
  database: "chessclub",
  port: 3306,
});



/*db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});*/

app.get('/api/data', async (req, res) => {
    try {
      const [rows] = await require('./database').query('SELECT * FROM my_table');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  //REST API for displaying tournaments on tournaments page
  app.get("/tournaments", (req, res) => {
    const tournamentQuery = "SELECT * FROM tournaments";
    db.query(tournamentQuery, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
});


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
