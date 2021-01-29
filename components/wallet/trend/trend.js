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
  },
  methods: {
    // onTabs(e) {
    //   console.log(e)
    // },
    getFundTrend() {
      let Authorization = wx.getStorageSync('Authorization');
      console.log(Authorization)
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
    handlesearch(e) {
      console.log(e)
      let id = e.detail;
      if (id) {
        console.log(23423)
        FundTrend.moneyFunItem({id}).then(res => {
          console.log(res)
        })
      } else {
        this.getFundTrend()
      }
    }
  }
})