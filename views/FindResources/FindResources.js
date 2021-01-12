const {
    formatTime
} = require('../../utils/util')
import User from '../../models/user/user';



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
            let shipList = []
            rows.forEach(data => {
                let emptyDate = new Date(data.emptyDate).toLocaleDateString();
                data.emptyDate = emptyDate.replace(/\//g, "-");
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

    },
    //获取货源列表
    getCargoList() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        }
        User.UserMtCargoQuery(params).then(res => {
            console.log(res)
            let rows = res.data.data.rows;
            let cargoList = [];
            rows.forEach(data => {
                let collegeId = data.id;
                User.UserCargoFocusOn({
                    Authorization,
                    collegeId
                }).then(focus => {
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
                }
            })
        }

        // console.log(this.data.shipList[0].focusStatus)
    },
})