var express = require('express');
var router = express.Router();
var mysql = require("mysql");

let connection = mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"123456",
  database:"cmp"
});

router.get('/', function(req, res, next) {
  res.render('index');
});




module.exports = router;