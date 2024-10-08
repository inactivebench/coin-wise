const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const logoutController = require("../controllers/logoutController");
const verifyJWT = require("../middleware/verifyJWT");

// ********log in***********
router.post("/login", authController.handleLogin);

// Authenticate user
router.get("/userAuth", verifyJWT, authController.authenticateUser);

// ********log out***********
router.get("/logout", logoutController.handleLogout);

module.exports = router;
