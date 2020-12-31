const {
  default: user
} = require("../../models/user/user");

Page({
  data: {
    cargo:false,//是否货主
    ship:false,//是否船东
    contract:false,//是否发起合同
    id:null,//订单ID
    orderInfo: [],
    mtCargo: {},
    button: [{
      title: '发起聊天',
      state: 0,
      type: 'default',
      plain: true,
      show: true
    }, {
      title: '同意承运',
      state: 1,
      type: 'danger',
      plain: false,
      show: true
    }, {
      title: '确认合同',
      state: 3,
      type: 'danger',
      plain: false,
      show: false
    }],
    state: null,
    show: false
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      cargo:options.cargo,
      contract:options.contract,
      ship:options.ship
    })
  },
  onShow: function () {
    let cargo = this.data.cargo;
    let ship = this.data.ship;
    if(ship === true){
      this.getOrderDetails()
    }else if(cargo === true){
      this.getCargoOrderDetails()
    }
    
  },
  pageclose() {
    wx.navigateBack({
      data: 1
    })
  },


  //船东获取订单详情
  getOrderDetails() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    user.UserOrderDetails({
      id,
      Authorization
    }).then(res => {
      console.log(res)
      let orderInfo = res.data.data;
      let emptyDate = orderInfo.mtCargo.loadingDate;
      let loadingDate = new Date(emptyDate).toLocaleDateString();
      orderInfo.mtCargo.loadingDate = loadingDate.replace(/\//g, "-");
      let mtCargo = orderInfo.mtCargo.mtUser.mtCargoOwner; //货主身份

      let mtUser = orderInfo.mtShip.mtUser;
      if (mtUser.mtCargoOwner.idNumber) {
        orderInfo.contacts = mtUser.mtCargoOwner.contacts
        orderInfo.phone = mtUser.mtCargoOwner.phone
      } else if (mtUser.mtOwner.idNumber) {
        orderInfo.contacts = mtUser.mtOwner.contacts
        orderInfo.phone = mtUser.mtOwner.phone
      } else {
        orderInfo.contacts = mtUser.mtShipowner.contacts
        orderInfo.phone = mtUser.mtShipowner.phone
      }

      if (orderInfo.status === 1) {
        this.setData({
          ['button[1].show']: false,
        })
      } else if (orderInfo.status === 2) {
        this.setData({
          ['button[2].show']: true,
        })
      }

      console.log(orderInfo)
      this.setData({
        orderInfo,
        mtCargo
      })
    })
  },
  handleButton(e) {
    let state = e.currentTarget.dataset.state;
    console.log(state)
    if (state === 1) {
      console.log(1)
      this.setData({
        state,
        show: true
      })
    } else if (state === 3) {
      console.log(this.data.orderInfo)
    } else {

    }
  },
  handleConfirm() {
    let status = this.data.state;
    let Authorization = wx.getStorageSync('Authorization');
    let id = this.data.orderInfo.id;
    let params = {
      Authorization,
      status,
      id
    }
    console.log(params)
    user.UserShipOrderAgreeOrRefused(params).then(res => {
      console.log(res)
      if (res.data.state === 200) {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },



  // //货主获取订单详情
  // getCargoOrderDetails(){
  //   let Authorization = wx.getStorageSync('Authorization');
  //   let id = this.data.id;
  //   user.UserOrderQuery({Authorization,id}).then(res => {
  //     console.log(res)
  //   })
  // },
  // //货主发起聊天
  // handleCargoChatButton(e){
  //   console.log(e)
  // },
  // // 货主发起合同
  // handleCargoHairContract(e){

  // }
})