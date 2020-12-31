import User from "../../models/user/user"
Page({
  data: {
    navBarTitle:'我发布的船源',
    addButton:'添加船源',
    buttonStyle:'border-top-left-radius: 10px;border-top-right-radius: 10px;',
    id:null,
    statusList:[{
      status:3,
      title:'上架中'
    },{
      status:2,
      title:'已下架'
    }],
    upAndDownState:1,
    cargoList:[]
  },

  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },

  onShow: function () {
    this.isRelease()
  },

  switchButton(e){
    console.log(e)
    let status = e.detail.name;
    let id = this.data.id;
    this.setData({
      upAndDownState:status
    })
    switch(id){
      case '567':
        this.shipSourceAdmin(status)
        break
      case '855':
        this.cargoSourceAdmin(status)
        break
      case '609':
        this.carSourceAdmin(status)
        break
    }
  },

  isRelease(){
    // console.log(this.data.id)
    // console.log(this.data.upAndDownState)
    let status = this.data.upAndDownState
    let id = this.data.id;
    switch(id){
      case '567':
        this.shipSourceAdmin(status)
        break
      case '855':
        this.cargoSourceAdmin(status)
        break
      case '609':
        this.carSourceAdmin(status)
        break
    }
  },

  //船源管理
  shipSourceAdmin(status){
    // let upAndDownState = this.data.upAndDownState;
    console.log(status)
    // console.log(upAndDownState)
    this.setData({
      navBarTitle:'我发布的船源',
      addButton:'添加船源',
    })
  },

  //货源管理
  cargoSourceAdmin(status){
    let Authorization = wx.getStorageSync('Authorization');
    let page = 1;
    let rows = 10;
    User.UserMtCargoQuery({Authorization,page,rows}).then(res => {
      let cargoList = res.data.data.rows;
      console.log(cargoList)
      this.setData({
        navBarTitle:'我发布的货源',
        addButton:'添加货源',
        cargoList
      })
    })
  },

  //车源管理
  carSourceAdmin(status){
    let upAndDownState = this.data.upAndDownState;
    console.log(upAndDownState)
    this.setData({
      navBarTitle:'我发布的车源',
      addButton:'添加车源',
    })
  },

  addButton(){
    let id = this.data.id;
    console.log(id)
    wx.navigateTo({
      url: '/views/ResourceAdd/ResourceAdd?id=' + id,
    })
  }
})