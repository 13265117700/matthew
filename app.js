import WebSocket from "./models/websocket/websocket";
import User from "./models/user/user";

App({
  onLaunch: function () {
    // this.WebSocketInit()
  },
  WebSocketInit: function () {
    console.log(123)
    let Authorization = wx.getStorageSync('Authorization');
    let params = {
      Authorization
    }
    if (Authorization) {
      User.userInfo(params).then(res => {
        console.log(res)
        let rows = res.data.data;
        let senderid = rows.uid;
        WebSocket.connectSocket({
          senderid,
          action: 1
        })
        WebSocket.onSocketMessageCallback = this.onSocketMessageCallback;
      })

    }
  },
  onSocketMessageCallback: function (data) {
    console.log(data)

  },

  globalData: {
    userInfo: {}
  }
})