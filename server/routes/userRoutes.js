const express = require("express");
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ********sign up***********
// signup
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    let sql = " INSERT INTO users SET ? ";
    let query = db.query(sql, user, (err, result) => {
      if (err) {
        throw err;
      }
      console.log("user created ");
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send();
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return response.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Authenticate user

router.get("/userAuth", authenticateToken, (req, res) => {
  const sql = " SELECT * FROM users WHERE user_id = ? ";
  db.query(sql, req.user.user, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    console.log("You are authenticated");
    res.status(200).json({ auth: true, result: result[0], message: "success" });
  });
});

module.exports = router;
