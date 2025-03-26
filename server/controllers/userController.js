const db = require("../config/db");
const jwt = require("jsonwebtoken");

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

const handleDeleteUser = (req, res) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userInfo.userId;

      const sql = "DELETE FROM users WHERE user_id = ? ";

      let query = db.query(sql, req.userId, (err, result) => {
        if (err) res.status(400).send({ message: err });

        res.status(201).send(result);
        console.log("user profile deleted successfully");
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { handleShowUsers, handleDeleteUser };
