var RuleEngine = require('node-rules');

var clubdb = [{"_id":"5460a5b04c310a4c1edfe4ac","name":"U60311","trait1":45.66999999999999,"trait2":30.630000000000006,"trait3":82.71000000000004,"trait4":51.36,"trait5":75.85999999999999,"size":40.58,"__v":0,"location":[50.112307, 8.677159]},
              {"_id":"5468f71ec894718ed43ec6e0","name":"Nova","trait1":10,"trait2":10,"trait3":10,"trait4":10,"trait5":10,"size":10,"location":[49.872059, 8.657098]},
              {"_id":"5468f731c894718ed43ec6e1","name":"Huckebein","trait1":25,"trait2":15,"trait3":80,"trait4":30,"trait5":5,"size":7,"location":[49.858237, 8.646726]},
              {"_id":"5468f739c894718ed43ec6e2","name":"Natrix","trait1":100,"trait2":87,"trait3":83,"trait4":78,"trait5":50,"size":99,"location":[49.879815, 8.630912]},
              {"_id":"5468f743c894718ed43ec6e3","name":"Musikpark","trait1":7,"trait2":37,"trait3":29,"trait4":40,"trait5":10,"size":80,"location":[49.886283, 8.634827]},
              {"_id":"5468f7c9c894718ed43ec6e4","name":"603qm","trait1":70,"trait2":65,"trait3":43,"trait4":25,"trait5":90,"size":50,"location":[49.875658, 8.659399]},
              {"_id":"5468f7d8c894718ed43ec6e5","name":"Cocoon","trait1":57,"trait2":41,"trait3":68,"trait4":71,"trait5":29,"size":50,"location":[50.121589, 8.750994]},
              {"_id":"5468f7e0c894718ed43ec6e6","name":"Europalace","trait1":10,"trait2":15,"trait3":20,"trait4":25,"trait5":30,"size":72,"location":[50.030097, 8.276974]},
              {"_id":"5468f7e8c894718ed43ec6e7","name":"Herkules","trait1":1.2,"trait2":2,"trait3":1.4,"trait4":2,"trait5":2,"size":2.8,"location":[49.874208, 8.651297]}];


var clubRealDB = require('../controllers/clubcontroller');

console.log('___________________________________________________');
console.log(clubRealDB);
console.log('___________________________________________________');

var userdb = [{"_id":"5468b061f2d53f3eb0a57783","name":"Dennis B.","trait1":45.120000000000005,"trait2":31.159999999999993,"trait3":84.50000000000001,"trait4":53.48000000000002,"trait5":81.79999999999998,"size":20,"location":[49.876808, 8.652638]},
              {"_id":"5468b1a21e2d28ad26730282","name":"Paul","trait1":22.7,"trait2":88.8,"trait3":74.92,"trait4":51.44000000000002,"trait5":24.5,"size":42.4,"location":[49.888381, 8.621299]},
              {"_id":"5468f64fc894718ed43ec6de","name":"Dieter","trait1":99.6,"trait2":49.2,"trait3":19.6,"trait4":49.2,"trait5":49.2,"size":89.2,"location":[50.123194, 8.673273]},
              {"_id":"5468f685c894718ed43ec6df","name":"Manfred","trait1":10,"trait2":10,"trait3":10,"trait4":10,"trait5":10,"size":10,"location":[50.286682, 8.316217]}];

var settings = {
  distanceToClub: 20,
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
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}                                                                   

var ruleSet = [{
    "name": "Rangfolge der Clubs",
    "description": "blocks transactions below value x",
    "priority": 3,
    "on":1,
    "condition": 
    function(user,cb){
        var traits = 5;
        var recommendation = new Array();
        console.log('requesting recommendation for ' + user.name);
		console.log('----------------------------------------');

		for(var item = 0; item < clubdb.length; item++){
			if(settings.distanceToClub != 0){
				console.log('Aktueller Club: '+ clubdb[item].name);
				console.log('Distanz: ' + distance(user.location[0],user.location[1],clubdb[item].location[0],clubdb[item].location[1],'K'));

				if(distance(user.location[0],user.location[1],clubdb[item].location[0],clubdb[item].location[1],'K') < settings.distanceToClub){
					var diff = 0;

					for(var i = 1; i < traits; i++){
						diff += Math.abs(user['trait'+i] - clubdb[item]['trait'+i]);
					}

					diff += Math.abs(user['size'] - clubdb[item]['size']);

					recommendation.push(clubdb[item]);
					recommendation[recommendation.length-1].deviation = diff;

					//clubdb[item].deviation = diff;
					console.log('Abweichung: ' + diff);

					console.log('-> club added ('+recommendation[recommendation.length-1].name+')');

				} else {
					console.log('-> not added ('+ clubdb[item].name + ') because of distance');
				}
			}

			console.log('-------------------');
		}

        //console.log(recommendation);
        user.recommendation = recommendation;
        cb(true);

    },
    "consequence":
        function(cb) {
            console.log("Rule 1 matched for "+this.name);
            this.result = false;
            this.process = true;
            cb();
        }
}];

var engine = new RuleEngine(ruleSet);

/**
 * [execute rules]
 * @param  {[Object]} user
 */
engine.execute(userdb[0],function(result){ 

	console.log('----------------------------------------');

	result.recommendation.sort(function (a, b) {
		if (a.deviation > b.deviation) {
			return 1;
		}
		if (a.deviation < b.deviation) {
			return -1;
		}
		// a must be equal to b
		return 0;
	});

	console.log('Clubliste für Benutzer:');
	for(var i = 0; i < result.recommendation.length; i++){
		console.log(result.recommendation[i].name);
	}

});