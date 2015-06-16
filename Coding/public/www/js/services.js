angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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


.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
});
