$(function () {

    var currentPage = 1
    var pageSize = 5

    // 专门用于存储所有提交的图片
    var picArr = []

    render()

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('tbody').html(template('productTmp', info))

                // 初始化分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        dataType: 'json'
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }

    // 2.点击添加商品按钮,显示模态框
    $('#addBtn').click(function () {
        $('#addModal').modal('show')

        // 同时渲染下拉框的数据
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.dropdown-menu').html(template('dropdown2', info))
            }
        })
    })

    // 3.点击下拉框，给button赋值
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text()
        $('.dropdownTxt').text(txt)

        // 获取id
        var id = $(this).data('id')
        $('[name="brandId"]').val(id)

        // 修改button状态
        $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    // 4.配置文件上传插件
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data.result);
            var picObj = data.result
            // 把上传的图片对象添加到数组中
            picArr.unshift(picObj)
            console.log(picArr);
            // 获取图片地址
            var picSrc = picObj.picAddr

            // 赋值给隐藏域 显示
            $('#imgBox').prepend('<img src="' + picSrc + '" style="width: 100px">')

            // 判断，如果图片超过三张了，删除最后一张
            if (picArr.length > 3) {
                picArr.pop()
                // 表单渲染的最后一张图片也要删除
                $('#imgBox img:last-of-type').remove()
            }

            // 修改图片状态 ，如果超过3张就修改
            if(picArr.length == 3) {
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
            }
        }
    })

    // 5.表单校验
    $('#form').bootstrapValidator({
        // 重置排除项, 都校验, 不排除
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        // 校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    regexg: {
                        regexg: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请至少上传三张图片'
                    }
                }
            }
        }
    })

    // 6.注册校验成功事件
    $('#form').on('success.form.bv',function (e) {  
        e.preventDefault();
        // 发送ajax
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {  
                $('#addModal').modal('hide')
                console.log(info);
                currentPage = 1
                render()

                // 重置状态
                $('#form').data('bootstrapValidator').resetForm(true)
                // 手动修改状态
                $('.dropdownTxt').text('请选择二级分类')
                $('#imgBox').remove()
                picArr = []
            }
        })
    })

})