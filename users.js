var users = [
	{
		"id": 1,
		"username": "test",
		"deviceID": "0000000000",
		"imei": "00000000000000",
        "imsi": "0000000000"
	}
];

exports.findAll = function() {
	return users;
};

exports.findById = function (id) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id) return users[i];
	}
};

exports.findByUserName = function (username) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].username == username) return users[i];
	}
};