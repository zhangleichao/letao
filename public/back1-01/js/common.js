
// 进度条基本使用
// 开启进度条
// NProgress.start();
// NProgress.start();

// NProgress.done();

// 需求:
// 第一个ajax发送的时候, 开启进度条
// 等待所有的ajax都完成后, 关闭进度条

// ajax全局事件

// .ajaxComplete()  每个ajax 完成时调用 (不管成功还是失败)
// .ajaxSuccess()   每个ajax 只要成功了就会调用
// .ajaxError()     每个ajax 只要失败了就会调用
// .ajaxSend()      在每个ajax 发送前调用

// .ajaxStart()     在第一个ajax请求开始时调用
// .ajaxStop()      在所有的ajax请求都完成时调用
$(document).ajaxStart(function () {  
    NProgress.start()
})

$(document).ajaxStop(function () {  
    setTimeout(function () {  
        NProgress.done()
    },1000)
})
