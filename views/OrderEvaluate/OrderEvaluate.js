import User from "../../models/user/user";
import upload from "../../models/upload/upload";


Page({
  data: {
    buttonStyle: 'max-width: 255px;height: 50px;border-radius: 10px;',
    id: null, //订单ID
    userInfo: {},
    orderInfo: {}, //订单信息

    rateValue: 1, //评分值
    value: '', //文本输入值
    imageList: [], //照片
    video: '', //视频
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
    this.getUserInfo();
    this.getOrderInfo();
  },
  getUserInfo() {
    let Authorization = wx.getStorageSync('Authorization');
    User.userInfo({
      Authorization
    }).then(res => {
      let userInfo = res.data.data;
      this.setData({
        userInfo
      })
    })
  },
  getOrderInfo() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      id
    }
    User.UserOrderQuery(params).then(res => {
      let orderInfo = res.data.data;
      this.setData({
        orderInfo
      })
    })
  },

  //评分
  handleRate(event) {
    console.log(event)
    this.setData({
      rateValue: event.detail
    })
  },
  //评论输入文本
  handleInput(event) {
    this.setData({
      value: event.detail
    })
  },
  //添加图片
  handImgUpload(event) {
    const {
      file
    } = event.detail;
    let filePath = file.url;
    upload.upload.uploadFile(filePath).then(res => {
      let imageList = this.data.imageList;
      imageList.push({
        url: res
      })
      this.setData({
        imageList
      })
    })


  },
  //删除图片
  shipImgDel(e) {
    let index = e.detail.index;
    let imageList = this.data.imageList;
    imageList.splice(index, 1)
    this.setData({
      imageList
    })
  },
  //视频上传
  handleVideo(e) {
    upload.upload.chooseVideo().then(res => {
      this.setData({
        video: res.name
      })
    })
  },
  //确认提交按钮
  handleConfirm() {
    let userInfo = this.data.userInfo;
    let id = this.data.id;
    if (userInfo.identityDifference == 2) {
      this.cargoEvaluation(id)
    } else if (userInfo.identityDifference == 1) {
      this.shipEvaluation(id)
    }
  },

  cargoEvaluation(id) {
    let Authorization = wx.getStorageSync('Authorization');
    let secore = this.data.rateValue;
    let scoringNotes = this.data.value;
    let params = {
      Authorization,
      id,
      secore,
      scoringNotes
    }
    console.log(params)
    User.UserCargoEvaluation(params).then(res => {
      console.log(res)
      if (res.data.state) {
        wx.showLoading({
          title: '评价成功',
        })
        setTimeout(function () {
          wx.hideLoading()
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })

  },

  //船东评价
  shipEvaluation(id) {
    let Authorization = wx.getStorageSync('Authorization');
    let secore = this.data.rateValue;
    let scoringNotes = this.data.value;
    let params = {
      Authorization,
      id,
      secore,
      scoringNotes
    };

    User.UserShipEvaluation(params).then(res => {
      console.log(res)
      if (res.data.state) {
        wx.showLoading({
          title: '评价成功',
        })
        setTimeout(function () {
          wx.hideLoading()
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.message,
        })
      }
    })


  }
})