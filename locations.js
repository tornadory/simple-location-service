var locations = [
	{
		"username": "test",
        "latitude":"",
        "longitude":"",
        "address":"",
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

exports.findByLocationTime = function(latitude, longtitude, time){
    for(var i = 0; i < locations.length; i++){
        if(locations.time == time && locations[i].latitude == latitude && locations[i].longitude == longtitude){
            return locations[i];
        }
    }
}