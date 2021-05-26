let express = require('express');
let router = express.Router();
var mysql = require("mysql");
var User = require('./bean/user');


let connection = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"cmp"
  });

  router.get('/', function(req, res, next) {
    res.render('login');
  });
//   router.get('/', function(req, res) {
    // connection.query("select*from tab_score order by id desc ",function(err,results,fields){
//       console.log(results);
//     res.render('login',{
//       data:results
//     });
//     });
//     });

    // router.post('/add', function(req, res, next) {
    //     let user = new User(req.body.name,req.body.pass);
    //      connection.query("insert into tab_score(name,pass) value(?,?)",[user.name,user.pass],(err,results,fields) => {
    //        res.redirect('/register');
    //      });

router.post('/',(req,res) =>{
    let name = req.body.name;
    let pass = req.body.pass;
    let query = 'select name,pass from register where name ="' +name + '" and pass="' + pass +'"'
    connection.query(query,(err,results,fidelds) => {
        if(results != ""){
                res.redirect('/index')
            }else{
                res.send("登录失败");
            }
    })
    
    });
        
module.exports = router;