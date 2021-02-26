import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf'

Page({
    data: {
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
            if (user.identityDifference == 2) {
                wx.setNavigationBarTitle({
                    title: '选择要承运的船期',
                })
                user.cargo = true
            } else if (user.identityDifference == 3) {
                user.car = true
            } else if (user.identityDifference == 1) {
                wx.setNavigationBarTitle({
                    title: '我的船源',
                })
                user.ship = true
            }
            this.setData({
                userInfo: user
            })

            this.getShipList(user)
        })

    },
    getShipList(user) {
        let uId = ''
        if (user.identityDifference == 2) {
            uId = this.data.receiverid;
        } else {
            uId = this.data.senderid;
        }
        console.log(uId)
        let page = 1;
        let rows = 10;
        let params = {
            page,
            rows,
            uId
        }
        mtWharf.frontDeskShipPeriodList(params).then(res => {
            let rows = res.data.data.rows;
            console.log(rows)
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
    },
    //发送船源
    handleConfirm(e) {
        let id = e.currentTarget.dataset.id;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            resourcesID: id,
            senderid,
            receiverid,
        })
        wx.navigateBack({
            success: () => {
                prevPage.getShipSenMsg()
            }
        })
    },
    handleCheckDetails(e) {
        let id = e.currentTarget.dataset.id;
        console.log(id)
    },
    //货主发起任务
    handleCargoHairTask(e) {
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
                    let page = getCurrentPages();
                    let prPage = page[page.length - 3];
                    prPage.setData({
                        state
                    })
                    wx.navigateBack({
                      delta: 2,
                    })
                    // wx.navigateTo({
                    //     url: '/views/chat/chat?state=' + state + '&receiverid=' + receiverid + '&senderid=' + senderid,
                    // })
                }, 2000)

            } else {
                wx.showToast({
                    title: res.data.message,
                })
            }
        })

    },
    onInitiateChat() {
        console.log(123)
        // let page = getCurrentPages();
        // let prPage = page[page.length - 3];
        // console.log(prPage)
        // prPage.onLoad();
        wx.navigateBack({
            delta: 2,
        })
    }
})