const fs = require('fs');
const http = require('http');

http.createServer(function(request, response){
    response.writeHead(200);
    fs.readFile("/Users/Administrator/Desktop/1.txt", function(err, contents){
        response.write(contents);
        response.end();
    });
    response.write("This is ada");
    console.log(1)
}).listen(8080);