const {
    default: user
} = require("../../models/user/user");
Page({
    data: {
        orderInfo: [],//订单详情
        id: null,//订单ID
        mtCargo:{},//货主
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

    getOrderDetails() {
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = { Authorization, id };
        user.UserOrderDetails(params).then(res => {
            let orderInfo = res.data.data;
            let cargoDate = orderInfo.mtCargo.loadingDate;
            let loadingDate = new Date(cargoDate).toLocaleDateString();
            orderInfo.mtCargo.loadingDate = loadingDate.replace(/\//g, "-");

            let shipDate = orderInfo.mtShip.ageShip;
            let ageShip = new Date(shipDate).toLocaleDateString();
            orderInfo.mtShip.ageShip = ageShip.replace(/\//g,"-");

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
    }

})