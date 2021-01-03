const {
    default: user
} = require("../../models/user/user");
Page({
    data: {
        orderInfo: [], //订单详情
        id: null, //订单ID
        mtCargo: {}, //货主
        orderPrice: null, //订单价钱
    },

    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id,
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

    //货主获取订单详情
    getOrderDetails() {
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {
            Authorization,
            id
        };
        user.UserOrderDetails(params).then(res => {
            let orderInfo = res.data.data;
            let cargoDate = orderInfo.mtCargo.loadingDate;
            let loadingDate = new Date(cargoDate).toLocaleDateString();
            orderInfo.mtCargo.loadingDate = loadingDate.replace(/\//g, "-");

            let shipDate = orderInfo.mtShip.ageShip;
            let ageShip = new Date(shipDate).toLocaleDateString();
            orderInfo.mtShip.ageShip = ageShip.replace(/\//g, "-");

            let mtCargo = orderInfo.mtCargo.mtUser.mtCargoOwner; //货主身份

            let mtUser = orderInfo.mtShip.mtUser;
            if (mtUser.mtCargoOwner.idNumber != null && mtUser.mtCargoOwner.idNumber != ' ') {
                orderInfo.contacts = mtUser.mtCargoOwner.contacts
                orderInfo.phone = mtUser.mtCargoOwner.phone
            } else if (mtUser.mtOwner.idNumber != null && mtUser.mtOwner.idNumber != ' ') {
                orderInfo.contacts = mtUser.mtOwner.contacts
                orderInfo.phone = mtUser.mtOwner.phone
            } else {
                orderInfo.contacts = mtUser.mtShipowner.contacts
                orderInfo.phone = mtUser.mtShipowner.phone
            }

            console.log(orderInfo)
            this.setData({
                orderInfo,
                mtCargo
            })
        })
    },

    //货主发起聊天
    handleChatButton(e) {
        let receiverid = e.currentTarget.dataset.receiverid;
        let senderid = e.currentTarget.dataset.senderid;
        wx.navigateTo({
            url: '/views/chat/chat?receiverid=' + receiverid + '&senderid=' + senderid,
        })
    },

    //输入订单金额
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

    //货主发起合同
    handleHairContractButton(e) {
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {
            Authorization,
            id
        };

        user.UserOrderDetails(params).then(res => {
            let rows = res.data.data;
            console.log(rows)
            let compensation = rows.mtCargo.compensation;
            let delayedCost = rows.mtCargo.delayedCost;
            let delayedDischarge = rows.mtCargo.delayedDischarge;
            let delayedLoading = rows.mtCargo.delayedLoading;
            let deliveryGoods = rows.mtCargo.deliveryGoods;
            let freightAmount = this.data.orderPrice;
            let freightRate = rows.mtCargo.freightRate;
            let goodsDamages = rows.mtCargo.goodsDamages;
            let id = rows.mtCargo.id;
            let lagPeriodType = rows.mtCargo.lagPeriodType;
            let loadingDate = rows.mtCargo.loadingDate;
            let loadingMethod = rows.mtCargo.loadingMethod;
            let lossGoods = rows.mtCargo.lossGoods;
            let mtTypeShipId = rows.mtCargo.mtTypeShip.id;
            let nameGoodsId = rows.mtCargo.mtNameGoods.id;
            let number = rows.mtCargo.number;
            let otherExpenses = rows.mtCargo.otherExpenses;
            let portArrivalAddress = rows.mtCargo.portArrivalAddress;
            let portArrivalId = rows.mtCargo.portArrival.id;
            let portDepartureAddress = rows.mtCargo.portDepartureAddress;
            let portDepartureId = rows.mtCargo.portDeparture.id;
            let remarks = rows.mtCargo.remarks;
            let typeShip = rows.mtCargo.typeShip;
            let unloadingMode = rows.mtCargo.unloadingMode;
            let vesselMaximum = rows.mtCargo.vesselMaximum;
            let vesselMinimum = rows.mtCargo.vesselMinimum;
            let warehouse = rows.mtCargo.warehouse;

            let params = {
                Authorization,
                compensation,
                delayedCost,
                delayedDischarge,
                delayedLoading,
                deliveryGoods,
                freightAmount,
                freightRate,
                goodsDamages,
                id,
                lagPeriodType,
                loadingDate,
                loadingMethod,
                lossGoods,
                mtTypeShipId,
                nameGoodsId,
                number,
                otherExpenses,
                portArrivalAddress,
                portArrivalId,
                portDepartureAddress,
                portDepartureId,
                remarks,
                typeShip,
                unloadingMode,
                vesselMaximum,
                vesselMinimum,
                warehouse,
            }
            console.log(params)

            user.UserCargoUpdate(params).then(res => {
                console.log(res)
                if (res.data.state === 200) {

                }
            })

        })


    }
})