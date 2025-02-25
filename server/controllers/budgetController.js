const db = require("../config/db");
const jwt = require("jsonwebtoken");

// add new budget
const addBudget = (req, res) => {
  const budget = {
    user_id: req.body.budgetData.userId,
    budget_title: req.body.budgetData.title,
    budget_amount: req.body.budgetData.amount,
    budget_description: req.body.budgetData.description,
    start_date: new Date(req.body.budgetData.startDate),
    end_date: new Date(req.body.budgetData.endDate),
  };
  // const budget = {
  //   user_id: req.body.userId,
  //   budget_title: req.body.title,
  //   budget_amount: req.body.amount,
  //   budget_description: req.body.description,
  //   start_date: new Date(req.body.startDate),
  //   end_date: new Date(req.body.endDate),
  // };

  try {
    const sql = "INSERT INTO budgets SET ?";
    let query = db.query(sql, budget, (err, result) => {
      if (err) res.status(400).send({ message: err });

      res.sendStatus(201);
      console.log("budget logged");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const getBudgets = (req, res) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userInfo.userId;

      const sql = "SELECT * FROM budgets WHERE user_id = ? ";

      let query = db.query(sql, req.userId, (err, result) => {
        if (err) res.status(400).send({ message: err });

        res.status(201).send(result);
      });
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { addBudget, getBudgets };
