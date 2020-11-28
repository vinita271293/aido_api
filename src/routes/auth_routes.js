const express = require('express');
const router = express.Router();

const auth = require("../controllers/auth_controller")
// Create a new user
router.post("/login", auth.login);
router.post("/refresh/:userId", auth.refresh);


module.exports = router