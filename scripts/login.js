const con = require("./dbcon");
const express = require("express");
const router = express.Router();
let alert = require("alert");
let person='';
// var LocalStorage = require('node-localstorage').LocalStorage;

router.post("/login", (req, res) => {
  let user = req.body.user;  
  let pswd =req.body.pswd;
  let query =
    "SELECT G.*,M.* FROM generaluser G natural join mobilenumbers M WHERE (G.email = '" + user + "' or G.userID = '" + user + "') and G.pswd = '" + pswd + "'";
    let res11='';

  con.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result && result.length > 0) 
    {
    res11="Logged in successfully.";
    // alert("Login Successfull."),
    person = {
      userID: result[0]['userID'],
      fname: result[0]['fname'],
      lname: result[0]['lname'],
      email: result[0]['email'],
      mob1: result[0]['mobilenumber1'],
      mob2: result[0]['mobilenumber2'],
      password: pswd,
      dob: result[0]['dateOfBirth'],
      age: result[0]['age'],
      gender: result[0]['gender'],

    },
    res.cookie("user",person),
    res.redirect('/home');
  }
    else {res11="Username or Password are not correct.";
    console.log(res11);
    res.redirect('/error'); 
  }

  });
});
// console.log("from login");
// console.log(person);
module.exports = router,person;
