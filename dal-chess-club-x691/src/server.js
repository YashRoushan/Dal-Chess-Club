const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');
//const { Client } = require('ssh2');
//const sshClient = new Client();

const app = express();

app.use(cors());
app.use(express.json());

const sshConfig = {
  host: 'euro.cs.dal.ca:22',
  port: 22, // Standard SSH port
  username: 'chessclub',
  password: 'eshooRi9oofaVah0',
};

//Original db connection
/*const db = mysql.createConnection({
  host: "euro.cs.dal.ca",
  user: "chessclub",
  password: "Mee5shaong9kaiw4",
  database: "chessclub",
  port: 3306,
});*/

var Client = require('ssh2').Client;
var ssh = new Client();

var db = new Promise(function(resolve, reject){
	ssh.on('ready', function() {
	  ssh.forwardOut(
	    // source address, this can usually be any valid address
	    'euro.cs.dal.ca',
	    // source port, this can be any valid port number
	    5000,
	    // destination address (localhost here refers to the SSH server)
	    'euro.cs.dal.ca:22',
	    // destination port
	    3306,
	    function (err, stream) {
	      if (err) throw err; 
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
				resolve(connection);
			} else {
				reject(err);
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

//Previous attempt to SSH connection
/*sshClient.on('ready', () => {
  sshClient.forwardOut(
    // Source address and port
    'euro.cs.dal.ca:22', 12345,
    // Destination address and port
    sshConfig.host, sshConfig.port,
    (err, stream) => {
      if (err) throw err;
      // Override dbConfig with stream
      const modifiedDbConfig = { ...dbConfig, stream };
      // Create a MySQL connection over the SSH tunnel
      const db = mysql.createConnection(modifiedDbConfig);

      db.connect((err) => {
        if (err) {
          console.error('Database connection failed: ', err);
          return;
        }
        console.log('Connected to the database over SSH tunnel');

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

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      });
    }
  );
}).connect(sshConfig);*/

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
 

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});*/

