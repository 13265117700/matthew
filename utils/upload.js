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
                              console.log(res.tempFilePaths)
                              resolve(res.tempFilePaths[0])
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
                              resolve(res.tempFilePaths[0])
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