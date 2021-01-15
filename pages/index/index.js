//index.js
//获取应用实例
const app = getApp()
import User from "../../models/user/user"

Page({
  data: {
    userInfo: {},
    CargoStatus: '船准备到港',
    current: 1,
    imageList: [{
      url: 'https://img.gdmatt.com/images/2021/01/12/16104224555836415.png',
      mode: "widthFix"
    }, {
      url: 'https://img.gdmatt.com/images/2021/01/12/16104224555836415.png',
      mode: "widthFix"
    }, {
      url: 'https://img.gdmatt.com/images/2021/01/12/16104224555836415.png',
      mode: "widthFix"
    }, {
      url: 'https://img.gdmatt.com/images/2021/01/12/16104224555836415.png',
      mode: "widthFix"
    }, {
      url: 'https://img.gdmatt.com/images/2021/01/12/16104224555836415.png',
      mode: "widthFix"
    }],
    cardList: [{
      tips: 'index',
      id: 9999999,
      url: '/images/index/chuanyuan@3x.png',
      text: '船源信息'
    }, {
      id: 9999998,
      tips: 'index',
      url: '/images/index/huoyuan@3x.png',
      text: '船运货源'
    }, {
      id: 9999997,
      tips: 'index',
      url: '/images/index/cy@3x.png',
      text: '车运货源'
    }, {
      tips: 'index',
      id: 9999996,
      url: '/images/index/daolu@3x.png',
      text: '车辆信息'
    }],
    orderList: [],
    serviceList: [{
      title: '马太保险',
      image: '/images/index/bx@3x.png'
    }, {
      title: '港口码头',
      image: '/images/index/gk@3x.png'
    }, {
      title: '港口里程',
      image: '/images/index/mt@3x.png'
    }, {
      title: '法律咨询',
      image: '/images/index/ls@3x.png'
    }, {
      title: '企业查询',
      image: '/images/index/cx@3x.png'
    }, {
      title: '台风路径',
      image: '/images/index/tflj.png'
    }, {
      title: '台风路径',
      image: '/images/index/tq@3x.png'
    }, {
      title: '更多',
      image: '/images/index/gd@3x.png'
    }],
  },
  onShow() {
    this.showtabBar()
    this.getUserInfo();
  },
  showtabBar: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        activeIndex: 0
      })
    }
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
      if (user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' ') {
        console.log('货主')
        user.cargo = true
      } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
        console.log('车主')
        user.car = true
      } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
        console.log('船东')
        user.ship = true
      }

      this.setData({
        userInfo: user
      })
      this.getOrderList(user)

    })


  },

  //获取订单列表
  getOrderList: function (user) {
    let identity = 1;
    let page = 1;
    let rows = 10;
    let Authorization = wx.getStorageSync('Authorization');
    if (user.ship) {
      identity = 2
    };

    let params = {
      Authorization,
      identity,
      page,
      rows,
      status: 3
    };

    User.UserOrderListQuery(params).then(res => {
      let rows = res.data.data;

      let total = rows.total;
      rows.rows.forEach(data => {

        switch (data.transportStatus) {
          case 0:
            this.setData({
              CargoStatus: '船准备到港',
            })
            break
          case 1:
            this.setData({
              CargoStatus: '船已到装货港',
            })
            break
          case 2:
            this.setData({
              CargoStatus: '已装好货',
            })
            break
          case 3:
            this.setData({
              CargoStatus: '起航运输中',
            })
            break
          case 4:
            this.setData({
              CargoStatus: '已到达目的港',
            })
            break
        }
      })

      if (total <= 5) {
        this.setData({
          orderList: rows.rows
        })
      } else {
        let orderList = []
        for (let i = 0; i < 5; i++) {
          orderList.push(rows.rows[i])
        }
        this.setData({
          orderList
        })
      }

    })


  },

  //轮播图
  bindChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },

  //进入船、货源信息
  gotoResourcesList(e) {
    console.log(e)
    let Authorization = wx.getStorageSync('Authorization');
    if (Authorization) {
      let id = e.currentTarget.dataset.id;
      let data = e.currentTarget.dataset.data;
      let userInfo = this.data.userInfo;
      switch (id) {
        case 9999998:
          if (userInfo.cargo) {
            wx.showToast({
              title: '您当前是货主身份',
              icon: 'loading'
            })
            return
          } else {
            wx.navigateTo({
              url: '/views/FindResources/FindResources?id=' + id + '&data=' + data,
            })
          }
          break;

        case 9999999:
          if (userInfo.ship) {
            wx.showToast({
              title: '您当前是船东身份',
              icon: 'loading'
            })
            return
          } else {
            wx.navigateTo({
              url: '/views/FindResources/FindResources?id=' + id + '&data=' + data,
            })
          }
          break;
          
      }

    } else {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }

  },

  //浮标进入聊天页面
  designedToChat() {
    let Authorization = wx.getStorageSync('Authorization');
    if (Authorization) {
      wx.navigateTo({
        url: '/views/MyFriend/MyFriend',
      })
    } else {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }


  },

  //进入查看全部订单
  toviewOrder() {
    wx.navigateTo({
      url: '/views/UserOrderList/UserOrderList',
    })
  },

  //进入订单详情
  goOrderDetail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/views/OrderTrack/OrderTrack?id=' + id
    })
  },

})