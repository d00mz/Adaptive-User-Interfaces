var anzahl = 5,
	request = require('request'),
	fs = require('fs-extra'),
	Club = require('../models/club'),
	User = require('../models/user'),
	ObjectId = require('mongoose').Types.ObjectId;


var clubdb = [];
var userdb = [{
	"_id": "5468b061f2d53f3eb0a57783",
	"name": "Dennis B.",
	"trait1": 45.120000000000005,
	"trait2": 31.159999999999993,
	"trait3": 84.50000000000001,
	"trait4": 53.48000000000002,
	"trait5": 81.79999999999998,
	"size": 20,
	"location": [49.876808, 8.652638]
}, {
	"_id": "5468b1a21e2d28ad26730282",
	"name": "Paul",
	"trait1": 22.7,
	"trait2": 88.8,
	"trait3": 74.92,
	"trait4": 51.44000000000002,
	"trait5": 24.5,
	"size": 42.4,
	"location": [49.888381, 8.621299]
}, {
	"_id": "5468f64fc894718ed43ec6de",
	"name": "Dieter",
	"trait1": 99.6,
	"trait2": 49.2,
	"trait3": 19.6,
	"trait4": 49.2,
	"trait5": 49.2,
	"size": 89.2,
	"location": [50.123194, 8.673273]
}, {
	"_id": "5468f685c894718ed43ec6df",
	"name": "Manfred",
	"trait1": 10,
	"trait2": 10,
	"trait3": 10,
	"trait4": 10,
	"trait5": 10,
	"size": 10,
	"location": [50.286682, 8.316217]
}];


var dummyUser = {
	"_id": "5468b061f2d53f3eb0a57783",
	"name": "Dennis B.",
	"trait1": 50,
	"trait2": 50,
	"trait3": 50,
	"trait4": 50,
	"trait5": 50,
	"trait6": 50,
	"trait7": 50,
	"size": 20,
	"location": [49.876808, 8.652638]
}





var settings = {
		distanceToClub: 2000,
		limit: 10
	}
	/**
	 * [calculate distance between two positions]
	 * @param  {[float]} lat1 - Latitude and Longitude of point 1 (in decimal degrees)
	 * @param  {[float]} lon1
	 * @param  {[float]} lat2	- Latitude and Longitude of point 2 (in decimal degrees)
	 * @param  {[float]} lon2
	 * @param  {[string]} unit - 'M' -> miles | 'K' -> kilometers (default) | 'N' -> nautical miles
	 * @return {[float]}
	 */
var distance = function(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1 / 180
	var radlat2 = Math.PI * lat2 / 180
	var radlon1 = Math.PI * lon1 / 180
	var radlon2 = Math.PI * lon2 / 180
	var theta = lon1 - lon2
	var radtheta = Math.PI * theta / 180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180 / Math.PI
	dist = dist * 60 * 1.1515
	if (unit == "K") {
		dist = dist * 1.609344
	}
	if (unit == "N") {
		dist = dist * 0.8684
	}
	return dist
}
var recommendClubs = function(user) {
	var traits = 5;
	var recommendation = new Array();
	console.log('requesting recommendation for ' + user.name);
	console.log('----------------------------------------');
	for (var item = 0; item < clubdb.length; item++) {
		if (settings.distanceToClub != 0) {
			// console.log('Aktueller Club: ' + clubdb[item].name, clubdb[item].loc);
			// console.log('Distanz: ' + distance(user.location[0], user.location[1], clubdb[item].location[0], clubdb[item].location[1], 'K'));
			if (distance(user.location[0], user.location[1], clubdb[item].location[0], clubdb[item].location[1], 'K') < settings.distanceToClub) {
				var diff = 0;
				for (var i = 1; i < traits; i++) {
					diff += Math.abs(user['trait' + i] - clubdb[item]['trait' + i]);
				}
				diff += Math.abs(user['size'] - clubdb[item]['size']);
				recommendation.push(clubdb[item]);
				recommendation[recommendation.length - 1].deviation = diff;
				//clubdb[item].deviation = diff;
				// console.log('Abweichung: ' + diff);
				// console.log('-> club added (' + recommendation[recommendation.length - 1].name + ')');
			} else {
				console.log('-> not added (' + clubdb[item].name + ') because of distance');
			}
		}
		console.log('-------------------');
	}
	//console.log(recommendation);
	user.recommendation = recommendation;
	return user.recommendation;
}
var getDetails = function(req, res) {
	Club.findOne({
		_id: new ObjectId(req.query.id)
	}, function(err, clubData) {
		if (err) {
			console.log(err)
		}
		console.log(err, clubData);
		if (!clubData) {
			res.status(404).end();
		} else {
			res.send(clubData).status(200).end();
		}
	});
	//res.send('message').status(200).end();
};
var getAllClubs = function(req, res) {
	Club.find({}, function(err, club) {
		console.log(err, club);
		if (err) {
			console.log(err)
		}
		if (!club) {
			res.status(404).end();
		} else {
			res.send(club).status(200).end();
		}
	});
};


/**
 * getClubs function
 * @param  {
 * - user (Object mit ID und GEO Position)
 * - Maximale Distanz
 * }
 * @return {
 * - Club JSON
 * }
 */
var getRecommendedClubs = function(req, res) {
	console.log(req.query);
	
	User.findOne({ _id: req.query.userID }, function(err, user) {

		if (err) { console.log(err) }
		if (!user) {
			res.status(404).end();
		} else {

			Club.find({}, function(err, club) {
				console.log('USER:');
				console.log(user);



				console.log(err, club);
				if (err) {
					console.log(err)
				}
				if (!club) {
					res.status(404).end();
				} else {
					clubdb = club;
					var returnJSON = recommendClubs(user);
					res.send(returnJSON).status(200).end();
				}
			});
		}
	});

	
}
var helloworld = function(req, res) {
	console.log('gude');
	console.log(req.query);
	Club.geoNear(8.655637, 49.873239, {
		$maxDistance: req.query.distance
	}, function(err, result) {
		if (err) return console.dir(err)
		console.log(result);
		if (!result) {
			res.status(404).end();
		} else {
			res.send(result).status(200).end();
		}
	});
	//res.send('message').status(200).end();
}
module.exports = {
	getDetails: getDetails,
	getAllClubs: getAllClubs,
	getRecommendedClubs: getRecommendedClubs,
	helloworld: helloworld
}