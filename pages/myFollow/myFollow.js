import User from '../../models/user/user'
Page({
    data: {
        activeIndex: 0,
        tabsList: [{
            id: 1011002,
            title: '关注船源',
        }, {
            id: 1011003,
            title: '关注货源',
        }],
        // id: 1011001,
        shipList: [],
        cargoList: [],
    },

    onLoad: function (options) {},


    onShow: function () {
        this.showtabBar();
        this.getMyFollow()
    },

    showtabBar: function () {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            this.getTabBar().setData({
                activeIndex: 1
            })
        }
    },

    //获取关注列表
    getMyFollow() {
        let index = this.data.activeIndex;
        if (index == 0) {
            this.getShipFollow()
        } else {
            this.getCargoFollow()
        }
    },

    //tabs标签导航
    onClickTabs(e) {
        let name = e.detail.name;
        console.log(name)
        if (name == 0) {
            this.getShipFollow()
            this.setData({
                activeIndex: name
            })
        } else {
            this.getCargoFollow()
            this.setData({
                activeIndex: name
            })
        }
    },
    getShipFollow() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        };
        User.UserFocusShips(params).then(res => {
            let rows = res.data.data.rows;
            this.setData({
                shipList: rows,
            })
        })
    },
    getCargoFollow() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        };
        User.UserFocusCargo(params).then(res => {
            let rows = res.data.data.rows;
            console.log(rows)
            this.setData({
                cargoList: rows
            })
        })
    },

    cancelFollow(e) {
        let Authorization = wx.getStorageSync('Authorization');
        let id = e.currentTarget.dataset.id;
        let params = {
            Authorization,
            id
        }
        User.UserShipCancelFocus(params).then(res => {
            console.log(res)
            if (res.data.state === 200) {
                wx.showToast({
                    title: '成功取消关注',
                    icon: 'success'
                })
                this.getMyFollow()
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'loading'
                })
            }
        })
    },
    cargoCancelFollow(e) {
        let Authorization = wx.getStorageSync('Authorization');
        let id = e.currentTarget.dataset.id;
        let params = {
            Authorization,
            id
        };
        User.UserCargoCancelFocus(params).then(res => {
            if (res.data.state == 200) {
                wx.showToast({
                    title: '成功取消关注',
                    icon: 'success'
                })
                this.getMyFollow()
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'loading'
                })
            }
        })
    }
})