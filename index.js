

const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  require("./src/routes/user_routes")(app)
const user_routes = require("./src/routes/user_routes")
app.use(user_routes)

app.listen(7000 ,
     (err, resp) => {
  console.log("server started");
});
