var users = require('./users');
var app = require('express')();
var bodyParser = require('body-parser');

var mongojs = require('./db');
var db = mongojs.connect;

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {

	db.users.count(function(err, result) {
		if (result <= 0) {
			db.users.insert(users.findAll(), function(err, docs) {
				// insert new data.
			});
		} 
		res.send('<h1>Hello, nothing on main page</h1>');
	});
    
    console.log('try to get /');

});


app.get('/users', function (req, res) {
	db.users.find(function(err, docs) {
		res.json(docs);
	});
});

//app.get('/user/:id', function (req, res) {
//	var id = parseInt(req.params.id);
//
//	db.users.findOne({id: id}, function(err, docs) {
//		res.json(docs);
//	});
//});

app.get('/user/:username', function (req, res) {
	var username = req.params.username;

	db.users.findOne({username: username}, function(err, docs) {
		res.json(docs);
	});
});

app.post('/newuser', function (req, res) {
    console.log('try to add new user');
	var json = req.body;
    console.log(json);

	db.users.insert(json, function(err, docs) {
		res.send('Add new ' + docs.name + ' Completed!');
	});

});

app.get('/deleteusers', function (req, res) {
    db.users.remove({});
    res.send('get delete request to delete all locations');
});

app.get('/deleteuser/:username', function (req, res) {
    var username = req.params.username;
    db.users.remove({username:username});
    res.send('get delete request to delete user ' + username);
});

app.get('/locations', function(req, res){
    db.locations.find(function(err, docs) {
		res.json(docs);
	});
});

app.get('/locations/:username', function (req, res) {
	var username = req.params.username;

	db.locations.find({username: username}, function(err, docs) {
		res.json(docs);
	});
});



app.post('/addlocation', function (req, res) {
    //console.log('try to add new location');
	var json = req.body;
    
//    db.locations.find({time: json.time}, function(err, docs) {
//		res.json(docs);
//	});
    //console.log(json);
//    db.locations.findOne({time: json.time, latitude: json.latitude, longtitude: json.longtitude}, function(err, docs){
//        res.json(docs);
//        return;
//    });
//    if(sameRec.length != 0){
//        res.send(sameRec);
//        return;
//    }

	db.locations.insert(json, function(err, docs) {
		res.send('Add new ' + docs.name + ' Completed!');
	});

});

//delete no function
app.delete('/locations', function(req, res){
    res.send('get delete request to delete all locations');
});

app.delete('/locations/:username', function(req, res){
    var username = req.params.username;
    
    res.send('get delete request to delete all locations of user ' + username);
});

app.get('/deletelocations', function (req, res) {
    console.log('try to delete all locations');
    
    db.locations.remove({});
    res.send('get delete request to delete all locations');
});

app.get('/deletelocations/:username', function (req, res) {
    var username = req.params.username;
    console.log('try to delete all locations under ' + username);    
    db.locations.remove({username:username});
    res.send('get delete request to delete all locations of user ' + username);
});

app.get('/dropdups/locations', function(req, res){
    db.locations.ensureIndex({time:1},{unique:true, dropDups:true});
    res.send('try to remove all duplications in locations via time');
});

app.get('/dropdups/users', function(req, res){
    db.users.ensureIndex({deviceID:1},{unique:true, dropDups:true});
    res.send('try to remove all duplications in locations via time');
});

app.get('/dropindexes/locations', function(req, res){
    console.log(db.locations.getIndexes());
    db.locations.dropIndexes();
    console.log(db.locations.getIndexes());
    res.send('try to remove all indexes');
});


app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});