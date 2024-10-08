const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");

// ********sign up***********
// signup
router.post("/", registerController.handleNewUser);

module.exports = router;
