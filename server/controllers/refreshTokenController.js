const db = require("../config/db");
const jwt = require("jsonwebtoken");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const sql = ` SELECT * FROM refresh_tokens WHERE refresh_token = ? `;
  db.query(sql, refreshToken, (err, result) => {
    if (err) return res.status(400).send({ message: err });
    if (!result[0].refresh_token) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
          {
            userInfo: {
              userId: decoded.userInfo.userId,
              user: decoded.userInfo.user,
              roles: decoded.userInfo.roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );
        res.json({ accessToken: accessToken });
      }
    );
  });
};

module.exports = { handleRefreshToken };
