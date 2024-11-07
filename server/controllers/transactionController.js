const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Transaction history
const getTransactions = (req, res) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userInfo.userId;

      const sql =
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY dateTime DESC ";

      let query = db.query(sql, req.userId, (err, result) => {
        if (err) res.status(400).send({ message: err });

        res.status(201).send(result);
      });
    });
  } catch (error) {
    res.status(500).send();
  }
};

const addTransaction = (req, res) => {
  const transaction = {
    user_id: req.body.newData.userId,
    transaction_description: req.body.newData.transaction,
    amount_spent: req.body.newData.amount,
    transaction_cost: req.body.newData.cost,
    datetime: new Date(req.body.newData.dateTime),
    type: req.body.newData.type,
    category: req.body.newData.category,
  };

  try {
    const sql = "INSERT INTO transactions SET ?";
    let query = db.query(sql, transaction, (err, result) => {
      if (err) res.status(400).send({ message: err });

      res.sendStatus(201);
      console.log("transaction logged");
    });
  } catch (error) {
    res.status(500).send();
  }
};

const filterTransaction = (req, res) => {
  const formattedStartDate =
    req.body.filterData.startDateTime === ""
      ? ""
      : new Date(req.body.filterData.startDateTime)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
  const formattedEndDate =
    req.body.filterData.endDateTime === ""
      ? ""
      : new Date(req.body.filterData.endDateTime)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

  const filterData = {
    user_id: req.body.filterData.userId,
    amount_spent: req.body.filterData.amount,
    transaction_cost: req.body.filterData.cost,
    startDateTime: formattedStartDate,
    endDateTime: formattedEndDate,
    type: req.body.filterData.type,
    category: req.body.filterData.category,
  };

  try {
    let sql = `SELECT * FROM transactions WHERE user_id = ${filterData.user_id}`;

    if (filterData.transaction_cost !== "") {
      sql += ` AND transaction_cost = ${filterData.transaction_cost}`;
    }
    if (filterData.amount_spent !== "") {
      sql += ` AND amount_spent = ${filterData.amount_spent}`;
    }
    if (filterData.type !== "") {
      sql += ` AND type = '${filterData.type}'`;
    }
    if (filterData.category !== "") {
      sql += ` AND category = '${filterData.category}'`;
    }
    if (filterData.startDateTime !== "" && filterData.endDateTime !== "") {
      sql += ` AND datetime BETWEEN '${filterData.startDateTime}' AND '${filterData.endDateTime}' `;
    }

    sql += ` ORDER BY dateTime DESC`;

    let query = db.query(sql, (err, result) => {
      if (err) res.status(400).send({ message: err });

      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send();
  }
};

// spending breakdown
const categoryTransactions = (req, res) => {
  try {
    const sql =
      "SELECT category, SUM(amount_spent) AS `total_amount` FROM transactions WHERE type = 'expense' GROUP BY category ";

    let query = db.query(sql, (err, result) => {
      if (err) res.status(400).send({ message: err });

      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  filterTransaction,
  categoryTransactions,
};
