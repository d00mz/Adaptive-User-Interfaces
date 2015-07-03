// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.contrib.ui.tinderCards','geolocation'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  /*.state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })*/

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-update', {
    url: '/account/update',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account-update.html',
        controller: 'AccountCtrl'
      }
    }
  })



 .state('tab.clubliste', {
      url: '/list',
      views: {
        'tab-list': {
          templateUrl: 'templates/tab-list.html',
          controller: 'ClublistCtrl'
        }
      }
    })
    .state('tab.clubliste-detail', {
      url: '/list/:clubId',
      views: {
        'tab-list': {
          templateUrl: 'templates/radar-detail.html',
          controller: 'RadarDetailCtrl'
        }
      }
    })
  .state('tab.radar', {
      url: '/radar',
      views: {
        'tab-radar': {
          templateUrl: 'templates/tab-radar.html',
          controller: 'RadarCtrl'
        }
      }
    })
    .state('tab.radar-detail', {
      url: '/radar/:clubId',
      views: {
        'tab-radar': {
          templateUrl: 'templates/radar-detail.html',
          controller: 'RadarDetailCtrl'
        }
      }
    })


    .state('tab.cards', {
      url: '/cards',
      views: {
        'tab-cards': {
          templateUrl: 'templates/tab-cards.html',
          controller: 'CardsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/cards');

});
