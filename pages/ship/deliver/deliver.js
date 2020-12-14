// pages/ship/deliver/deliver.js
import FindAll from '../../../models/ship/ship'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navbarTitle:'发布船源',
        choiceShipIndex:'',
        //选择船
        shipChooseShow:false,
        shipChooseList: [
            '粤珠海货 123456', 
            '粤海南货 888888', 
            '粤上东货 326514', 
            '粤清远货 123123', 
            '粤清远货 123123'
        ],

        //地区面包屑
        popupCrumbs:[],
        //地区列表
        popupList:[],
        popupactive:'tab1',

        ship:null,
        port:null,
        pickerDate:null,

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

    // 选择船
    handShipChooseShow(){
        this.setData({
            shipChooseShow:true
        })
    },
    onShipChoose(event){
        const { picker, value, index } = event.detail;
        console.log(picker,value,index)
    },

    // 选择港
    handAirportShow(){
        this.setData({
            portChooseShow:true
        })
    },
    portList(){
        this.setData({
            navbarTitle:'选择空船港'
        })
        let pId = 0;
        let page = 1;
        let rows = 10;
        let sortInt = 1;
        let params = {pId,page,rows,sortInt}
        FindAll.findAll(params).then(res => {
            let datas = res.data.data;
            let rows = datas.rows;
            console.log(rows)
            this.setData({
                popupList:rows
            })

            // this.setData({
            //     portChooseList:[{
            //         values:Object.values(rows),
            //         className: 'column1',
            //     },{
            //         values:rows[0].mtWharfList,
            //         className: 'column2',
            //         defaultIndex: 2,
            //     },{
            //         values:rows[0].mtWharfList[0].mtWharfList,
            //         className: 'column3',
            //         defaultIndex: 1,
            //     },{
            //         values:rows[0].mtWharfList[0].mtWharfList[0].mtWharfList,
            //         className: 'column4',
            //         defaultIndex: 1,
            //     }]
            // })
        })
    },
    handPopupPitch(event){
        console.log(event)
        this.setData({
            popupactive:event.detail.key
        })
    },

    // 点屏幕取消弹出框
    onClose(){
        this.setData({
            shipChooseShow:false,
            portChooseShow:false,
            navbarTitle:'发布船源'
        })
    }
})