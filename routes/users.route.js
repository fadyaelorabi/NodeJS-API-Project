const express = require("express");
const router = express.Router();
const userController = require("../controller/users.controller");
const verifyToken = require("../middleware/verifyToken");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//get all userSchema
//reg
//login
router.route("/").get(verifyToken,userController.getallUsers);

router.route("/register").post(upload.single("file"),userController.register);

router.route("/login").post(userController.login);

module.exports = router;
