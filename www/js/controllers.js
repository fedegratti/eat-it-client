angular.module('starter.controllers', ['ngResource'])

.config(function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.factory('Orders', function ($http) {
  return {
    all: function () {
      return $http.get('https://eat-it-server.herokuapp.com/orders.json')
    },
    new: function (order) {
      return $http.post('https://eat-it-server.herokuapp.com/orders.json', { order: {name: order.name, provider_id: order.provider} })
      //return $http.put('http://10.0.0.30:3000/orders.json', { data: {name: "asd", provider_id: "asd", description: "asd"} })
    },
    find: function(order_id) {
      return $http.get('https://eat-it-server.herokuapp.com/orders/'+order_id+'.json')
    },
    disable: function(order_id) {
      return $http.get('https://eat-it-server.herokuapp.com/orders/'+order_id+'/disable.json')
    }
  };
})
.factory('Requests', function ($http) {
  return {
    all: function (order_id) {
      return $http.get('https://eat-it-server.herokuapp.com/orders/'+order_id+'/requests.json')
    },
    new: function (order_id, request) {

      return $http.post('https://eat-it-server.herokuapp.com/orders/'+order_id+'/requests.json', { 
        request: 
          { 
            requester: request.requester, 
            comment: request.comment,
            order_id: order_id
          }})
      //return $http.put('http://10.0.0.30:3000/orders.json', { data: {name: "asd", provider_id: "asd", description: "asd"} })
    }    
  };
})

.factory('Providers', function ($http) {
  return {
    all: function () {
      return $http.get('https://eat-it-server.herokuapp.com/providers.json')
    },
    find: function(id) {
      return $http.get('https://eat-it-server.herokuapp.com/providers/'+id+'.json')
    }
  };
})

.controller('OrdersCtrl', function($scope, $state, Orders) {

  Orders.all().success(function (response) {
    $scope.orders = response;
  })

  $scope.newOrder = function () {
    $state.go("app.new_order");
  }
  
})

.controller('ShowOrderCtrl', function($scope,$state, $stateParams, Orders, Providers, Requests) {
    Orders.find($stateParams.order_id).success(function (order){
        Providers.find(order.provider_id).success(function(provider){
            $scope.order = order;
            $scope.provider  = provider;
            $scope.menu = provider.menu.match(/[^\r\n]+/g)
            

        })
    })

    $scope.showRequests = function () {
        $state.go("app.show_order_requests", {order_id: $stateParams.order_id});
    }

    $scope.createRequest = function (request) {
        Requests.new($stateParams.order_id, request).success(function()
        {
            $state.go("app.show_order_requests", {order_id: $stateParams.order_id});
        });
    }

    $scope.disableOrder = function ()
    {
        Orders.disable($stateParams.order_id).success(function (order)
        {
            $state.go("app.show_order", {order_id: $stateParams.order_id});
        })

    }
})

.controller('ShowOrderRequestsCtrl', function($scope, $stateParams, Requests) {
    Requests.all($stateParams.order_id).success(function (order_requests){
        $scope.requests = order_requests
    })

})

.controller('NewOrderCtrl', function($scope, $state, Providers, Orders) {
  Providers.all().success(function (response) {
    $scope.providers = response;
  })

  $scope.createOrder = function (order) {
    Orders.new(order).then (function() {
      $state.go("app.orders"),{};
    })
  }
})

.controller('CreateOrderCtrl', function($scope, $stateParams, Orders) {

});
