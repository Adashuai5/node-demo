window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}

window.jQuery.ajax = function ({url,method,body,headers,succseeFn,failFn}) {
    //给参数一个选项
    // let url
    // if(arguments.length === 1){
    //     url = options.url
    // }else if(arguments.length === 2){
    //     url = arguments[0]
    //     options = arguments[1]
    // }
    // let method = options.method
    // let body = options.body
    // let succseeFn = options.succseeFn
    // let failFn = options.failFn
    // let headers = options.headers
    
    let request = new XMLHttpRequest()
    //初始化请求
    request.open(method, url)
    for (let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                succseeFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}

window.$ = window.jQuery

myButton.addEventListener('click', (e) => {
    //以对象的形式传参数
    $.ajax({
        url: '/ada',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'ada': '18'
        },
        body: 'a=1&b=2',
        succseeFn: (x) => {
            console.log(x)
        },
        failFn: (x) => {
            console.log(x)
        }
    })
})