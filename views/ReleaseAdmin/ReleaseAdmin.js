import User from "../../models/user/user";

Page({
  data: {
    navBarTitle: '我发布的船源',
    addButton: '添加船源',
    buttonStyle: 'border-top-left-radius: 10px;border-top-right-radius: 10px;',
    id: null,
    statusList: [{
      status: 0,
      title: '审核中',
      show: true
    }, {
      status: 1,
      title: '未通过',
      show: true
    }, {
      status: 3,
      title: '上架中',
      show: true
    }, {
      status: 2,
      title: '已下架',
      show: true
    }],
    auditInformation: null, //审核信息
    show: false, //审核失败原因
    shipShow: false, //未添加船舶
    dialogStyle: 'width: 100%;height: 35px;border-radius: 20px;',
    upAndDownState: 0,
    // active:3,
    cargoList: [], //货源列表
    shipList: [], //船期列表
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id
    })
  },

  onShow: function () {
    this.isRelease()
  },

  switchButton(e) {
    let status = e.detail.name;
    let id = this.data.id;
    switch (id) {
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

  //获取资源列表
  isRelease() {
    let status = this.data.upAndDownState;
    let id = this.data.id;

    switch (id) {
      case '567':
        wx.setNavigationBarTitle({
          title: '船源管理',
        })
        this.shipSourceAdmin(status)
        break
      case '855':
        wx.setNavigationBarTitle({
          title: '货源管理',
        })
        this.cargoSourceAdmin(status)
        break
      case '609':
        wx.setNavigationBarTitle({
          title: '车源管理',
        })
        this.carSourceAdmin(status)
        break
    }
  },

  //船源管理
  shipSourceAdmin(state) {
    console.log(state)
    if (state === 3) {
      let status = 1;
      let Authorization = wx.getStorageSync('Authorization');
      let page = 1;
      let rows = 10;
      let params = {
        Authorization,
        page,
        rows,
        status
      }
      User.UserShipPeriodList(params).then(res => {
        let rows = res.data.data.rows;
        let shipList = [];
        rows.forEach(data => {
          let emptyDate = new Date(data.emptyDate).toLocaleDateString();
          data.emptyDate = emptyDate.replace(/\//g, "-");
          shipList.push(data)
        })
        console.log(shipList)
        wx.setNavigationBarTitle({
          title: '我发布的船源',
        })
        this.setData({
          addButton: '添加船源',
          shipList
        })
      })
    } else {
      let status = 0;
      let Authorization = wx.getStorageSync('Authorization');
      let page = 1;
      let rows = 10;
      let params = {
        Authorization,
        page,
        rows,
        status
      }
      User.UserShipPeriodList(params).then(res => {
        let rows = res.data.data.rows;
        let shipList = [];
        rows.forEach(data => {
          let emptyDate = new Date(data.emptyDate).toLocaleDateString();
          data.emptyDate = emptyDate.replace(/\//g, "-");
          shipList.push(data)
        })
        console.log(shipList)
        this.setData({
          navBarTitle: '我发布的船源',
          addButton: '添加船源',
          shipList
        })
      })
    }
    let statusList = this.data.statusList;
    statusList.forEach(data => {
      if (data.status < 2) {
        data.show = false
      }
    })
    console.log(statusList)
    this.setData({
      statusList,
      upAndDownState: 2
    })
  },
  //用户船源上架
  UserShipOnFrame(e) {
    let id = e.currentTarget.dataset.id;
    let Authorization = wx.getStorageSync('Authorization');
    let status = 1;
    let params = {
      Authorization,
      id,
      status
    };
    User.UserShipPeriodOnUnderFrame(params).then(res => {
      console.log(res)
      if (res.data.state === 200) {
        wx.showLoading({
          title: '船期成功上架',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        this.shipSourceAdmin(status = 2)
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
  },
  // 用户船源下架
  UserShipUnderFrame(e) {
    let id = e.currentTarget.dataset.id;
    let Authorization = wx.getStorageSync('Authorization');
    let status = 0;
    let params = {
      Authorization,
      id,
      status
    };
    User.UserShipPeriodOnUnderFrame(params).then(res => {
      if (res.data.state === 200) {
        wx.showLoading({
          title: '船期成功下架',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        this.shipSourceAdmin(status = 3)
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
  },
  //用户船源删除
  UserShipDel(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      id
    };
    User.UserShipPeriodDel(params).then(res => {
      console.log(res)
      if (res.data.state === 200) {
        wx.showLoading({
          title: '成功删除船期',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        this.shipSourceAdmin(status = 2)
      } else {
        wx.showLoading({
          title: res.data.message,
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      }
    })
  },
  //进入船源详情
  goShipDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/views/userShipDateDetail/userShipDateDetail?id=' + id
    })
  },



  //货源管理
  cargoSourceAdmin(status) {
    let Authorization = wx.getStorageSync('Authorization');
    let page = 1;
    let rows = 10;
    let params = {
      Authorization,
      page,
      rows,
      status
    }

    User.UserMtCargoQuery(params).then(res => {
      let cargoList = res.data.data.rows;
      console.log(cargoList)

      wx.setNavigationBarTitle({
        title: '我发布的货源',
      })
      this.setData({
        addButton: '添加货源',
        cargoList,
        upAndDownState: status
      })
    })



  },
  // 用户货上架
  UserCargoOnFrame(e) {
    let id = e.currentTarget.dataset.id;
    let Authorization = wx.getStorageSync('Authorization');
    let status = 3;
    let params = {
      Authorization,
      id,
      status
    };
    console.log(params)
    User.UserCargoOnUnderFrame(params).then(res => {
      console.log(res)
      if (res.data.state === 200) {
        wx.showLoading({
          title: '货源成功上架',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        this.cargoSourceAdmin(2)
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
  },
  //用户货下架
  UserCargoUnderFrame(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    let Authorization = wx.getStorageSync('Authorization');
    let status = 2;
    let params = {
      Authorization,
      id,
      status
    };
    User.UserCargoOnUnderFrame(params).then(res => {
      console.log(res)
      if (res.data.state === 200) {
        wx.showLoading({
          title: '货源成功下架',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        this.cargoSourceAdmin(3)
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
  },
  //进入货详情
  goCargoDetail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/views/cargoDateDetails/cargoDateDetails?id=' + id,
    })
  },


  //查看失败原因
  UserCargoAuditInformation(e) {
    let Authorization = wx.getStorageSync('Authorization');
    let id = e.currentTarget.dataset.id;
    User.UserMtCargoQueryInfo({
      Authorization,
      id
    }).then(res => {
      let auditInformation = res.data.data.auditInformation;
      this.setData({
        auditInformation,
        show: true
      })
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },


  //车源管理
  carSourceAdmin(status) {
    let upAndDownState = this.data.upAndDownState;
    wx.setNavigationBarTitle({
      title: '我发布的车源',
    })
    console.log(upAndDownState)
    this.setData({
      addButton: '添加车源',
    })
  },



  addButton() {
    let id = this.data.id;
    console.log(id)
    if (id == 567) {
      this.queryShip()
    } else {
      wx.navigateTo({
        url: '/views/ResourceAdd/ResourceAdd?id=' + id,
      })
    }

  },

  //未添加船舶
  queryShip() {
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      page: 1,
      rows: 10
    }

    User.UserShipQuery(params).then(res => {
      let total = res.data.data.total;
      if (total <= 0) {
        this.setData({
          shipShow: true
        })
      } else {
        this.onQueryShip()
      }
    })

  },
  //等待船舶审核
  onQueryShip() {
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      page: 1,
      rows: 10,
      status: 2
    }

    User.UserShipQuery(params).then(res => {
      let total = res.data.data.total;
      if (total <= 0) {
        wx.showToast({
          title: '请等待船舶审核通过',
          icon: 'none'
        })
      } else {
        // let id = this.data.id;
        // wx.navigateTo({
        //   url: '/views/ResourceAdd/ResourceAdd?id=' + id,
        // })
      }
    })

  },
  //前往添加船舶
  toTravelTo() {
    wx.navigateTo({
      url: '/views/ResourcesAdmin/ResourcesAdmin?id=' + '115',
    })
  }
})