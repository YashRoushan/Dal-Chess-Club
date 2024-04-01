const newsPageController = {
    // Create news
  
    // Select news by ID
    getAllNews(req, res) {
      const { id } = req.params;
      const selectQuery = 'SELECT * FROM news WHERE newsID = ?';
  
      pool.query(selectQuery, [id], (err, data) => {
        if (err) {
          console.error('Error fetching news:', err);
          return res.status(500).json({ error: 'Internal Server Error', message: err.message });
        }
        if (data.length === 0) {
          return res.status(404).json({ error: 'News with id ${id} not found' });
        }
        res.json(data[0]);
      });
    }
  };
  
  module.exports = newsPageController;