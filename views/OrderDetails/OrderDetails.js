import User from '../../models/user/user';
const {
  formatTime
} = require('../../utils/util');
const App = getApp();
Page({
  data: {
    userInfo: {},
    id: null, //订单ID
    senderid: null, //发送者Id
    receiverid: null, //接收者ID
    // orderInfo: [],
    shipOrderInfo: [],
    cargoOrderInfo: [],
    button: [{
      title: '发起聊天',
      state: 0,
      type: 'default',
      plain: true
    }, {
      title: '同意承运',
      state: 1,
      type: 'danger',
      plain: false
    }],
    status: null, //同意或拒绝
    show: false,
    bannertitle: ''
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      senderid: options.senderid,
      receiverid: options.receiverid
    })
  },
  onShow: function () {
    this.getUserInfo()
  },
  pageclose() {
    wx.navigateBack({
      data: 1
    })
  },

  //获取用户
  getUserInfo() {
    let Authorization = wx.getStorageSync('Authorization');
    let uid = ''
    let params = {
      Authorization,
      uid
    }
    User.userInfo(params).then(res => {
      let user = res.data.data;
      console.log(user)
      if (user.identityDifference == 2) {
        console.log('货主')
        user.cargo = true
      } else if (user.identityDifference == 3) {
        console.log('车主')
        user.car = true
      } else if (user.identityDifference == 1) {
        console.log('船东')
        user.ship = true
      }
      this.setData({
        userInfo: user
      })
      this.getOrderDetails(user)

    })


  },


  //获取订单详情
  getOrderDetails(userInfo) {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      id
    };

    if (userInfo.cargo) {
      console.log('货主')
      User.UserOrderDetails(params).then(res => {
        let rows = res.data.data;
        let loadingDate = formatTime(new Date(parseInt(rows.mtCargo.loadingDate))).replace(/\//g, "-");
        rows.loadingDate = loadingDate

        let nowYears = new Date().getFullYear(); //当前年
        let years = new Date(parseInt(rows.mtShip.ageShip)).getFullYear(); //船创建的年份
        let nowMonth = new Date().getMonth(); //当前月
        let month = new Date(parseInt(rows.mtShip.ageShip)).getMonth(); //船创建的月份
        let nowDay = new Date().getDate(); //当前日
        let day = new Date(parseInt(rows.mtShip.ageShip)).getDate(); //船创建的日

        let age = nowYears - years;
        let ageMonth = nowMonth - month;
        if (age <= 0) {
          if (ageMonth <= 0) {
            rows.ageShip = nowDay - day + '天'
          } else {
            rows.ageShip = ageMonth + '月'
          }
        } else {
          rows.ageShip = age + '年'
        }
        console.log(rows.mtShip.nameVessel)
        this.setData({
          cargoOrderInfo: rows,
          bannertitle: rows.mtShip.nameVessel
        })
      })
    } else if (userInfo.ship) {
      User.UserOrderDetails(params).then(res => {
        let rows = res.data.data;
        let loadingDate = formatTime(new Date(parseInt(rows.mtCargo.loadingDate))).replace(/\//g, "-");
        rows.loadingDate = loadingDate

        let nowYears = new Date().getFullYear(); //当前年
        let years = new Date(parseInt(rows.mtShip.ageShip)).getFullYear(); //船创建的年份
        let nowMonth = new Date().getMonth(); //当前月
        let month = new Date(parseInt(rows.mtShip.ageShip)).getMonth(); //船创建的月份
        let nowDay = new Date().getDate(); //当前日
        let day = new Date(parseInt(rows.mtShip.ageShip)).getDate(); //船创建的日

        let age = nowYears - years;
        let ageMonth = nowMonth - month;
        if (age <= 0) {
          if (ageMonth <= 0) {
            rows.ageShip = nowDay - day + '天'
          } else {
            rows.ageShip = ageMonth + '月'
          }
        } else {
          rows.ageShip = age + '年'
        }

        this.setData({
          shipOrderInfo: rows,
          bannertitle: rows.mtShip.nameVessel
        })
      })
    }
  },
  //船东按钮状态
  handleButton(e) {
    let state = e.currentTarget.dataset.state;
    let senderid = this.data.senderid;
    let receiverid = this.data.receiverid;

    if (state === 0) {
      wx.navigateTo({
        url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
      })
    } else {
      this.setData({
        show: true,
        status: state
      })
    }
  },
  // 同意承运
  handleConfirm() {
    let userInfo = this.data.userInfo;
    let Authorization = wx.getStorageSync('Authorization');
    let status = this.data.status;
    let id = this.data.id;
    if (userInfo.ship) {
      console.log('船东')
      let params = {
        Authorization,
        status,
        id
      }
      User.UserShipOrderAgreeOrRefused(params).then(res => {
        if (res.data.state === 200) {
          wx.showLoading({
            title: '成功同意承运',
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.navigateTo({
              url: '/views/UserOrderList/UserOrderList',
            })
          }, 2000)
        }
      })


    } else {
      console.log('货主')

    }

  },

  //货主发起聊天
  handleCargoBtu(e) {
    let senderid = this.data.senderid;
    let receiverid = this.data.receiverid;
    wx.navigateTo({
      url: '/views/chat/chat?senderid=' + senderid + '&receiverid=' + receiverid,
    })
  },
})