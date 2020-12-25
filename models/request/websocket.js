const websocket = (method, url, data, header) => {
    let params = {
        'Authorization': data.Authorization,
        'content-type':'application/x-www-form-urlencoded',
    }
    return new Promise((resolve, reject) => {
        wx.connectSocket({
          url: url,
          header:params,
          method,
          success:(res) => {
              console.log('创建连接成功')
            let socketOpen = false;
            let socketMsgQueue = [];
            wx.onSocketOpen(() => {
                socketOpen = true;
                console.log('websocket已打开');
                if(socketOpen){
                    // 发送消息
                    wx.sendSocketMessage({
                        data: data,
                        success:(res) => {
                            console.log('发送成功',res)
                            resolve(res)
                        },
                        fail:(err) => {
                            console.log('发送失败',err)
                            reject(err)
                        }
                    });
                }else{
                    // 接收消息
                    wx.onSocketMessage((result) => {
                        console.log('已收到信息',result)
                        resolve(result)
                    })
                }
            })
          },
          fail:(err) => {
              console.log('连接失败')
            reject(err)
          }
        })
    })
}

export default {
    post: function (url='', data, header={}) {
        return websocket('POST', url, data, header)
    },
    put: function (url='', data, header={}) {
        return websocket('PUT', url, data, header)
    },
    get: function (url, data, header={}) {
        return websocket('GET', url, data, header)
    },
    delete: function (url='', data, header={}) {
        return websocket('DELETE', url,header)
    }
}