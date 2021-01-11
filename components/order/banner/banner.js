import User from '../../../models/user/user';
Component({
    properties: {
        orderID: Number
    },
    lifetimes: {
        ready: function () {
            this.getOrderInfo()
        }
    },

    data: {
        info: {
            status: '待确认',
            title: '海珠65489船',
            describe: '货物承运中'
        },
        orderPayment: null,
        status: null,
        transportStatus: null
    },

    methods: {
        pageclose() {
            wx.navigateBack({
                data: 1
            })
        },
        getOrderInfo() {
            let id = this.properties.orderID;
            let Authorization = wx.getStorageSync('Authorization');
            let params = {
                Authorization,
                id
            };

            User.UserOrderQuery(params).then(res => {
                let rows = res.data.data;
                this.setData({
                    orderPayment: rows.orderPayment,
                    status: rows.status,
                    transportStatus: rows.transportStatus
                })
                this.infostate(rows)
            })
        },
        infostate(rows) {
            let info = this.data.info;
            if (rows.status == 1 || rows.status == 2 && rows.transportStatus == 0) {
                info.status = '待确认';
                info.title = rows.mtShip.nameVessel;
                info.describe = '待确认合同中'
            } else if (rows.transportStatus < 5 && rows.status == 3) {
                info.status = '进行中';
                info.title = rows.mtShip.nameVessel;
                info.describe = '货物承运中'
            } else if (rows.transportStatus == 5 && rows.status == 4 || rows.status == 5) {
                info.status = '待确认价格',
                info.title = '待船东确认运单价格',
                info.describe = '卸货完成'
            } else if (rows.transportStatus == 5 && rows.status == 6 && rows.orderPayment == 0) {
                info.status = '已完成',
                info.title = '打款中',
                info.describe = '打款中'
            } else if (rows.transportStatus == 5 && rows.status == 6 && rows.orderPayment == 2) {
                info.status = '订单完成',
                info.title = '已完成',
                info.describe = '订单完成，感谢您的支持'
            }
            this.setData({
                info
            })
        }
    }
})