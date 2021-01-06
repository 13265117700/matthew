import User from '../../models/user/user'

Page({
  data: {
    contractContent:null,//合同内容
    addressPartyA: null,
    contactPartyA: null,
    creditCodePartyA: null,
    id: null,
    partyAContacts: null,
    partyACorporateName: null,
    partyAEmail: null,
    hairShow:false,//弹框显示
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      addressPartyA: options.addressPartyA,
      contactPartyA: options.contactPartyA,
      creditCodePartyA: options.creditCodePartyA,
      id: options.id,
      partyAContacts: options.partyAContacts,
      partyACorporateName: options.partyACorporateName,
      partyAEmail: options.partyAEmail,
    })
  },

  onShow: function () {
    this.getContractInfo()
  },

  getContractInfo(){
    let Authorization = wx.getStorageSync('Authorization');
    User.frontDeskDefaultCompany({Authorization}).then(res => {
      let rows = res.data.data;
      this.setData({
        contractContent:rows.contractContent
      })
      console.log(rows)
    })
  },
  handleHairContract(){
    this.setData({
      hairShow:true
    })
  },
  handleConfirmContract() {
    console.log(11)
    let Authorization = wx.getStorageSync('Authorization');
    let id = this.data.id;
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



  }
})