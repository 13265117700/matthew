import FundTrend from "../../models/user/fundTrend";



Page({
    data: {
        trendDetail: {},
        success:'https://img.gdmatt.com/images/2021/01/25/16115584651559959.png',
        error:'https://img.gdmatt.com/images/2021/02/01/16121464394081266.png'
    },
    onLoad: function (options) {
        this.handleTrendDeatil(options.id)
    },
    handleTrendDeatil(id) {
        console.log(id)
        let Authorization = wx.getStorageSync('Authorization');

        FundTrend.UserFundTrendDetail({
            Authorization,
            id
        }).then(res => {
            let rows = res.data.data;
            let price = Math.round(parseFloat(rows.amount) * 100) / 100;
            let xsd = price.toString().split(".");
            if (xsd.length == 1) {
                price = price.toString() + ".00";
            }
            if (xsd.length > 1) {
                if (xsd[1].length < 2) {
                    price = price.toString() + "0";
                }
            }
            
            rows.amount = price

            console.log(rows)
            this.setData({
                trendDetail:rows
            })
        })
    }
})