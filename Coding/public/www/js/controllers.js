// var clubs = new Array();



angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
	Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
	enableFriends: true
  };
})

.controller('RadarCtrl', function($scope, Clubs, $ionicLoading, $compile, $rootScope, $location, $http, $stateParams,geolocation) {

	//$scope.clubs = Clubs.all();

	$scope.clubs = new Array();

				
	Clubs.recommend(window.localStorage.getItem('userID')).
	success(function(data, status, headers, config) {
		console.log(data,status);
		$scope.clubs = data;
		initialize();
	}).
	error(function(data, status, headers, config) {
		console.log(data,status);
	});

	/*Clubs.getDetails($stateParams.clubId).
	success(function(data, status, headers, config) {
		console.log(data);
	}).
	error(function(data, status, headers, config) {
	
	});*/



	console.log($scope.clubs,$scope.clubs.length);

	var style = [
	{
		"stylers": [{
			"color": "#15151B"
	  }]
	},
	{
	   "featureType": "road.local",
	   "elementType": "geometry.fill",
	   "stylers": [
		   {

			   "color": "#50557F"
		   }
	   ]
   },
   {
	   "featureType": "road.local",
	   "elementType": "geometry.stroke",
	   "stylers": [
		   {
				"visibility": "on",
				"color": "#50557F"
		   }
	   ]
   },
   {
	   "featureType": "road.highway",
	   "elementType": "geometry.fill",
	   "stylers": [
		   {
			   "visibility": "on",
			   "color": "#50557F"
		   }
	   ]
   },
   {
	   "featureType": "road.highway",
	   "elementType": "geometry.stroke",
	   "stylers": [
		   {
			   "visibility": "on",
			   "color": "#50557F"
		   }
	   ]
   },
   {
		"featureType": "road.arterial",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#50557F"
			},
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#50557F"
			},
			// {
			//     "lightness": 16
			// },
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [
			{
				"color": "#50557F"
			},
			{
				"visibility": "on"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
			{
				"color": "#50557F"
			},
			// {
			//     "lightness": 25
			// },
			{
				"visibility": "on"
			}
		]
	},
	]

	function initialize() {

		var input = document.getElementById('location_search');
		var autocomplete = new google.maps.places.Autocomplete(input);
		
		// console.log('init map');
		var myLatlng = new google.maps.LatLng(49.8856009,8.6566082);

		var mapOptions = {
			center: myLatlng,
			zoom: 13,
			styles: style,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			scaleControl: false,
			draggable: false
		};

		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		//Marker + infowindow + angularjs compiled ng-click
		var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
		var compiled = $compile(contentString)($scope);


		var clubs = $scope.clubs;
		var marker = new Array();
		var infowindow = new Array();


		var center_options = {
		  url: 'img/profile_dark_bg.png',
		  size: new google.maps.Size(50, 49),
		  origin: new google.maps.Point(0,0),
		  anchor: new google.maps.Point(25, 25)
		};
		
		var center_marker = new google.maps.Marker({
			position: new google.maps.LatLng(49.8856009,8.6566082),
			icon: center_options,
			map: map
		});

		google.maps.event.addListener(center_marker, 'click', function(e) {
			$rootScope.$apply(function() {
				$location.path('/tab/account');
			});
		});

		setMarkers(map, clubs);

		function setMarkers(map, clubs) { 

			for (var i = 0; i < clubs.length; i++){
				//console.log(clubs[i]);

				marker[i] = new google.maps.Marker({
					position: new google.maps.LatLng(clubs[i].location[0],clubs[i].location[1]),
					map: map,
					id: clubs[i]._id,
					title: clubs[i].name
				});

				google.maps.event.addListener(marker[i], 'click', function(e) {
					console.log($location);
					var _clubID = this.id;
					$rootScope.$apply(function() {
						$location.path('/tab/radar/' + _clubID);
					});
				});

				// google.maps.event.addListener(center, 'click', function(e) {
				// 	// $rootScope.$apply(function() {
				// 	// 	$location.path('/tab/account');
				// 	// });
				// 	console.log('center wurde geklickt!');
				// });

			}
		}
				
		$scope.map = map;
	}


	$scope.centerOnMe = function() {
		if(!$scope.map) {
			return;
		}

		$scope.loading = $ionicLoading.show({
			content: 'Getting current location...',
			showBackdrop: false
		});

		navigator.geolocation.getCurrentPosition(function(pos) {
			$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			$scope.loading.hide();
		}, function(error) {
			alert('Unable to get location: ' + error.message);
		});
	};

	$scope.clickTest = function() {
		alert('Example of infowindow with ng-click')
	};





	geolocation.getLocation().then(function(data){
     	var blabla= {lat:data.coords.latitude, long:data.coords.longitude};
     	console.log(blabla);
    });


})



