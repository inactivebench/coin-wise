const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const showUserController = require("../controllers/userController");
const transactions = require("../controllers/transactionController");

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  showUserController.handleShowUsers
);
router.get("/transaction", transactions.getTransactions);
router.post("/add/transaction", transactions.addTransaction);

module.exports = router;
