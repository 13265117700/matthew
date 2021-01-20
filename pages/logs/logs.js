import UserLogin from '../../models/login/login'

Page({
  data: {
    buttonStyle: "border-radius: 25px",
    passwordMode: true,
    phone: '',
    password: ''
  },
  bindSwitch: function () {
    let passwordMode = this.data.passwordMode = !this.data.passwordMode
    this.setData({
      passwordMode
    })
  },
  phoneInput: function (event) {
    let phone = event.detail.value;
    this.setData({
      phone
    })
  },
  passwordInput: function (event) {
    let password = event.detail.value;
    this.setData({
      password
    })
  },
  submitForm: function () {
    console.log("手机密码登录")
    console.log(this.data.phone, this.data.password)
    let username = this.data.phone;
    let password = this.data.password;
    let params = {
      username,
      password
    };
    UserLogin.passwordLogin(params).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        let Authorization = res.data.data;
        wx.setStorageSync('Authorization', Authorization)
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })

  },
  handleSendCode: function () {
    console.log("获取短信")
    console.log(this.data.phone)
    let phone = this.data.phone;
    wx.navigateTo({
      url: '/pages/login/codeLogin/codeLogin?value=' + phone,
    })
  },
  weChatLogin: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.login({
              success(res) {
                let parentId = 0
                let data = {
                  code: res.code,
                  rawData: e.detail.rawData,
                  signature: e.detail.signature,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv,
                  parentId: parentId,
                }
                UserLogin.weChatLogin(data).then(data => {
                  console.log(data.data)
                  if (data.data.code === 200) {
                    let Authorization = data.data.data;
                    wx.setStorageSync('Authorization', Authorization)
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  }
})