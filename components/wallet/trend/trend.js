import fundTrend from "../../../models/user/fundTrend";
import FundTrend from "../../../models/user/fundTrend";


Component({
  properties: {

  },
  lifetimes: {
    ready: function () {
      this.getFundTrend()
    }
  },
  data: {
    active: 0,
    tabs: [{
      title: '充值',
      status: 0
    }, {
      title: '收入',
      status: 1
    }, {
      title: '支出',
      status: 2
    }],
    trend: [],
    min: null,
    max: null,
  },
  methods: {
    getFundTrend() {
      let Authorization = wx.getStorageSync('Authorization');
      let page = 1;
      let rows = 10;
      let params = {
        Authorization,
        page,
        rows
      };

      FundTrend.UserFundTrendList(params).then(res => {
        let rows = res.data.data.rows;
        rows.forEach(data => {
          let price = Math.round(parseFloat(data.amount) * 100) / 100;
          let xsd = price.toString().split(".");
          if (xsd.length == 1) {
            price = price.toString() + ".00";
          }
          if (xsd.length > 1) {
            if (xsd[1].length < 2) {
              price = price.toString() + "0";
            }
          }
          data.amount = price

        })
        console.log(rows)
        this.setData({
          trend: rows
        })
      })

    },
    handleMinValue(e) {
      this.setData({
        min: e.detail.value
      })
    },
    handleMaxValue(e) {
      this.setData({
        max: e.detail.value
      })
    },
    handlesearch() {
      let Authorization = wx.getStorageSync('Authorization');
      let amount = this.data.min;
      let amount1 = this.data.max;
      let page = 1;
      let rows = 10;
      let params = {
        Authorization,
        amount,
        amount1,
        page,
        rows
      }

      fundTrend.UserFundTrendList(params).then(res => {
        let rows = res.data.data.rows;
        this.setData({
          trend:rows
        })
      })

    }
  }
})