window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}

window.jQuery.ajax = function ({url,method,body,headers}) {
    return new Promise(function(resolve,reject){
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
                resolve.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                reject.call(undefined, request)
            }
        }
    }
    request.send(body)
    })
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
        }
    }).then(
        //成功后执行的代码
        (responseText)=>{console.log(responseText);return '处理成功'}, 
        //失败后执行的代码
        (request)=>{console.log(request);return '处理失败'}
      ).then(
        //上一次成功后的return
        (responseText)=>{console.log(responseText)},
        //上一次失败后的return
        (request)=>{console.log(request)}
      )
})