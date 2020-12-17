

const express = require('express');
const router = express.Router();
const user = require("../controllers/user_controller");
const {verify} = require("../controllers/verify")

// Create a new user
router.post("/users",verify,user.create);


// Create a new user_aido_relation(duplicate entry needs to avoid)
router.post("/users_aido", verify,user.user_aido_rel);


// Retrieve a single User with userId
router.get("/users/:userId",user.findOne);


// Retrieve all Users
router.get("/users", verify,user.findAll);


// Retrieve all User_aido rel
router.get("/users_aido", verify,user.findAllUserAido);



// Update a User with userId
router.put("/users/:userId",verify, user.update);
  

// Delete a User with userId
router.delete("/users/:userId",verify , user.delete);
  

// delete all
router.delete("/users",verify, user.deleteAll);

module.exports = router
