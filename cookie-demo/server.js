var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('含查询字符串的路径\n' + pathWithQuery)
    if (path === '/') {
        let string = fs.readFileSync('./index.html', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/sign_up' && method === 'GET') {
        let string = fs.readFileSync('./sign_up.html', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/sign_up' && method === 'POST') {
        readBody(request).then((body) => {
            let strings = body.split('&') // ['email=11','password=12','password_confirmation=2']
            let hash = {}
            strings.forEach((string) => { // string === 'email=11'
                let parts = string.split('=') // ['email','11']
                let key = parts[0]
                let value = parts[1]
                hash[key] = value // hash['email'] = '1'
            })
            let { email, password, password_confirmation } = hash
            if(email.indexOf('@') === -1){
                response.statusCode = 400
                response.setHeader('Content-Type', 'application/json; charset=utf-8')
                response.write(`{
                    "errors": {
                        "email": "invalid"
                    }
                }`)
            }else if(password !== password_confirmation){
                response.statusCode = 400
                response.write('password not match')                
            }else {
                response.statusCode = 200
            }
            response.end()
        })
    }
    //注意这里是 /main.js 而不是 ./main.js，因为HTTP请求永远是绝对路径
    else if (path === '/main.js') {
        let string = fs.readFileSync('./main.js', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/ada') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json; charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', '*')
        //变XML为JSON，key和value都可以替换成自己喜欢的
        response.write(`
        {
            "note":{
              "to":"reader",
              "from":"Ada",
              "heading":"greet",
              "content":"hello word!"
            }
        }`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        //注意这边不能是(string)
        response.write('找不到服务器')
        response.end()
    }





    /******** 代码结束，下面不要看 ************/
})

function readBody(request) {
    return new Promise((resolve, reject) => {
        let body = []
        request.on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            resolve(body)
        })
    })
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)