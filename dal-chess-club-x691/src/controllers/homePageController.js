//const pool = require('../Database');
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '#Cricket07',
    database: 'new',
});




const homePageController = {

//for slides event_images and for cards people_images  
    createHomePageSlide(req, res) {
      console.log('createHomePageSlide');
        const { image,alt_text } = req.body;
        console.log('Request Body:', req.body); // Log the request body for debugging
        const sql = 'INSERT INTO event_images (image, alt_text) VALUES (?, ?)';
        pool.query(sql, [image, alt_text], (err, result) => {
          if (err) {
            console.error('Error creating homepage slide:', err);
            return res.status(500).json({ error: 'Internal Server Error', message: err.message });
          }
          res.json({ id: result.insertId, image, alt_text });
        });
      },
  getHomePageCards(req, res) {
    console.log('getHomePageCards');
    const sql = 'SELECT * FROM people_images LIMIT 3';
    pool.query(sql, (err, data) => {
      if (err) {
        console.error('Error while fetching homepage card data:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }

      if (data.length > 0) {
        const cardImgData = data.map(item => ({
          id: item.people_imageID,
          alt_text: item.alt_text,
          image: `http://localhost:5000${item.image}`
        }));
        return res.json(cardImgData);
      } else {
        return res.status(404).json({ error: 'No data found' });
      }
    });
  },
  updateHomePageSlide(req, res) {
    const { id } = req.params;
    const { alt_text, image } = req.body;
    console.log('Request Body:', req.body); // Log the request body for debugging
    const sql = 'UPDATE event_images SET alt_text = ?, image = ? WHERE event_imageID = ?';
    pool.query(sql, [alt_text, image, id], (err, result) => {
      if (err) {
        console.error('Error updating homepage slide:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: `Slide with id ${id} not found` });
      }
      res.json({ id, alt_text, image });
    });
  },

  deleteHomePageSlide(req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM event_images WHERE event_imageID = ?';
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting homepage slide:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: `Slide with id ${id} not found` });
      }
      res.json({ message: `Slide with id ${id} deleted successfully` });
    });
  },
  getHomePageSlides(req, res) {
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
  }
};

module.exports = homePageController;
