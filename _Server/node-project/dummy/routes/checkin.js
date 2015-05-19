var RuleEngine = require('node-rules');


// Strukt kommt über ajax
var ajaxData = {
	userid: "5468b1a21e2d28ad26730282",
	clubid: "5460a5b04c310a4c1edfe4ac"
}


// DATENBANK
var clubdb = [{"_id":"5460a5b04c310a4c1edfe4ac","name":"U60311","trait1":45.66999999999999,"trait2":30.630000000000006,"trait3":82.71000000000004,"trait4":51.36,"trait5":75.85999999999999,"size":40.58,"__v":0,"location":[50.112307, 8.677159]},
              {"_id":"5468f71ec894718ed43ec6e0","name":"Nova","trait1":10,"trait2":10,"trait3":10,"trait4":10,"trait5":10,"size":10,"location":[49.872059, 8.657098]},
              {"_id":"5468f731c894718ed43ec6e1","name":"Huckebein","trait1":25,"trait2":15,"trait3":80,"trait4":30,"trait5":5,"size":7,"location":[49.858237, 8.646726]},
              {"_id":"5468f739c894718ed43ec6e2","name":"Natrix","trait1":100,"trait2":87,"trait3":83,"trait4":78,"trait5":50,"size":99,"location":[49.879815, 8.630912]},
              {"_id":"5468f743c894718ed43ec6e3","name":"Musikpark","trait1":7,"trait2":37,"trait3":29,"trait4":40,"trait5":10,"size":80,"location":[49.886283, 8.634827]},
              {"_id":"5468f7c9c894718ed43ec6e4","name":"603qm","trait1":70,"trait2":65,"trait3":43,"trait4":25,"trait5":90,"size":50,"location":[49.875658, 8.659399]},
              {"_id":"5468f7d8c894718ed43ec6e5","name":"Cocoon","trait1":57,"trait2":41,"trait3":68,"trait4":71,"trait5":29,"size":50,"location":[50.121589, 8.750994]},
              {"_id":"5468f7e0c894718ed43ec6e6","name":"Europalace","trait1":10,"trait2":15,"trait3":20,"trait4":25,"trait5":30,"size":72,"location":[50.030097, 8.276974]},
              {"_id":"5468f7e8c894718ed43ec6e7","name":"Herkules","trait1":1.2,"trait2":2,"trait3":1.4,"trait4":2,"trait5":2,"size":2.8,"location":[49.874208, 8.651297]}];

var userdb = [{"_id":"5468b061f2d53f3eb0a57783","name":"Dennis B.","trait1":45.120000000000005,"trait2":31.159999999999993,"trait3":84.50000000000001,"trait4":53.48000000000002,"trait5":81.79999999999998,"size":20,"location":[49.876808, 8.652638]},
              {"_id":"5468b1a21e2d28ad26730282","name":"Paul","trait1":22.7,"trait2":88.8,"trait3":74.92,"trait4":51.44000000000002,"trait5":24.5,"size":42.4,"location":[49.888381, 8.621299]},
              {"_id":"5468f64fc894718ed43ec6de","name":"Dieter","trait1":99.6,"trait2":49.2,"trait3":19.6,"trait4":49.2,"trait5":49.2,"size":89.2,"location":[50.123194, 8.673273]},
              {"_id":"5468f685c894718ed43ec6df","name":"Manfred","trait1":10,"trait2":10,"trait3":10,"trait4":10,"trait5":10,"size":10,"location":[50.286682, 8.316217]}];


// Join table
var checkdb = [{
	c_id: "5460a5b04c310a4c1edfe4ac",
	u_id: "5468b061f2d53f3eb0a57783",
	timestamp: "01.12.2014",
	counter: 5
},{
	c_id: "5468f71ec894718ed43ec6e0",
	u_id: "5468b1a21e2d28ad26730282",
	timestamp: "01.12.2014",
	counter: 5
},{
	c_id: "5460a5b04c310a4c1edfe4ac",
	u_id: "5468b1a21e2d28ad26730282",
	timestamp: "01.12.2014",
	counter: 5
}];

var searchInDatabase = function(id, idvalue, id2, id2value, struct){
	var data;
	for(var i = 0; i < struct.length; i++){
		if(id2 == ''){
			if(struct[i][id] == idvalue){
				data = struct[i];
				break;
			}
		} else {
			if(struct[i][id] == idvalue && struct[i][id2] == id2value){
				data = struct[i];
				break;
			}
		}
	}

	if(typeof data === typeof undefined){
		data = {};	
	} 

	return data;
}

console.log('join ----------------------------------------------------');
console.log(searchInDatabase('c_id', ajaxData.clubid, 'u_id', ajaxData.userid, checkdb));
console.log('clubdb ----------------------------------------------------');
console.log(searchInDatabase('_id', ajaxData.clubid, '', '', clubdb));
console.log('userdb ----------------------------------------------------');
console.log(searchInDatabase('_id', ajaxData.userid, '', '', userdb));
