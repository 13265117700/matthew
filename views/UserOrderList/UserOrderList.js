import User from "../../models/user/user";
const {
    formatTime
} = require('../../utils/date');

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
            show: false,
            state: 1, //按钮状态
        }, {
            title: '查看合同',
            type: 'default',
            show: false,
            state: 2, //按钮状态
        }, {
            title: '发起聊天',
            type: 'default',
            show: true,
            state: 3, //按钮状态
        }, {
            title: '确认合同',
            type: 'default',
            show: false,
            state: 4, //按钮状态
        }, {
            title: '发起合同',
            type: 'danger',
            show: true,
            state: 5, //按钮状态
        }, {
            title: '船到装货港',
            type: 'danger',
            show: false,
            state: 6, //按钮状态
        }, {
            title: '承运轨迹',
            type: 'danger',
            show: false,
            state: 7, //按钮状态
        }, {
            title: '确认价格',
            type: 'default',
            show: false,
            state: 8, //按钮状态
        }, {
            title: '删除订单',
            type: 'default',
            show: false,
            state: 9, //按钮状态
        }, {
            title: '订单轨迹',
            type: 'default',
            show: false,
            state: 10, //按钮状态
        }, {
            title: '订单价格',
            type: 'default',
            show: false,
            state: 11, //按钮状态
        }, {
            title: '售后中',
            type: 'default',
            show: false,
            state: 12, //按钮状态
        }, {
            title: '评价',
            type: 'default',
            show: false,
            state: 13, //按钮状态
        }],
        orderList: [],
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
            let orderBtu = this.data.orderBtu;
            if (user.identityDifference == 2) {
                orderBtu.forEach(data => {
                    if (data.state === 3 || data.state === 5) {
                        data.show = true
                        if (data.state === 5) {
                            data.type = 'danger'
                        } else {
                            data.type = 'default'
                        }
                    } else {
                        data.show = false
                    }
                })

                this.getUserOrderList({
                    identity: 1,
                    Authorization,
                    status: 1
                })

            } else if (user.identityDifference == 3) {
                this.getUserOrderList({
                    identity: 3,
                    Authorization,
                    status: 1
                })
            } else if (user.identityDifference == 1) {
                orderBtu.forEach(data => {
                    if (data.state === 3 || data.state === 4) {
                        data.show = true
                        if (data.state === 4) {
                            data.type = 'danger'
                        } else {
                            data.type = 'default'
                        }
                    } else {
                        data.show = false
                    }
                })

                this.getUserOrderList({
                    identity: 2,
                    Authorization,
                    status: 2
                })
            }

            this.setData({
                userInfo: user,
                orderBtu
            })
        })


    },

    //获取订单
    getUserOrderList(data) {
        let params = {
            Authorization: data.Authorization,
            identity: data.identity,
            status: data.status,
            page: 1,
            rows: 10,
        }
        console.log(params)
        User.UserOrderListQuery(params).then(res => {
            let orderList = res.data.data.rows;
            let userInfo = this.data.userInfo;
            if (userInfo.cargo) {
                orderList.forEach(data => {
                    data.mtCargo.loadingDate = formatTime(new Date(data.mtCargo.loadingDate));
                    if (data.status < 3) {
                        data.start = '预计装货时间：' + data.mtCargo.loadingDate
                    } else if (data.status == 8) {
                        data.start = '关闭时间' + data.updateTime
                    } else {
                        data.start = data.mtShip.nameVessel
                    }
                })

            } else if (userInfo.ship) {
                orderList.forEach(data => {
                    data.mtCargo.loadingDate = formatTime(new Date(data.mtCargo.loadingDate));
                    if (data.status < 4) {
                        data.start = '预计装货时间：' + data.mtCargo.loadingDate
                    } else if (data.status == 4 || data.status == 5) {
                        data.start = '卸货完成时间：' + data.unloadingCompleted.createTime
                    } else if (data.status == 6 || data.status == 7) {
                        data.start = '已完成' + data.updateTime
                    } else {
                        data.start = '关闭时间' + data.updateTime
                    }
                })
            }


            this.setData({
                orderList,
                tabsActive: data.status
            })

        })


    },

    //订单按钮状态切换
    tabsOnChange(e) {
        let Authorization = wx.getStorageSync('Authorization');
        let status = parseInt(e.detail.name)
        let userInfo = this.data.userInfo;
        let orderBtu = this.data.orderBtu;

        if (userInfo.identityDifference == 1) {
            console.log('船')
            let params = {
                Authorization,
                status,
                identity: 2
            }
            switch (status) {
                case 1:
                    orderBtu.forEach(data => {
                        if (data.state === 3 || data.state === 4) {
                            data.show = true
                            if (data.state === 4) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })

                    this.getUserOrderList({
                        Authorization,
                        status: 2,
                        identity: 2
                    });

                    this.setData({
                        orderBtu
                    })

                    break
                case 3:
                    orderBtu.forEach(data => {
                        if (data.state < 4 || data.state === 6) {
                            data.show = true
                            if (data.state === 6) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false;
                        }
                    })

                    this.getUserOrderList(params);

                    this.setData({
                        orderBtu
                    })

                    break
                case 4:
                    orderBtu.forEach(data => {
                        if (data.state < 4 && data.state > 1) {
                            data.show = true
                        } else if (data.state < 9 && data.state > 6) {
                            data.show = true
                            if (data.state === 8) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })

                    this.getUserOrderList({
                        Authorization,
                        status: 5,
                        identity: 2
                    });

                    this.setData({
                        orderBtu
                    })

                    break
                case 6:
                    console.log(6)
                    orderBtu.forEach(data => {
                        if (data.state < 4 && data.state > 1) {
                            data.show = true
                        } else if (data.state === 7 || data.state === 13) {
                            data.show = true
                            if (data.state === 13) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })
                    console.log(orderBtu)
                    this.getUserOrderList(params);
                    this.setData({
                        orderBtu
                    })
                    break
                case 7:
                    console.log(7)
                    orderBtu.forEach(data => {
                        if (data.state < 4 && data.state > 1) {
                            data.show = true
                        } else if (data.state === 7 || data.state === 12) {
                            data.show = true
                            if (data.state === 12) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })
                    console.log(orderBtu)
                    this.getUserOrderList(params);

                    this.setData({
                        orderBtu
                    })
                    break
                case 8:
                    orderBtu.forEach(data => {
                        if (data.state === 9) {
                            data.show = true
                            data.type = 'default'
                        } else {
                            data.show = false
                            data.type = 'default'
                        }
                    })
                    console.log(orderBtu)
                    this.getUserOrderList(params);
                    this.setData({
                        orderBtu
                    })
                    break
            }

        } else if (userInfo.identityDifference == 2) {
            console.log('货')
            let params = {
                Authorization,
                status,
                identity: 1
            }
            this.getUserOrderList(params);
            switch (status) {
                case 1:
                    orderBtu.forEach(data => {
                        if (data.state === 3 || data.state === 5) {
                            data.show = true
                            if (data.state === 5) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        orderBtu
                    })

                    break
                case 3:
                    orderBtu.forEach(data => {
                        if (data.state < 4 || data.state === 10) {
                            data.show = true
                            if (data.state === 10) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false;
                        }
                    })

                    this.setData({
                        orderBtu
                    })

                    break
                case 4:
                    orderBtu.forEach(data => {
                        if (data.state < 4 && data.state > 1) {
                            data.show = true
                        } else if (data.state < 12 && data.state > 9) {
                            data.show = true
                            if (data.state === 11) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        orderBtu
                    })

                    break
                case 6:
                    orderBtu.forEach(data => {
                        if (data.state < 4 && data.state > 1) {
                            data.show = true
                        } else if (data.state === 10 || data.state === 13) {
                            data.show = true
                            if (data.state === 13) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        orderBtu
                    })

                    break
                case 7:
                    orderBtu.forEach(data => {
                        if (data.state < 4 && data.state > 1) {
                            data.show = true
                        } else if (data.state === 10 || data.state === 12) {
                            data.show = true
                            if (data.state === 12) {
                                data.type = 'danger'
                            } else {
                                data.type = 'default'
                            }
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        orderBtu
                    })

                    break
                case 8:
                    orderBtu.forEach(data => {
                        if (data.state === 9) {
                            data.show = true
                            data.type = 'default'
                        } else {
                            data.show = false
                            data.type = 'default'
                        }
                    })

                    this.setData({
                        orderBtu
                    })

                    break
            }

        }

    },

    //订单按钮事件
    handleButton(e) {
        let id = e.currentTarget.dataset.id;
        let state = e.currentTarget.dataset.state;
        let userInfo = this.data.userInfo;
        let usershipid = e.currentTarget.dataset.usershipid;
        let usercargoid = e.currentTarget.dataset.usercargoid;

        switch (state) {
            case 1:
                console.log('申诉')
                wx.navigateTo({
                    url: '/views/OrderAppeal/OrderAppeal?shippingOrderId=' + id,
                })
                break;
            case 2:
                console.log('查看合同')
                let btnSshow = false
                wx.navigateTo({
                    url: '/views/OrderAgreement/OrderAgreement?id=' + id + '&btnShow=' + btnSshow,
                })
                break;
            case 3:
                this.initiateChat(userInfo, usershipid, usercargoid)
                break;
            case 4:
                wx.navigateTo({
                    url: '/views/OrderTrack/OrderTrack?id=' + id,
                })
                break;
            case 5:
                wx.navigateTo({
                    url: '/views/OrderTrack/OrderTrack?id=' + id,
                })
                break;
            case 6:
                console.log('船到装货港')
                wx.navigateTo({
                    url: '/views/OrderShipment/OrderShipment?id=' + id,
                })
                break;
            case 7:
                console.log('承运轨迹')
                break;
            case 8:
                console.log('确认价格')
                break;
            case 9:
                console.log('删除订单')
                break;
            case 10:
                console.log('订单轨迹')
                wx.navigateTo({
                    url: '/views/OrderTracking/OrderTracking?id=' + id,
                })
                break;
            case 11:
                console.log('订单价格')
                wx.navigateTo({
                    url: '/views/OrderTrack/OrderTrack?id=' + id,
                })
                break;
            case 12:
                console.log('售后中')
                break;
            case 13:
                console.log('评价')
                wx.navigateTo({
                    url: '/views/OrderEvaluate/OrderEvaluate?id=' + id,
                })
                break;

        }

    },

    //发起聊天
    initiateChat(userInfo, usershipid, usercargoid) {
        if (userInfo.cargo) {
            wx.navigateTo({
                url: '/views/chat/chat?senderid=' + usercargoid + '&receiverid=' + usershipid,
            })
        } else if (userInfo.ship) {
            wx.navigateTo({
                url: '/views/chat/chat?senderid=' + usershipid + '&receiverid=' + usercargoid,
            })
        }
    },

    //订单详情
    OrderDetails(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/views/OrderTrack/OrderTrack?id=' + id,
        })
    },

})