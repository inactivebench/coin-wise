const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

// ********log out***********
router.get("/", logoutController.handleLogout);

module.exports = router;
