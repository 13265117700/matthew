import User from '../../models/user/user';
const {
  $Toast
} = require('../../miniprogram_npm/iview-weapp/base/index');



Page({
  data: {
    iPhone8Plus: false,
    userInfo: null,
    // 身份认证开关
    visible: false,
    // 认证方式开关
    ahtcShow: false,
    // 认证身份ID
    idenID: null,
    // 认证方式ID
    identity: null,
    // 身份认证方式标题
    ahtcTitle: null,
    // 用户查看列表
    seeList: [{
      text: '余额',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116509351511964.png',
      id: '12'
    }, {
      text: '我的分销',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116509152792556.png',
      id: '23'
    }, {
      text: '银行卡',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116509495939934.png',
      id: '34'
    }, {
      text: '资金流水',
      image: 'https://img.gdmatt.com/images/2021/01/26/16116509646815453.png',
      id: '45'
    }],
    ceilList: [{
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116512997827720.png',
        text: '身份认证',
        id: '112',
        style: 'width: 20px;height: 16.5px;'
      }]
    }, {
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116512997827720.png',
        text: '我的认证资料',
        id: '169',
        style: 'width: 20px;height: 16.5px;'
      }]
    }, {
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/1611651425764211.png',
        text: '我的好友',
        id: '113',
        style: 'width: 19.5px;height: 16px;'
      }]
    }, {
      //船管理
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116516518173963.png',
        text: '船舶管理',
        id: '115',
        style: 'width: 18.5px;height: 19px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116516853804051.png',
        text: '船东待确认订单信息',
        id: '123',
        style: 'width: 19px;height: 18px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116516853804051.png',
        text: '船东订单',
        id: '234',
        style: 'width: 19px;height: 18px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116517148983553.png',
        text: '船东保证金',
        id: '546',
        style: 'width: 19px;height: 19px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116517304288687.png',
        text: '我发布的船源',
        id: '567',
        style: 'width: 18.5px;height: 19px;'
      }]
    }, {
      //货管理
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/1611651780470356.png',
        text: '货主待确认订单信息',
        id: '998',
        style: 'width: 19px;height: 18.5px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/1611651780470356.png',
        text: '货主订单',
        id: '101',
        style: 'width: 19px;height: 18.5px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/1611651799008317.png',
        text: '货主保证金',
        id: '809',
        style: 'width: 19px;height: 19px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116517304288687.png',
        text: '我发布的货源',
        id: '855',
        style: 'width: 18.5px;height: 19px;'
      }]
    }, {
      //车管理
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116518343201584.png',
        text: '车辆管理',
        id: '192',
        style: 'width: 18.5px;height: 16px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116518550073440.png',
        text: '物流待确认订单信息',
        id: '110',
        style: 'width: 18.5px;height: 19px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116518550073440.png',
        text: '物流订单',
        id: '120',
        style: 'width: 18.5px;height: 19px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116517148983553.png',
        text: '物流保证金',
        id: '100',
        style: 'width: 19px;height: 19px;'
      }, {
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116517304288687.png',
        text: '我发布的车源',
        id: '609',
        style: 'width: 18.5px;height: 19px;'
      }]
    }, {
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116514851687120.png',
        text: '偏好设置',
        id: '114',
        style: 'width: 19px;height: 19px;'
      }]
    }, {
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116527016234641.png',
        text: '发票管理',
        id: '820',
        style: 'width: 16px;height: 18px;'
      }]
    }, {
      state: true,
      ceilItem: [{
        icon: 'https://img.gdmatt.com/images/2021/01/26/16116515682431190.png',
        text: '信用查询',
        id: '119',
        style: 'width: 19px;height: 18px;'
      }]
    }],
    // 身份列表
    identitList: [{
      name: '船东认证',
      status: false,
      id: '153'
    }, {
      name: '货主认证',
      status: false,
      id: '151'
    }, {
      name: '车主认证',
      status: false,
      id: '152'
    }],
    // 认证方式列表
    ahtcList: [{
      name: '个人认证',
      active: false,
      id: '0'
    }, {
      name: '企业认证',
      active: false,
      id: '1'
    }],
  },

  onShow() {
    this.showtabBar()
    this.displayModule();
  },

  showtabBar: function () {
    let res = wx.getSystemInfoSync();
    console.log(res)
    if (res.model == 'iPhone 8 Plus (GSM+CDMA)<iPhone10,2>') {
      console.log(11)
      this.setData({
        iPhone8Plus: true
      })
    }
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        activeIndex: 4
      })
    }
  },

  //如果申请认证区分显示模块
  displayModule: function () {
    let Authorization = wx.getStorageSync('Authorization');
    let uId = '';
    if (Authorization) {
      let params = {
        Authorization,
        uId
      }
      User.userInfo(params).then(res => {
        let user = res.data.data;
        switch (user.identityDifference) {
          case 0:
            this.setData({
              userInfo: user,
              ["ceilList[1].state"]: false
            })
            break;
          case 1:
            user.idenID = user.mtShipowner.id;
            user.status = user.mtShipowner.status;
            this.setData({
              userInfo: user,
              ["ceilList[4].state"]: false,
              ["ceilList[5].state"]: false,
              ["ceilList[0].state"]: false,
              ["ceilList[1].state"]: true
            })
            break;
          case 2:
            user.idenID = user.mtCargoOwner.id;
            user.status = user.mtCargoOwner.status;
            this.setData({
              userInfo: user,
              ["ceilList[5].state"]: false,
              ["ceilList[3].state"]: false,
              ["ceilList[0].state"]: false,
              ["ceilList[1].state"]: true
            })
            break;
          case 3:
            user.idenID = user.mtOwner.id;
            user.status = user.mtOwner.status;
            this.setData({
              userInfo: user,
              ["ceilList[4].state"]: false,
              ["ceilList[3].state"]: false,
              ["ceilList[0].state"]: false,
              ["ceilList[1].state"]: true
            })
            break;
        }

      })
    } else {
      this.setData({
        ["ceilList[1].state"]: false
      })
    }
  },

  // 登录
  bindLogin: function () {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  // 用户设置
  userSetUp: function () {
    console.log('用户设置')
    let Authorization = wx.getStorageSync('Authorization');
    if (Authorization) {
      wx.navigateTo({
        url: '/views/UserSettings/UserSettings',
      })
    } else {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }

  },
  // 人工智能服务
  userAi: function () {
    console.log('人工智能服务')
    wx.navigateTo({
      url: '/views/HelpCenter/HelpCenter',
    })
  },
  // 用户查看信息item
  seeItem: function (event) {
    let Authorization = wx.getStorageSync('Authorization');
    let index = event.detail.index;
    let user = this.data.userInfo;
    console.log(user)

    if (Authorization) {
      if (user.identityDifference == 0) {
        wx.showToast({
          title: '请进行身份认证',
          icon: 'none'
        })
        return
      }
      switch (index) {
        case 0:
          wx.navigateTo({
            url: '/views/wallet/wallet',
          })
          break;
        case 1:
          wx.showToast({
            title: '功能正在建设中',
            icon: 'loading'
          })
          break;
        case 2:
          wx.navigateTo({
            url: '/views/BankCard/BankCard',
          })
          break
        case 3:
          wx.navigateTo({
            url: '/views/wallet/wallet',
          })
      }
    } else {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }
  },
  // 进入不同celiItem页面
  ceilItem: function (event) {
    let userInfo = this.data.userInfo;
    let dataset = event.currentTarget.dataset;
    let id = dataset.id;
    console.log(id)
    let Authorization = wx.getStorageSync('Authorization');
    if (Authorization) {
      if (userInfo.identityDifference == 0 && id != 112 && id != 113) {
        wx.showToast({
          title: '请进行身份认证',
          icon: 'none'
        })
        return
      }
      switch (id) {
        // 身份认证
        case '101':
          wx.navigateTo({
            url: '/views/UserOrderList/UserOrderList',
          })
          break;
        case '112':
          this.setData({
            visible: true
          });
          break
        case '113':
          wx.navigateTo({
            url: '/views/MyFriend/MyFriend',
          })
          break
        case '114':
          wx.navigateTo({
            url: '/views/Preferences/Preferences',
          })
        case '115':
          wx.navigateTo({
            url: '/views/ResourcesAdmin/ResourcesAdmin?id=' + id,
          })
          break
        case '169':
          wx.navigateTo({
            url: '/views/UserAuthenticationInfo/UserAuthenticationInfo?idenID=' + userInfo.idenID,
          })
          break
        case '192':
          wx.navigateTo({
            url: '/views/ResourcesAdmin/ResourcesAdmin?id=' + id,
          })
          break
        case '567':
          console.log(567)
          wx.navigateTo({
            url: '/views/ReleaseAdmin/ReleaseAdmin?id=' + id,
          })
          break
        case '855':
          console.log(855)
          wx.navigateTo({
            url: '/views/ReleaseAdmin/ReleaseAdmin?id=' + id,
          })
          break
        case '609':
          wx.navigateTo({
            url: '/views/ReleaseAdmin/ReleaseAdmin?id=' + id,
          })
          break
        case '820':
          if (userInfo.mtUserInvoice) {
            wx.navigateTo({
              url: '/views/invoiceInfo/invoiceInfo',
            })
          } else {
            wx.navigateTo({
              url: '/views/InvoiceAdmin/InvoiceAdmin',
            })
          }

          break
        case '998':
          wx.navigateTo({
            url: '/views/orderConfirm/orderConfirm',
          })
          break
        case '123':
          wx.navigateTo({
            url: '/views/orderConfirm/orderConfirm',
          })
          break
        case '234':
          wx.navigateTo({
            url: '/views/UserOrderList/UserOrderList',
          })
          break
        case '119':
          wx.navigateTo({
            url: '/views/creditQuery/creditQuery',
          })
          break;
        case '809':
          wx.navigateTo({
            url: '/views/walletEnsure/walletEnsure',
          })
          break;
        case '546':
          wx.navigateTo({
            url: '/views/walletEnsure/walletEnsure',
          })
          break;
        case '100':
          wx.navigateTo({
            url: '/views/walletEnsure/walletEnsure',
          })
          break;
      }
    } else {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }

  },
  // 关闭身份认证
  handleClose: function () {
    this.setData({
      visible: false
    })
  },
  // 选择认证身份
  handIdentit: function (e) {
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    let index = dataset.index;
    let identitList = this.data.identitList;
    identitList.forEach(d => d.status = false);
    identitList[index].status = !identitList[index].status;

    this.setData({
      identitList,
      idenID: id
    })
  },
  // 确认认证身份
  handIdentitOkay: function () {
    let id = this.data.idenID;
    console.log(id)
    if (id === null) {
      $Toast({
        content: '未选择身份',
        type: 'warning'
      });
      return
    }
    switch (id) {
      case '153':
        this.setData({
          ahtcTitle: '请选择船东认证方式',
          visible: false,
          ahtcShow: true,
        })
        break;
      case '151':
        this.setData({
          ahtcTitle: '请选择货主认证方式',
          visible: false,
          ahtcShow: true,
        })
        break;
      case '152':
        this.setData({
          ahtcTitle: '请选择车主认证方式',
          visible: false,
          ahtcShow: true,
        })
        break;
    }
    console.log(this.data.ahtcShow)
  },
  // 认证方式选择
  handAhct(e) {
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    let index = dataset.index;
    let ahtcList = this.data.ahtcList;
    ahtcList.forEach(d => d.active = false);
    ahtcList[index].active = !ahtcList[index].active;

    this.setData({
      ahtcList,
      identity: id
    })
  },
  // 确认认证方式
  handAhctOkay() {
    let idenID = this.data.idenID;
    let identity = this.data.identity;
    if (identity === null) {
      $Toast({
        content: '未选择认证方式',
        type: 'warning'
      });
      return
    } else {
      wx.navigateTo({
        url: '/views/UserAuthentication/UserAuthentication?idenID=' + idenID + '&identity=' + identity,
      })
    }
  }
})