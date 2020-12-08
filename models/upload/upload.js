import api from '../request/api';

const upload = {
    chooseImage:function(){
        return new Promise((resolve, reject) => {
            let itemList = ['拍照','从相册中选择'];
            wx.showActionSheet({
                itemList: itemList,
                success:(res) => {
                    if(res.tapIndex === 0){
                        wx.chooseImage({
                          count: 1,
                          sizeType:['original'],
                          sourceType:['camera'],
                          success:(res) => {
                            let tempFilePaths = res.tempFilePaths[0];
                            wx.uploadFile({
                                filePath: tempFilePaths,
                                name: 'file',
                                url: api.upload,
                                formData:{
                                    'name':'file'
                                },
                                success:(res) => {
                                    let data = JSON.parse(res.data).name
                                    resolve(data)
                                }
                            })
                          },
                          fail:(error) => {
                              reject(error)
                          }
                        })
                    } else {
                        wx.chooseImage({
                          count: 1,
                          sizeType:['original'],
                          sourceType:['album'],
                          success:(res) => {
                            let tempFilePaths = res.tempFilePaths[0];
                            wx.uploadFile({
                                filePath: tempFilePaths,
                                name: 'file',
                                url: api.upload,
                                formData:{
                                    'name':'file'
                                },
                                success:(res) => {
                                    let data = JSON.parse(res.data).name
                                    resolve(data)
                                }
                            })
                          },
                          fail:(error) => {
                              reject(error)
                          }
                        })
                    }
                }
            })
        })
    }
}

export default {
    upload
}