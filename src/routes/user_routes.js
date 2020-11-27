// module.exports = app => {
//     const user = require("../controllers/user_controller");
  
//     // Create a new Customer
//     app.post("/user", user.create);
  
//     // Retrieve all Customers
//     app.get("/getAllUsers", user.findAll);
  
//     // // Retrieve a single Customer with customerId
//     // app.get("/customers/:customerId", customers.findOne);
  
//     // // Update a Customer with customerId
//     // app.put("/customers/:customerId", customers.update);
  
//     // // Delete a Customer with customerId
//     // app.delete("/customers/:customerId", customers.delete);
  
//     // // Create a new Customer
//     // app.delete("/customers", customers.deleteAll);
//   };

const express = require('express');
const router = express.Router();
const user = require("../controllers/user_controller");

// Create a new user
router.post("/users", user.create);

// Retrieve all User
router.get("/users", user.findAll);

// Retrieve a single User with userId
router.get("/users/:userId", user.findOne);
  
     // Update a User with userId
     router.put("/users/:userId", user.update);
  
     // Delete a User with userId
     router.delete("/users/:userId", user.delete);
  
     // delete all
     router.delete("/users", user.deleteAll);

module.exports = router
