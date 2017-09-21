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


app.get('/user', function (req, res) {
	db.users.find(function(err, docs) {
		res.json(docs);
	});
});

app.get('/user/:id', function (req, res) {
	var id = parseInt(req.params.id);

	db.users.findOne({id: id}, function(err, docs) {
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
    console.log('try to add new location');
	var json = req.body;
    console.log(json);

	db.locations.insert(json, function(err, docs) {
		res.send('Add new ' + docs.name + ' Completed!');
	});

});

app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});