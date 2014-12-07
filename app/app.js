 var peeka = angular.module('peeka', ["ui.router"])

peeka.controller('eidtorCtrl', function($scope){
    
    this.preCode = "int i = 0; int i = 1;";
    this.code = "";
    this.output;
        
});

peeka.controller('levelOneCtrl', function($scope){
        
});

peeka.controller('levelTwoCtrl', function($scope){
   
});

peeka.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /levelOne
  $urlRouterProvider.otherwise("/levelOne");
  //
  // Now set up the states
  $stateProvider
    .state('levelOne', {
      url: "/levelOne",
      templateUrl: "views/levelOne.html",
      controller: "levelOneCtrl"
    })
    .state('levelTwo', {
      url: "/levelTwo",
      templateUrl: "views/levelTwo.html",
      controller: "levelTwoCtrl"
    })
    .state('levelTwo.list', {
      url: "/list",
      templateUrl: "views/levelTwo.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});