



const connection = require("../database.js/connection");


// constructor
const User = function(user) {
  this.email  = user.email;
  this.username = user.username;
  this.skype = user.skype;
  this.password = user.password;

};

User.create = (newUser, result) => {
    console.log("new user",newUser)

    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
      });

    
  
};
User.user_aido_rel_create = (data, result) => {
  console.log("user and aido id",data)
  // check if user_id or aido id present or not 
  //...remaining
  //SELECT EXISTS(SELECT * from ExistsRowDemo WHERE ExistId=104)
  connection.query("SELECT EXISTS(SELECT * FROM users WHERE email ='"+data.user_id+"')", (err, res) => {
    if(res!= undefined){
      
      let obj = res[0];
      console.log("check user exists or not response",obj.key)
//       var jsonObj = JSON.parse(res[0]);
// console.log(jsonObj.key);
var string=JSON.stringify(res[0]);
        console.log('>> string: ', string );
        var json =  JSON.parse(string);
        console.log('>> json: ', json);
        //console.log('>> user.name: ', json[0].name);
     

    }
    if(err){
console.log("check user exists or not error",err)
    }

  });




  

  
  
  
  connection.query("INSERT INTO aido_user_relationship SET ?", data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user aido relationship: ", {id: res.insertId,...data});
    result(null, { id: res.insertId, ...data });
  });
  

};

User.findById = (email, result) => {
  
  connection.query("SELECT * FROM users WHERE email ='"+email+"'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};
User.findByIdLoginDetail = (email, result) => {
  
  connection.query('SELECT email , password FROM users WHERE email ='+'"'+email+'"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
    connection.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};
User.getAllUsersAido = result => {
  connection.query("SELECT * FROM aido_user_relationship", (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
  }

  console.log("users: ", res);
  result(null, res);
});
};

User.updateById = (id, user, result) => {
  console.log("updateById",user)
  connection.query(
    "UPDATE users SET  username = ?, skype = ? WHERE email = ?",
    [ user.username, user.skype, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  connection.query("DELETE FROM users WHERE email = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  connection.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;