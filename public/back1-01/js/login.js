$(function () {
    /*
     * 1. 进行表单校验配置
     *    校验要求:
     *        (1) 用户名不能为空, 长度为2-6位
     *        (2) 密码不能为空, 长度为6-12位
     * */

    $('#form').bootstrapValidator({

        // 配置检验字段 （给input设置name值）
        fields: {
            // 用户名检验
            username: {
                // 检验规则
                validators: {
                    // 非空检验
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    // 长度检验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须是2-6位'
                    },
                    // callback 专门用来设置回调信息
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },

            // 密码检验
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码必须是6-12位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    })

    /*
     * 2. 校验成功后, 会触发一个事件, 表单校验成功事件
     *    默认是会提交表单的, 页面就跳转了,
     *    我们需要注册表单校验成功事件, 在成功事件中, 阻止默认的提交, 通过 ajax 提交
     * */

    $('#form').on('success.form.bv',function (e) {  
        // 阻止表单的默认提交
        e.preventDefault();
        // console.log('表单默认提交被阻止了');

        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {  
                // console.log(info);

                if(info.error === 1000) {
                    // alert(info.message);
                    // 设置input的状态
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                    return
                }
                if(info.error === 1001) {
                    // alert(info.message)
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                    return
                }
                if(info.success) {
                    location.href = 'index.html'
                }
            }
        })
    })

    // 3.重置功能
    $('[type="reset"]').on('click',function () {  
        $('#form').data('bootstrapValidator').resetForm()
    })

})