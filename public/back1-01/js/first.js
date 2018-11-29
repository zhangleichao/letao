$(function () {

    var currentPage = 1
    var pageSize = 5

    // 1.发送ajax请求渲染数据
    render()

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('firstTmp', info)
                $('tbody').html(htmlStr)


                // 添加分页 要在ajax请求回来时数据初始化！！！！！！！
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }

    // 2.点击添加分类按钮，显示模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show')
    })

    // 3.进行表单检验
    $('#form').bootstrapValidator({
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 检验字段
        fields: { // 要有name属性
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名'
                    }
                }
            }
        }
    })

    // 4.注册表单检验成功事件
    $('#form').on('success.form.bv',function (e) {  
        // 阻止表单默认提交
        e.preventDefault();
        
        // 发送ajax请求
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {  
                // console.log(info);
                if(info.success) {
                    // 关闭模态框
                    $('#addModal').modal('hide')
                    // 重新渲染第一页
                    currentPage = 1
                    render()

                    // 重置表单数据
                    $('#form').data('bootstrapValidator').resetForm(true)
                }
            }
        })
    })

})