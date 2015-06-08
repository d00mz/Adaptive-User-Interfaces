var clubs = require('./controller/clubs')
, users = require('./controller/users')

module.exports = function(app){
	app.get('/getdetails', clubs.getDetails);
	app.get('/recommendation', clubs.getRecommendedClubs);
	app.get('/helloworld', clubs.helloworld);
	app.get('/getallclubs', clubs.getAllClubs);
	app.get('/createUser', users.createUser);
}