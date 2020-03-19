var http = require("http");
 
http.createServer(function(request, response){
     
    console.log("Url: " + request.url);
    console.log("Тип запроса: " + request.method);
    console.log("User-Agent: " + request.headers["user-agent"]);
    console.log("Все заголовки");
    console.log(request.headers);
     
    response.end();
}).listen(3000);