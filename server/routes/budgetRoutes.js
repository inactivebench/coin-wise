const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const budgets = require("../controllers/budgetController");

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  budgets.getBudgets
);

router.get(
  "/:id",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  budgets.getBudgetInfo
);

router.post("/add", budgets.addBudget);

module.exports = router;
