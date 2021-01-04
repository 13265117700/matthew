import User from "../../models/user/user"
Page({
    data: {
        userInfo: [],
        tabsActive: 1,
        tabs: [{
            title: '待确认信息',
            status: 1
        }, {
            title: '运输中',
            status: 3
        }, {
            title: '确认订单金额',
            status: 4
        }, {
            title: '订单完成',
            status: 6
        }, {
            title: '售后中',
            status: 7
        }, {
            title: '已取消',
            status: 8
        }],
        orderBtu: [{
            title: '发起申诉',
            type: 'default',
            show: true,
            state: 1, //按钮状态
        }, {
            title: '查看合同',
            type: 'default',
            show: true,
            state: 2, //按钮状态
        }, {
            title: '发起聊天',
            type: 'default',
            show: true,
            state: 3, //按钮状态
        }, {
            title: '船到装货港',
            type: 'danger',
            show: true,
            state: 4, //按钮状态
        }, {
            title: '承运轨迹',
            type: 'danger',
            show: false,
            state: 5, //按钮状态
        }, {
            title: '确认价格',
            type: 'default',
            show: false,
            state: 6, //按钮状态
        }, {
            title: '售后中',
            type: 'default',
            show: false,
            state: 7, //按钮状态
        }, {
            title: '评价',
            type: 'default',
            show: false,
            state: 8, //按钮状态
        }, {
            title: '删除订单',
            type: 'default',
            show: false,
            state: 9, //按钮状态
        }],
        shipOrderList: [],
        cargoOrderList: [],
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
                user.cargo = true
                this.getUserOrderList({
                    identity: 1,
                    Authorization,
                    status: 1 || 2
                })
            } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
                user.car = true
                this.getUserOrderList({
                    identity: 3,
                    Authorization,
                    status: 1 || 2
                })
            } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
                user.ship = true
                this.getUserOrderList({
                    identity: 2,
                    Authorization,
                    status: 1 || 2
                })
            }
            this.setData({
                userInfo: user
            })
        })


    },

    getUserOrderList(data) {
        console.log(data)
        if (data.identity === 2) {
            let params = {
                Authorization: data.Authorization,
                identity: data.identity,
                status: data.status,
                page: 1,
                rows: 10,
            }
            User.UserOrderListQuery(params).then(res => {
                let shipOrderList = res.data.data.rows;
                shipOrderList.forEach(data => {
                    let loadingDate = new Date(data.mtCargo.loadingDate).toLocaleDateString();
                    data.mtCargo.loadingDate = loadingDate.replace(/\//g, "-")
                })
                console.log(shipOrderList)
                this.setData({
                    shipOrderList
                })
            })
            console.log('船东')
        } else {
            let params = {
                Authorization: data.Authorization,
                identity: data.identity,
                status: data.status,
                page: 1,
                rows: 10,
            }
            User.UserOrderListQuery(params).then(res => {
                let cargoOrderList = res.data.data.rows;
                cargoOrderList.forEach(data => {
                    let loadingDate = new Date(data.mtCargo.loadingDate).toLocaleDateString();
                    data.mtCargo.loadingDate = loadingDate.replace(/\//g, "-")
                })
                console.log(cargoOrderList)
                this.setData({
                    cargoOrderList
                })
            })
            console.log('货主')
        }
    },

    tabsOnChange(e) {
        let Authorization = wx.getStorageSync('Authorization');
        let status = parseInt(e.detail.name)
        let userInfo = this.data.userInfo;
        if (userInfo.ship) {
            let params = {
                Authorization,
                status,
                identity: 2
            }
            this.getUserOrderList(params)
        } else if (userInfo.cargo) {
            let params = {
                Authorization,
                status,
                identity: 1
            }
            this.getUserOrderList(params)
        }

    },

})