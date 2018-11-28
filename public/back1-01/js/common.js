
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

$(function () {  
    // 1.左侧二级菜单切换
    $('.category').on('click',function () {  
        $(this).next().stop().slideToggle()
    })

    // 2.左侧侧边栏切换
    $('.icon-left').on('click',function () {  
        $('.lt_aside').toggleClass('hidemenu')
        $('.lt_toolbar').toggleClass('hidemenu')
        $('.lt_main').toggleClass('hidemenu')
    })

    // 3.退出登录功能
    $('.icon-right').on('click',function () {  
        $('#logoutModal').modal('show')
    })

    // 点击模态框汇中的退出按钮
    $('.logoutBtn').on('click',function () {  
        // 发送ajax请求
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            dataType: 'json',
            success: function (info) {  
                // console.log(info);
                if(info.success) {
                    location.href = 'login.html'
                }
            }
        })
    })
})
