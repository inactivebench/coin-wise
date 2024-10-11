const express = require("express");
const router = express.Router();

const showUserController = require("../controllers/userController");

router.get("/", showUserController.handleShowUsers);

module.exports = router;
