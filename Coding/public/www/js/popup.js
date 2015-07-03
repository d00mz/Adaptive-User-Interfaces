angular.module('starter.popup', [])

<script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script type="text/javascript">
  google.load("search", "1");
  google.load("jquery", "1.4.2");
  google.load("jqueryui", "1.7.2");
</script>

navigator.geolocation.getCurrentPosition(GetLocation);
function GetLocation(location) {
    alert(location.coords.latitude);
    alert(location.coords.longitude);
    alert(location.coords.accuracy);
}


<script type="text/javascript" src="controllers.js"></script>
<script type="text/javascript" src="services.js"></script>




function initialize();




.factory('Clubs', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var clubs = [{"_id":"5460a5b04c310a4c1edfe4ac","name":"U60311","trait1":45.66999999999999,"trait2":30.630000000000006,"trait3":82.71000000000004,"trait4":51.36,"trait5":75.85999999999999,"size":40.58,"__v":0,"location":[50.112307, 8.677159]},
              {"_id":"5468f71ec894718ed43ec6e0","name":"Nova","trait1":10,"trait2":10,"trait3":10,"trait4":10,"trait5":10,"size":10,"location":[49.872059, 8.657098]},
              {"_id":"5468f731c894718ed43ec6e1","name":"Huckebein","trait1":25,"trait2":15,"trait3":80,"trait4":30,"trait5":5,"size":7,"location":[49.858237, 8.646726]},
              {"_id":"5468f739c894718ed43ec6e2","name":"Natrix","trait1":100,"trait2":87,"trait3":83,"trait4":78,"trait5":50,"size":99,"location":[49.879815, 8.630912]},
              {"_id":"5468f743c894718ed43ec6e3","name":"Musikpark","trait1":7,"trait2":37,"trait3":29,"trait4":40,"trait5":10,"size":80,"location":[49.886283, 8.634827]},
              {"_id":"5468f7c9c894718ed43ec6e4","name":"603qm","trait1":70,"trait2":65,"trait3":43,"trait4":25,"trait5":90,"size":50,"location":[49.875658, 8.659399]},
              {"_id":"5468f7d8c894718ed43ec6e5","name":"Cocoon","trait1":57,"trait2":41,"trait3":68,"trait4":71,"trait5":29,"size":50,"location":[50.121589, 8.750994]},
              {"_id":"5468f7e0c894718ed43ec6e6","name":"Europalace","trait1":10,"trait2":15,"trait3":20,"trait4":25,"trait5":30,"size":72,"location":[50.030097, 8.276974]},
              {"_id":"5468f7e8c894718ed43ec6e7","name":"Herkules","trait1":1.2,"trait2":2,"trait3":1.4,"trait4":2,"trait5":2,"size":2.8,"location":[49.874208, 8.651297]}];

  return {
    recommend: function(){
      return $http.get('/recommendation');
    },
    getDetails: function(clubId){
      return $http.get('/getdetails?id='+clubId);
    },
    // OLD
    all: function() {
      return clubs;
    },
    remove: function(club) {
      clubs.splice(clubs.indexOf(club), 1);
    },
    get: function(clubId) {
      for (var i = 0; i < clubs.length; i++) {
        if (clubs[i]._id == clubId) {
          return clubs[i];
        }
      }
      return null;
    }
  };
})









function dateAdd(date, interval, units) {
  var ret = new Date(date); //don't change original date
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units);  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units);  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units);  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}

var d1 = new Date (),
    d2 = new Date ( d1 );
d2.setMinutes ( d1.getMinutes() + 30 );
alert ( d2 );

if ((clubs == GetLocation) && ((clubs == GetLocation) > d2)){
	function(){
		var t = document.body.innerHTML;window.open('file:///C:/Users/RandomHero/Desktop/test.html',_self);document.getElementById("validator_textarea")=t;})();
}