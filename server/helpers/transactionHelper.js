const db = require("../config/db");
const { faker } = require("@faker-js/faker");

const users = [26, 27, 28, 31];
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
    name: "Travel",
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

const incomeCategories = [
  {
    name: "Salary",
    prefixes: ["Salary Payment", "Wages"],
  },
  {
    name: "Investment Income",
    prefixes: ["Dividend Payment", "Interest Earned"],
  },
  {
    name: "Sales",
    prefixes: ["Product Sale", "Service Revenue"],
  },
  {
    name: "Refunds",
    prefixes: ["Refund Received", "Cashback"],
  },
  {
    name: "Gifts",
    prefixes: ["Gift Received", "Allowance"],
  },
  {
    name: "Other Income",
    prefixes: ["Miscellaneous Income", "Freelance Payment"],
  },
];

function generateTransactions(userId, numTransactions, startDate, endDate) {
  const transactions = [];
  try {
    for (let i = 0; i < numTransactions; i++) {
      // 40% chance of income transaction
      const isIncome = Math.random() < 0.4;

      const categoryArray = isIncome ? incomeCategories : categories;

      const randomCategoryIndex = Math.floor(
        Math.random() * categoryArray.length
      );
      const randomCategory = categoryArray[randomCategoryIndex];

      const randomPrefixIndex = Math.floor(
        Math.random() * randomCategory.prefixes.length
      );
      const randomPrefix = randomCategory.prefixes[randomPrefixIndex];

      const transactionCost = isIncome
        ? 0
        : faker.finance.amount({ min: 2, max: 50 });

      const transaction = {
        user_id: userId,
        transaction_description: randomPrefix,
        amount_spent: faker.commerce.price({ min: 10, max: 1000 }),
        transaction_cost: transactionCost,
        datetime: faker.date.between({ from: startDate, to: endDate }),
        category: randomCategory.name,
        type: isIncome ? "income" : "expense",
      };
      transactions.push(transaction);
    }

    return transactions;
  } catch (error) {
    console.log(error);
  }
}

const allTransactions = [];

const startDate = faker.date.past({ years: 1 });
const endDate = new Date();

users.forEach((userId) => {
  allTransactions.push(...generateTransactions(userId, 50, startDate, endDate));

  return allTransactions;
});

const insertTransaction = (allTransactions, res) => {
  try {
    for (const transaction of allTransactions) {
      const formattedDate = new Date(transaction.datetime)
        .toISOString()
        .split("T")[0];
      const values = {
        user_id: transaction.user_id,
        transaction_description: transaction.transaction_description,
        amount_spent: transaction.amount_spent,
        transaction_cost: transaction.transaction_cost,
        datetime: formattedDate,
        category: transaction.category,
        type: transaction.type,
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

module.exports = { insertTransaction };
