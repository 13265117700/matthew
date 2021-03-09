import User from '../../models/user/user';
import mtWharf from '../../models/frontEnd/mtWharf';
const {
  formatTime
} = require('../../utils/date')

Page({
  data: {
    shipList: [],
    id: null,
    typeShip: null, //船类型
    mtWharfId: null, //空船港ID
    tonnageLarge: null, //船最小值
    tonnageSmall: null, //船最大值
    emptyDateLarge: null, //空船期最小值
    emptyDateSmall: null, //空船期最大值
    state: null,
  },
  onLoad: function (options) {
    this.setData({
      id: Number(options.id)
    })
  },
  onShow: function () {
    this.getShipList();
  },
  //获取船期列表
  getShipList(nameVessel) {
    let Authorization = wx.getStorageSync('Authorization');
    let page = 1;
    let rows = 10;
    let state = this.data.state;
    let typeShip = this.data.typeShip;
    let mtWharfId = this.data.mtWharfId;
    let tonnageLarge = this.data.tonnageLarge;
    let tonnageSmall = this.data.tonnageSmall;
    let emptyDateLarge = this.data.emptyDateLarge;
    let emptyDateSmall = this.data.emptyDateSmall;

    let params = {
      page,
      rows
    };

    if (nameVessel) params = {
      nameVessel,
      page,
      rows
    };

    if (state) {
      if (typeShip) {
        mtWharfId = null;
        tonnageLarge = null;
        tonnageSmall = null;
        emptyDateLarge = null;
        emptyDateSmall = null;
        params = {
          typeShip: typeShip.name,
          page,
          rows
        }
      } else if (mtWharfId) {
        typeShip = null;
        tonnageLarge = null;
        tonnageSmall = null;
        emptyDateLarge = null;
        emptyDateSmall = null;
        params = {
          mtWharfId,
          page,
          rows
        }
      } else if (tonnageLarge || tonnageSmall) {
        typeShip = null;
        mtWharfId = null;
        emptyDateLarge = null;
        emptyDateSmall = null;
        params = {
          tonnageLarge,
          tonnageSmall,
          page,
          rows
        }
      } else if (emptyDateLarge || emptyDateSmall) {
        typeShip = null;
        mtWharfId = null;
        tonnageLarge = null;
        tonnageSmall = null;
        params = {
          emptyDateLarge,
          emptyDateSmall,
          page,
          rows
        }
      } else {
        params = {
          typeShip: typeShip.name,
          mtWharfId,
          tonnageLarge,
          tonnageSmall,
          emptyDateLarge,
          emptyDateSmall,
          page,
          rows
        }
      }
    };

    console.log(params)

    mtWharf.frontDeskShipPeriodList(params).then(res => {
      let rows = res.data.data.rows;
      let shipList = []
      rows.forEach(data => {
        data.emptyDate = formatTime(new Date(data.emptyDate));
        let collegeId = data.mtShip.id; //船的ID
        User.UserShipWhetherFocusOn({
          Authorization,
          collegeId
        }).then(focus => {
          Promise.all([focus]).then(result => {
            let focusStatus = result[0].data.data;
            data.focusStatus = focusStatus;
            shipList.push(data)
            this.setData({
              shipList
            })
          })
        })
      })
    })

  },
  //输入搜索
  handleSearch(e) {
    let nameVessel = e.detail;
    this.getShipList(nameVessel)
    this.setData({
      state: null
    })
  },
  //船期关注
  handleShipFocus(e) {
    console.log(e)
    // let shipList = this.data.shipList;
    let Authorization = wx.getStorageSync('Authorization');
    let shipId = e.currentTarget.dataset.id;
    let id = shipId;
    let status = e.currentTarget.dataset.status;
    let index = e.currentTarget.dataset.index;
    let params = {
      Authorization,
      shipId
    }
    console.log(params)
    if (status != true) {
      User.UserShipFocus(params).then(res => {
        console.log(res)
        if (res.data.state === 200) {
          this.setData({
            [`shipList[${index}].focusStatus`]: true
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
      User.UserShipCancelFocus({
        Authorization,
        id
      }).then(res => {
        if (res.data.state === 200) {
          this.setData({
            [`shipList[${index}].focusStatus`]: false
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
  //船期筛选
  handleSidebar() {
    let id = this.data.id;
    wx.navigateTo({
      url: '/views/Screening/Screening?id=' + id,
    })
  },
  handleShipDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/views/shipDateDetails/shipDateDetails?id=' + id,
    })
  }
})