import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf';

Page({
  data: {
    cargoList: [],
    id: null,
    cargoName: null, //货物名
    numberLarge: null, //货物最小值
    numberSmall: null, //货物最大值
    portArrivalId: null, //到达港
    portDepartureId: null, //起运港
    state: null,
  },

  onLoad: function (options) {
    this.setData({
      id: Number(options.id)
    })
  },

  onShow: function () {
    this.getCargoList();
  },
  //获取货源列表
  getCargoList(nameVessel) {
    let Authorization = wx.getStorageSync('Authorization');
    let page = 1;
    let rows = 10;
    let state = this.data.state;
    let cargoName = this.data.cargoName;
    let numberLarge = this.data.numberLarge;
    let numberSmall = this.data.numberSmall;
    let portArrivalId = this.data.portArrivalId;
    let portDepartureId = this.data.portDepartureId;

    let params = {
      page,
      rows
    }

    if (nameVessel) params = {
      name: nameVessel,
      page,
      rows
    };

    if (state) {
      if (cargoName) {
        numberLarge = null;
        numberSmall = null;
        portArrivalId = null;
        portDepartureId = null;
        params = {
          name: cargoName.name,
          page,
          rows
        }
      } else if (numberLarge || numberSmall) {
        cargoName = null;
        portArrivalId = null;
        portDepartureId = null;
        params = {
          numberLarge,
          numberSmall,
          page,
          rows
        }
      } else if (portArrivalId || portDepartureId) {
        cargoName = null;
        numberLarge = null;
        numberSmall = null;
        params = {
          portArrivalId,
          portDepartureId,
          page,
          rows
        }
      } else {
        params = {
          name: cargoName.name,
          numberLarge,
          numberSmall,
          portArrivalId,
          portDepartureId,
          page,
          rows
        }
      }
    }
    console.log(params)

    mtWharf.frontDeskCargoFocusOn(params).then(res => {
      let rows = res.data.data.rows;
      let cargoList = [];
      if (rows.length != 0) {
        rows.forEach(data => {
          let collegeId = data.id;
          User.UserCargoFocusOn({
            Authorization,
            collegeId
          }).then(focus => {
            console.log(focus)
            Promise.all([focus]).then(result => {
              let focusStatus = result[0].data.data;
              data.focusStatus = focusStatus;
              cargoList.push(data)
              this.setData({
                cargoList
              })
              console.log(cargoList)
            })
          })
        })
      } else {
        this.setData({
          cargoList: rows
        })
      }

    })

  },

  //货关注
  handleCargoFocus(e) {
    let Authorization = wx.getStorageSync('Authorization');
    let status = e.currentTarget.dataset.status;
    let index = e.currentTarget.dataset.index;
    let shipId = e.currentTarget.dataset.id;
    let params = {
      Authorization,
      shipId
    }
    if (status != true) {
      User.UserCargoFocus(params).then(res => {
        console.log(res)
        if (res.data.state == 200) {
          this.setData({
            [`cargoList[${index}].focusStatus`]: true
          })
          wx.showToast({
            title: '关注成功',
            icon: 'success'
          })

        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading'
          })
        }
      })
    } else {
      User.UserCargoCancelFocus({
        Authorization,
        id: shipId
      }).then(res => {
        console.log(res)
        if (res.data.state == 200) {
          this.setData({
            [`cargoList[${index}].focusStatus`]: false
          })
          wx.showToast({
            title: '成功取消关注',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading'
          })
        }
      })
    }

  },

  //输入搜索
  handleSearch(e) {
    let nameVessel = e.detail;
    this.setData({
      state: null
    })
    this.getCargoList(nameVessel)
  },
  //货源筛选
  handleSidebar() {
    let id = this.data.id;
    wx.navigateTo({
      url: '/views/Screening/Screening?id=' + id,
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
})