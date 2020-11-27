


// module.exports = Aido;


module.exports = (sequelize, Sequelize) => {
    
    const Aido = sequelize.define({
        aido_id:{
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull:false
    
        },
        aido_name:{
            type:Sequelize.STRING(100)
        },
        aido_email:{
            type:Sequelize.STRING(100)
        },
        aido_skype:{
            type:Sequelize.STRING(100)
        },
        aido_pwd:{
            type:Sequelize.STRING(100)
        }
    
    
    
    
    })
    return Aido;
  };
  