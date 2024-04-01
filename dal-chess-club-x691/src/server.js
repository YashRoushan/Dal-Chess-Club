const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

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

// Method to test connection
// db.then((dbConnection) => {
//   dbConnection.query('SHOW TABLES', function (error, results) {
//       if (error) throw error;
//       console.log('Tables: ', results);
//   });
// }).catch((error) => {
//   console.log(error);
// });

app.get('/api/login', (req, res) => {
  
    db.then((dbConnection) => {
      const loginQuery = ("Select * from admin");
      dbConnection.query(loginQuery, (err, result) => {
        user = JSON.stringify(result);
        if (err) {
          console.error("Error fetching login information:", err);
          return res.status(500).json(err);
        }

        return res.json(user);
      });
    }).catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
