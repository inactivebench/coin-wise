const db = require("../config/db");
const jwt = require("jsonwebtoken");

const { faker } = require("@faker-js/faker");

const users = [26, 27, 28];
const categories = [
  {
    name: "Food",
    prefixes: ["Shawarma street", "KFC", "Domino's", "Subway", "Java"],
  },
  {
    name: "Entertainment",
    prefixes: ["Netflix", "Hulu", "Showmax", "Amazon Prime Video", "Dstv"],
  },
  {
    name: "Shopping",
    prefixes: ["Amazon", "Naivas", "Costco", "Carrefour", "Jumia"],
  },
  {
    name: "Travel",
    prefixes: ["Delta", "United", "American", "Southwest", "Booking.com"],
  },
  {
    name: "Bills & Utilities",
    prefixes: [
      "Electricity Bill",
      "Water Bill",
      "Gas Bill",
      "Internet Bill",
      "Phone Bill",
    ],
  },
  {
    name: "Groceries",
    prefixes: [
      "Whole Foods",
      "Quickmart",
      "Mugoya Veg",
      "Soko Bora",
      "Safeway",
    ],
  },
  {
    name: "Restaurants",
    prefixes: [
      "Paparoti",
      "The Wine box",
      "Kengeles",
      "Mawimbi seafood",
      "Inti",
    ],
  },
  {
    name: "Utilities",
    prefixes: ["Electricity", "Water", "Gas", "Internet", "Phone"],
  },
  {
    name: "Rent",
    prefixes: ["Landlord", "Property Management"],
  },
  {
    name: "Subscriptions",
    prefixes: ["Spotify", "Apple Music", "Amazon Prime", "Hulu", "Netflix"],
  },
];

function generateTransactions(userId, numTransactions, startDate, endDate) {
  const transactions = [];
  try {
    for (let i = 0; i < numTransactions; i++) {
      //random category
      const randomCategoryIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomCategoryIndex];

      //random prefix
      const randomPrefixIndex = Math.floor(
        Math.random() * randomCategory.prefixes.length
      );
      const randomPrefix = randomCategory.prefixes[randomPrefixIndex];

      const transaction = {
        user_id: userId,
        transaction_description: randomPrefix,
        amount_spent: faker.commerce.price({ min: 10, max: 1000 }),
        transaction_cost: faker.finance.amount({ min: 2, max: 50 }), // Limit transaction cost to $0-$50
        datetime: faker.date.between({ from: startDate, to: endDate }),
        category: randomCategory.name,
      };
      transactions.push(transaction);
    }

    return transactions;
  } catch (error) {
    console.log(error);
  }
}

const allTransactions = [];

const startDate = faker.date.past({ years: 1 }); // Transactions start a year ago
const endDate = new Date(); // Up to today

users.forEach((userId) => {
  allTransactions.push(...generateTransactions(userId, 50, startDate, endDate));

  return allTransactions;
});

const insertTransaction = (allTransactions, res) => {
  try {
    for (const transaction of allTransactions) {
      const values = {
        user_id: transaction.user_id,
        transaction_description: transaction.transaction_description,
        amount_spent: transaction.amount_spent,
        transaction_cost: transaction.transaction_cost,
        datetime: transaction.datetime,
        category: transaction.category,
      };
      const sql = "INSERT INTO transactions SET ?";
      let query = db.query(sql, values, (err, result) => {
        if (err) return console.log(err);
        console.log("transactions created");
      });
    }
  } catch (error) {
    throw error;
  }
};
//uncomment to generate data
// insertTransaction(allTransactions);

const getTransactions = (req, res) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userInfo.userId;

      const sql = "SELECT * FROM transactions WHERE user_id = ? ";

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
    category: req.body.newData.category,
  };
  try {
    const sql = "INSERT INTO transactions SET ?";
    let query = db.query(sql, transaction, (err, result) => {
      if (err) res.status(400).send({ message: err });

      res.status(201);
      console.log("transaction logged");
    });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { getTransactions, addTransaction };
