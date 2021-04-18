const http = require("http");
const fs = require("fs");
const qs = require("querystring");
const server = http.createServer();
server.listen(8080);

const users = [];

server.on("request", (request, response) => {
  const url = request.url;
  console.log(url);
  const path = url.substr(0, url.indexOf("?"));
  console.log(path);
  const queryString = url.substr(url.indexOf("?") + 1, url.length);
  const query = qs.parse(queryString);
  console.log(query);
  switch (path) {
    case "/user":
      switch (request.method) {
        case "GET":
          response.statusCode = 200;
          response.end(JSON.stringify(users));
          break;
        case "POST":
          const contentType = request.headers["content-type"];
          if (!contentType === "application/json") {
            response.statusCode = 400;
            response.end("error");
          }
          const requestBodyString = "";
          request.on("data", data => {
            requestBodyString += data.toString();
          });
          request.on("end", () => {
            const user = qs.parse(requestBodyString);
            users.push(user);
            response.statusCode = 200;
            response.end(JSON.stringify(users));
          });
          break;
      }
      break;
    case "/test.html":
      response.statusCode = 200;

      fs.createReadStream("../hi/index").pipe(response);
      break;
    default:
      response.statusCode = 404;
      response.end("找不到该页面");
      break;
  }
});
