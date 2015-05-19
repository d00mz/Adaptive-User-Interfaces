var clubs = require('./controller/clubs')

module.exports = function(app){
	app.get('/test', clubs.getDetails);
	app.get('/recommendation', clubs.getRecommendedClubs);
	app.get('/helloworld', clubs.helloworld);
}