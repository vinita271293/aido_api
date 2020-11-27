const Sequelize = require('sequelize');

const sequelize = require("../database.js/connection.js");
const Aido = require("../Model/Aido.js")(sequelize,Sequelize);
const errHandler = (err)=>{
    console.error(err)
}

// const  aido_controller = async() => {

// insert data into table    
exports.createAido =(req,res)=>{
    // Aido.create(req.body).catch(errHandler);
    Aido.create({
        aido_id:1,
        aido_name:"first_aido",
        aido_email:"aido_email",
        aido_skype:"aido_skype"
    }).catch(errHandler);
} 
    //fetch all data


//}

exports.getAllAidos =     Aido.findAll().catch(errHandler);





