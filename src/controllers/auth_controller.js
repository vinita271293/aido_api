const express = require("express");
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

require('dotenv').config()


const app = express();
const User = require("../Model/User")
const Aido = require("../Model/Aido")
const bodyParser = require("body-parser");
app.use(bodyParser.json());


    // Find a single user with a userId
exports.login = (req, res) => {
    console.log("login params",req.body.email)
    User.findById(req.body.email, (err, data) => {
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
                algorithm: "HS256",
                 expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            

            //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        //  expiresIn: process.env.REFRESH_TOKEN_LIFE
    })


   
   const data =  {
        "accessToken":accessToken,
        "refreshToken":refreshToken,
    }
    res.send(data)
           }
           else{
            res.status(401).send({
                message: `Not found User with email ${req.body.email}.`
              });
           }

        }
      });
  
  
};


    // Find a single aido with a aidoid
    exports.robotLogin = (req, res) => {
        console.log("login params",req.body.email)
        Aido.findById(req.body.email, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                //res.status(404).send({
                res.status(401).send({
                  status:401,
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
                console.log("login db temp password ",data.reset_pwd)
                console.log("login db temp password exp ",data.reset_pwd_exp)
               const response =  comparePassword(data.aido_password,req.body.password);
               if(response === true){
    
                
                   // generate jwt here
                   let payload = {email: req.body.email};

                   const tokens = generateTokens(payload) ;
                   
                  
       
     
        const data1 = {
          "name":data.aido_name,
          "skype":data.aido_skype,
          "evernote":data.aido_evernote,
          "id":data.aido_id
        }
        res.send({
          status:200,
          tokens:tokens,
          data:data1,
          resetPassword:false
         




        }
          )
               }
               else{
                  // comapre temp pwd
                if(tempPassword(req.body.password,data.reset_pwd,data.reset_pwd_exp)){
                    console.log("temp password matched",req.body.password);
                    console.log("temp password matched",req.body.password);
                  // go to change password

                    // generate jwt here
                    let payload = {email: req.body.email};
                 const tokens  =    generateTokens(payload)
              
         const data1 = {
           "name":data.aido_name,
           "skype":data.aido_skype,
           "evernote":data.aido_evernote,
           "id":data.aido_id
         }
         res.send({
           status:200,
           tokens:tokens,
           data:data1,
           resetPassword:true
          
 
 
 
 
         }
           )

                }
                else{
                  res.status(401).send({
                    status:401,
                      // message: `Not found Robot with email ${req.body.email}.`
                      message:"invalid password"
                    });
                }



              
               }
    
            }
          });
      
      
    };

function tempPassword(password, dbResetPassword,exp){
  if(password == dbResetPassword){
   const hour = 60 * 60 * 1000; //(60seconds * 60minutes * 1000ms, to get the milliseconds)
const hourAgo = Date.now() - hour;
console.log("reset pwd exp time",exp);
console.log("reset pwd exp time",Date.now());

if( Date.now() < exp ) { 
    // yourDate is less than an hour ago
    return true;
}
return false;

     
  }
  else{
    return false;
  }

}

function generateTokens(email){
  
  //create the access token with the shorter lifespan
  let accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
   algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE
})


//create the refresh token with the longer lifespan
let refreshToken = jwt.sign(email, process.env.REFRESH_TOKEN_SECRET, {
algorithm: "HS256",
//  expiresIn: process.env.REFRESH_TOKEN_LIFE
})




const tokens =  {
"accessToken":accessToken,
"refreshToken":refreshToken,
}
return tokens;
}


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

exports.forgotPassword = (req,res) =>{
  Aido.findById(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //res.status(404).send({
        res.status(401).send({
          status:401,
          message: `Not found User with id ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.body.email
        });
      }
    } 
    else {
         
      
     
         console.log("aido found",data)

        //generate password reset 
   const resetPasswordToken    =   crypto.randomBytes(5).toString('hex');
   const resetPasswordExpires = Date.now() + 3600000; //expires in an hour

   console.log("resetPasswordToken",resetPasswordToken);
   console.log("email in body",req.body.email);

   //update  database

   

   Aido.updateResetPwdById(
    req.body.email,
    resetPasswordToken,resetPasswordExpires,
    (err, response) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Aido with id ${req.body.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Aido with id " + req.body.email
          });
        }
      } 
      
      else{
        //send email here
console.log("updated data after reset pwd ",response);
        const transporter = nodemailer.createTransport({
         
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // use SSL
          auth: {
              user: 'vinita.shekhawat@ahdynamics.com',
              pass: 'vinita@ahd'
          }
        });


        const mailOptions = {
          from: 'vinita.shekhawat@ahdynamics.com',
          to: req.body.email,
          // subject: 'Sending Email using Node.js',
          text: 'Please login with temprory password '+resetPasswordToken
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {

            console.log('Email sent: ' + info.response);
            res.send({
              status:200,
              message:"Please check your email"
            })
            
          }
        });



        
      }
    }
  );

         

       






       
      //  else{
      //   res.status(401).send({
      //     status:401,
      //       message: `Not found Robot with email ${req.body.email}.`
      //     });
      //  }

    }
  });

}

exports.refresh = (req,res) =>{
    console.log("refresh api refreshToken body",req.body)
           //retrieve the refresh token from the users array
           let refreshToken = req.body.refreshToken
           let payload = req.body.id
console.log("refresh api refreshToken", refreshToken)


//console.log("jwt veryfy",jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET))
           //verify the refresh token
           try{
            
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
               
            
          
            }
           catch(e){
              // res.send(e)
               
               res.status(401).send({
                message: `Unautherized`
              });

           }

           console.log("refresh api payload", payload)
           let newAccessToken = jwt.sign({id:payload}, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })
        
            let newRefreshToken = jwt.sign({id:payload}, process.env.REFRESH_TOKEN_SECRET, 
             {
                 algorithm: "HS256",
                //  expiresIn: process.env.REFRESH_TOKEN_LIFE
             })
             let data = {
                 accessToken :newAccessToken,
                 refreshToken : newRefreshToken
             }
             
             console.log("REFRESH_TOKEN_SECRET",data)
             res.send(data)
       
           
           //res.cookie("jwt", newToken, {secure: true, httpOnly: true})
           

}   