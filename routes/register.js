let express = require('express');
let router = express.Router();
let User = require('./bean/user');
var mysql = require("mysql");



let connection = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"cmp"
  });

  router.get('/', function(req, res, next) {
    res.render('register');
  });

router.post('/',(req,res) =>{
    let user = new User(req.body.name,req.body.pass);
    let query = 'insert register (name,pass) values( "' +user.name + '","' + user.pass + '")'
    connection.query(query,(err,results,fidelds) => {
      console.log(user);
      res.send("register success");

    })
    req.session.user = user;
})

module.exports = router;