$(function () {

    // currentPage 当前页
    var currentPage = 1
    // pageSize 条数
    var pageSize = 5
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
            }
        })
    }
})