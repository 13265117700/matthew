const {
    default: user
} = require("../../models/user/user");

// views/cargoPeriod/cargoPeriod.js
Page({
    data: {
        cargoList: [],
        receiverid: null,
        senderid: null,
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            senderid: options.senderid,
            receiverid: options.receiverid
        })
    },
    onShow: function () {
        this.getCargoList()
    },

    getCargoList() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows,
            status:3
        }
        user.UserMtCargoQuery(params).then(res => {
            console.log(res)
            let rows = res.data.data.rows;
            let cargoList = [];
            rows.forEach(data => {
                let loadingDate = new Date(data.loadingDate).toLocaleDateString();
                data.loadingDate = loadingDate.replace(/\//g, "-");
                cargoList.push(data)
            })
            this.setData({
                cargoList: rows
            })
            console.log(cargoList)
        })
    },

    handleSendMsg(e) {
        console.log(e)
        let id = e.currentTarget.dataset.id;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            resourcesID:id,
            senderid,
            receiverid,
            action:2
        })

        wx.navigateBack({
          success:()=>{
            // prevPage.WebSocketInit();
            prevPage.getSendMsg()
          }
        })
    },

    handleConfirm(e) {
        console.log(e)
        let cargoId = e.currentTarget.dataset.id;
        let receiverid = this.data.receiverid;
        let senderid = this.data.senderid;
        wx.navigateTo({
            url: '/views/ShipPeriod/ShipPeriod?cargoId=' + cargoId + '&receiverid=' + receiverid + '&senderid=' + senderid,
        })
    }
})