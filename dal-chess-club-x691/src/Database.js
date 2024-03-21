// database.js
/*const mysql = require('mysql2');

 const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = pool;*/

// Database.js

const mysql = require('mysql2');


async function createPool() {
    try {
        const pool = await mysql.createPool({
            host: 'localhost',
            user: 'admin',
            password: '#Cricket07',
            database: 'new',
        });
        console.log('My sql database pool in database.js created successfully');
        return pool;
    } catch (error) {
        console.error('Error creating database pool:', error);
        throw error;
    }

    
}

  module.exports = createPool().catch(error => console.error('Error initializing database:', error));


