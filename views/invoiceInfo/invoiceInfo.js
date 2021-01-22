import User from "../../models/user/user";


Page({
    data: {
        mtUserInvoice: {}
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
            let mtUserInvoice = res.data.data.mtUserInvoice;
            console.log(mtUserInvoice)
            let contactInformation = mtUserInvoice.contactInformation.substr(0, 3) + "****" + mtUserInvoice.contactInformation.substr(7);
            mtUserInvoice.contactInformation = contactInformation
            console.log(contactInformation)
            this.setData({
                mtUserInvoice
            })
        })
    }
})