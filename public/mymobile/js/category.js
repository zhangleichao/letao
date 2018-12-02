$(function () {  

    // 1.渲染左侧导航
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        dataType: 'json',
        success: function (info) {  
            console.log(info);
            $('.lt_category_left ul').html( template('navTmp',info) )

            // 取得第一个一级分类的 id, 完成所对应二级分类的数据渲染
            renderById( info.rows[0].id )
        }
    })

    // 2.给左侧导航注册点击事件
    $('.lt_category_left ul').on('click','a',function () {  
        // 高亮自己
        $('.lt_category_left ul a').removeClass('active')
        $(this).addClass('active')
        // 获取id
        var id = $(this).data('id')
        renderById(id)
    })
    
    // 注册一个右侧渲染的函数
    function renderById(id) {  
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (info) {  
                console.log(info);
                $('.lt_category_right ul').html( template('proTmp',info) )
            }
        })
    }

})