import User from "../../../models/user/user";


Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.getShipInfo()
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
        getShipInfo() {
            let id = this.properties.porID;
            let Authorization = wx.getStorageSync('Authorization');
            User.UserShipInfoQuery({
                id,
                Authorization
            }).then(res => {
                let userInfo = res.data.data.mtUser;
                this.setData({
                    userInfo
                })
            })
        }
    }
})