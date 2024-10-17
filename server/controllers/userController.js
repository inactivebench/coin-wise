const db = require("../config/db");

const handleShowUsers = (req, res) => {
  try {
    const sql = "SELECT user_id,username FROM users";
    const query = db.query(sql, (err, result) => {
      if (err) throw err;

      res.status(201).send(result);
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
module.exports = { handleShowUsers };
