var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mysql = require("mysql");
let User = require('./bean/user');


let data = new Array();

let connection = mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"123456",
  database:"cmp"
});

// fs.readFile(__dirname +"/bean/table.json",{encoding:"utf-8"},function(err,d){
// });


//展示信息
router.get('/', function(req, res, next) {
  connection.query("select*from register order by id desc ",function(err,results,fields){
  res.render('table',{
    list:results
  });
  });
  });

  router.get("/add",function(req, res){
    res.render('add');
  } );


//新增信息
router.post('/add',(req,res) =>{
  let user = new User(req.body.name,req.body.pass);
  let query = 'insert register (name,pass) values( "' +user.name + '","' + user.pass + '")'
  connection.query(query,(err,results,fidelds) => {
    if(err) throw err;
    console.log(user);
    res.redirect('/table')
  })
  req.session.user = user;
});

//删除功能 
router.delete('/del/:id',(req,res) => {
  let query = `delete from register where id = ${req.params.id}`
  connection.query(query,(err,results,fidelds) => {
    if (err) throw err;
    console.log(results);
    res.send("删除成功");
  })
});

//修改
router.get('/add2/:id',(req,res) => {
  let query = `select*from register where id = "${req.params.id}"`
  connection.query(query,(err,results,fidelds) => {
    if (err) throw err;
    console.log(results);
    res.render('add2',{arr:results})
  })
});



router.post ('/add2/:id', (req,res) =>{
  let user = {
    'name' : req.body.name,
    'pass' : req.body.pass
  }
  let query = `delete from register where id = "${req.params.id}"`
  connection.query(query,(err,results,fidelds) => {
    if (err) throw err;
    console.log(results);
    let query = `insert into register (id,name,pass) values('${req.params.id}','${user.name}','${user.pass}')`
    connection.query(query,(err,results,fidelds) => {
      if (err) throw err;
      console.log(results);
      res.redirect('/table')
      // res.render('table')
    })
  })
});


//查询
router.post('/:message',(req,res) => {
  let message = req.params.message
  let query = `select*from register where name like "%${message}%"`
  connection.query(query,(err,results,fidelds) => {
    if (err) throw err;
    console.log(results);
    // res.render('add2',{arr:results})
    res.send(results)
  })
});


fs.readFile(path.join(__dirname, "./bean/table.json"), function (err, d) {
  data = JSON.parse(d);
});

router.get('/', function (req, res) {
  let newData = data.splice(0, 2);
  res.render('table', {
    list: newData
  });
});

router.get("/addpage", (req, res) => {
  res.render('add', { obj: {}, id: "" });
})

router.post('/add', (req, res) => {
  let obj = {
    name: req.body.user,
    pass: req.body.pass,
  };

  data.unshift(obj);
  res.redirect('/table')
})

router.get('/del/:id', (req, res) => {
  delete data[req.params.id];
  res.redirect('/table');
})

// router.get('/update/:id', (req, res) => {
//   res.render("add",
//     {
//       obj: data[req.params.id]
//     })
// });





module.exports = router;
