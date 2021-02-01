import User from "../../models/user/user";
import Invoice from "../../models/user/invoice";


Page({
    data: {
        mtUserInvoice: {},
        btnstyle: 'border-top-left-radius: 10px;border-top-right-radius: 10px; height: 50px;font-size: 17px;',
        state: null,
        mtWallet: {},
        show: false,
    },
    onLoad: function (options) {
        this.setData({
            state: options.state
        })
    },
    onShow: function () {
        this.getUserInfo()
    },
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        };

        User.userInfo(params).then(res => {
            console.log(res)
            let mtWallet = res.data.data.mtWallet;
            let mtUserInvoice = res.data.data.mtUserInvoice;
            let contactInformation = mtUserInvoice.contactInformation.substr(0, 3) + "****" + mtUserInvoice.contactInformation.substr(7);
            mtUserInvoice.contactInformation = contactInformation
            this.setData({
                mtUserInvoice,
                mtWallet
            })
        })
    },
    onShowDialog() {
        this.setData({
            show: true
        })
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    oninvoiceapply() {
        let Authorization = wx.getStorageSync('Authorization');
        let amount = this.data.mtWallet.invoiceAmount;
        console.log(amount)
        Invoice.UserInvoiceApply({
            Authorization,
            amount
        }).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '申请成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 1000)
            } else {
                wx.showToast({
                  title: res.data.message,
                })
            }
        })
    }
})