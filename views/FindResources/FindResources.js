import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf';
const {
    formatTime
} = require('../../utils/date')

Page({
    data: {
        id: null,
        pageState: null,
        idenID: null,
        shipList: [],
        cargoList: [],
        // focusStatus:false
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id,
            pageState: options.data,
            idenID: options.idenID
        })
    },
    onShow: function () {
        this.navbarTitle();
        this.getShipList();
        this.getCargoList();
    },

    navbarTitle() {
        let id = this.data.id;
        let pageState = this.data.pageState;
        if (pageState) {
            switch (id) {
                case '9999999':
                    wx.setNavigationBarTitle({
                        title: '船期船源信息',
                    })

                    break
                case '9999998':
                    wx.setNavigationBarTitle({
                        title: '货源货期信息',
                    })

                    break
                case '9999997':
                    wx.setNavigationBarTitle({
                        title: '车源车期信息',
                    })

                    break
                case '9999996':
                    wx.setNavigationBarTitle({
                        title: '车辆信息',
                    })

                    break
            }
        } else {
            wx.setNavigationBarTitle({
                title: '船期信息',
            })

        }
    },

    //获取船期列表
    getShipList() {
        let id = this.data.id;
        if (id == '9999999') {
            let Authorization = wx.getStorageSync('Authorization');
            let page = 1;
            let rows = 10;
            let params = {
                Authorization,
                page,
                rows
            }
            User.UserShipPeriodList(params).then(res => {
                let rows = res.data.data.rows;
                console.log(rows)
                let shipList = []
                rows.forEach(data => {
                    data.emptyDate = formatTime(new Date(data.emptyDate));
                    let collegeId = data.mtShip.id; //船的ID
                    User.UserShipWhetherFocusOn({
                        Authorization,
                        collegeId
                    }).then(focus => {

                        Promise.all([focus]).then(result => {
                            let focusStatus = result[0].data.data;
                            data.focusStatus = focusStatus;
                            shipList.push(data)
                            this.setData({
                                shipList
                            })
                        })
                    })


                })
            })
        }


    },
    //获取货源列表
    getCargoList() {
        let id = this.data.id;
        if (id == '9999998') {
            let Authorization = wx.getStorageSync('Authorization');
            let page = 1;
            let rows = 10;
            let params = {
                page,
                rows
            }
            mtWharf.frontDeskCargoFocusOn(params).then(res => {
                let rows = res.data.data.rows;
                let cargoList = [];
                rows.forEach(data => {
                    let collegeId = data.id;
                    User.UserCargoFocusOn({
                        Authorization,
                        collegeId
                    }).then(focus => {
                        console.log(focus)
                        Promise.all([focus]).then(result => {
                            let focusStatus = result[0].data.data;
                            data.focusStatus = focusStatus;
                            cargoList.push(data)
                            this.setData({
                                cargoList
                            })
                            console.log(cargoList)
                        })
                    })
                })
            })
        }


    },

    //船期关注
    handleShipFocus(e) {
        console.log(e)
        // let shipList = this.data.shipList;
        let Authorization = wx.getStorageSync('Authorization');
        let shipId = e.currentTarget.dataset.id;
        let id = shipId;
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        let params = {
            Authorization,
            shipId
        }
        console.log(params)
        if (status != true) {
            User.UserShipFocus(params).then(res => {
                console.log(res)
                if (res.data.state === 200) {
                    this.setData({
                        [`shipList[${index}].focusStatus`]: true
                    })
                    wx.showToast({
                        title: '关注成功',
                        icon: 'success'
                    })
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'loading'
                    })
                }
            })
        } else {
            User.UserShipCancelFocus({
                Authorization,
                id
            }).then(res => {
                if (res.data.state === 200) {
                    this.setData({
                        [`shipList[${index}].focusStatus`]: false
                    })
                    wx.showToast({
                        title: '成功取消关注',
                        icon: 'success'
                    })
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'loading'
                    })
                }
            })
        }

    },
    //货关注
    handleCargoFocus(e) {
        let Authorization = wx.getStorageSync('Authorization');
        let status = e.currentTarget.dataset.status;
        let index = e.currentTarget.dataset.index;
        let shipId = e.currentTarget.dataset.id;
        let params = {
            Authorization,
            shipId
        }
        if (status != true) {
            User.UserCargoFocus(params).then(res => {
                console.log(res)
                if (res.data.state == 200) {
                    this.setData({
                        [`cargoList[${index}].focusStatus`]: true
                    })
                    wx.showToast({
                        title: '关注成功',
                        icon: 'success'
                    })

                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'loading'
                    })
                }
            })
        } else {
            User.UserCargoCancelFocus({
                Authorization,
                id: shipId
            }).then(res => {
                console.log(res)
                if (res.data.state == 200) {
                    this.setData({
                        [`cargoList[${index}].focusStatus`]: false
                    })
                    wx.showToast({
                        title: '成功取消关注',
                        icon: 'success'
                    })
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'loading'
                    })
                }
            })
        }

    },

    handleCheckDetails(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/shipDetails/shipDetails?id=' + id,
        })
    },
    //进入货详情
    goCargoDetail(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/cargoDetails/cargoDetails?id=' + id,
        })
    }
})