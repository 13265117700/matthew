// components/wallet/banner/banner.js
Component({
  properties: {

  },
  data: {
    btn:[{
      title:'充值',
      index:0
    },{
      title:'提现',
      index:1
    }],
    btnStyle:'width: 70px;height: 30px;background: #E95C31;border: 1px solid #F1AE99;font-size: 15px;',
  },
  methods: {
    pageclose() {
      wx.navigateBack({
        data: 1
      })
    },
    onBtn(e){
      let index = e.currentTarget.dataset.index;
      if(index == 0){
        wx.navigateTo({
          url: '/views/top-up/top-up',
        })
      }else{
        wx.navigateTo({
          url: '/views/walletAmountExtract/walletAmountExtract',
        })
      }
    }
  }
})