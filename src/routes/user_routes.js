

const express = require('express');
const router = express.Router();
const user = require("../controllers/user_controller");
const {verify} = require("../controllers/verify")

// Create a new user
router.post("/users",user.create);
router.post("/users_aido", user.user_aido_rel);

// Retrieve all User
router.get("/users", verify,user.findAll);

// Retrieve a single User with userId
router.get("/users/:userId", user.findOne);
  
     // Update a User with userId
     router.put("/users/:userId", user.update);
  
     // Delete a User with userId
     router.delete("/users/:userId", user.delete);
  
     // delete all
     router.delete("/users", user.deleteAll);

module.exports = router
