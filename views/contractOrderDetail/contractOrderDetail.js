import User from '../../models/user/user';

const {
    formatTime
} = require('../../utils/util');


Page({
    data: {
        id: null,
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            id: options.id
        })
    },
    onShow: function () {
        this.getOrderInfo()
    },

    getOrderInfo() {
        let id = this.data.id;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {
            Authorization,
            id
        };

        User.UserOrderQuery(params).then(res => {
            console.log(res)
            let rows = res.data.data;


            //计算船龄
            let loadingDate = formatTime(new Date(parseInt(rows.mtCargo.loadingDate))).replace(/\//g, "-");
            rows.loadingDate = loadingDate
            let nowYears = new Date().getFullYear(); //当前年
            let years = new Date(parseInt(rows.mtShip.ageShip)).getFullYear(); //船创建的年份
            let nowMonth = new Date().getMonth(); //当前月
            let month = new Date(parseInt(rows.mtShip.ageShip)).getMonth(); //船创建的月份
            let nowDay = new Date().getDate(); //当前日
            let day = new Date(parseInt(rows.mtShip.ageShip)).getDate(); //船创建的日
            let age = nowYears - years;
            let ageMonth = nowMonth - month;
            if (age <= 0) {
                if (ageMonth <= 0) {
                    rows.ageShip = nowDay - day + '天'
                } else {
                    rows.ageShip = ageMonth + '月'
                }
            } else {
                rows.ageShip = age + '年'
            }


            //价钱后添加小数点
            let freightAmount = Math.round(parseFloat(rows.mtCargo.freightAmount) * 100) / 100;
            let xsd = freightAmount.toString().split(".");
            if (xsd.length == 1) {
                freightAmount = freightAmount.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    freightAmount = freightAmount.toString() + "0";
                }
            }
            rows.mtCargo.freightAmount = freightAmount

            this.setData({
                orderdetail: rows
            })


        })
    }
})