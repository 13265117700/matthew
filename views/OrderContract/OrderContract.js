import User from '../../models/user/user';
import Company from '../../models/frontEnd/companyInfo';


Page({
  data: {
    orderInfo: {}, //订单信息
    // cargoUser: {}, //货主信息
    // shipUser: {}, //船东信息
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
    // creditCodePartyA: null, //甲方统一信用代码
    partyAContacts: null, //甲方联系人
    // partyACorporateName: null, //甲方公司名称
    partyAEmail: null, //甲方联系邮件

    addressPartyC: null, //丙方详细地址(船东信息)
    contactPartyC: null, //丙方联系方式(船东信息)
    // creditCodePartyC:null,//丙方统一信用代码(船东信息)
    partyCContacts: null, //丙方联系人(船东信息)
    // partyCCorporateName:null,//丙方公司名称(船东信息)
    partyCEmail: null, //丙方联系邮箱(船东信息)


  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
    this.getUserInfo()
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
      this.getUserOrder()

    })


  },


  getUserOrder() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      id
    }
    User.UserOrderQuery(params).then(res => {
      let rows = res.data.data;
      console.log(rows)
      this.setData({
        orderInfo: rows,
      })

    })

    Company.frontDeskDefaultCompany({
      Authorization
    }).then(data => {
      let rows = data.data.data;
      this.setData({
        platformInfo: rows,
      })
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
          addressPartyC: value
        })
        break;
      case 1:
        this.setData({
          partyCContacts: value
        })
        break;
      case 2:
        this.setData({
          contactPartyC: value
        })
        break;
      case 3:
        this.setData({
          partyCEmail: value
        })
        break;
    }
  },

  handleConfirmButton() {
    let userInfo = this.data.userInfo;
    let id = this.data.id;
    let orderInfo = this.data.orderInfo;
    let btnShow = true
    if (userInfo.cargo) {
      let addressPartyA = this.data.addressPartyA; //甲方详细地址
      let contactPartyA = this.data.contactPartyA; //甲方联系方式
      let creditCodePartyA = orderInfo.cargoUser.mtCargoOwner.creditCode; //甲方统一信用代码
      let partyAContacts = this.data.partyAContacts; //甲方联系人
      let partyACorporateName = orderInfo.cargoUser.mtCargoOwner.nameEnterprise; //甲方公司名称
      let partyAEmail = this.data.partyAEmail; //甲方联系邮件

      if (!addressPartyA || !contactPartyA || !partyAContacts || !partyAEmail) {
        wx.showToast({
          title: '所有输入框都是必填项目',
        })
        return
      }

      wx.navigateTo({
        url: '/views/OrderAgreement/OrderAgreement?id=' + id + '&addressPartyA=' + addressPartyA + '&contactPartyA=' + contactPartyA + '&creditCodePartyA=' + creditCodePartyA + '&partyAContacts=' + partyAContacts + '&partyACorporateName=' + partyACorporateName + '&partyAEmail=' + partyAEmail + '&btnShow=' + btnShow,
      })

    } else if (userInfo.ship) {
      let addressPartyC = this.data.addressPartyC;
      let contactPartyC = this.data.contactPartyC;
      let partyCContacts = this.data.partyCContacts;
      let partyCEmail = this.data.partyCEmail;
      let creditCodePartyC = orderInfo.shipUser.mtShipowner.nameEnterprise;
      let partyCCorporateName = orderInfo.shipUser.mtShipowner.creditCode;

      let params = {
        addressPartyC,
        contactPartyC,
        partyCContacts,
        partyCEmail,
        creditCodePartyC,
        partyCCorporateName
      }
      console.log(params)
      if (!addressPartyC || !contactPartyC || !partyCContacts || !partyCEmail) {
        wx.showToast({
          title: '所有输入框都是必填项目',
        })
        return
      }

      wx.navigateTo({
        url: '/views/OrderAgreement/OrderAgreement?id=' + id + '&addressPartyC=' + addressPartyC + '&contactPartyC=' + contactPartyC + '&partyCContacts=' + partyCContacts + '&partyCEmail=' + partyCEmail + '&creditCodePartyC=' + creditCodePartyC + '&partyCCorporateName=' + partyCCorporateName + '&btnShow=' + btnShow,
      })

    }
  }

})