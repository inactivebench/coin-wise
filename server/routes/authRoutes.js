const express = require("express");
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user.user);
    console.log(user);
    res.json({ accessToken: accessToken });
  });
});

// ********log out***********
router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

// ********log in***********
router.post("/login", async (req, res) => {
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
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(
          { user },
          process.env.REFRESH_TOKEN_SECRET
        );
        refreshTokens.push(refreshToken);
        res.status(200).json({
          login: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          result: result[0],
        });
        console.log(result[0]);
      } else {
        res.status(400).send({ message: "Invalid email or password" });
      }
    });
  } catch (error) {
    res.status(500).send();
  }
});

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

module.exports = router;
