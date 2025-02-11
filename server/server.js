const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//routes
app.use("/register", require("./routes/registerRoute"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/logout", require("./routes/logoutRoute"));
app.use("/refresh", require("./routes/refreshRoute"));
// app.use(verifyJWT);
app.use("/users", require("./routes/userRoutes"));
app.use("/transaction", require("./routes/transactionRoutes"));
app.use("/budget", require("./routes/budgetRoutes"));

app.get("/api", (req, res) => {
  console.log("Received /api request...");
  res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
