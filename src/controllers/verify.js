const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verify = function(req, res, next){
  
    
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET);
                return next();
            }
        } catch (err) {
            console.log("error",err)
           // if(err.message == "in")
            return res.send(err)
           
            //return res.status(403).send();
     
        }
    } 
    else {
        return res.status(401).send();
    }
    

}