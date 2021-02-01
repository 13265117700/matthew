import User from '../../models/user/user';
import WebSocket from '../../models/websocket/websocket';
import mtWharf from '../../models/frontEnd/mtWharf';
import userFriend from '../../models/userFriend/userFriend';

const App = getApp();

Page({
    data: {
        receiverid: null, //接收者ID
        senderid: null, //发送者ID
        msg: '', //聊天信息
        action: null, //连接枚举动作
        bottom: 0,
        value: '', //文本框内容
        talkContent: [], //聊天内容
        userInfo: null,
        state: false,
        resourcesID: null, //资源ID
        // id:null,//货源ID
    },

    onLoad: function (options) {
        this.setData({
            receiverid: options.receiverid,
            senderid: options.senderid,
            msg: options.msg,
            action: options.action
        })
        this.WebSocketInit()
    },


    //发送货源信息
    getSendMsg() {
        let id = this.data.resourcesID;
        let userInfo = App.globalData.userInfo;
        let talkContent = this.data.talkContent;
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;
        let action = this.data.action;
        let Authorization = wx.getStorageSync('Authorization');


        if (id) {
            if (userInfo.identityDifference == 2) {
                User.UserMtCargoQueryInfo({
                    id
                }).then(cargo => {
                    Promise.all([cargo]).then(result => {
                        let cargoItem = result[0].data.data;
                        talkContent.push({
                            img: userInfo.faceImage,
                            isMine: true,
                            cargoItem
                        })
                        let params = {
                            Authorization,
                            receiverId,
                            senderId,
                            msg: talkContent,
                            action
                        }

                        WebSocket.sendSocketMessage(params).then(data => {
                            console.log(data)
                        })
                        this.setData({
                            talkContent
                        })
                    })
                })
            } else {
                mtWharf.frontDeskShipPeriodItem({
                    id
                }).then(res => {
                    let shipItem = res.data.data;
                    let emptyDate = new Date(shipItem.emptyDate).toLocaleDateString();
                    shipItem.emptyDate = emptyDate.replace(/\//g, "-");
                    talkContent.push({
                        img: userInfo.faceImage,
                        isMine: true,
                        shipItem
                    })
                    let params = {
                        Authorization,
                        receiverId,
                        senderId,
                        msg: talkContent,
                        action
                    }
                    WebSocket.sendSocketMessage(params)
                    this.setData({
                        talkContent
                    })
                })
            }
        }
    },

    //指定船东后弹出提示框
    specifiedDialog(options) {
        if (options.state) {
            this.setData({
                state
            })
        }
    },

    //监听websocket连接与接收信息
    WebSocketInit: function () {
        let senderId = this.data.senderid; //自己的ID
        let receiverId = this.data.receiverid; //对方的ID
        let msg = this.data.msg;
        let action = this.data.action;
        let params = {
            senderId,
            receiverId,
            msg,
            action
        }
        console.log(params)
        WebSocket.connectSocket(params)
        WebSocket.onSocketMessageCallback = this.onSocketMessageCallback;
    },

    //关闭websocket连接
    onUnload: function () {
        WebSocket.closeSocket()
    },

    //websocket通信接收信息
    onSocketMessageCallback: function (data) {
        let dataContent = JSON.parse(data.data);
        let msg = dataContent.chatMsg.msg;
        let senderId = dataContent.chatMsg.senderId
        let Authorization = wx.getStorageSync('Authorization');
        let talkContent = this.data.talkContent;
        let params = {
            Authorization,
            uId: senderId
        };
        User.userInfo(params).then(res => {
            let userInfo = res.data.data;
            talkContent.push({
                img: userInfo.faceImage,
                text: msg,
                isMine: false
            })

            let chat = wx.getStorageSync('chatList')
            if (!chat) {
                let chatList = [];
                let usertalkContent = {
                    id: senderId,
                    talkContent
                }
                chatList.push(usertalkContent)
                wx.setStorageSync('chatList', chatList)
                this.setData({
                    talkContent
                })
            } else {
                chat.forEach(data => {
                    if (data.id == senderId) {
                        data.talkContent.push({
                            img: userInfo.faceImage,
                            text: msg,
                            isMine: false
                        })

                        this.setData({
                            talkContent: data.talkContent
                        })

                    }
                })

                wx.setStorageSync('chatList', chat)
            }
            console.log(chat)
        })

    },


    onShow: function () {
        this.getUserInfo();
        this.gettalkContent();
    },

    //获取用户信息
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        let uId = '';
        let receiverid = this.data.receiverid;
        let params = {
            Authorization,
            uId
        }
        User.userInfo(params).then(res => {
            let user = res.data.data;
            if (user.identityDifference == 2) {
                user.cargo = true;
            } else if (user.identityDifference == 3) {
                user.car = true;
            } else if (user.identityDifference == 1) {
                user.ship = true
            }
            this.setData({
                userInfo: user
            })

        })

        User.userInfo({
            Authorization,
            uId: receiverid
        }).then(res => {
            let rows = res.data.data;
            wx.setNavigationBarTitle({
                title: rows.nickName,
            })
        })

    },
    gettalkContent() {
        let chatList = wx.getStorageSync('chatList');
        let id = this.data.receiverid;
        console.log(chatList, id)
        if (chatList) {
            chatList.forEach(data => {
                if (data.id == id) {
                    console.log(data.talkContent)
                    this.setData({
                        talkContent: data.talkContent
                    })
                }
            })
        }

    },

    focusEven(e) {
        // console.log(e)
        this.setData({
            bottom: e.detail.height * 2
        })
    },
    blurEven(e) {
        this.setData({
            bottom: 0
        })
    },

    //聊天输入框
    handleInputValue(e) {
        this.setData({
            msg: e.detail.value
        })
    },

    //聊天发送信息
    handleChatSend() {
        let Authorization = wx.getStorageSync('Authorization');
        let talkContent = this.data.talkContent;
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;
        let msg = this.data.msg;
        let action = 2;
        let params = {
            receiverId,
            senderId,
            msg,
            action
        }

        WebSocket.sendSocketMessage(params).then(data => {
            User.userInfo({
                Authorization,
                uId: data.senderId
            }).then(res => {
                console.log(res)
                let userInfo = res.data.data;
                talkContent.push({
                    img: userInfo.faceImage,
                    text: msg,
                    isMine: true
                })

                let chat = wx.getStorageSync('chatList');

                if (!chat) {
                    let chatList = [];
                    let usertalkContent = {
                        id: receiverId,
                        talkContent
                    }
                    chatList.push(usertalkContent)
                    wx.setStorageSync('chatList', chatList)
                    this.setData({
                        talkContent,
                        value: '',
                        msg: ''
                    })
                } else {
                    chat.forEach(data => {
                        if (data.id == receiverId) {
                            data.talkContent.push({
                                img: userInfo.faceImage,
                                text: msg,
                                isMine: true
                            })
                            this.setData({
                                talkContent: data.talkContent,
                                value: '',
                                msg: ''
                            })
                        } else {
                            chat.push({
                                id: receiverId,
                                talkContent
                            })
                        }
                    })
                    console.log(chat)

                    wx.setStorageSync('chatList', chat)
                }
                console.log(chat)
            })
        })


    },
    gotoCrewList(e) {
        let userInfo = this.data.userInfo;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        this.setData({
            action: 4
        })
        this.WebSocketInit()
        if (userInfo.cargo === true) {
            wx.navigateTo({
                url: '/views/cargoPeriod/cargoPeriod?senderid=' + senderid + '&receiverid=' + receiverid,
            })
        } else {
            wx.navigateTo({
                url: '/views/ShipPeriod/ShipPeriod?senderid=' + senderid + '&receiverid=' + receiverid,
            })
        }
        // WebSocket.closeSocket()
    }
})