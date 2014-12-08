var http = require('http');
var unirest = require('unirest');

        
http.createServer(function(request, response){
    response.writeHead(200);
    response.write("Dog is running.");
    
    var code = "int main() {" + "return numberofBoxes;}";
    
    setTimeout(function() {
        response.write("Lol\n");
        
        unirest.post('https://ideas2it-hackerearth.p.mashape.com/compile/')
        .headers({ "X-Mashape-Key": "SE3c7iMEE8mshWarFBV6EqgmXjDDp19YotPjsnAJmpppoKJu0L", "Content-Type": "application/x-www-form-urlencoded" })
        .send({ "async": 0, "client_secret": "ceaf93f10f7330318aecc742f76bda4fae74b12e", 
          "lang": "C", "memory_limit": 262144, "source":code, "time_limit": 2})
        .end(function (resp) {
            if(resp.compile_status === "OK" && errors.length === 0){
              this.output = resp.output;
              if(parseInt(this.output) < 5)
                this.htmlCode += "//You are doing well! Keep on it! We need just a little bit more of boxes!";
              else if(parseInt(this.output) === 5)
                this.htmlCode += "//You did it! Enough of boxes! Now you can take PeekaBoo Yellow to the other side! Way to go!";
              response.write("Proslo\n");
              //response.write(this.output);
            }  else 
            response.write("Nije\n");
          //  else
            //    response.write("Nista");
        }); //end of .end(function..
        
        //response.end();
    }, 11000);
}).listen(8080);

console.log("listening 8080...");