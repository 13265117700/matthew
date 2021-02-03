import User from "../../models/user/user";
import ExtractMoney from "../../models/user/extractMoney";

Page({
    data: {
        userInfo: {},
        value: '',
    },
    onShow: function () {
        this.getUserInfo()
    },
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        User.userInfo({
            Authorization
        }).then(res => {
            let userInfo = res.data.data;
            let bankAccount = userInfo.mtUserCollection.bankAccount;
            let reg = /^(\d{4})\d+(\d{4})$/;
            bankAccount = bankAccount.replace(reg, "$1 **** **** $2");
            userInfo.mtUserCollection.bankAccount = bankAccount

            let price = Math.round(parseFloat(userInfo.mtWallet.withdrawalAmount) * 100) / 100;
            let xsd = price.toString().split(".");
            if (xsd.length == 1) {
                price = price.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    price = price.toString() + "0";
                }
            }
            userInfo.mtWallet.withdrawalAmount = price
            console.log(userInfo)
            this.setData({
                userInfo
            })
        })
    },

    onAllExtract() {
        let userInfo = this.data.userInfo;
        let value = userInfo.mtWallet.withdrawalAmount;
        this.setData({
            value
        })
    },

    noInput(e) {
        console.log(e)
        this.setData({
            value: e.detail.value
        })
    },

    onSubmit() {
        let Authorization = wx.getStorageSync('Authorization');
        let amount = this.data.value;
        let params = {
            Authorization,
            amount
        }

        ExtractMoney.UserExtractMoneyApply(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
                wx.showLoading({
                    title: '提现成功',
                })
                setTimeout(function () {
                    wx.hideLoading()
                    wx.navigateBack({
                        delta: 2,
                    })
                }, 1000)
            } else {
                wx.showToast({
                    title: res.data.message,
                    icon: 'none'
                })
            }
        })

    }

})