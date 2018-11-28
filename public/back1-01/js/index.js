$(function () {

    // 左侧柱状图
    // 基于准备好的dom，初始化echarts实例
    var echartsLeft = echarts.init(document.querySelector('.echarts-left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册实例'
        },
        tooltip: {},
        legend: {
            data: ['人数', '销量'],
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 1500, 1800, 1200, 1000, 500]
        }, {
            name: '销量',
            type: 'bar',
            data: [1200, 1100, 1600, 1400, 1300, 800]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echartsLeft.setOption(option1);

    // 右侧饼图
    var echartsRight = echarts.init(document.querySelector('.echarts-right'));

    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2018年11月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
        },
        series: [{
            name: '品牌',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '新百伦'
                },
                {
                    value: 135,
                    name: '李宁'
                },
                {
                    value: 1548,
                    name: '阿迪王'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 100,
                    shadowOffsetX: 10,
                    shadowColor: 'gold'
                }
            }
        }]
    };


    // 使用刚指定的配置项和数据显示图表。
    echartsRight.setOption(option2);


    // 给父容器动态注册宽高
    // $(window).on('resize',function () {  
    //     var width = window.innerWidth;
    //     // console.log(width);
    //     $('.echarts-left').width(width * 0.48);
    //     $('.echarts-right').width(width * 0.48);
    // })
})