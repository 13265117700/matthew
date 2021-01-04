import User from './models/user/user'
App({
  onLaunch: function () {
    this.getUserInfo()
  },
  getUserInfo: function () {
    let Authorization = wx.getStorageSync('Authorization');
    let uid = '';
    let params = {
      Authorization,
      uid
    }
    User.userInfo(params).then(res => {
      let user = res.data.data;
      if (user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' ') {
        user.cargo = true
      } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
        user.car = true
      } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
        user.ship = true
      }
      this.globalData.userInfo = user

    })
  },
  globalData: {
    userInfo: {}
  }
})