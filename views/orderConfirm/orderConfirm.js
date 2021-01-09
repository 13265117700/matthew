import user from "../../models/user/user";
import User from "../../models/user/user";
const {
    formatTime
} = require('../../utils/util');
const App = getApp()
Page({
    data: {
        navbarTitle: '我的订单',
        userInfo: null,

        orderList: [], //订单列表
        shipOrderID: null, //船东订单ID
        cargoOrderID: null, //货主订单ID
        total: null, //订单数量
        btn: [{
            title: '发起聊天',
            show: true,
            type: 'default',
            state: 1
        }, {
            title: '同意承运',
            show: true,
            type: 'danger',
            state: 2
        }, {
            title: '发起合同',
            show: false,
            type: 'danger',
            state: 3
        }],

        // // 货主按钮
        // cargoButton: [{
        //     title: '发起聊天',
        //     cargoShow: true
        // }, {
        //     title: '发起合同',
        //     cargoShow: false
        // }],
        shipShow: false, //船东确认弹框
        cargoShow: false, //货主确认弹框
    },

    onShow: function () {
        this.getUserInfo();
        this.getUserOrderList();
        this.btnStaatus();
    },

    //获取用户
    getUserInfo() {
        let userInfo = App.globalData.userInfo;
        this.setData({
            userInfo,
            navbarTitle: '任务订单确认'
        })
    },
    //获取订单列表
    getUserOrderList() {
        let userInfo = this.data.userInfo;
        let Authorization = wx.getStorageSync('Authorization');
        let identity = 1;
        if (userInfo.cargo === true) {
            identity = 2
        }
        console.log(identity)
        let params = {
            Authorization,
            identity,
            page: 1,
            rows: 10,
            status: 0
        };
        User.UserOrderQueryList(params).then(res => {
            let rows = res.data.data;
            rows.rows.forEach(data => {
                let loadingDate = new Date(data.mtCargo.loadingDate);
                data.loadingDate = formatTime(loadingDate).replace(/\//g, "-")
            })
            console.log(rows)
            this.setData({
                orderList: rows.rows,
                total: rows.total
            })
        })
    },

    //按钮状态
    btnStaatus() {
        let btn = this.data.btn;
        let userInfo = this.data.userInfo;
        if (userInfo.ship === true) {
            btn.forEach(data => {
                console.log(data)
                if (data.state == 3) {
                    data.show = false
                } else {
                    data.show = true
                }
            })
        } else if (userInfo.cargo) {
            btn.forEach(data => {
                if (data.state == 2) {
                    data.show = false
                } else {
                    data.show = true
                }
            })
        }
    },


    //进入订单详情
    getOrderDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        let senderid = e.currentTarget.dataset.senderid;
        let receiverid = e.currentTarget.dataset.receiverid;
        let userInfo = this.data.userInfo;
        if(userInfo.ship){
            wx.navigateTo({
                url: '/views/OrderDetails/OrderDetails?id=' + id + '&senderid=' + senderid + '&receiverid=' + receiverid,
            })
        }else if(userInfo.cargo){
            wx.navigateTo({
                url: '/views/OrderDetails/OrderDetails?id=' + id + '&senderid=' + receiverid + '&receiverid=' + senderid,
            })
        }
        
    },
    //按钮事件
    handleChatButton(e) {
        console.log(e)
        let index = e.currentTarget.dataset.index;
        switch (index) {
            case 0:
                let receiverid = e.currentTarget.dataset.receiverid;
                let senderid = e.currentTarget.dataset.senderid;
                this.Enterthechat(receiverid, senderid)
                break
            case 1:
                this.handleShipConfirmOrderButton();
                break
            case 2:
                this.handleCargoConfirmContractButton();
                break
        }
    },
    //聊天
    Enterthechat(receiverid, senderid) {
        let userInfo = this.data.userInfo;
        if (userInfo.ship) {
            wx.navigateTo({
                url: '/views/chat/chat?receiverid=' + receiverid + '&senderid=' + senderid,
            })
        } else if (userInfo.cargo) {
            wx.navigateTo({
                url: '/views/chat/chat?receiverid=' + senderid + '&senderid=' + receiverid,
            })
        }
    },
    //船东同意按钮
    handleShipConfirmOrderButton(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        this.setData({
            shipShow: true,
            shipOrderID: id
        })
    },
    //船东同意承运
    handleConfirm() {
        let Authorization = wx.getStorageSync('Authorization');
        let id = this.data.shipOrderID;
        let params = {
            Authorization,
            id,
            status: 1
        }
        console.log(params)

        User.UserShipOrderAgreeOrRefused(params).then(res => {
            if (res.data.state === 200) {
                wx.showLoading({
                    title: '成功同意承运',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateTo({
                        url: '/views/UserOrderList/UserOrderList',
                    })
                }, 2000)
            }
        })
    },



    //货主查看订单详情
    handleCargoOrderDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        let senderid = e.currentTarget.dataset.senderid;
        let receiverid = e.currentTarget.dataset.receiverid;
        wx.navigateTo({
            url: '/views/OrderDetails/OrderDetails?id=' + id + '&senderid=' + senderid + '&receiverid=' + receiverid,
        })
    },
    //货主发起聊天
    handleCargoChatButton(e) {
        console.log(e)
        let receiverid = e.currentTarget.dataset.receiverid;
        let senderid = e.currentTarget.dataset.senderid;
        wx.navigateTo({
            url: '/views/chat/chat?receiverid=' + receiverid + '&senderid=' + senderid,
        })
    },
    //货主发起合同
    handleCargoConfirmContractButton(e) {
        let id = e.currentTarget.dataset.id;

        wx.navigateTo({
            url: '/views/cargoOrderDetails/cargoOrderDetails?id=' + id,
        })
    },
})