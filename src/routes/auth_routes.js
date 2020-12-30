const express = require('express');
const router = express.Router();
const {verify}  = require("./../controllers/verify")
const auth = require("../controllers/auth_controller");


router.post("/refresh" ,auth.refresh);
router.post("/robot/login", auth.robotLogin);
// router.post("/robot/login", (req,res)=>{
//     token expired error
//res.status(401).send({
//         status:401,
//         message:"TokenExpiredError"
//     })
// });
router.post("/login", auth.login);
router.post("/robot/forgotpassword",auth.forgotPassword);




module.exports = router