 var peeka = angular.module('peeka', ["ui.router"])

peeka.controller('editorCtrl', function($scope){

});

var controller;
peeka.controller('levelOneCtrl', function($scope){
       
    controller = this;
    this.htmlCode = " //This is the way how 'comments' look like in C++ \n int numberOfBoxes = 0; \n //It seems that integer numberOfBoxes has run out of boxes!!! \n // We should do something about it and at the same time PeekaBoo Yellow HAS to be on the other side of the world! \n "; 
    this.preCode = "int numberOfBoxes = 0";
    this.codeTxt = "";
    this.output = "";
    
    this.compiler = (function(c){
        this.codeTxt = c;
        
        var unirest = require('unirest');
        
        unirest.post('https://ideas2it-hackerearth.p.mashape.com/compile/')
        .headers({ "X-Mashape-Key": "SE3c7iMEE8mshWarFBV6EqgmXjDDp19YotPjsnAJmpppoKJu0L", "Content-Type": "application/x-www-form-urlencoded" })
        .send({ "async": 0, "client_secret": "ceaf93f10f7330318aecc742f76bda4fae74b12e", 
          "lang": "C", "memory_limit": 262144, "source":"int main() {" + preCode + codeTxt + "return numberofBoxes;}", "time_limit": 10})
        .end(function (response) {
            if(response.compile_status === "OK" && errors.length === 0){
              this.output = response.output;
              this.preCode += codeTxt;
              this.htmlCode += '\n' + codeTxt;
              if(parseInt(this.output) < 5)
                this.htmlCode += "//You are doing well! Keep on it! We need just a little bit more of boxes!";
              else if(parseInt(this.output) === 5)
                this.htmlCode += "//You did it! Enough of boxes! Now you can take PeekaBoo Yellow to the other side! Way to go!";
              return this.output;
            }  
            else
                return null;
        }); //end of .end(function..
    }); //end of this.compiler = (function(c)

    this.addBoxes = (function(){
        this.codeTxt = "numberofBoxes++;"
       
        var unirest = require('unirest');
       
        unirest.post('https://ideas2it-hackerearth.p.mashape.com/compile/')
            .headers({ "X-Mashape-Key": "SE3c7iMEE8mshWarFBV6EqgmXjDDp19YotPjsnAJmpppoKJu0L", "Content-Type": "application/x-www-form-urlencoded" })
            .send({ "async": 0, "client_secret": "ceaf93f10f7330318aecc742f76bda4fae74b12e", 
            "lang": "C", "memory_limit": 262144, "source":"int main() {" + preCode + this.codeTxt + "return numberofBoxes;}", "time_limit": 10})
            .end(function (response) {
            if(response.compile_status === "OK" && errors.length === 0)
            {
                this.output = response.output;
                this.preCode += codeTxt;
                this.htmlCode += '\n' + codeTxt;
                
                if(parseInt(this.output) < 5)
                    this.htmlCode += "//You are doing well! Keep on it! We need just a little bit more of boxes!";
                else if(parseInt(this.output) === 5)
                    this.htmlCode += "//You did it! Enough of boxes! Now you can take your own box to the other side! Way to go!";
          
                return this.output;
            }//end of if..  
            else
                return null;
        }); //end of .end(fucntion(..
    });
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
