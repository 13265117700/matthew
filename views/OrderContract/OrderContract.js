import User from '../../models/user/user'
Page({
  data: {
    informations: [{
      id: 0,
      contents: "托运方(甲方)：",
      title: "托运方名称名称"
    }, {
      id: 1,
      contents: "统一信用代码：",
      title: "13213415646454"
    }, {
      id: 2,
      contents: "住所:",
      title: "合肥市包河区庐州大道与贵阳路交口未来塔B座903座",


    }],
    informations_a_a_a: [{
      id: 1,
      contents: "*跟单人姓名：",
      placeholder: '请输入甲方跟单人姓名'
    }, {
      id: 2,
      contents: "*跟单人电话：",
      placeholder: '请输入甲方跟人联系电话'
    }, {
      id: 3,
      contents: "*跟单人邮箱：",
      placeholder: "请输入甲方跟单人邮箱"
    }],

    informations_a_a_a_a: [{
      id: 1,
      contents: "联系人姓名：",
      placeholder: '请输入乙方跟单人姓名'
    }, {
      id: 2,
      contents: "联系人电话：",
      placeholder: '请输入乙方跟单人联系电话'
    }, {
      id: 3,
      contents: "联系人邮箱:",
      placeholder: "请输入乙方联系人邮箱"
    }],

    informations_a: [{
      id: 0,
      contents: "承运方(乙方)：",
      title: "广东马泰找船科技有限公司  "
    }, {
      id: 1,
      contents: "统一信用代码：",
      title: "91441900MA522U5062  "
    }, {
      id: 2,
      contents: "住所：",
      title: "广州市黄埔区科学大道122、124号402房 "
    }, {
      id: 3,
      contents: "法定代表人：",
      title: "张智慧  "
    }, {
      id: 4,
      contents: "联系方式：",
      title: " 18988734960"
    }, {
      id: 5,
      contents: "邮箱：",
      title: "502459384@qq.com"
    }],
    informations_a_a: [{
      id: 0,
      contents: "实际运输方(丙方)：",
      title: "实际运输45454545 "
    }, {
      id: 1,
      contents: "统一信用代码：",
      title: "91441900MA522U5062  "
    }, {
      id: 2,
      contents: "住所：",
      title: " 深圳市南山区蛇口街道沿山路13号胜发 大厦A栋706室"
    }],

    orderID: null,
    userInfo: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderID: options.id
    })
  },
  onShow: function () {
    // this.getUserInfo()
    this.getOrderDetail()
  },

  // getUserInfo() {
  //   let Authorization = wx.getStorageSync('Authorization');
  //   let uid = '';
  //   let params = {
  //     Authorization,
  //     uid
  //   }
  //   User.userInfo(params).then(res => {
  //     let user = res.data.data;

  //     if (user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' ') {
  //       user.cargo = true
  //     } else if (user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' ') {
  //       user.car = true
  //     } else if (user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' ') {
  //       user.ship = true
  //     }

  //     this.setData({
  //       userInfo: user
  //     })

  //     this.getOrderDetail()
  //   })



  // },

  getOrderDetail() {
    let id = this.data.orderID;
    let Authorization = wx.getStorageSync('Authorization');

    let params = {
      Authorization,
      id
    };
    console.log(params)

    User.UserOrderQuery(params).then(res => {
      console.log(res)
    })

  }
})