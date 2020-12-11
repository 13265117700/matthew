// pages/ship/deliver/deliver.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        choiceShipIndex:'',
        shipSelection:{
            title:'选择船舶',
            placeholder:'请选择船舶',
            list:[{
                type:1,
                label:'粤珠海货 123456'
            },{
                type:2,
                label:'粤海南货 888888'
            },{
                type:3,
                label:'粤上东货 326514'
            },{
                type:4,
                label:'粤清远货 123123'
            }],
            type:'picker',
            rangekey:'label'
        },
        show:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    handShipSelection(event){
        console.log(event)
    },
    handAirport(){
        this.setData({
            show:true
        })
    }
})