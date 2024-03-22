const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();

// const connectDB = require("./database");
// connectDB().catch((error) => {
//   console.error("Error connecting to MySQL:", error);
// });
// const pool = mysql.createPool({
//   host: "euro.cs.dal.ca",
//   user: "chessclub",
//   password: "Mee5shaong9kaiw4",
//   database: "chessclub",
// });

app.use(cors());
app.use(express.json());

// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server is running on port ${process.env.PORT || 5000}`);
// });

// app.get('/api/data', async (req, res) => {
//     try {
//       const [rows] = await require('./database').query('SELECT * FROM my_table');
//       res.json(rows);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


var Client = require('ssh2').Client;
var ssh = new Client();
var mysql = require('mysql');

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

//Method to test connection
db.then((dbConnection) => {
  dbConnection.query('SHOW TABLES', function (error, results) {
      if (error) throw error;
      console.log('Tables: ', results);
  });
}).catch((error) => {
  console.log(error);
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await connectDB.query('SELECT * FROM admin WHERE username = ?', [username]);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      else if(password != user.password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      else {
        res.status(200).json({ message: 'Login successful!' });
      }
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
