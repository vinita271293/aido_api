const express = require('express');
const router = express.Router();
const {verify}  = require("./../controllers/verify")
const auth = require("../controllers/auth_controller")

router.post("/refresh" ,auth.refresh);
router.post("/login", auth.login);



module.exports = router