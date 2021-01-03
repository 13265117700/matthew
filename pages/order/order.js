// views/UserOrderList/UserOrderList.js
Page({
    data: {
        tabsActive:1,
        tabs:[{
            title:'待确认信息',
            status:1
        },{
            title:'运输中',
            status:3
        },{
            title:'确认订单金额',
            status:4
        },{
            title:'订单完成',
            status:6
        },{
            title:'售后中',
            status:7
        },{
            title:'已取消',
            status:8
        }],
        orderBtu:[{
            title:'发起申诉',
            type:'default',
            show:true,
            state:1,//按钮状态
        },{
            title:'查看合同',
            type:'default',
            show:true,
            state:2,//按钮状态
        },{
            title:'发起聊天',
            type:'default',
            show:true,
            state:3,//按钮状态
        },{
            title:'船到装货港',
            type:'danger',
            show:true,
            state:4,//按钮状态
        },{
            title:'确认价格',
            type:'default',
            show:false,
            state:5,//按钮状态
        },{
            title:'售后中',
            type:'default',
            show:false,
            state:6,//按钮状态
        },{
            title:'评价',
            type:'default',
            show:false,
            state:7,//按钮状态
        },{
            title:'删除订单',
            type:'default',
            show:false,
            state:8,//按钮状态
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    onShow: function () {

    },
    tabsOnChange(e){
        console.log(e)
    }
})