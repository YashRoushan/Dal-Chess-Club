const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
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

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
