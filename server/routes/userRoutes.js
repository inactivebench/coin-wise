const express = require("express");
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// ********sign up***********
// signup
router.post("/adduser", async (req, res) => {
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

// ********log in***********
router.get("/auth", authenticateToken, (req, res) => {
  const sql = " SELECT * FROM users WHERE user_id = ? ";
  db.query(sql, req.user.user, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    console.log("You are authenticated");
    res.status(200).json({ auth: true, result: result[0], message: "success" });
  });
});
router.post("/login", async (req, res) => {
  // Authenticate user
  const { email, password } = req.body;
  const sql = " SELECT * FROM users WHERE email = ? ";
  try {
    let query = db.query(sql, email, async (err, result) => {
      if (err) {
        return res.status(400).send({ message: err });
      }
      if (!result.length) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
      const check = await bcrypt.compare(password, result[0]?.password);
      if (check) {
        const user = result[0].user_id;
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
        res
          .status(200)
          .json({ login: true, accessToken: accessToken, result: result[0] });
        console.log(result[0]);
      } else {
        res.status(400).send({ message: "Invalid email or password" });
      }
    });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
