window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () {}
    nodes.html = function () {}
    return nodes
}

window.jQuery.ajax = function (options) {
    //给参数一个选项
    let method = options.method
    let url = options.url
    let body = options.body
    let succseeFn = options.succseeFn
    let failFn = options.failFn

    let request = new XMLHttpRequest()
    //初始化请求
    request.open(method, url)
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
        body: 'a=1&b=2',
        succseeFn: (responseText) => {
            console.log('s')
        },
        failFn: (request) => {
            console.log('f')
        }
    })
})