import mtWharf from '../../../models/frontEnd/mtWharf';


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
            mtWharf.frontDeskShipItem({id}).then(res => {
                let userInfo = res.data.data.mtUser;
                this.setData({
                    userInfo
                })
            })
        }
    }
})