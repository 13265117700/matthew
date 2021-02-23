import User from '../../models/user/user'
Page({
    data: {
        userInfo: {},
        tabsList: [{
            id: 1011002,
            title: '关注船源',
        }, {
            id: 1011003,
            title: '关注货源',
        }],
        shipList: [],
        cargoList: [],
        total: null,
    },

    onLoad: function (options) {},


    onShow: function () {
        this.showtabBar();
        this.getUserInfo();
    },

    showtabBar: function () {
        if (typeof this.getTabBar === "function" && this.getTabBar()) {
            this.getTabBar().setData({
                activeIndex: 1
            })
        }
    },

    //获取用户
    getUserInfo() {
        let emptyTEXT = null;
        let Authorization = wx.getStorageSync('Authorization');
        let uid = ''
        let params = {
            Authorization,
            uid
        }
        User.userInfo(params).then(res => {
            let user = res.data.data;
            if (user.identityDifference == 2) {
                console.log('货主')
                user.cargo = true
            } else if (user.identityDifference == 3) {
                console.log('车主')
                user.car = true
            } else if (user.identityDifference == 1) {
                console.log('船东')
                user.ship = true
            }
            this.setData({
                userInfo: user
            })
            this.getMyFollow(user)

        })


    },

    //获取关注列表
    getMyFollow(user) {
        if (user.cargo) {
            this.getShipFollow()
        } else if (user.ship) {
            this.getCargoFollow()
        }
    },

    // tabs标签导航
    onClickTabs(e) {
        // let name = e.detail.name;
        // console.log(name)
        // if (name == 0) {
        //     this.getShipFollow()
        //     this.setData({
        //         activeIndex: name
        //     })
        // } else {
        //     this.getCargoFollow()
        //     this.setData({
        //         activeIndex: name
        //     })
        // }
    },

    //获取已关注船期列表
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
                total: rows.length
            })

        })
    },
    //获取已关注货源列表
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

            this.setData({
                cargoList: rows,
                total: rows.length
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
                this.getUserInfo()
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
                this.getUserInfo()
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'loading'
                })
            }
        })
    },

    //船详情
    goShipDetail(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        console.log(id)
        wx.navigateTo({
            url: '/views/shipDetail/shipDetail?id=' + id,
        })
    },
    //货源详情
    goCargoDetail(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/cargoDateDetails/cargoDateDetails?id=' + id,
        })
    },
    gotoFocus() {
        let user = this.data.userInfo;
        if (user.identityDifference === 1) {
            let id = '9999998'
            wx.navigateTo({
                url: '/views/FindResources/FindResources?id=' + id,
            })
        }
        if (user.identityDifference === 2) {
            let id = '9999999';
            wx.navigateTo({
                url: '/views/FindResources/FindResources?id=' + id,
            })
        }
    }
})