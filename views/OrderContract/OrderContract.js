import User from '../../models/user/user';
const App = getApp();
Page({
  data: {
    orderInfo: {}, //订单信息
    cargoUser: {}, //货主信息
    shipUser: {}, //船东信息
    platformInfo: {}, //平台信息
    userInfo: {}, //用户信息

    // 甲方输入框列表
    partyAinputList: [{
      title: '住所：',
      placeholder: '请输入详细住址'
    }, {
      title: '跟单人姓名：',
      placeholder: '请输入甲方人姓名'
    }, {
      title: '跟单人电话：',
      placeholder: '请输入甲方联系人电话'
    }, {
      title: '跟单人邮箱',
      placeholder: '请输入甲方联系邮箱'
    }],
    //乙方输入框列表
    partyBinputList: [{
      title: '住所：',
      placeholder: '请输入详细住址'
    }, {
      title: '跟单人姓名：',
      placeholder: '请输入甲方人姓名'
    }, {
      title: '跟单人电话：',
      placeholder: '请输入甲方联系人电话'
    }, {
      title: '跟单人邮箱',
      placeholder: '请输入甲方联系邮箱'
    }],

    id: null, //订单ID
    addressPartyA: null, //甲方详细地址
    contactPartyA: null, //甲方联系方式
    creditCodePartyA: null, //甲方统一信用代码
    partyAContacts: null, //甲方联系人
    partyACorporateName: null, //甲方公司名称
    partyAEmail: null, //甲方联系邮件


  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
    this.getUserOrder()
  },

  getUserOrder() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    let userInfo = App.globalData.userInfo;
    console.log(userInfo)
    let params = {
      Authorization,
      id
    }
    User.UserOrderQuery(params).then(res => {
      let rows = res.data.data;
      this.setData({
        orderInfo: rows,
        cargoUser: rows.cargoUser,
        shipUser: rows.shipUser
      })
      console.log(this.data.orderInfo)
      console.log(this.data.cargoUser)
      console.log(this.data.shipUser)
    })

    User.frontDeskDefaultCompany(params).then(data => {
      let rows = data.data.data;
      this.setData({
        platformInfo: rows,
        userInfo
      })
      console.log(this.data.platformInfo)
    })

  },

  //甲方输入框
  partyAinput(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    switch (index) {
      case 0:
        this.setData({
          addressPartyA: value
        })
        break;
      case 1:
        this.setData({
          partyAContacts: value
        })
        break;
      case 2:
        this.setData({
          contactPartyA: value
        })
        break;
      case 3:
        this.setData({
          partyAEmail: value
        })
        break;
    }
  },

  //乙方输入框
  partyBinput(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    switch (index) {
      case 0:
        this.setData({
          addressPartyA: value
        })
        break;
      case 1:
        this.setData({
          partyAContacts: value
        })
        break;
      case 2:
        this.setData({
          contactPartyA: value
        })
        break;
      case 3:
        this.setData({
          partyAEmail: value
        })
        break;
    }
  },

  handleConfirmButton() {
    let userInfo = this.data.userInfo;
    let id = this.data.id;
    if (userInfo.cargo) {
      let cargoUser = this.data.cargoUser;
      let addressPartyA = this.data.addressPartyA; //甲方详细地址
      let contactPartyA = this.data.contactPartyA; //甲方联系方式
      let creditCodePartyA = cargoUser.mtCargoOwner.creditCode; //甲方统一信用代码
      let partyAContacts = this.data.partyAContacts; //甲方联系人
      let partyACorporateName = cargoUser.mtCargoOwner.nameEnterprise; //甲方公司名称
      let partyAEmail = this.data.partyAEmail; //甲方联系邮件

      // let params = {
      //   id,
      //   addressPartyA,
      //   contactPartyA,
      //   creditCodePartyA,
      //   partyAContacts,
      //   partyACorporateName,
      //   partyAEmail
      // }

      if (!addressPartyA || !contactPartyA || !partyAContacts || !partyAEmail) {
        wx.showToast({
          title: '所有输入框都是必填项目',
        })
        return
      }

      wx.navigateTo({
        url: '/views/OrderAgreement/OrderAgreement?id=' + id + '&addressPartyA=' + addressPartyA + '&contactPartyA=' + contactPartyA + '&creditCodePartyA=' + creditCodePartyA + '&partyAContacts=' + partyAContacts + '&partyACorporateName=' + partyACorporateName + '&partyAEmail=' + partyAEmail,
      })

      // User.UserCargoOrderContractGenerate(params).then(res => {
      //   if(res.data.state === 200){
      //     wx.showLoading({
      //       title: '合同生成中',
      //     })
      //     setTimeout(function(){
      //       wx.hideLoading()
      //       wx.navigateTo({
      //         url: '/views/OrderAgreement/OrderAgreement',
      //       })
      //     },2000)
      //   }
      // })

    } else if (userInfo.ship) {

    }
  }

})