import User from '../../../models/user/user';


const {
    formatTime
} = require('../../../utils/util');

Component({
    properties: {
        orderID: Number
    },
    lifetimes: {
        ready: function () {
            this.getOrderInfo();
            this.getUserInfo()
        }
    },
    data: {
        userInfo: {},
        orderdetail: {},
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
        }, {
            title: '订单完成',
            type: 'default',
            show: false,
            state: 14, //按钮状态
        }],
        // 货主确认价钱弹框按钮
        moneyDialogBtn: [{
            title: '取消',
            btnstate: 1,
            show: true,
            type: 'default'
        }, {
            title: '确认最终价格',
            btnstate: 2,
            show: true,
            type: 'danger'
        }],

        //余额不足弹框按钮
        linesDialogBtn: [{
            title: '取消',
            btnstate: 1,
            show: true,
            type: 'default'
        }, {
            title: '充值',
            btnstate: 2,
            show: true,
            type: 'danger'
        }],

        orderPrice: '',
        delayedCost: '',
        loss: '',
    },
    methods: {
        //获取用户
        getUserInfo() {
            let Authorization = wx.getStorageSync('Authorization');
            let uid = ''
            let params = {
                Authorization,
                uid
            }
            User.userInfo(params).then(res => {
                let user = res.data.data;
                if (user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' ') {
                    console.log('货主')
                    user.cargo = true
                } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
                    console.log('车主')
                    user.car = true
                } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
                    console.log('船东')
                    user.ship = true
                }

                this.setData({
                    userInfo:user
                })

            })


        },
        //获取订单详情
        getOrderInfo() {
            let id = this.properties.orderID;
            let Authorization = wx.getStorageSync('Authorization');
            let params = {
                Authorization,
                id
            };
            User.UserOrderQuery(params).then(res => {
                let rows = res.data.data;

                let loadingDate = formatTime(new Date(parseInt(rows.mtCargo.loadingDate))).replace(/\//g, "-");
                rows.loadingDate = loadingDate

                let nowYears = new Date().getFullYear(); //当前年
                let years = new Date(parseInt(rows.mtShip.ageShip)).getFullYear(); //船创建的年份
                let nowMonth = new Date().getMonth(); //当前月
                let month = new Date(parseInt(rows.mtShip.ageShip)).getMonth(); //船创建的月份
                let nowDay = new Date().getDate(); //当前日
                let day = new Date(parseInt(rows.mtShip.ageShip)).getDate(); //船创建的日

                let age = nowYears - years;
                let ageMonth = nowMonth - month;
                if (age <= 0) {
                    if (ageMonth <= 0) {
                        rows.ageShip = nowDay - day + '天'
                    } else {
                        rows.ageShip = ageMonth + '月'
                    }
                } else {
                    rows.ageShip = age + '年'
                }

                this.setData({
                    orderdetail: rows
                })

                this.tabsOnChange();

            })
        },
        //状态切换按钮
        tabsOnChange() {
            let userInfo = this.data.userInfo;
            let orderBtu = this.data.orderBtu;
            let orderdetail = this.data.orderdetail;

            if (userInfo.ship) {
                switch (orderdetail.status) {
                    case 2:
                        orderBtu.forEach(data => {
                            console.log(data)
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

                        break
                    case 5:
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

                        break
                    case 6:
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
                        break
                    case 7:
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

                        break
                }

            } else if (userInfo.cargo) {
                switch (orderdetail.status) {
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

                        break
                    case 4:
                        orderBtu.forEach(data => {
                            if (data.state < 4 && data.state > 1) {
                                data.show = true
                            } else if (data.state === 8) {
                                data.show = true
                                data.type = 'danger'
                            } else {
                                data.show = false
                                data.type = 'default'
                            }
                        })

                        break
                    case 5:
                        console.log(5)
                        orderBtu.forEach(data => {
                            console.log(data)
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

                        break
                }

            }

            this.setData({
                orderBtu
            })


        },
        //按钮事件
        handleButton(e) {
            console.log(e)
            let state = e.currentTarget.dataset.state;
            let usercargoid = this.data.usercargoid;
            let usershipid = this.data.usershipid;
            let userInfo = this.data.userInfo;
            let shippingOrderId = this.properties.orderID;
            switch (state) {
                case 1:
                    console.log('申诉')
                    wx.navigateTo({
                        url: '/views/OrderAppeal/OrderAppeal?shippingOrderId=' + shippingOrderId,
                    })
                    break;
                case 2:
                    console.log('查看合同')
                    break;
                case 3:
                    if (userInfo.cargo) {
                        wx.navigateTo({
                            url: '/views/chat/chat?senderid=' + usercargoid + '&receiverid=' + usershipid,
                        })
                    } else if (userInfo.ship) {
                        wx.navigateTo({
                            url: '/views/chat/chat?senderid=' + usershipid + '&receiverid=' + usercargoid,
                        })
                    }
                    break;
                case 4:
                    let id = this.data.id;
                    wx.navigateTo({
                        url: '/views/OrderContract/OrderContract?id=' + id,
                    })
                    break;
                case 5:
                    let orderPrice = this.data.orderPrice;
                    console.log(orderPrice)
                    if (orderPrice == '') {
                        wx.showToast({
                            title: '单价不能为空',
                            icon: 'error'
                        })
                        return
                    }
                    this.handleHairContract()

                    break;
                case 6:
                    console.log('船到装货港')
                    break;
                case 7:
                    console.log('承运轨迹')
                    break
                case 8:
                    console.log('确认价格')
                    if (userInfo.cargo) {
                        this.setData({
                            moneyShow1: true
                        })
                    } else if (userInfo.ship) {
                        this.setData({
                            shipmoneyShow: true
                        })
                    }

                    break
                case 9:
                    console.log('删除订单')
                    break
                case 10:
                    console.log('订单轨迹')
                    break
                case 11:
                    console.log('订单价格')
                    break;
                case 12:
                    console.log('售后中')
                    break;
                case 13:
                    console.log('评价')
                    break;
            }


        },



        //货主输入订单金额
        handleOrderPrice(e) {
            console.log(e)
            let value = e.detail.value;
            let price = Math.round(parseFloat(value) * 100) / 100;
            let xsd = price.toString().split(".");
            if (xsd.length == 1) {
                price = price.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    price = price.toString() + "0";
                }
            }
            this.setData({
                orderPrice: price
            })
        },
        //货主发起合同
        handleHairContract() {
            let orderID = this.data.orderID;
            let cargoOrderInfo = this.data.orderdetail;
            let Authorization = wx.getStorageSync('Authorization');
            let freightAmount = this.data.orderPrice;
            let compensation = cargoOrderInfo.mtCargo.compensation;
            let delayedCost = cargoOrderInfo.mtCargo.delayedCost;
            let delayedDischarge = cargoOrderInfo.mtCargo.delayedDischarge;
            let delayedLoading = cargoOrderInfo.mtCargo.delayedLoading;
            let deliveryGoods = cargoOrderInfo.mtCargo.deliveryGoods;
            let freightRate = cargoOrderInfo.mtCargo.freightRate;
            let id = cargoOrderInfo.mtCargo.id;
            let lagPeriodType = cargoOrderInfo.mtCargo.lagPeriodType;
            let loadingDate = cargoOrderInfo.mtCargo.loadingDate;
            let loadingMethod = cargoOrderInfo.mtCargo.loadingMethod;
            let nameGoodsId = cargoOrderInfo.mtCargo.mtNameGoods.id;
            let number = cargoOrderInfo.mtCargo.number;
            let otherExpenses = cargoOrderInfo.mtCargo.otherExpenses;
            let portArrivalAddress = cargoOrderInfo.mtCargo.portArrivalAddress;
            let portDepartureAddress = cargoOrderInfo.mtCargo.portDepartureAddress;
            let remarks = cargoOrderInfo.mtCargo.remarks;
            let typeShip = cargoOrderInfo.mtCargo.mtTypeShip.name;
            let unloadingMode = cargoOrderInfo.mtCargo.unloadingMode;
            let vesselMaximum = cargoOrderInfo.mtCargo.vesselMaximum;
            let vesselMinimum = cargoOrderInfo.mtCargo.vesselMinimum;
            let warehouse = cargoOrderInfo.mtCargo.warehouse;
            let mtTypeShipId = cargoOrderInfo.mtCargo.mtTypeShip.id;
            let portArrivalId = cargoOrderInfo.mtCargo.portArrival.id;
            let portDepartureId = cargoOrderInfo.mtCargo.portDeparture.id;

            let params = {
                Authorization,
                freightAmount,
                compensation,
                delayedCost,
                delayedDischarge,
                delayedLoading,
                deliveryGoods,
                freightRate,
                id,
                lagPeriodType,
                loadingDate,
                loadingMethod,
                nameGoodsId,
                number,
                otherExpenses,
                portArrivalAddress,
                portDepartureAddress,
                remarks,
                typeShip,
                unloadingMode,
                vesselMaximum,
                vesselMinimum,
                warehouse,
                mtTypeShipId,
                portArrivalId,
                portDepartureId
            }
            console.log(params)

            User.UserCargoUpdate(params).then(res => {
                console.log(res)
                if (res.data.state) {
                    wx.navigateTo({
                        url: '/views/OrderContract/OrderContract?id=' + orderID,
                    })
                }
            })
        },

        //货主输入订单金额
        handleOrderPrice(e) {
            console.log(e)
            let value = e.detail.value;
            let price = Math.round(parseFloat(value) * 100) / 100;
            let xsd = price.toString().split(".");
            if (xsd.length == 1) {
                price = price.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    price = price.toString() + "0";
                }
            }
            this.setData({
                orderPrice: price
            })
        },
        //滞期费输入框
        handledemurrage(e) {
            let value = e.detail.value;
            let price = Math.round(parseFloat(value) * 100) / 100;
            let xsd = price.toString().split(".");
            if (xsd.length == 1) {
                price = price.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    price = price.toString() + "0";
                }
            }
            this.setData({
                delayedCost: price
            })

        },
        //亏损费输入框
        handleloss(e) {
            let value = e.detail.value;

            let price = Math.round(parseFloat(value) * 100) / 100;
            let xsd = price.toString().split(".");
            if (xsd.length == 1) {
                price = price.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    price = price.toString() + "0";
                }
            }

            this.setData({
                loss: price
            })
        },
        //货主确认价钱弹框按钮
        handledialogbtn(e) {
            console.log(e)
            let state = e.currentTarget.dataset.state;
            let that = this;
            switch (state) {
                case 1:
                    console.log('取消')
                    this.setData({
                        moneyShow1: false
                    })
                    break;
                case 2:
                    console.log('最终价格')
                    let compensation = this.data.delayedCost;
                    let loss = this.data.loss;
                    let freightPayable = this.data.orderPrice;
                    let id = this.properties.orderID;
                    let Authorization = wx.getStorageSync('Authorization');
                    if (!compensation || !loss || !freightPayable) {
                        wx.showToast({
                            title: '文本框必填',
                            icon: 'none',
                        })
                        return
                    }
                    let params = {
                        Authorization,
                        id,
                        freightPayable,
                        loss,
                        compensation
                    }
                    console.log(params)
                    User.UserCargoConfirmOrderMoney(params).then(res => {
                        console.log(res)
                        if (res.data.state === 200) {
                            wx.showToast({
                                title: '订单最终价格确认完成,请等待船东再次确认',
                            })
                            setTimeout(function () {
                                this.setData({
                                    moneyShow1: false
                                })
                                wx.navigateBack({
                                    delta: 1,
                                })
                            })

                        } else {
                            wx.showToast({
                                title: res.data.message,
                            })

                            setTimeout(function () {
                                that.setData({
                                    moneyShow1: false,
                                    linesShow: true
                                })
                            }, 1000)
                        }
                    })

                    break;
            }

        },

        //货主充值弹框按钮
        handlelinesbtn(e) {
            console.log(e)
            let state = e.currentTarget.dataset.state;
            if (state === 1) {
                this.setData({
                    linesShow: false
                })
            } else {
                console.log('充值')
            }
        },


        //船东二次确认价格按钮
        shipConfirmOrderPrice(e) {
            console.log(e)
            let state = e.currentTarget.dataset.state;
            let id = this.properties.orderID;
            let Authorization = wx.getStorageSync('Authorization');
            let that = this;
            if (state === 1) {
                this.setData({
                    shipmoneyShow: false
                })
            } else {
                let params = {
                    Authorization,
                    id,
                    whether: 1
                }
                console.log(params)
                User.UserShipConfirmOrderMoney(params).then(res => {
                    console.log(res)
                    if (res.data.state === 200) {
                        wx.showToast({
                            icon: 'success',
                            title: '订单价格确认成功',
                        })
                        setTimeout(function () {
                            that.setData({
                                shipmoneyShow: false
                            })
                            wx.navigateBack({
                                delta: 1,
                            })
                        }, 1000)
                    } else {
                        wx.showToast({
                            icon: 'error',
                            title: res.data.message,
                        })
                    }
                })
            }
        }

    }
})