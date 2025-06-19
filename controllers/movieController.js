// INDEX
const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM `movies`";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json({
      data: results,
      status: 200,
    });
  });
};
// SHOW

const show = (req, res) => {
  const movieId = parseInt(req.params.id);

  const sql = `SELECT * 
  FROM movies
  WHERE id = ?`;

  connection.query(sql, [movieId], (err, results) => {
    if (err) return res.status(500).json({ error: "Error exequting query" });
    if (results.length === 0) {
      return res.status(404).json({ message: "Film non trovato" });
    }
    res.json({ data: results[0], status: 200 });
  });
};

// REVIEWS

const storeReview = (req, res) => {
  const { id } = req.params;
  const { movie_id = id, name, vote, text } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ fieldName: "name", message: "inserire il nome" });
  }
  if (!vote || vote < 1 || vote > 5) {
    errors.push({ fieldName: "vote", message: "inserire il voto" });
  }

  if (!text) {
    errors.push({
      fieldName: "text",
      message: "inserire il testo della recensione",
    });
  }
  if (errors.length) {
    return res.status(403).json({ message: "invalid payload" });
  }

  const sqlStoreReview = `INSERT INTO movies.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?);`;

  connection.query(
    sqlStoreReview,
    [movie_id, name, vote, text],
    (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error exequting query", details: err.message });
      res.status(201).json({ message: "review added", id: results.insertId });
    }
  );
};

module.exports = { index, show, storeReview };
