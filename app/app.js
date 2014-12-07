 var peeka = angular.module('peeka', ["ui.router"])

peeka.controller('editorCtrl', function($scope){

});

peeka.controller('levelOneCtrl', function($scope){
       
    this.htmlCode = "positionBox = 0; \n //This is a place where we keep the position of the little box on the left. \n //It is equal to zero at the start \n //This is the way how 'comments' look like in C++ \n int numberOfBoxes = 0; \n //This is a place where we keep the number of boxes that we want to fall on the plank, so that it goes down \n //What do you need to do?\n"; 
    this.preCode = "int positionBox = 0; int numberOfBoxes = 0";
    this.codeTxt = "";
    this.output = "";
    this.compiler = (function(c)
      {
        this.codeTxt = c;
        unirest.post('https://ideas2it-hackerearth.p.mashape.com/compile/')
        .headers({ "X-Mashape-Key": "SE3c7iMEE8mshWarFBV6EqgmXjDDp19YotPjsnAJmpppoKJu0L", "Content-Type": "application/x-www-form-urlencoded" })
        .send({ "async": 0, "client_secret": "ceaf93f10f7330318aecc742f76bda4fae74b12e", 
          "lang": "C", "memory_limit": 262144, "source":"int main() {" + preCode + codeTxt + "return numberofBoxes;}", "time_limit": 10})
        .end(function (response) {
        if(response.compile_status === "OK" && errors.length === 0)
         {
          this.output = response.output;
          this.preCode += codeTxt;
          this.htmlCode += '\n' + codeTxt;
          if(parseInt(this.output) < 5)
            this.htmlCode += "//You are doing well! Keep on it! We need just a little bit more of boxes!";
          else if(parseInt(this.output) = 5)
            this.htmlCode += "//You did it! Enough of boxes! Now you can take your own box to the other side! Way to go!";
          return this.output;
         }  
        else
        return null;
      });
      }

    this.addBoxes = (function(){
       unirest.post('https://ideas2it-hackerearth.p.mashape.com/compile/')
        .headers({ "X-Mashape-Key": "SE3c7iMEE8mshWarFBV6EqgmXjDDp19YotPjsnAJmpppoKJu0L", "Content-Type": "application/x-www-form-urlencoded" })
        .send({ "async": 0, "client_secret": "ceaf93f10f7330318aecc742f76bda4fae74b12e", 
          "lang": "C", "memory_limit": 262144, "source":"int main() {" + preCode + "numberofBoxes++;" + "return numberofBoxes;}", "time_limit": 10})
        .end(function (response) {
        if(response.compile_status === "OK" && errors.length === 0)
         {
          this.output = response.output;
          this.preCode += codeTxt;
          this.htmlCode += '\n' + codeTxt;
          if(parseInt(this.output) < 5)
            this.htmlCode += "//You are doing well! Keep on it! We need just a little bit more of boxes!";
          else if(parseInt(this.output) = 5)
            this.htmlCode += "//You did it! Enough of boxes! Now you can take your own box to the other side! Way to go!";
          return this.output;
         }  
        else
        return null;
    });
         }
}

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
