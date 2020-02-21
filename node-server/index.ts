#!/usr/bin/env node
const program = require("commander");
const pkg = require("./package.json");
program.version(pkg.version);

let cacheTime = 31536000;

program.option("-c, --cache", "set Cache-Control time longer(day)");
const argv = parseInt(process.argv[3]);
if (process.argv[2] === "-c" && parseInt(process.argv[3]) >= 0) {
  cacheTime = argv * 24 * 3600;
}
program.parse(process.argv);

import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public");

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request;

  if (method !== "GET") {
    response.statusCode = 405;
    response.end("该页面为静态页面，不支持此操作！");
    return;
  }

  const { pathname, search } = url.parse(path);
  let filename = pathname.slice(1);
  if (filename === "") {
    filename = "index.html";
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, "404.html"), (error, data) => {
          response.end(data);
        });
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.end("您未获授权，无法查看此网页。");
      } else {
        response.statusCode = 500;
        response.end("服务器繁忙");
      }
    } else {
      response.setHeader("Cache-Control", `public, max-age=${cacheTime}`);
      response.end(data);
    }
  });
});

server.listen(8888, () => {
  console.log(server.address());
});
