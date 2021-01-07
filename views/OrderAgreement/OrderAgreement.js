import User from '../../models/user/user'
const App = getApp()

Page({
  data: {
    userInfo: {}, //用户信息
    contractContent: null, //合同内容
    btutitle: '生成合同', //按钮
    dialogmsg:null,//弹框提示
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
    console.log(options)
    let userInfo = App.globalData.userInfo;

    if (userInfo.cargo) {
      this.setData({
        addressPartyA: options.addressPartyA,
        contactPartyA: options.contactPartyA,
        creditCodePartyA: options.creditCodePartyA,
        id: options.id,
        partyAContacts: options.partyAContacts,
        partyACorporateName: options.partyACorporateName,
        partyAEmail: options.partyAEmail,
        btutitle: '生成合同',
        dialogmsg:'发起合同'
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
        dialogmsg:'合同信息'
      })
    }

  },

  onShow: function () {
    this.getContractInfo()
  },

  getContractInfo() {
    let Authorization = wx.getStorageSync('Authorization');
    User.frontDeskDefaultCompany({
      Authorization
    }).then(res => {
      let rows = res.data.data;
      this.setData({
        contractContent: rows.contractContent
      })
      console.log(rows)
    })
  },
  handleHairContract() {
    this.setData({
      hairShow: true
    })
  },
  handleConfirmContract() {
    let userInfo = App.globalData.userInfo;
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
        whether:1,
      }

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





  }
})