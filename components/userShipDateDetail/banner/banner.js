import User from "../../../models/user/user";

Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.getCargoInfo()
        }
    },
    data: {
        userInfo: {}
    },
    methods: {
        pageclose() {
            wx.navigateBack({
                data: 1
            })
        },
        getCargoInfo() {
            let id = this.properties.porID;
            let Authorization = wx.getStorageSync('Authorization');
            User.UserShipDateInfoQuery({
                id,
                Authorization
            }).then(res => {
                console.log(res)
                let userInfo = res.data.data;
                this.setData({
                    userInfo
                })
            })
        }
    }
})