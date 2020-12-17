const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verify = function(req, res, next){
  
    
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            console.log("Bearer","called")
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
                
            } 
            else {
               
               let payload =   jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET);
               
               console.log("jwt verifivcation",payload)
               
                
                return next();
            }
        } 
        catch (err) {
            console.log("error",err)
            if(err == 'TokenExpiredError: jwt expired'){
                console.log("refresh token here")
                
 }
           // if(err.message == "in")
            return res.send(err)
           
            //return res.status(403).send();
     
        }
    } 
    else {
        return res.status(401).send();
    }
    

}