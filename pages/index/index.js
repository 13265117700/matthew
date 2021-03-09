//index.js
//获取应用实例
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
      id: 9999999,
      url: 'https://img.gdmatt.com/images/2021/01/26/16116504535152481.png',
      text: '船源信息',
      show: true
    }, {
      id: 9999998,
      url: 'https://img.gdmatt.com/images/2021/01/26/16116504834364982.png',
      text: '船运货源',
      show: true
    }, {
      id: 9999997,
      url: 'https://img.gdmatt.com/images/2021/01/26/16116505013535769.png',
      text: '车运货源',
      show: true
    }, {
      id: 9999996,
      url: 'https://img.gdmatt.com/images/2021/01/26/16116505123198852.png',
      text: '车辆信息',
      show: true
    }],
    orderList: [],
    serviceList: [{
      title: '马太保险',
      image: 'https://img.gdmatt.com/images/2021/01/26/1611650576436108.png'
    }, {
      title: '港口码头',
      image: 'https://img.gdmatt.com/images/2021/01/26/1611650593990553.png'
    }, {
      title: '港口里程',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116506086417862.png'
    }, {
      title: '法律咨询',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116506215144543.png'
    }, {
      title: '企业查询',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116506347954334.png'
    }, {
      title: '台风路径',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116506546337695.png'
    }, {
      title: '台风路径',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116506700888357.png'
    }, {
      title: '更多',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116506837348818.png'
    }],
  },
  onShow() {
    this.showtabBar();
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
      let cardList = this.data.cardList;
      cardList.forEach((data, index) => {
        if (user.identityDifference == 1) {
          if (index == 0 || index == 3) {
            data.show = false
          }
        }
        if (user.identityDifference == 2 || user.identityDifference == 3) {
          if (index == 1 || index == 2) {
            data.show = false
          }
        }
      })

      this.setData({
        userInfo: user,
        cardList
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
    if (user.identityDifference == 1) {
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
    let Authorization = wx.getStorageSync('Authorization');
    if (Authorization) {
      let id = e.currentTarget.dataset.id;
      switch (id) {
        case 9999999:
          wx.navigateTo({
            url: '/views/shipSourceList/shipSourceList?id=' + id,
          })
          break;
        case 9999998:
          wx.navigateTo({
            url: '/views/cargoSourceList/cargoSourceList?id=' + id,
          })
          break;
        case 9999996:
          console.log(2323)
          wx.showToast({
            title: '努力建设中',
            icon: 'loading'
          })
          // wx.navigateTo({
          //   url: '/views/carSourceList/carSourceList?id=' + id,
          // })
          break;
        case 9999997:
          console.log('aaaa')
          wx.showToast({
            title: '努力建设中',
            icon: 'loading'
          })
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
    let user = this.data.userInfo;
    if (user.identityDifference == 0) {
      wx.showToast({
        title: '请到我得页面进行认证',
        icon: 'none'
      })
      return
    }
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