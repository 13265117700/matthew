import User from '../../models/user/user';

Page({
    data: {
        id: null,
        status: null,
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        })
    },
    onShow: function () {
        this.getOrderDetails()
    },
    getOrderDetails() {
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {
            Authorization,
            id
        };
        User.UserOrderQuery(params).then(res => {
            let rows = res.data.data;
            this.setData({
                status: rows.status
            })

        })
    },
    getstepsPro() {
        this.selectComponent('#stepsPro').getOrderInfo();
    }
})