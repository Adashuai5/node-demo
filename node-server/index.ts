import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log("有人请求了");
  console.log(request.constructor);
  console.log(response.constructor);

  console.log(request.method);
  console.log(request.headers);
  console.log(request.url);

  const array = [];
  request.on("data", chunk => {
    array.push(chunk);
  });
  request.on("end", () => {
    let body = Buffer.concat(array).toString();
    console.log("body:", body);

    response.statusCode = 404;
    response.setHeader("X-ada", "I am ADA");
    response.write("1\n");
    response.end();
  });
});

server.listen(8888, () => {
  console.log(server.address());
});
