
const connection = require("../database.js/connection");
const jwt = require('jsonwebtoken');

require('dotenv').config()


// constructor
const Aido = function(aido) {
  this.aido_password  = aido.password;
  this.aido_id = aido.id
  this.aido_name = aido.name;
  this.aido_skype = aido.skype;
  this.aido_evernote = aido.evernote;
  

};

Aido.create = (newAido, result) => {
    console.log("new aido",newAido)

    connection.query("INSERT INTO Aido SET ?", newAido, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created aido: ", { id: res.insertId, ...newAido });

         // generate jwt here
         let payload = {id: newAido.aido_id};
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

//store the refresh token in the database
//update database here

//res.cookie("jwt", accessToken, { httpOnly: true})

const data =  {
  "accessToken":accessToken,
  "refreshToken":refreshToken,
}

        result(null, { id: res.insertId, ...newAido,data });
      });

    
  
};


Aido.findById = (aidoId, result) => {
  
  connection.query("SELECT * FROM Aido WHERE aido_id ='"+aidoId+"'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found aido: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

// Aido.findByIdRobotLoginDetail = (email, result) => {
  
//   connection.query('SELECT aido_id , password FROM Aido WHERE aido_id ='+'"'+email+'"', (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found user: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found user with the id
//     result({ kind: "not_found" }, null);
//   });
// };
// User.findByIdLoginDetail = (email, result) => {
  
//   connection.query('SELECT email , password FROM users WHERE email ='+'"'+email+'"', (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found user: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found user with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Aido.getAll = result => {
    connection.query("SELECT * FROM Aido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


Aido.updateById = (id, aido, result) => {
  console.log("updateById AIDO PARAMS",aido.aido_name,aido.aido_id)
  connection.query(
    "UPDATE Aido SET  aido_name = ?, aido_skype = ?,aido_evernote = ?, aido_id = ? WHERE aido_id = ?",
    [ aido.aido_name, aido.aido_skype, aido.aido_evernote,aido.aido_id,id],
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

      console.log("updated aido: ", {  ...aido });
      result(null, {  ...aido });
    }
  );
};

Aido.updateResetPwdById = (id, resetPwd,resetPwdExp, result) => {
  console.log("updateById AIDO PARAMS",resetPwd,resetPwdExp)
  connection.query(
    "UPDATE Aido SET  reset_pwd= ?, reset_pwd_exp = ? WHERE aido_id = ?",
    [ resetPwd, resetPwdExp, id],
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

      // console.log("updated aido: ", {  ...aido });
      // result(null, {  ...aido });
      console.log("updated aido ");
      
      result(null, true);
    }
  );
};
Aido.changePassword = (id, pwd, result) => {
  console.log("changePassword",id,pwd)
  
  connection.query(
    "UPDATE Aido SET  aido_password= ? WHERE aido_id = ?",
    [ pwd, id],
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

      // console.log("updated aido: ", {  ...aido });
      // result(null, {  ...aido });
      console.log("updated aido ");
      
      result(null, true);
    }
  );
};

Aido.remove = (id, result) => {
  connection.query("DELETE FROM Aido WHERE aido_id = ?", id, (err, res) => {
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

    console.log("deleted aido with id: ", id);
    result(null, res);
  });
};

Aido.removeAll = result => {
  connection.query("DELETE FROM Aido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Aido`);
    result(null, res);
  });
};

module.exports = Aido;