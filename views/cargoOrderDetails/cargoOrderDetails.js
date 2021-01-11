import User from '../../models/user/user';
import {
    formatTime
} from '../../utils/util';
const App = getApp();
Page({
    data: {
        userInfo: {},
        id: null, //订单ID
        status: null, //订单状态
        senderid: null, //发送者Id
        receiverid: null, //接收者ID
        transportStatus: null, //运输状态
        orderPrice: '', //输入单价

        shipOrderInfo: [],
        cargoOrderInfo: [],
        // 订单按钮
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

        // 步骤按钮
        stepsbtu: [{
            title: '上传货到港图片',
            show: true,
            state: 1
        }, {
            title: '上传装好货照片',
            show: false,
            state: 2
        }, {
            title: '开始运输',
            show: false,
            state: 3
        }, {
            title: '上传船到港图片',
            show: false,
            state: 4
        }, {
            title: '卸货完成',
            show: false,
            state: 5
        }, {
            title: '承运轨迹',
            show: false,
            state: 6
        }],
        //步骤条
        steps: [{
            title: '船到装货港',
            status: 'success',
            color: '#099E43',
            name: 1
        }, {
            title: '装好货',
            status: 'success',
            color: '#099E43',
            name: 2
        }, {
            title: '运输中',
            status: 'success',
            color: '#099E43',
            name: 3
        }, {
            title: '到达目的港',
            status: 'success',
            color: '#099E43',
            name: 4
        }, {
            title: '卸货完成',
            status: 'success',
            color: '#099E43',
            name: 5
        }],
        value1: 0, //当前步骤

        show: false, //船东确认订单金额弹框
        moneyShow1: false, //货主确认价格弹框1
        linesShow: false, //余额不足弹框
        shipmoneyShow: false, //船东确认价格弹框

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

        //船东确认价钱弹框按钮
        shipMoneyDialogBtn: [{
            title: '不同意',
            btnstate: 1,
            show: true,
            type: 'default'
        }, {
            title: '同意价格',
            btnstate: 2,
            show: true,
            type: 'danger'
        }],

        processShow: false, //流程上传返回弹框
        processtitle: null, //流程上传返回弹框标题
        processtext: null, //流程上传返回弹框文本
        processnote: null, //流程上传返回弹框注释

        delayedCost: null, //滞期费用
        los: null, //亏损扣费
        // freightPayable:null,//应付运费

    },
    onLoad: function (options) {
        let userInfo = App.globalData.userInfo;
        let aa = 'asdasdasdds'
        console.log(aa)
        this.setData({
            id: options.id,
            userInfo
        })
    },
    onShow: function () {
        console.log(123123123123)
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
                console.log(res)
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

                let price = Math.round(parseFloat(freightAmount) * 100) / 100;
                let xsd = price.toString().split(".");
                if (xsd.length == 1) {
                    price = price.toString() + ".00";
                }
                if (xsd.length > 1) {
                    if (xsd[1].length < 2) {
                        price = price.toString() + "0";
                    }
                }
                rows.price = price

                this.setData({
                    cargoOrderInfo:rows,
                    status: rows.status,
                    transportStatus: rows.transportStatus
                })

                this.tabsOnChange()
                this.stepsbtuOnChange()
            })

        } else if (userInfo.ship) {
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
                
                if (rows.transportStatus === 1) {
                    this.setData({
                        processtitle: '上传以下装好货照片',
                        processtext: '1. 《水路货物运单》  2. 《盖好帆布照片》'
                    })
                } else if (rows.transportStatus === 2) {
                    this.setData({
                        processtitle: '上传卸货完成以下照片',
                        processtext: '1. 上传签字运单      2. 空船照片',
                        processnote: '注：如货主不在现场无法上传签字运单可以先上传和货主发起聊天记录确认信息截图证明，后续再补上传签字运单即可'
                    })
                }

                console.loadingDate(rows)
                this.setData({
                    shipOrderInfo:rows,
                    status: rows.status,
                    transportStatus: rows.transportStatus
                })

                this.tabsOnChange()
                this.stepsbtuOnChange()
                this.stepsOnchange()
            })


        }



    },

    //订单按钮按钮状态
    tabsOnChange() {
        let userInfo = this.data.userInfo;
        let orderBtu = this.data.orderBtu;
        console.log(orderBtu)
        if (userInfo.ship) {
            let shipOrderInfo = this.data.shipOrderInfo;
            console.log(shipOrderInfo.status)
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
                        } else if (data.state === 8) {
                            data.show = true
                            data.type = 'danger'
                        } else {
                            data.show = false
                            data.type = 'default'
                        }
                    })

                    this.setData({
                        orderBtu
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

    //步骤按钮状态
    stepsbtuOnChange() {
        let stepsbtu = this.data.stepsbtu;
        let userInfo = this.data.userInfo;
        if (userInfo.ship) {
            let shipOrderInfo = this.data.shipOrderInfo;
            switch (shipOrderInfo.transportStatus) {
                case 0:
                    stepsbtu.forEach(data => {
                        if (data.state === 1) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtu,
                        value1: 0
                    })

                    break;
                case 1:
                    stepsbtu.forEach(data => {
                        if (data.state === 2) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtu,
                        value1: 0
                    })
                    break;
                case 2:
                    stepsbtu.forEach(data => {
                        if (data.state === 3) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtu,
                        active: 1
                    })
                    break;
                case 3:
                    stepsbtu.forEach(data => {
                        if (data.state === 4) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtu,
                        value1: 2
                    })
                    break;
                case 4:
                    stepsbtu.forEach(data => {
                        if (data.state === 5) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtu,
                        value1: 3
                    })
                    break;
                case 5:
                    stepsbtu.forEach(data => {
                        if (data.state === 6) {
                            data.show = true
                        } else {
                            data.show = false
                        }
                    })

                    this.setData({
                        stepsbtu,
                        value1: 4
                    })
                    break
            }

        } else if (userInfo.cargo) {
            let cargoOrderInfo = this.data.cargoOrderInfo;
            switch (cargoOrderInfo.transportStatus) {
                case 0:
                    this.setData({
                        value1: 0
                    })
                    break
                case 1:
                    this.setData({
                        value1: 0
                    })
                    break
                case 2:
                    this.setData({
                        value1: 1
                    })
                    break
                case 3:
                    this.setData({
                        value1: 2
                    })
                    break
                case 4:
                    this.setData({
                        value1: 3
                    })
                    break
                case 5:
                    this.setData({
                        value1: 4
                    })
                    break
            }

        }

    },
    //船东步骤按钮事件
    handleStepsBtu(e) {
        console.log(e)
        let state = e.currentTarget.dataset.state;
        let Authorization = wx.getStorageSync('Authorization');
        let id = this.data.id;
        switch (state) {
            case 1:
                wx.navigateTo({
                    url: '/views/OrderShipment/OrderShipment?id=' + id,
                })
                break
            case 2:
                wx.navigateTo({
                    url: '/views/OrderShipment/OrderShipment?id=' + id,
                })
                break
            case 3:
                User.UserShipUploadProcess({
                    Authorization,
                    id
                }).then(res => {
                    if (res.data.state === 200) {
                        this.getOrderDetails()
                    }
                })
                break
            case 4:
                wx.navigateTo({
                    url: '/views/OrderShipment/OrderShipment?id=' + id,
                })
                break
            case 5:
                User.UserShipUploadProcess({
                    Authorization,
                    id
                }).then(res => {
                    if (res.data.state === 200) {
                        this.getOrderDetails()
                    }
                })
                break
        }
    },
    // 货主步骤按钮事件
    handCargoStepsBtu(e) {
        console.log(e)
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

    //按钮事件
    handleButton(e) {
        let state = e.currentTarget.dataset.state;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        let userInfo = this.data.userInfo;

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
                let id = this.data.id;
                wx.navigateTo({
                    url: '/views/OrderContract/OrderContract?id=' + id,
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

        // let orderPrice = this.data.orderPrice;
        // let orderDemurrage = this.data.orderDemurrage;
        // let orderLoss = this.data.orderLoss;

        // let cargoOrderInfo = this.data.cargoOrderInfo;
        // let freightAmount = cargoOrderInfo.mtCargo.freightAmount;

        // if (orderLoss == '') {
        //     orderLoss = 0
        // }
        // if(orderDemurrage == ''){
        //     orderDemurrage = 0
        // }



        // if (orderPrice != '') {
        //     let totalprice = parseInt(orderPrice) - parseInt(orderDemurrage) + parseInt(value) - parseInt(orderLoss);
        //     let c = Math.round(parseFloat(totalprice) * 100) / 100;
        //     let d = c.toString().split(".");
        //     if (d.length == 1) {
        //         c = c.toString() + ".00";
        //     }
        //     if (d.length > 1) {
        //         if (d[1].length < 2) {
        //             c = c.toString() + "0";
        //         }
        //     }
        //     this.setData({
        //         orderDemurrage: price,
        //         orderPrice: c
        //     })
        //     console.log(totalprice)
        // } else {
        //     let totalprice = parseInt(freightAmount) + parseInt(value) - parseInt(orderLoss)
        //     let c = Math.round(parseFloat(totalprice) * 100) / 100;
        //     let d = c.toString().split(".");
        //     if (d.length == 1) {
        //         c = c.toString() + ".00";
        //     }
        //     if (d.length > 1) {
        //         if (d[1].length < 2) {
        //             c = c.toString() + "0";
        //         }
        //     }

        //     this.setData({
        //         orderDemurrage: price,
        //         orderPrice: c
        //     })
        // }


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

        // let orderPrice = this.data.orderPrice;
        // let orderDemurrage = this.data.orderDemurrage;
        // let orderLoss = this.data.orderLoss;

        // let cargoOrderInfo = this.data.cargoOrderInfo;
        // let freightAmount = cargoOrderInfo.mtCargo.freightAmount;

        // if (orderDemurrage == '') {
        //     orderDemurrage = 0
        // }
        // if (orderLoss == '') {
        //     orderLoss = 0
        // }

        // if (orderPrice != '') {
        //     let totalprice = parseInt(orderPrice) + parseInt(orderLoss) - parseInt(value) + parseInt(orderDemurrage);
        //     let c = Math.round(parseFloat(totalprice) * 100) / 100;
        //     let d = c.toString().split(".");

        //     if (d.length == 1) {
        //         c = c.toString() + ".00";
        //     }
        //     if (d.length > 1) {
        //         if (d[1].length < 2) {
        //             c = c.toString() + "0";
        //         }
        //     }

        //     this.setData({
        //         orderLoss: price,
        //         orderPrice: c
        //     })
        //     console.log(totalprice)
        // } else {
        //     let totalprice = parseInt(freightAmount) - parseInt(value) + parseInt(orderDemurrage);
        //     let c = Math.round(parseFloat(totalprice) * 100) / 100;
        //     let d = c.toString().split(".");
        //     if (d.length == 1) {
        //         c = c.toString() + ".00";
        //     }
        //     if (d.length > 1) {
        //         if (d[1].length < 2) {
        //             c = c.toString() + "0";
        //         }
        //     }

        //     this.setData({
        //         orderLoss: price,
        //         orderPrice: c
        //     })

        // }


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
                let id = this.data.id;
                let Authorization = wx.getStorageSync('Authorization');
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
        let id = this.data.id;
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

})