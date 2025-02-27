const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
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
      const match = await bcrypt.compare(password, result[0]?.password);
      if (match) {
        // create jwt

        const accessToken = jwt.sign(
          {
            userInfo: {
              userId: result[0].user_id,
              user: result[0].username,
              roles: result[0].roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );

        const refreshToken = jwt.sign(
          {
            userInfo: {
              userId: result[0].user_id,
              user: result[0].username,
              roles: result[0].roles,
            },
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "2h",
          }
        );

        //save refreshToken in db
        const refreshData = {
          username: result[0].username,
          refresh_token: refreshToken,
        };
        let sql = `INSERT INTO refresh_tokens (username, refresh_token) VALUES (?, ?) ON DUPLICATE KEY UPDATE refresh_token = VALUES(refresh_token);`;

        let query = db.query(
          sql,
          [refreshData.username, refreshData.refresh_token],
          (err, result) => {
            if (err) throw err;
            console.log("Refresh token stored for user");
          }
        );
        //send to client
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          login: true,
          accessToken: accessToken,
        });
      } else {
        res.status(400).send({ message: "Invalid email or password" });
      }
    });
  } catch (error) {
    res.status(500).send();
  }
};

const authenticateUser = (req, res) => {
  const sql = " SELECT * FROM users WHERE username = ? ";
  db.query(sql, req.user, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    console.log("You are authenticated");
    res.status(200).json({ auth: true, result: result[0], message: "success" });
  });
};

module.exports = { handleLogin, authenticateUser };
