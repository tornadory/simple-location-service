var fs = require('fs');
var app = require('express')();
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();

var DBFILE = "loc.db";

var dbcreate = false;

//fs.exists(DBFILE, function(exist){
//    if(!exist){
//        fs.writeFile(DBFILE, {flag:'wx'}, function(err, data){
//           dbcreate = true;
//        });
//    }
//});

//let db = new sqlite3.Database(DBFILE, sqlite3.OPEN_READWRITE ,(err) => {
//  if(err){
//    return console.error(err.message);
//  }
//  console.log('Connected to the disk file SQlite database');
//});

//memory db

let db = new sqlite3.Database(':memory:', (err) => {
  if(err){
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database');
});


db.serialize(function(){
//  if(dbcreate){
//    db.run('CREATE TABLE user (id INT, dt TEXT)');   
//    dbcreate = false;
//  }
    
  db.run('CREATE TABLE user (id INT, dt TEXT)');   
    
  var stmt = db.prepare('INSERT into user values(?,?)');
  for(var i = 0; i< 10; i++){
    var d = new Date();
    var n = d.toLocaleTimeString();
    console.log(n);
    stmt.run(i, n);
  }
  console.log("stmt.finalize");
  stmt.finalize();
  
//  db.each("SELECT id,dt from user", function(err, row){
//    console.log('User id:' + row.id, row.dt);
//  });
});

var port = process.env.PORT || 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var location = "";

app.get('/', function (req, res) {
	res.send('<h1>Hello, nothing on main page</h1>');
});

app.get('/location', function (req, res) {
	res.send(location);
});

app.get('/db', function (req, res) {
    var result = [];
    db.each("SELECT id,dt from user", function(err, row){
        result.push({id:row.id, dt: row.dt});
    }
    res.contentType('applicaiton/json');
	res.send(JSON.stringify(result));
});

app.post('/location', function(req, res){
    var json = req.body;
    if(json.lat != undefined)
      console.log(json.lat);
    location = json;
    res.send('Add new location Completed!');
});

app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});

process.on('SIGINT', ()=>{
    console.log('SIGINT callback');
    db.close();
    //app.close();
});
