const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const transactions = require("../controllers/transactionController");

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  transactions.getTransactions
);
router.post("/add", transactions.addTransaction);
router.post("/filter", transactions.filterTransaction);

module.exports = router;