var anzahl = 5
, request = require('request')
, fs = require('fs-extra')
, User = require('../models/user')
, ObjectId = require('mongoose').Types.ObjectId; 



var update = function(req, res, next){
	User.findOne({ email: req.user.email }, function(err, user) {
     /* if (err) { console.log(err) }
      if (!user) {
        res.status(404).end();
      }else {
      	var body = req.body
      	for (var key in body) {
		   if(body[key] !== user[key]){
		   		user[key] = body[key]
		   }
		}
		user.save(function(err) {
            if(err) {
                console.log("Error");
            }
            else {
        		res.status(200).end();
            }
        });
      }*/
    });
};

var createUser = function(req,res){

	console.log(req.query);

	// Objekt muss vom Kaltstart an die createUser Seite gepostet werden
	// var userData = req.userData;
	var userData = {
		name: 'gude2',
		trait1: 50,
		trait2: 50,
		trait3: 50,
		trait4: 50,
		trait5: 50,
		size: 50,
		location: [ 49.875658,8.750994],
		//email: '',
		//password: 'hallowelt'
	};


	// Validen Mongoose User anhand des Schemas erzeugen
	var newUser = new User(userData);

	// User in Datenbank speichern
	// TODO: gespeicherten User zurückgeben
	newUser.save(function (err, dbuser) {
		if(err) {
			console.error(err);
			console.log(dbuser);
			res.status(404).end();
		}
		else {
			console.log(dbuser);
			res.send(dbuser).status(200).end();
		}
	});
};

module.exports = {
	createUser : createUser
}