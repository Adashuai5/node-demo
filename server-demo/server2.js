var http = require('http')
//用来读取内容
var fs = require('fs')

var server = http.createServer(function(req, res){
  try{
    //.readFileSync 用于同步读取文件:当前目录下的 hi 文件 下的 目标
    var fileContent = fs.readFileSync(__dirname + '/hi' + req.url)
    res.write(fileContent)
  }catch(e){
    res.writeHead(404, 'not found')
  }
  res.end()
})

server.listen(8080)
console.log('visit http://localhost:8080' )