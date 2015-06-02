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

.controller('RadarCtrl', function($scope, Clubs, $ionicLoading, $compile, $rootScope, $location) {
	$scope.clubs = Clubs.all();
	console.log($scope.clubs,$scope.clubs.length);

	$scope.remove = function(chat) {
		Chats.remove(chat);
	}

	function initialize() {
		console.log('init map');
		var myLatlng = new google.maps.LatLng(49.8856009,8.6566082);

		var mapOptions = {
			center: myLatlng,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
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
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq.jpeg' },
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  // Funktionen die Getriggert werden, wenn Karte nach links oder rechts gezogen wurde
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
  	// Karte wurde final nach links oder rechts gezogen
  	console.log('card weggeschmissen', index);

    $scope.cards.splice(index, 1);
  };
});
