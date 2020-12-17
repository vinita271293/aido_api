const express = require('express');
const router = express.Router();
const robot = require("../controllers/robot_controller");
const {verify} = require("../controllers/verify")

// Create a new robot
router.post("/robots",robot.create);


// // Create a new user_aido_relation(duplicate entry needs to avoid)
// router.post("/users_aido", verify,user.user_aido_rel);


// Retrieve a single robot with rbotId
router.get("/robots/:robotId",verify,robot.findOne);


// Retrieve all robots
router.get("/robots", verify,robot.findAll);


// Retrieve all User_aido rel
//router.get("/users_aido", verify,user.findAllUserAido);



// Update a Robot with robotId
router.put("/robots/:robotId",verify, robot.update);
  

// Delete a Robot with robotId
router.delete("/robots/:robotId",verify , robot.delete);
  

// delete all
router.delete("/robots",verify, robot.deleteAll);

module.exports = router
