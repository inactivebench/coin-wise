const db = require("../config/db");

const handleLogout = (req, res) => {
  //On client also delete accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(201); //No content
  } else {
    const refreshToken = cookies.jwt;

    //is cookie in db ?
    const sql = ` SELECT * FROM refresh_tokens WHERE refresh_token = ? `;
    db.query(sql, refreshToken, (err, result) => {
      if (err) return res.status(400).send({ message: err });
      if (!result[0].refresh_token) {
        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });

        return res.sendStatus(204);
      }
    });
    //delete cookie from db
    const deleteToken = "DELETE FROM refresh_tokens WHERE refresh_token = ?";
    db.query(deleteToken, refreshToken, (err, result) => {
      if (err) return res.status(400).send({ message: err });
    });
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
