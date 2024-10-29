const bcrypt = require("bcrypt");
const db = require("../config/db");

const handleNewUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      roles: 2001,
    };

    let sql = " INSERT INTO users SET ? ";
    let query = db.query(sql, user, (err, result) => {
      if (err) res.status(400).send({ message: err });

      console.log("user created ");
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { handleNewUser };
