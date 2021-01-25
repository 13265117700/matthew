// components/wallet/trend/trend.js
Component({
  properties: {

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
    }
  }
})