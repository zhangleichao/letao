$(function () {
    var currentPage = 1
    var pageSize = 5

    render()

    // 1.进来就发送ajax
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('secondTmp', info)
                $('tbody').html(htmlStr)

                // 在请求数据回来初始化分页
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

    // 2.点击分类按钮，显示模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show')

        // 在点击分类按钮的同时，就应该把下拉框的数据渲染好啊
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);

                var htmlStr = template('dropdown1', info)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    // 3. 给下拉列表的 a 添加点击事件(通过事件委托实现)
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text()
        // 赋值给dropdownTxt
        $('.dropdownTxt').text(txt)

        // 获取id
        var id = $(this).data('id')
        // 赋值给隐藏域
        $('[name="categoryId"]').val(id)

        // 赋值之后更改input的状态
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
    })

    // 4.图片上传预览
    $('#fileupload').fileupload({
        dataType: 'json',
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            var picUrl = data.result.picAddr

            // 赋值给图片的src地址
            $('#imgBox img').attr('src', picUrl)

            // 赋值给隐藏域图片地址
            $('[name="brandLogo"]').val(picUrl)

            // 更改状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    })

    // 5.设置表单检验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 3.检验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请输入一级目录'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级目录名'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    })

    // 6.注册表单校验成功事件
    $('#form').on('success.form.bv',function (e) {  
        // 阻止默认
        e.preventDefault();
        // 发送ajax
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {  
                // console.log(info);
                if(info.success) {
                    // 关闭模态框
                    $('#addModal').modal('hide')
                    // 重新渲染
                    render()

                    // 重置表单
                    $('#form').data('bootstrapValidator').resetForm(true)
                    // 需手动设置下拉框和图片的初始状态
                    $('.dropdownTxt').text('请选择一级分类')
                    $('#imgBox img').attr('src','./images/none.png')
                }
            }
        })
    })

})