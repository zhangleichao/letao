$(function () {

    // 以下三句话用来控制台构建假数据
    // var arr = ['zs','ls','ww']
    // var jsonStr = JSON.stringify(arr)
    // localStorage.setItem('search_list',jsonStr)

    // 功能分析
    // 1. 获取所有搜索历史, 完成渲染
    // 2. 删除单个搜索历史
    // 3. 清空所有搜索历史
    // 4. 添加单个搜索历史


    /** 
     *  功能1：渲染功能
     *  1.获取本地历史，得到jsonstr
     *  2.将jsonstr转成数组
     *  3.根据模板引擎渲染
     * 
     * */
    // 进来先渲染一下
    render()

    // 封装一个获取本地数组的方法
    function getArr() {
        // 获取json格式的字符串 
        var jsonstr = localStorage.getItem('search_list') || '[]'
        // 转成数组
        var arr = JSON.parse(jsonstr)
        // 返回数组
        return arr
    }

    function render() {
        // 
        var arr = getArr()
        // 利用模板引擎渲染
        var htmlStr = template('historyTmp', {
            list: arr
        })
        $('.lt_history').html(htmlStr)
    }

    /** 
     * 功能2: 清空记录
     * 1.点击清空记录按钮，
     * 2.利用removeItem删除search_list
     * 3.重新渲染
     */
    $('.lt_history').on('click', '.btn-empty', function () {
        // 添加确认框
        mui.confirm('你确认要清空历史记录吗', '温馨提示', ['取消', '确认'], function (e) {
            //  e.index 就是点击的按钮的下标
            if (e.index === 1) {
                localStorage.removeItem('search_list')
                // 从新渲染
                render()
            }
        })
    })

    /*
     * 功能3: 删除单个记录
     * (1) 给所有的删除按钮添加点击事件 (事件委托)
     * (2) 获取数组, 根据下标, 将数组对应项删除
     * (3) 将数组转成 jsonStr, 存储到本地
     * (4) 重新渲染
     * */
    $('.lt_history').on('click', '.btn-del', function () {
        // 获取数组
        var arr = getArr()
        // 获取下标
        var index = $(this).data('index')
        // 根据下标删除对应项
        arr.splice(index, 1)
        // 将数组转化成jsonstr存储到本地
        var jsonStr = JSON.stringify(arr)
        // 出粗到本地
        localStorage.setItem('search_list', jsonStr)
        // 重新渲染
        render()
    })

    /*
     * 功能4: 添加单个历史记录
     * (1) 给搜索按钮, 添加点击事件
     * (2) 获取搜索关键字
     * (3) 获取数组, 往数组最前面追加  unshift
     * (4) 转成 jsonStr, 存储到本地存储中
     * (5) 重新渲染
     * */
    // 给搜索按钮添加点击事件
    $('.search_btn').click(function () {  
        // 获取搜索关键字
        var key = $('.search-input').val()

        // 判断
        if(key === '') {
            // 提示关键字不能为空
            mui.toast('关键字不能为空')
            return
        }

        // 获取数组
        var arr = getArr()

        // 1.如果有重复项，现将重的删除，在添加到最前面
        if(arr.indexOf(key) !== -1) {
            arr.splice(arr.indexOf(key),1)
        }
        // 2.如果数组长度超过10个，删除最后一个
        if(arr.length >= 10) {
            arr.pop()
        }

        // 王数组最前面添加
        arr.unshift(key)
        // 转成jsonstr，存储到本地中
        var jsonStr = JSON.stringify(arr)
        localStorage.setItem('search_list',jsonStr)
        // 重新渲染
        render()
        // 重置input
        $('.search-input').val('')

        // 跳转页面，并将搜索关键字传过去
        location.href = "searchList.html?key=" + key
    })


})