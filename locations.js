var locations = [
	{
		"username": "test",
		"location": {
            "latitude":"",
            "longitude":""
        },
		"time": ""
	}
];

exports.findAll = function() {
	return locations;
};

exports.findByUserName = function (username) {
	for (var i = 0; i < locations.length; i++) {
		if (locations[i].username == username) return locations[i];
	}
};