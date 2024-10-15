const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const showUserController = require("../controllers/userController");

router.get("/", verifyJWT, showUserController.handleShowUsers);

module.exports = router;
