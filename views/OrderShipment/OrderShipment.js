import User from '../../models/user/user';
import Upload from '../../models/upload/upload'
Page({
  data: {
    id: null, //订单ID
    transportStatus: null, //订单状态
    navbartitle: null, //导航条标题
    btutitle: null, //按钮标题
    processImg: [], //图片
    processContent: null, //补充内容
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  onShow: function () {
    this.getUserOrder()
  },

  //获取订单
  getUserOrder() {
    let id = this.data.id;
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization,
      id
    };

    User.UserOrderQuery(params).then(res => {
      let transportStatus = res.data.data.transportStatus;
      this.setData({
        transportStatus
      })
      this.pageStateSwitch(transportStatus)
    })
  },

  //页面状态切换
  pageStateSwitch(transportStatus) {
    console.log(transportStatus)
    switch (transportStatus) {
      case 0:
        this.setData({
          navbartitle: '船抵达装货港',
          btutitle: '确认船到装货港'
        })
        break
      case 1:
        this.setData({
          navbartitle: '上传订单跟踪',
          btutitle: '确认装好货'
        })
        break
      case 3:
        this.setData({
          navbartitle: '上传订单跟踪',
          btutitle: '确认卸货完成'
        })
        break
    }
  },

  //图片上传
  handShipChartUpload(e) {
    console.log(e)
    let file = e.detail.file;
    let filePath = file.url;
    Upload.upload.uploadFile(filePath).then(res => {
      let processImg = this.data.processImg;
      processImg.push({
        url: res
      })
      this.setData({
        processImg
      })
    })
  },
  //图片删除
  shipChartDel(e) {
    let index = e.detail.index;
    let processImg = this.data.processImg;
    processImg.splice(index, 1)
    this.setData({
      processImg
    })
  },
  //说明输入
  addedInput(e) {
    console.log(e)
    this.setData({
      processContent: e.detail
    })
  },

  //按钮事件
  addImageUpload() {
    let id = this.data.id;
    let transportStatus = this.data.transportStatus;
    let Authorization = wx.getStorageSync('Authorization');
    let processImg = [...(this.data.processImg.map(data => data.url))];
    let processContent = this.data.processContent;
    let params = {
      id,
      Authorization,
      processImg: processImg.toString(),
      processContent
    }
    console.log(params)
    User.UserShipUploadProcess(params).then(res => {
      console.log(res)
      if (res.data.state === 200) {
        if (transportStatus != 3) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({
            processShow: true
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            }, 1000)
          })
        }else{
          wx.navigateBack({
            delta: 1,
          })
        }

      }

    })

  }
})