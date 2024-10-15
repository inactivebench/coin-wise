const db = require("../config/db");

const handleShowUsers = (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    const query = db.query(sql, (err, result) => {
      if (err) throw err;
      // console.log(result);

      res.status(201).send(result);
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
module.exports = { handleShowUsers };
