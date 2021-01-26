// views/top-up/top-up.js
Page({
  data: {
    btnstyle: 'width: 110px;height: 40px;border-radius: 20px;background: linear-gradient(to right,#F2531A,#E01923);color: #FFFFFF;font-size: 19px;',
    value:'',
  },
  onLoad: function (options) {

  },

  onShow: function () {

  },
  handleInput(e){
    console.log(e)
    this.setData({
      value:e.detail.value
    })
  }
})