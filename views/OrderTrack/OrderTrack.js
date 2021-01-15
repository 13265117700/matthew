import User from '../../models/user/user';

Page({
    data: {
        id: null,
        status:null,
    },
    onLoad: function (options) {
        console.log(options)
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
        console.log(params)
        User.UserOrderQuery(params).then(res => {
            console.log(res)
            let rows = res.data.data;
            this.setData({
                status:rows.status
            })
            console.log(this.data.status)
            
        })
    }
})