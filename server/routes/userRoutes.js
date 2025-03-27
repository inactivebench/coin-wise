const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/roles_list");
const showUserController = require("../controllers/userController");

router.get(
  "/",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  showUserController.handleShowUsers
);
router.put(
  "/update",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  showUserController.handlePasswordUpdate
);

router.delete(
  "/delete",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.user),
  showUserController.handleDeleteUser
);

module.exports = router;
