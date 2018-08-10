myButton.addEventListener('click', (e) => {
    let request = new XMLHttpRequest()
    //初始化请求，参数为:method,url,async(异步状态下才是AJAX),user,password(后三个参数一般默认)
    request.open('GET', '/ada')
    request.send()
})