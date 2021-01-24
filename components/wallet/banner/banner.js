// components/wallet/banner/banner.js
Component({
  properties: {

  },
  data: {
    btnStyle:'width: 70px;height: 30px;background: #E95C31;border: 1px solid #F1AE99;font-size: 15px;'
  },
  methods: {
    pageclose() {
      wx.navigateBack({
        data: 1
      })
    },
  }
})