const express = require("express");
const db = require("../config/db");
const router = express.Router();

// ********sign up***********
// signup
router.post("/adduser", (req, res) => {
  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  let sql = " INSERT INTO user SET ? ";
  let query = db.query(sql, user, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("user created ");
    res.send(result);
  });
});

module.exports = router;
