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

module.exports = { index, show };
