

const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 
const user_routes = require("./src/routes/user_routes")
const auth_routes = require("./src/routes/auth_routes")
app.use(user_routes)
app.use(auth_routes)
app.listen(7000 ,
     (err, resp) => {
  console.log("server started");
});
