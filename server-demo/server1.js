//通过 require('http') 来让服务器支持HTTP协议
var http = require('http')
//创建服务器请求和响应的函数
var server = http.createServer(function(request, response){
  //设置一个2秒的计时器
  setTimeout(function(){
    //.setHeader设置文件类型编码等
    response.setHeader('Content-Type','text/html; charset=utf-8')
    //.writeHead返回状态码
    response.writeHead(404, 'Not Found')
    response.write('<html><head><meta charset="gbk" /></head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')
    response.write('</html>')
    //事件'关闭'
    response.end()
  },2000);
})

console.log('open http://localhost:8080')
//listen(端口)产生HTTP服务器监听链接
server.listen(8080)