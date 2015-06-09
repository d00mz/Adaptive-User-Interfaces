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

.controller('RadarCtrl', function($scope, Clubs, $ionicLoading, $compile, $rootScope, $location, $http, $stateParams) {
	$scope.clubs = Clubs.all();

	$http.get('/getdetails?id='+$stateParams.clubId).
	success(function(data, status, headers, config) {
		console.log(data);
	}).
	error(function(data, status, headers, config) {
	
	});



	console.log($scope.clubs,$scope.clubs.length);

	$scope.remove = function(chat) {
		Chats.remove(chat);
	}

	//Map Style

	var style = [
	{
	  	"stylers": [{
	    	"color": "#15151B"
	  }]
	},
	{
	  	"featureType": "water",
	  	"stylers": [{
	    	"color": "#50557F"
	  }]
	},
	{
	  	"elementType": "labels",
	  	"stylers": [{
	    	"visibility": "off"
	},
	{
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on",
                "color": "#50557F"
            }
        ]
    },
    {
        "featureType": "road",
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
        "elementType": "geometry",
        "stylers": [
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
    }

	  ]
	}];

	function initialize() {
		console.log('init map');
		var myLatlng = new google.maps.LatLng(49.8856009,8.6566082);

		var mapOptions = {
			center: myLatlng,
			zoom: 12,
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


		for (var i = 0; i < clubs.length; i++){
			console.log(clubs[i]);

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
			// 	$rootScope.$apply(function() {
			// 		$location.path('/tab/account');
			// 	});
			// });
		}

		$scope.map = map;
	}

	initialize();


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


})



.controller('ClublistCtrl', function($scope, Clubs, $ionicLoading, $compile) {
	$scope.clubs = Clubs.all();
})


.controller('RadarDetailCtrl', function($scope, $stateParams, $http, Clubs) {
  $scope.club = Clubs.get($stateParams.clubId);
  $http.get('/getdetails?id='+$stateParams.clubId).
  success(function(data, status, headers, config) {
  	console.log(data);
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
})


.controller('CardsCtrl', function($scope, TDCardDelegate) {
  //console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'http://img.dummy-image-generator.com/buildings/dummy-300x300-NYSkyline-plain.jpg' },
    { image: 'http://img.dummy-image-generator.com/buildings/dummy-300x300-HongKongSkyline-plain.jpg' },
    { image: 'http://img.dummy-image-generator.com/buildings/dummy-300x300-Hannover-plain.jpg' },
    { image: 'http://img.dummy-image-generator.com/buildings/dummy-300x300-City-plain.jpg' },
    { image: 'http://img.dummy-image-generator.com/buildings/dummy-300x300-Stadium-plain.jpg' }
  ];

  $scope.currentCardSrc = cardTypes[0].image;

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
     $scope.currentCardSrc = newCard.image;
  }

  // Funktionen die Getriggert werden, wenn Karte nach links oder rechts gezogen wurde
  $scope.cardSwipedLeft = function(index) {
    //console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
   // console.log('RIGHT SWIPE');
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
  	// Karte wurde final nach links oder rechts gezogen
  	//console.log('card weggeschmissen', index);

    $scope.cards.splice(index, 1);
  };
});