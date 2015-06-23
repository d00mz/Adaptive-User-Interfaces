angular.module('starter.positionscheck', [])

var float longitude_User = 52.3;
var float latitude_User = 45.6;

var float longitude_Club = 52.3;
var float latitude_Club = 45.6;

var isInClub;

function positionCheck() {
	if (longitude_User == longitude_Club && latitude_User == latitude_Club){
		isInClub == true;
		confirm("true");
	}
	else{
		isInClub == false;
		confirm("false");
	}
}

positionCheck();

function positionCheck2() {
	if (isInClub == true) {
		for (var stayed = isInClub.length + 1; stayed >= 0; stayed++) {
			isInClub[stayed]
		};
	}else{
		stayed = 0;
	}
};
/*function checkPos(){
      if(cl_seconds >= 5){
        alert("Aw Yeah!");
      }
    }*/