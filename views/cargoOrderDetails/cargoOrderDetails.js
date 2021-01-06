import User from '../../models/user/user'
const App = getApp();
Page({
    data: {
        userInfo: {},
        id: null, //订单ID
        senderid: null, //发送者Id
        receiverid: null, //接收者ID
        // orderInfo: [],
        shipOrderInfo: [],
        cargoOrderInfo: [],
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

        status: null, //同意或拒绝
        // hairShow: false, //发起合同弹框
        show: false, //船东确认订单金额弹框
        orderPrice: '', //输入单价
    },
    onLoad: function (options) {
        let userInfo = App.globalData.userInfo;
        this.setData({
            id: options.id,
            userInfo
        })
    },
    onShow: function () {
        this.getOrderDetails()
    },
    pageclose() {
        wx.navigateBack({
            data: 1
        })
    },


    //获取订单详情
    getOrderDetails() {
        let userInfo = this.data.userInfo;
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {
            Authorization,
            id
        };

        if (userInfo.cargo) {
            User.UserOrderQuery(params).then(res => {
                let cargoOrderInfo = res.data.data;
                let cargoDate = parseInt(cargoOrderInfo.mtCargo.loadingDate);
                let shipDate = parseInt(cargoOrderInfo.mtShip.ageShip);
                let loadingDate = new Date(cargoDate).toLocaleDateString();
                cargoOrderInfo.cargoDate = loadingDate.replace(/\//g, "-");
                console.log(shipDate)
                let ageShip = new Date(shipDate).toLocaleDateString();

                let arr = ageShip.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (arr == null) return false;
                let array = new Date(arr[1], arr[3] - 1, arr[4]);

                if (array.getFullYear() == arr[1] && (array.getMonth() + 1) == arr[3] && array.getDate() == arr[4]) {
                    let years = new Date().getFullYear();
                    let age = years - arr[1];
                    if (age <= 0) {
                        let month = new Date().getMonth();

                        let ageMonth = month - arr[3]
                        cargoOrderInfo.shipDate = ageMonth + '月'
                    } else {
                        cargoOrderInfo.shipDate = age + '年'
                    }
                }

                this.setData({
                    cargoOrderInfo
                })

                this.tabsOnChange()
            })

        } else if (userInfo.ship) {
            User.UserOrderQuery(params).then(res => {
                let shipOrderInfo = res.data.data;
                console.log(shipOrderInfo)
                let cargoDate = parseInt(shipOrderInfo.mtCargo.loadingDate);
                let shipDate = parseInt(shipOrderInfo.mtShip.ageShip);
                let loadingDate = new Date(cargoDate).toLocaleDateString();
                shipOrderInfo.cargoDate = loadingDate.replace(/\//g, "-");
                let ageShip = new Date(shipDate).toLocaleDateString();

                let arr = ageShip.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (arr == null) return false;
                let array = new Date(arr[1], arr[3] - 1, arr[4]);

                if (array.getFullYear() == arr[1] && (array.getMonth() + 1) == arr[3] && array.getDate() == arr[4]) {
                    let years = new Date().getFullYear();
                    let age = years - arr[1];
                    if (age <= 0) {
                        let month = new Date().getMonth();

                        let ageMonth = month - arr[3]
                        shipOrderInfo.shipDate = ageMonth + '月'
                    } else {
                        shipOrderInfo.shipDate = age + '年'
                    }
                }

                this.setData({
                    shipOrderInfo
                })

                this.tabsOnChange()
            })


        }

    },

    //按钮状态
    tabsOnChange() {
        let userInfo = this.data.userInfo;
        let orderBtu = this.data.orderBtu;
        console.log(userInfo)
        if (userInfo.ship) {
            let shipOrderInfo = this.data.shipOrderInfo;
            console.log(shipOrderInfo)
            switch (shipOrderInfo.status) {
                case 2:
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
                    console.log(orderBtu)

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
                    this.setData({
                        orderBtu
                    })
                    break
            }

        } else if (userInfo.cargo) {
            let cargoOrderInfo = this.data.cargoOrderInfo;
            switch (cargoOrderInfo.status) {
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




    //货主输入订单金额
    handleOrderPrice(e) {
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

    //按钮事件
    handleButton(e) {
        console.log(e)
        let state = e.currentTarget.dataset.state;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;

        switch (state) {
            case 1:
                console.log('申诉')
                break;
            case 2:
                console.log('查看合同')
                break;
            case 3:
                wx.navigateTo({
                    url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
                })
                break;
            case 4:
                this.setData({
                    show: true
                })
                break;
            case 5:
                let orderPrice = this.data.orderPrice;
                if (orderPrice == '') {
                    wx.showToast({
                        title: '单价不能为空',
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


    //货主发起聊天
    handleCargoBtu(e) {
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        wx.navigateTo({
            url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
        })
    },

    //货主发起合同
    handleHairContract() {
        let orderID = this.data.id;
        let cargoOrderInfo = this.data.cargoOrderInfo;
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

    //船东确认订单金额
    handleConfirm() {
        let id = this.data.id;
        let whether = 1;
        console.log(id,whether)
        User.UserShipConfirmOrderMoney({
            id,
            whether
        }).then(res => {
            console.log(res)
            if (res.data.state === 200) {
                wx.showLoading({
                    title: '已确认订单金额，请进行下一步',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateTo({
                        url: '/views/OrderContract/OrderContract?id=' + id,
                    })
                },2000)
            }
        })
    }

})