const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

//create connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
//connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Mysql Connected...");
});

module.exports = db;
