import startWebSocket from "./startWebSocket";

const websocket = (method, url, data, header) => {
    let socketOpen = false
    return new Promise((resolve, reject) => {
        wx.connectSocket({
          url: url,
          success:(res) => {
              console.log(res,'连接成功')
            wx.onSocketOpen((result) => {
                socketOpen = true
                if(socketOpen){
                    let senderId = data.senderId;
                    let receiverId = data.receiverId;
                    let msg = data.msg;
                    let action = data.action;

                    //构建chatMsg
                    let chatMsg = new startWebSocket.ChatMsg(senderId,receiverId,msg,null);
                    
                    // 构建DataContent
                    let dataContent = new startWebSocket.DataContent(action, chatMsg, null)

                    //发送数据
                    wx.sendSocketMessage({
                      data: JSON.stringify(dataContent),
                      success:(res) => {
                        console.log(res,'发送成功')
                      },
                      fail:(err) => {
                          console.log(err)
                      }
                    })
                }
            })
          },
          fail:(err) => {
              reject(err,'连接失败')
          }
        })

        wx.onSocketMessage((data) => {
            console.log(data)
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