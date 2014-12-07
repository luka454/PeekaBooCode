 var peeka = angular.module('peeka', ["ui.router"])

peeka.controller('editorCtrl', function($scope){
    
    this.preCode = "int i = 0; int i = 1;";
    this.codeTxt = "";
    this.output = "";
    this.compiler = (function(c)
      {
        codeTxt = c;
        unirest.post('https://ideas2it-hackerearth.p.mashape.com/compile/')
        .headers({ "X-Mashape-Key": "SE3c7iMEE8mshWarFBV6EqgmXjDDp19YotPjsnAJmpppoKJu0L", "Content-Type": "application/x-www-form-urlencoded" })
        .send({ "async": 0, "client_secret": "ceaf93f10f7330318aecc742f76bda4fae74b12e", 
          "lang": "C", "memory_limit": 262144, "source":"int main() {" + preCode + codeTxt + "return i;}", "time_limit": 10})
        .end(function (response) {
        if(response.compile_status === "OK" && errors.length === 0)
         {
          output = response.output;
          return output;
         }  
        else
        return null;
      });
    
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
    .state('levelOne.list', {
      url: "/list",
      templateUrl: "views/levelOne.list.html",
      controller: function($scope) {
        $scope.items = ["A", "Set", "Of", "Things"];
      }
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
