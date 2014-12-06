 var peeka = angular.module('peeka', ["ui.router"])

peeka.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /levelOne
  $urlRouterProvider.otherwise("/levelOne");
  //
  // Now set up the states
  $stateProvider
    .state('levelOne', {
      url: "/levelOne",
      templateUrl: "views/levelOne.html"
    })
    .state('levelOne.list', {
      url: "/list",
      templateUrl: "views/levelOne.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('levelTwo', {
      url: "/levelTwo",
      templateUrl: "views/levelTwo.html"
    })
    .state('levelTwo.list', {
      url: "/list",
      templateUrl: "views/levelTwo.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});