// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })
  .state('app.orders', {
    url: '/orders',
    views: {
      'menuContent': {
        templateUrl: 'templates/orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })

  .state('app.new_order', {
    url: '/new_order',
    views: {
      'menuContent': {
        templateUrl: 'templates/new_order.html',
        controller: 'NewOrderCtrl'
      }
    }
  })

  .state('app.create_order', {
    url: '/create_order',
    views: {
      'menuContent': {
        templateUrl: 'templates/new_order.html',
        controller: 'CreateOrderCtrl'
      }
    }
  })
  .state('app.show_order', {
    url: '/orders/:order_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/show_order.html',
        controller: 'ShowOrderCtrl'
      }
    }
  })
  .state('app.show_order_requests', {
    url: '/orders/:order_id/requests',
    views: {
      'menuContent': {
        templateUrl: 'templates/show_order_requests.html',
        controller: 'ShowOrderRequestsCtrl'
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/orders');
});
