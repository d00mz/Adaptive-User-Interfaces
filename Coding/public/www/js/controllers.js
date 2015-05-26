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
				title: clubs[i].name
			});

			google.maps.event.addListener(marker[i], 'click', function(e) {
				console.log($location);
				
				$rootScope.$apply(function() {
					$location.path('/tab/radar/5468f71ec894718ed43ec6e0');
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


.controller('RadarDetailCtrl', function($scope, $stateParams, Clubs) {
  $scope.club = Clubs.get($stateParams.clubId);
});
