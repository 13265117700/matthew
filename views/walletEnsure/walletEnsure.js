import User from "../../models/user/user";


Page({
    data: {
        btnstyle: 'background: #4ABDF3;border: 1px solid #FFFFFF;width: 90px;height: 30px;border-radius: 15px;color: #FFFFFF;font-size: 14px;',
        paybtn: 'background: #F0222F;width: 90px;height: 25px;border-radius: 13px;color: #FFFFFF;font-size: 10px;border: none;',
        user:{},
    },
    onShow: function () {
        this.getUserInfo()
    },
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        User.userInfo({
            Authorization
        }).then(res => {
            console.log(res)
            let user = res.data.data;
            let reg = /^(\d{4})\d+(\d{4})$/;
            user.mtUserCollection.bankAccount = user.mtUserCollection.bankAccount.replace(reg,"$1 **** **** $2");
            this.setData({
                user
            })
        })
    },
    handlewithdrawal() {
        wx.navigateTo({
            url: '/views/walletAmountExtract/walletAmountExtract',
        })
    }
})