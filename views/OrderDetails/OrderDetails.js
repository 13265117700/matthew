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
        let cargoOrderInfo = res.data.data;
        let timestamp = cargoOrderInfo.mtCargo.loadingDate;
        let loadingDate = new Date(timestamp);
        cargoOrderInfo.loadingDate = formatTime(loadingDate).replace(/\//g, "-");

        let ageShip = new Date(parseInt(cargoOrderInfo.mtShip.ageShip)).toLocaleDateString().match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (ageShip == null) return false;
        let array = new Date(ageShip[1], ageShip[3] - 1, ageShip[4]);
        if (array.getFullYear() == ageShip[1] && (array.getMonth() + 1) == ageShip[3] && array.getDate() == ageShip[4]) {
          let years = new Date().getFullYear();
          let age = years - ageShip[1];
          console.log(age)
          if (age <= 0) {
            let month = new Date().getMonth();
            let ageMonth = month - ageShip[3]
            cargoOrderInfo.ageShip = ageMonth + '月'
          } else {
            cargoOrderInfo.ageShip = age + '年'
          }
        }


        console.log(cargoOrderInfo)
        this.setData({
          cargoOrderInfo
        })
      })
    } else if (userInfo.ship) {
      User.UserOrderDetails(params).then(res => {
        let shipOrderInfo = res.data.data;
        let timestamp = shipOrderInfo.mtCargo.loadingDate;
        let loadingDate = new Date(timestamp);
        shipOrderInfo.loadingDate = formatTime(loadingDate).replace(/\//g, "-");

        let ageShip = new Date(parseInt(shipOrderInfo.mtShip.ageShip)).toLocaleDateString().match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (ageShip == null) return false;
        let array = new Date(ageShip[1], ageShip[3] - 1, ageShip[4]);
        if (array.getFullYear() == ageShip[1] && (array.getMonth() + 1) == ageShip[3] && array.getDate() == ageShip[4]) {
          let years = new Date().getFullYear();
          let age = years - ageShip[1];
          console.log(age)
          if (age <= 0) {
            let month = new Date().getMonth();
            let ageMonth = month - ageShip[3]
            shipOrderInfo.ageShip = ageMonth + '月'
          } else {
            shipOrderInfo.ageShip = age + '年'
          }
        }

        console.log(shipOrderInfo)
        this.setData({
          shipOrderInfo
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