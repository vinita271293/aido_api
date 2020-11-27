// connectiong to DB using sequilize
// const Sequelize = require("sequelize");
 const dbConfig = require("./config.js")

// const sequelize = new Sequelize ( config.DB,
//     config.USER,
//     config.PASSWORD,
//     {
//       host: config.HOST,
//       dialect: config.dialect,
//       // operatorsAliases: false,
  
//     //   pool: {
//     //     max: config.pool.max,
//     //     min: config.pool.min,
//     //     acquire: config.pool.acquire,
//     //     idle: config.pool.idle
//     //   }
//     }

// )
// module.exports = sequelize;

const mysql = require("mysql");


// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;