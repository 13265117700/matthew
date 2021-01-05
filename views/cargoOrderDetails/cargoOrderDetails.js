import User from '../../models/user/user'
const App = getApp();
Page({
    data: {
        userInfo: {},
        id: null, //订单ID
        senderid: null, //发送者Id
        receiverid: null, //接收者ID
        // orderInfo: [],
        shipOrderInfo: [],
        cargoOrderInfo: [],
        button: [{
            title: '发起聊天',
            state: 0,
            type: 'default',
            plain: true
        }, {
            title: '确认合同',
            state: 1,
            type: 'danger',
            plain: false
        }],
        status: null, //同意或拒绝
        show: false
    },
    onLoad: function (options) {
        console.log(options)
        let userInfo = App.globalData.userInfo;
        this.setData({
            id: options.id,
            userInfo
        })
    },
    onShow: function () {
        this.getOrderDetails()
    },
    pageclose() {
        wx.navigateBack({
            data: 1
        })
    },

    //船东获取订单详情
    getOrderDetails() {
        let userInfo = this.data.userInfo;
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {
            Authorization,
            id
        };
        console.log(params)
        if (userInfo.cargo) {
            console.log('货主')
            User.UserOrderQuery(params).then(res => {
                console.log(res)
                let cargoOrderInfo = res.data.data;
                let cargoDate = cargoOrderInfo.mtCargo.loadingDate;
                let loadingDate = new Date(cargoDate).toLocaleDateString();
                cargoOrderInfo.mtCargo.loadingDate = loadingDate.replace(/\//g, "-");

                let shipDate = cargoOrderInfo.mtShip.ageShip;
                let ageShip = new Date(shipDate).toLocaleDateString();
                cargoOrderInfo.mtShip.ageShip = ageShip.replace(/\//g, "-");

                console.log(cargoOrderInfo)
                this.setData({
                    cargoOrderInfo
                })
            })
        } else if (userInfo.ship) {
            User.UserOrderQuery(params).then(res => {
                console.log(res)
                let shipOrderInfo = res.data.data;
                console.log(shipOrderInfo)
                this.setData({
                    shipOrderInfo
                })
            })
        }

    },
    //船东按钮状态
    handleButton(e) {
        let state = e.currentTarget.dataset.state;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;

        if (state === 0) {
            wx.navigateTo({
                url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
            })
        } else {
            this.setData({
                show: true,
                status: state
            })
        }
    },
    // 同意承运
    handleConfirm() {
        let userInfo = this.data.userInfo;
        let Authorization = wx.getStorageSync('Authorization');
        let status = this.data.status;
        let id = this.data.id;
        if (userInfo.ship) {
            console.log('船东')
            let params = {
                Authorization,
                status,
                id
            }
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


        } else {
            console.log('货主')

        }

    },

    //货主发起聊天
    handleCargoBtu(e) {
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        wx.navigateTo({
            url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
        })
    },

})