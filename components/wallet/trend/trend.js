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
    }]
  },
  methods: {
    onTabs(e) {
      console.log(e)
    },
    getFundTrend(){
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
        console.log(res)
      })

    }
  }
})