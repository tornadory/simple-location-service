var mongojs = require('mongojs');

var databaseUrl = process.env.MONGODB_URI || 'dev_mongojs';
var collections = ['users', 'locations'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
	connect: connect
};