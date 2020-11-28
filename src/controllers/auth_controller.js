const express = require("express");
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const app = express();
const User = require("../Model/User")
const bodyParser = require("body-parser");
app.use(bodyParser.json());


    // Find a single user with a userId
exports.login = (req, res) => {
    console.log("login params",req.body.email)
    User.findByIdLoginDetail(req.body.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.body.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.body.email
            });
          }
        } 
        else {
           // res.send(data);
            //compare passwords here  
           const response =  comparePassword(data.password,req.body.password);
           if(response === true){

            
               // generate jwt here
               let payload = {email: req.body.email};
               //create the access token with the shorter lifespan
               let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256"
                // expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            

            //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256"
        // expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

//store the refresh token in the database
//update database here

    //res.cookie("jwt", accessToken, { httpOnly: true})
   
   const data =  {
        "accessToken":accessToken,
        "refreshToken":refreshToken,
    }
    res.send(data)
           }

        }
      });
  
  
};

function comparePassword (hashedPwd,password){
    console.log("compare pwd and hash",hashedPwd)
    let passwordFields = hashedPwd.split('$')
   
    let salt = passwordFields[0];
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    console.log("compare pwd and hash",hash+" ,  "+passwordFields[1] )
    if(hash === passwordFields[1]){
console.log("pwd same")
return true;
    }
    else{
        console.log("not same")
        return false;
    }
}

exports.refresh = (req,res) =>{

           //retrieve the refresh token from the users array
           let refreshToken = req.body.refreshToken
           let payload = req.params.userId
console.log("refresh api refreshToken", refreshToken)
console.log("refresh api payload", payload)
console.log("REFRESH_TOKEN_SECRET",process.env.REFRESH_TOKEN_SECRET)
console.log("jwt veryfy",jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET))
           //verify the refresh token
           try{
               jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
           }
           catch(e){
               res.send(e)
               //return res.status(401).send()
           }
       
           let newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, 
           {
               algorithm: "HS256",
               expiresIn: process.env.ACCESS_TOKEN_LIFE
           })
           let newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, 
            {
                algorithm: "HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            })
            let data = {
                accessToken :newAccessToken,
                refreshToken : newRefreshToken
            }
       
           //res.cookie("jwt", newToken, {secure: true, httpOnly: true})
           res.send(data)

}