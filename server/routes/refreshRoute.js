const express = require("express");
const router = express.Router();

const refreshController = require("../controllers/refreshTokenController");

// ********sign up***********
// signup
router.get("/", refreshController.handleRefreshToken);

module.exports = router;
