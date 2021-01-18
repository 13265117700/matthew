import User from "../../models/user/user"


Page({
    data: {
      id:null,
    },

    onLoad: function (options) {
      console.log(options)
      this.setData({
        id:options.id
      })
    },
  
    onShow: function () {
      this.getUserOrderInfo()
    },

    getUserOrderInfo(){
      let Authorization = wx.getStorageSync('Authorization');
      let id = this.data.id;
      let params = {Authorization,id}
      User.UserOrderQuery(params).then(res => {
        console.log(res)
      })
    }

  
  })