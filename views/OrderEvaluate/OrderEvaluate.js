import User from "../../models/user/user";
import upload from "../../models/upload/upload";


Page({
  data: {
    buttonStyle: 'max-width: 255px;height: 50px;border-radius: 10px;',
    id: null, //订单ID
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
    this.getOrderInfo();
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
        video:res.name
      })
    })
  },
  //确认提交按钮
  handleConfirm() {
    console.log(23123)
    
  }
})