$(function () {

    // currentPage 当前页
    var currentPage = 1
    // pageSize 条数
    var pageSize = 5

    var currentId;
    var isDelete;
    // 一进页面先渲染
    render()

    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                $('.lt_main .tbody').html(template('tmp', info))

                // 动态创建分页，在ajax请求回来之后渲染
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage, // 当前页
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        // 重新渲染
                        render()
                    }
                })
            }
        })
    }

    // 
    $('tbody').on('click', '.btn', function () {
        $('#statusModal').modal('show')
        // 获取id
        currentId = $(this).parent().data('id')
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1
        console.log(currentId,isDelete);
    })

    // 模态框确认按钮被点击, 应该发送ajax, 进行修改用户状态
    $('#confirmBtn').click(function () {  
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {  
                console.log(info);
                // 关闭模态框
                $('#statusModal').modal('hide')
                // 重新渲染
                render()
            }
        })
    })

})