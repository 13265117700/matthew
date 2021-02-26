import User from "../../../models/user/user";
const {
    formatTime
} = require('../../../utils/date');



Component({
    lifetimes: {
        attached: function () {
            this.getUserInfo()
        },
    },
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
            disabled:false,
            state: 1, //按钮状态
        }, {
            title: '查看合同',
            type: 'default',
            show: false,
            disabled:false,
            state: 2, //按钮状态
        }, {
            title: '发起聊天',
            type: 'default',
            show: true,
            disabled:false,
            state: 3, //按钮状态
        }, {
            title: '确认合同',
            type: 'default',
            show: false,
            disabled:false,
            state: 4, //按钮状态
        }, {
            title: '发起合同',
            type: 'danger',
            show: true,
            disabled:false,
            state: 5, //按钮状态
        }, {
            title: '船到装货港',
            type: 'danger',
            show: false,
            disabled:false,
            state: 6, //按钮状态
        }, {
            title: '承运轨迹',
            type: 'danger',
            show: false,
            disabled:false,
            state: 7, //按钮状态
        }, {
            title: '确认价格',
            type: 'default',
            show: false,
            disabled:false,
            state: 8, //按钮状态
        }, {
            title: '删除订单',
            type: 'default',
            show: false,
            disabled:false,
            state: 9, //按钮状态
        }, {
            title: '订单轨迹',
            type: 'default',
            show: false,
            disabled:false,
            state: 10, //按钮状态
        }, {
            title: '订单价格',
            type: 'default',
            show: false,
            disabled:false,
            state: 11, //按钮状态
        }, {
            title: '售后中',
            type: 'default',
            show: false,
            disabled:true,
            state: 12, //按钮状态
        }, {
            title: '评价',
            type: 'default',
            show: false,
            disabled:false,
            state: 13, //按钮状态
        }],
        orderList: [],
        total:0
    },
    methods: {
        getUserInfo() {
            let Authorization = wx.getStorageSync('Authorization');
            let uid = '';
            let params = {
                Authorization,
                uid
            }
            User.userInfo(params).then(res => {
                let user = res.data.data;
                let status = 1;
                let identity = 1;
                if (user.identityDifference == 1) {
                    status = 2;
                    identity = 2
                }

                this.getUserOrderList({
                    status,
                    identity
                })

                this.setData({
                    userInfo: user,
                })
            })


        },

        //获取订单
        getUserOrderList(data) {
            console.log(data)
            let Authorization = wx.getStorageSync('Authorization');
            let params = {
                Authorization,
                identity: data.identity,
                status: data.status,
                page: 1,
                rows: 10,
            }

            User.UserOrderListQuery(params).then(res => {
                let orderList = res.data.data.rows;
                if (data.identity == 2) {
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

                } else {
                    orderList.forEach(data => {
                        console.log(data)
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

                if (data.status == 2) {
                    data.status = 1
                }
                if (data.status == 5) {
                    data.status = 4
                }

                this.rateOfProgress({
                    orderList,
                    data,
                    tabsActive: data.status
                })

            })


        },


        //按钮状态切换
        rateOfProgress(data) {
            console.log(data)
            let orderBtu = this.data.orderBtu;
            let orderList = data.orderList;
            let tabsActive = data.tabsActive;
            switch (data.data.status) {
                case 1:
                    console.log(1)
                    if (data.data.identity == 2) {
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

                    } else {
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
                    }

                    break;
                case 3:
                    console.log(3)
                    if (data.data.identity == 2) {
                        orderList.forEach(order => {
                            console.log(order)
                            switch (order.transportStatus) {
                                case 0:
                                    orderBtu[5].title = '船准备到装货港'
                                    break;
                                case 1:
                                    orderBtu[5].title = '船到装货港'
                                    break;
                                case 2:
                                    orderBtu[5].title = '装好货'
                                    break;
                                case 3:
                                    orderBtu[5].title = '运输中'
                                    break;
                                case 4:
                                    orderBtu[5].title = '到达目的港'
                                    break;
                                case 5:
                                    orderBtu[5].title = '卸货完成'
                                    break;
                            }
                        })
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
                    } else {
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
                    }

                    break;
                case 4:
                    console.log(4)
                    if (data.data.identity == 2) {
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

                    } else {
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
                    }

                    break;
                case 6:
                    console.log(6)
                    if (data.data.identity == 2) {
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
                    } else {
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
                    }

                    break;
                case 7:
                    console.log(7)
                    if (data.data.identity == 2) {
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
                    } else {
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
                    }

                    break;
                case 8:
                    console.log(8)
                    orderBtu.forEach(data => {
                        if (data.state === 9) {
                            data.show = true
                            data.type = 'default'
                        } else {
                            data.show = false
                            data.type = 'default'
                        }
                    })
                    break;
            }

            this.setData({
                orderBtu,
                orderList,
                tabsActive,
                total:data.orderList.length
            })

        },

        //点击tabs
        tabsOnChange(e) {
            let status = parseInt(e.detail.name)
            let userInfo = this.data.userInfo;

            let identity = 1;
            if (userInfo.identityDifference == 1) {
                identity = 2;
                if (status == 1) {
                    status = 2
                }
                if (status == 4) {
                    status = 5
                }
            }

            let params = {
                status,
                identity
            }
            this.getUserOrderList(params)

        },

        //订单按钮事件
        handleButton(e) {
            let id = e.currentTarget.dataset.id;
            let state = e.currentTarget.dataset.state;
            let userInfo = this.data.userInfo;
            let usershipid = e.currentTarget.dataset.usershipid;
            let usercargoid = e.currentTarget.dataset.usercargoid;
            console.log(state)
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
                    wx.navigateTo({
                        url: '/views/OrderTracking/OrderTracking?id=' + id,
                    })
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
    }
})