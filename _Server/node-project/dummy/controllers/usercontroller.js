require('../models/user');
require('../models/club');
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Club = mongoose.model("Club");

var nToAttr = [
	"trait1",
	"trait2",
	"trait3",
	"trait4",
	"trait5",
	"size"
];

exports.post = function(req, res){ // Nur zum erstmaligen befüllen -> muss dann hier und in der routes/users rausgenommen werden!
	var user = new User(req.body);
	user.save(); // speichert user in db (dadurch wird _id erzeugt)
	res.jsonp(user); 
};

exports.get = function(req, res){
	User.find().exec(function(err, users) { 
		res.jsonp(users); // gibt gespeichertes (inkl. _id) zurück
	});
};

exports.visit = function(req, res){
	User.load(req.body.user_id, function(err, user){
		Club.load(req.body.club_id, function(err, club) {
			if(user && club) console.log("user: "+user.name+" & club: "+club.name+" changed!"); else console.log("null error");
			for(var n = 0;n<nToAttr.length;n++)
			{
				if(user[nToAttr[n]] > club[nToAttr[n]])
				{
					club[nToAttr[n]] += 2*parseFloat("0."+user[nToAttr[n]]);
					user[nToAttr[n]] -= 4*parseFloat("0."+club[nToAttr[n]]);
				} else {
					club[nToAttr[n]] -= 3*parseFloat("0."+user[nToAttr[n]]);
					user[nToAttr[n]] += 6*parseFloat("0."+club[nToAttr[n]]);
				}
			}

			//console.log(club);
			club.save(function(err){});
			//console.log(user);
			user.save(function(err){res.jsonp(user)});
		});
	});
}