.controller('ClublistCtrl', function($scope, Clubs, $ionicLoading, $compile) {
	$scope.clubs = Clubs.all();
})


.controller('RadarDetailCtrl', function($scope, $stateParams, $http, Clubs) {
	$scope.club = '';
	$http.get('/getdetails?id='+$stateParams.clubId).
	success(function(data, status, headers, config) {
		console.log(data);
		$scope.club=data;
		// this callback will be called asynchronously
		// when the response is available
	}).
	error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});
})


.controller('CardsCtrl', function($scope, $timeout, $http,$state,geolocation) {

	geolocation.getLocation().then(function(data){
     	var blabla= {lat:data.coords.latitude, long:data.coords.longitude};
     	console.log(blabla);
    });

	$scope.data = [{
		bild1: {
			src: 'img/club1.jpg',
			id: 'top',
			attribute: [100,0,0,0,0,0,0]
		},
		bild2: {
			src: 'img/club2.jpg',
			id: 'bottom',
			attribute: [0,0,0,0,0,0,0]
		},
	},{
		bild1: {
			src: 'img/club2.jpg',
			id: 'top',
			attribute: [0,100,0,0,0,0,0]
		},
		bild2: {
			src: 'img/club1.jpg',
			id: 'bottom',
			attribute: [0,0,0,0,0,0,0]
		}
	}]

	$scope.userTraits = [];

	$scope.index = 0;
	$scope.dataToDisplay = $scope.data[$scope.index];

	$("#splashscreen").delay(1250).fadeOut('slow');
	
	$scope.fadeOut = function(){
		console.log($('#infosplash'))
		$("#infosplash").fadeOut('slow');
	}

	$scope.nextPictures = function(){
		$('#or,#divideLeft,#divideRight').fadeIn('fast');
		$scope.index += 1;

		if($scope.index < $scope.data.length){
			$scope.dataToDisplay = $scope.data[$scope.index];
		} else {
			// http request raussenden & Redirect machen
			//$location.path('/tab/radar');
			

			console.log('redirect');

			$http.get('/createUser?traits=' + $scope.userTraits)
			.then(function(response) {
				console.log(response);
				window.localStorage.setItem('userID', response.data._id);
				$state.go('tab.radar');
				// success
			}, 
			function(response) { // optional
				window.localStorage.setItem('userID', '');
				// failed
			});
		}
	}

	$scope.imageHandler = function(el){
		$scope.userTraits.push(el.attribute[$scope.index]);

		console.log(el);
		if(el.id == 'top'){
			$scope.dataToDisplay.bild1.val = '100vh';
			$scope.dataToDisplay.bild2.val = '0vh';
		} else {
			$scope.dataToDisplay.bild1.val = '0vh';
			$scope.dataToDisplay.bild2.val = '100vh';
		}

		console.log($scope.dataToDisplay);

		$('#'+el.id).addClass('chosen');
		$('#or,#divideLeft,#divideRight').fadeOut('fast');
		$('#'+$scope.dataToDisplay.bild1.id).delay(150).animate( {"height": $scope.dataToDisplay.bild1.val }, 300, 'easeOutBack');
		$('#'+$scope.dataToDisplay.bild2.id).delay(150).animate( {"height": $scope.dataToDisplay.bild2.val }, 300, 'easeOutBack');
		
		$timeout(function(){
			$scope.nextPictures();	
		}, 2000);

	}

});
	

