import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf'
const App = getApp();
Page({
    data: {
        // idenID:null,
        cargoId: null,
        shipList: [],
        receiverid: null,
        senderid: null,
        userInfo: null,
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            cargoId: options.cargoId,
            senderid: options.senderid,
            receiverid: options.receiverid
        })
    },
    onShow: function () {
        this.getUserInfo()
    },
    getUserInfo() {

        let Authorization = wx.getStorageSync('Authorization');
        let uid = '';
        let params = {
            Authorization,
            uid
        }
        User.userInfo(params).then(res => {
            let user = res.data.data;
            if (user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' ') {
                wx.setNavigationBarTitle({
                    title: '选择要承运的船期',
                })
                user.cargo = true
            } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
                user.car = true
            } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
                wx.setNavigationBarTitle({
                    title: '我的船源',
                })
                user.ship = true
            }
            this.setData({
                userInfo: user
            })
            console.log(user)
            this.getShipList()
        })

    },
    getShipList() {
        let uId = this.data.receiverid;
        let page = 1;
        let rows = 10;
        let params = {
            page,
            rows,
            uId
        }
        mtWharf.frontDeskShipPeriodList(params).then(res => {
            let rows = res.data.data.rows;
            let shipList = []
            rows.forEach(data => {
                let emptyDate = new Date(data.emptyDate).toLocaleDateString();
                data.emptyDate = emptyDate.replace(/\//g, "-");
                shipList.push(data)

                this.setData({
                    shipList
                })
            })
        })
        // User.UserShipPeriodList(params).then(res => {
        //     let rows = res.data.data.rows;
        //     console.log(rows)
        //     let shipList = []
        //     rows.forEach(data => {
        //         let emptyDate = new Date(data.emptyDate).toLocaleDateString();
        //         data.emptyDate = emptyDate.replace(/\//g,"-");
        //         shipList.push(data)
        //     })
        //     console.log(shipList)
        //     this.setData({
        //         shipList
        //     })
        // })
    },
    //发送船源
    handleConfirm(e) {

        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/chat/chat?id=' + id,
        })
    },
    handleCheckDetails(e) {
        let id = e.currentTarget.dataset.id;

    },
    //货主发起任务
    handleCargoHairTask(e) {
        console.log(this.data.shipList)
        let Authorization = wx.getStorageSync('Authorization');
        let cargoId = this.data.cargoId;
        let shipId = e.currentTarget.dataset.id;
        let receiverid = this.data.receiverid;
        let senderid = this.data.senderid;

        User.UserCargoOrderRequest({
            Authorization,
            cargoId,
            shipId
        }).then(res => {
            console.log(res)
            if (res.data.state === 200) {
                wx.showLoading({
                    title: '成功发起任务',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    let state = false;
                    wx.navigateTo({
                        url: '/views/chat/chat?state=' + state + '&receiverid=' + receiverid + '&senderid=' + senderid,
                    })
                }, 2000)

            } else {
                wx.showToast({
                    title: res.data.message,
                })
            }
        })

    }
})