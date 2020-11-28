const express = require("express");
const crypto = require('crypto')

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const User = require("../Model/User");

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512',salt)
                                   .update(req.body.password)
                                   .digest("base64");

     //to compare password from db and user request                              
    // comparePassword(salt + "$" + hash,"email3update")
                                   req.body.password = salt + "$" + hash;



console.log("crypted password",req.body.password)
console.log("req body last",req.body)

  // Create a user
  const user = new User({
   
    skype: req.body.skype,
    password : req.body.password,
    email: req.body.email,
    username: req.body.username
  });


  // Save user in the database

  console.log("crypted password user",user)
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    else res.send(data);
  });
  
};

// insert into user_table_rel
exports.user_aido_rel = (req, res) => {
    var data = {
       
            "email": req.query.email,
            "aido_id": req.query.aidoId,
            "user_type_id":req.query.typeId
        }
        console.log("user aido rel",req.query.email,req.query.aidoId)
     
    User.user_aido_rel_create(data, (err, data) => {
        console.log("data sent in aido user realtion",data)
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.email
            });
          }
        } else res.send(data);
      });
  
  
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};

// Find a single user with a userId
exports.findOne = (req, res) => {   
    User.findById(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.email
            });
          }
        } else res.send(data);
      });
  
  
};

// Update a users identified by the usersId in the request
exports.update = (req, res) => {
     // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.email,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.email
          });
        }
      } 
      else res.send(data);
    }
  );
  
};

// Delete a users with the specified usersId in the request
exports.delete = (req, res) => {
    User.remove(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with id " + req.params.email
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
  
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        else res.send({ message: `All users were deleted successfully!` });
      });
};
