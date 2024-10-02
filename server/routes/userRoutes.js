const express = require("express");
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ********sign up***********
// // signup
// router.post("/adduser", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     console.log(salt);
//     console.log(hashedPassword);
//     let user = {
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     };

//     let sql = " INSERT INTO users SET ? ";
//     let query = db.query(sql, user, (err, result) => {
//       if (err) {
//         throw err;
//       }
//       console.log("user created ");
//       res.status(201).send(result);
//     });
//   } catch (error) {
//     res.status(500).send();
//   }
// });
// signup
router.post("/adduser", async (req, res) => {
  try {
    let pwd = "Bomb0cl4T";
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(pwd, salt);
    const hashedPassword = await bcrypt.hash(pwd, 10);

    let user = {
      username: "DanBrown",
      email: "brown@gmail.com",
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
router.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  let email = "brown@gmail.com";
  let password = "Bomb0cl4T";
  const sql = " SELECT * FROM users WHERE email = ? ";
  try {
    let query = db.query(sql, email, async (err, result) => {
      if (err) {
        return res.status(400).send({ message: err });
      }
      if (!result.length) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
      console.log(result[0]);
      const check = bcrypt.compare(password, result[0]?.password);
      if (check) {
        res.send("Success");
      } else {
        res.send("Invalid email or password");
      }
    });
  } catch (error) {
    res.status(500).send();
  }
});
module.exports = router;
