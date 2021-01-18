import mtWharf from '../../../models/frontEnd/mtWharf';

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
            mtWharf.frontDeskShipPeriodItem({id}).then(res => {
                console.log(res)
                let userInfo = res.data.data;
                this.setData({
                    userInfo
                })
            })
        }
    }
})