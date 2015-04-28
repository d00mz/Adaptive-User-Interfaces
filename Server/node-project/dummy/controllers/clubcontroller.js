require('../models/club');
var mongoose = require('mongoose');
var Club = mongoose.model("Club");

exports.post = function(req, res){ // Nur zum erstmaligen befüllen -> muss dann hier und in der routes/clubs rausgenommen werden!
	var club = new Club(req.body);
	club.save(); // speichert club in db (dadurch wird _id erzeugt)
	res.jsonp(club); // gibt das Ergebnis zum überprüfen zurück 
};

exports.get = function(req, res){
	Club.find().exec(function(err, clubs) { 
		res.jsonp(clubs); // gibt gespeichertes (inkl. _id) zurück
	})
}