import User from '../../models/user/user';
import Company from '../../models/frontEnd/companyInfo';

Page({
  data: {
    orderInfo: {},
    userInfo: {}, //用户信息
    contractContent: null, //合同内容
    btutitle: '生成合同', //按钮
    dialogmsg: null, //弹框提示
    id: null, //订单ID

    addressPartyA: null, //甲方详细地址(货主信息)
    contactPartyA: null, //甲方联系方式(货主信息)
    creditCodePartyA: null, //甲方统一信用代码(货主信息)
    partyAContacts: null, //甲方联系人(货主信息)
    partyACorporateName: null, //甲方公司名称(货主信息)
    partyAEmail: null, //甲方联系邮箱(货主信息)

    addressPartyC: null, //丙方详细地址(船东信息)
    contactPartyC: null, //丙方联系方式(船东信息)
    creditCodePartyC: null, //丙方统一信用代码(船东信息)
    partyCContacts: null, //丙方联系人(船东信息)
    partyCCorporateName: null, //丙方公司名称(船东信息)
    partyCEmail: null, //丙方联系邮箱(船东信息)

    hairShow: false, //弹框显示

  },

  onLoad: function (options) {
    this.getUserInfo(options)
  },

  onShow: function () {

  },

  //获取用户
  getUserInfo(options) {
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

      if (user.cargo) {
        this.setData({
          addressPartyA: options.addressPartyA,
          contactPartyA: options.contactPartyA,
          creditCodePartyA: options.creditCodePartyA,
          id: options.id,
          partyAContacts: options.partyAContacts,
          partyACorporateName: options.partyACorporateName,
          partyAEmail: options.partyAEmail,
          btutitle: '生成合同',
          dialogmsg: '发起合同',
          userInfo: user
        })
      } else {
        this.setData({
          addressPartyC: options.addressPartyC,
          contactPartyC: options.contactPartyC,
          creditCodePartyC: options.creditCodePartyC,
          id: options.id,
          partyCContacts: options.partyCContacts,
          partyCCorporateName: options.partyCCorporateName,
          partyCEmail: options.partyCEmail,
          btutitle: '确认合同',
          dialogmsg: '合同信息',
          userInfo: user
        })
      }

      this.getContractInfo();
    })


  },

  getContractInfo() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      id
    }
    console.log(params)
    User.UserOrderQuery(params).then(res => {
      console.log(res)
      let rows = res.data.data;
      console.log(rows)
      this.setData({
        orderInfo: rows,
      })

    })

    Company.frontDeskDefaultCompany({
      Authorization
    }).then(res => {
      let rows = res.data.data;
      this.setData({
        contractContent: rows.contractContent
      })
    })



  },
  handleHairContract() {
    this.setData({
      hairShow: true
    })
  },
  handleConfirmContract() {
    let userInfo = this.data.userInfo;
    let Authorization = wx.getStorageSync('Authorization');
    let id = this.data.id;
    if (userInfo.cargo) {
      let addressPartyA = this.data.addressPartyA;
      let contactPartyA = this.data.contactPartyA;
      let creditCodePartyA = this.data.creditCodePartyA;
      let partyAContacts = this.data.partyAContacts;
      let partyACorporateName = this.data.partyACorporateName;
      let partyAEmail = this.data.partyAEmail;
      let params = {
        Authorization,
        id,
        addressPartyA,
        contactPartyA,
        creditCodePartyA,
        partyAContacts,
        partyACorporateName,
        partyAEmail
      }

      console.log(params)

      User.UserCargoOrderContractGenerate(params).then(res => {
        if (res.data.state === 200) {
          wx.showLoading({
            title: '合同生成中',
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.navigateBack({
              delta: 3,
            })
          }, 2000)
        }
      })


    } else if (userInfo.ship) {
      let addressPartyC = this.data.addressPartyC;
      let contactPartyC = this.data.contactPartyC;
      let creditCodePartyC = this.data.creditCodePartyC;
      let partyCContacts = this.data.partyCContacts;
      let partyCCorporateName = this.data.partyCCorporateName;
      let partyCEmail = this.data.partyCEmail;
      let params = {
        Authorization,
        id,
        addressPartyC,
        contactPartyC,
        creditCodePartyC,
        partyCContacts,
        partyCCorporateName,
        partyCEmail,
        whether: 1,
      }

      console.log(params)

      User.UserShipOrderConfirmContract(params).then(res => {
        if (res.data.state === 200) {
          wx.showLoading({
            title: '合同生成中',
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.navigateBack({
              delta: 3,
            })
          }, 2000)
        }
      })

    }





  },
  //进入订单详情
  goOrderDeatil() {
    let id = this.data.id;
    console.log(id)
    wx.navigateTo({
      url: '/views/contractOrderDetail/contractOrderDetail?id=' + id,
    })
  }
})