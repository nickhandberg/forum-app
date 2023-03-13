const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
    .post("/login", authController.handleLogin)
    .post("/register", authController.handleNewuser)
    .get("/logout", authController.handleLogout)
    .get("/refresh", authController.handleRefreshToken);

module.exports = router;
