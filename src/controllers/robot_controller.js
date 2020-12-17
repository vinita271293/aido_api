const express = require("express");
const crypto = require('crypto')


const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const Aido = require("../Model/Aido");

// Create and Save a new aido
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  
console.log("req body last",req.body)

let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512',salt)
                                   .update(req.body.password)
                                   .digest("base64");

                                   req.body.password = salt + "$" + hash;

  // Create a aido
  const aido = new Aido({
   
    skype: req.body.skype,
  evernote : req.body.evernote,
  password : req.body.password,
   name: req.body.name,
    id: req.body.id

  });


  // Save aido in the database


  Aido.create(aido, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the aidos."
      });
    else res.send(data);
  });
  
};






// Retrieve all aidos from the database.
exports.findAll = (req, res) => {
  console.log("findOne",req.query.aidoId) 
    Aido.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving aidos."
          });
        else res.send(data);
      });
};

// Find a single aido with a aidoId
exports.findOne = (req, res) => {  
  
  console.log("findOne1",req.params.aidoId) 
    Aido.findById(req.params.aidoId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Aido with id ${req.params.aidoId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving UsAidoer with id " + req.params.aidoId
            });
          }
        } else res.send(data);
      });
  
  
};

// Update a aido identified by the aidoId in the request
exports.update = (req, res) => {
  
  console.log("updateById")
     // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Aido.updateById(
    req.params.aidoId,
    new Aido(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Aido with id ${req.params.aidoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Aido with id " + req.params.aidoId
          });
        }
      } 
      else res.send(data);
    }
  );
  
};

// Delete a aido with the specified aidoId in the request
exports.delete = (req, res) => {
    Aido.remove(req.params.aidoId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Aido with id ${req.params.aidoId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Aido with id " + req.params.aidoId
            });
          }
        } else res.send({ message: `Aido was deleted successfully!` });
      });
  
};

// Delete all aidos from the database.
exports.deleteAll = (req, res) => {
    Aido.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all aidos."
          });
        else res.send({ message: `All aidos were deleted successfully!` });
      });
};
