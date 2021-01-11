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
    show: false
  },
  onLoad: function (options) {
    console.log(options)
    let userInfo = App.globalData.userInfo;
    this.setData({
      id: options.id,
      senderid: options.senderid,
      receiverid: options.receiverid,
      userInfo
    })
  },
  onShow: function () {
    this.getOrderDetails()
  },
  pageclose() {
    wx.navigateBack({
      data: 1
    })
  },



  //获取订单详情
  getOrderDetails() {
    let userInfo = this.data.userInfo;
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
        this.setData({
          cargoOrderInfo: rows
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
          shipOrderInfo:rows
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