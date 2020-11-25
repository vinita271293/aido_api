

const express = require("express");

const app = express();





var mysql = require('mysql');



app.get('/getAllAido', function (req, res) {
   
    // var connection = mysql.createConnection({
    //     host     : "localhost",
    //     user     : "root",
    //     password : "test1234",
    //     database:"aido"
    
       
        
    //   });
      var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "test1234",
  database:"aido_test"
  
  
});

    
    connection.connect(function(err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack,err.message);
        return;
      }

    
   
    
      console.log('Connected to database.');
      let sql = "SELECT * FROM aido_registration";
      let query = connection.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
     

    
    
    
});
});


app.listen(8080,'localhost',
     (err, resp) => {
  console.log("server started");
});
