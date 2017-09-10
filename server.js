var app = require('express')();
var bodyParser = require('body-parser');

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

app.post('/location', function(req, res){
    var json = req.body;
    console.log(json);
    location = json;
    res.send('Add new location Completed!');
});

app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});