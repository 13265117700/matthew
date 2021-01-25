// components/wallet/invoice/invoice.js
Component({
  properties: {

  },
  data: {
    list: [{
      img: 'https://img.gdmatt.com/images/2021/01/24/16115008291998222.png',
      text: '充值记录',
      bgColor: 'hd',
      index: 0
    }, {
      img: 'https://img.gdmatt.com/images/2021/01/24/16115008425214560.png',
      text: '银行卡',
      bgColor: 'bd',
      index: 1
    }, {
      img: 'https://img.gdmatt.com/images/2021/01/24/16115008765248344.png',
      text: '提现记录',
      bgColor: 'ft',
      index: 2
    }]
  },
  methods: {
    onCheng(e) {
      let index = e.currentTarget.dataset.index;
      console.log(index)
      if (index == 1) {
        wx.navigateTo({
          url: '/views/BankCard/BankCard',
        })
      } else {
        wx.navigateTo({
          url: '/views/walletRecord/walletRecord?index=' + index,
        })
      }
    }
  }
})