import upload from "../../models/upload/upload";
import User from "../../models/user/user";


Page({
  data: {
    setUpList: [{
      title: '头像',
      text: '请设置头像',
      avatar: 'https://activity.vtuzx.com/doc/vtuUI/weapp/avatar/1.png',
      id: '1111112'
    }, {
      title: '昵称',
      text: '请输入用户名称',
      id: '112124'
    }, {
      title: '手机绑定',
      text: '请绑定手机号',
      id: '1745236'
    }, {
      title: '登录密码',
      text: '请设置登录密码',
      id: '2288553'
    }],
    show: false,
    popupButton: [{
      text: '拍照'
    }, {
      text: '从手机相册选取'
    }, {
      text: '取消'
    }]
  },

  onShow: function () {
    this.getUserInfo()
  },
  getUserInfo() {
    let Authorization = wx.getStorageSync('Authorization');
    let page = 1;
    let rows = 10;
    let params = {
      Authorization,
      page,
      rows
    }
    User.userInfo(params).then(res => {
      let faceImage = res.data.data.faceImage;
      this.setData({
        ['setUpList[0].avatar']: faceImage
      })
    })

  },
  handSetUp(event) {
    let dataset = event.currentTarget.dataset;
    let index = dataset.index;
    if (index === 0) {
      this.setData({
        show: true
      });
    } else {
      wx.navigateTo({
        url: '/views/UserSettingsItem/UserSettingsItem?index=' + index,
      })
    }
  },
  handPopup(event) {
    let dataset = event.currentTarget.dataset;
    let index = dataset.index;
    switch (index) {
      case 0:
        console.log('拍照')
        this.handleCamera()
        break
      case 1:
        console.log('从手机相册选取')
        this.handlePhotoAlbum()
        break
      case 2:
        this.setData({
          show: false
        });
        break
    }
  },

  //相机功能
  handleCamera() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['camera'],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths[0];
        upload.upload.uploadFile(tempFilePaths).then(file => {
          let Authorization = wx.getStorageSync('Authorization');
          let faceImage = file;
          let params = {
            Authorization,
            faceImage
          };
          User.userEditorNickName(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
              wx.showToast({
                title: '头像修改成功',
                icon: 'success'
              })
              this.setData({
                show: false
              })
              this.getUserInfo()
            } else {
              wx.showToast({
                title: res.data.message,
              })
            }
          })
        })
      }
    })
  },
  //相册功能
  handlePhotoAlbum() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths[0];
        upload.upload.uploadFile(tempFilePaths).then(file => {
          let Authorization = wx.getStorageSync('Authorization');
          let faceImage = file;
          let params = {
            Authorization,
            faceImage
          };
          User.userEditorNickName(params).then(res => {
            console.log(res)
            if (res.data.state == 200) {
              wx.showToast({
                title: '头像修改成功',
                icon: 'success'
              })
              this.setData({
                show: false
              })
              this.getUserInfo()
            } else {
              wx.showToast({
                title: res.data.message,
              })
            }
          })
        })
      }
    })
  }
})