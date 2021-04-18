myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            console.log('请求响应都完成了')

            if (request.status >= 200 && request.status < 300) {
                console.log('success')
                console.log(typeof request.responseText)
                console.log(request.responseText)
                let string = request.responseText
                // 把符合 JSON 语法的字符串转换成 JS 对应的值
                let object = window.JSON.parse(string)
                // JSON.parse 是浏览器提供的
                console.log(object)
                console.log(object.note)
                //响应值在300-400之间浏览器会重新发送请求
            } else if (request.status >= 400) {
                console.log('fail')
            }

        }
    }
    //初始化请求，参数为:method,url,async(异步状态下才是AJAX),user,password(后三个参数一般默认)
    request.open('GET', 'http://jack.com:8002/ada')
    request.send()
})