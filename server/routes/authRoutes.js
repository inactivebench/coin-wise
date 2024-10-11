const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const verifyJWT = require("../middleware/verifyJWT");

// ********log in***********
router.post("/login", authController.handleLogin);

// Authenticate user
router.get("/userAuth", verifyJWT, authController.authenticateUser);

module.exports = router;
