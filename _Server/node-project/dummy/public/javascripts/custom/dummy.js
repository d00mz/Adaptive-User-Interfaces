// Speicher Values in Array bei click
'use strict';
var app = angular.module('dummy', []);


// Angular Database Requests
// Holt die Clubs (samt Eigenschaften) aus einem json und speichert sie für angular lesbar 
app.controller('AppCtrl', function($scope, $http) {
    $scope.values = {};

    // Erste initialisierung und funktion um sich die aktuellen Daten vom Server zu holen
    $scope.getData = function() {
        $http.get('http://localhost:3000/clubs').then(function(clubsResponse) {
            $scope.clubs = clubsResponse.data;
        });
        $http.get('http://localhost:3000/users').then(function(usersResponse) {
            $scope.users = usersResponse.data;
        });
    }

    // Funktion zum erzeugen des jeweiligen JSON's
    $scope.buildData = function() {
        var that = $('#' + this.club._id),
        club_id = that.attr("id"),
        user_id = $('.user li.active').attr('id'),
        faktor = parseInt($('.weights input[type="radio"]:checked').val());
        $scope.values = {
            "user_id": user_id,
            "club_id": club_id,
            "amount": faktor
        };
        $scope.sendData();
    };

    // Senden der Daten an den Node.js Server
    $scope.sendData = function() {
        if($scope.values.user_id != null && $scope.values.club_id != null)
        $http.put('http://localhost:3000/users', $scope.values).then(function(response) {
            $scope.getData();
        });
    };
    $scope.getData(true);

    $scope.recommendClubs = function(user){
        var traits = 5;
        var recommendation = $scope.clubs;
        console.log('requesting recommendation for ' + user.name)

        for(var item = 0; item < recommendation.length; item++){
            var diff = 0;
            for(var i = 1; i < traits; i++){
                diff += Math.abs(user['trait'+i] - recommendation[item]['trait'+i]);
            }
            diff += Math.abs(user['size'] - recommendation[item]['size']);
            recommendation[item].deviation = diff;
            console.log(recommendation[item].name + ': ' + diff);
        }

        console.log(recommendation);
        recommendation.sort(function (a, b) {
          if (a.deviation > b.deviation) {
            return 1;
          }
          if (a.deviation < b.deviation) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        console.log(recommendation);

    }
});