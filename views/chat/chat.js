import User from '../../models/user/user';
import WebSocket from '../../models/websocket/websocket';
import mtWharf from '../../models/frontEnd/mtWharf';
import userFriend from '../../models/userFriend/userFriend';


Page({
    data: {
        scrollTop: 0, //控制上滑距离
        windowHeight: 0, //页面高度
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
        total: [], //未读
    },

    onLoad: function (options) {
        this.setData({
            receiverid: options.receiverid,
            senderid: options.senderid,
            msg: options.msg,
            action: options.action
        })
    //    this.gettalkContent()
    },

    onShow: function () {
        this.getUserInfo();
        this.WebSocketInit();
    },
    onHide: function () {
        WebSocket.closeSocket()
    },

    onReady: function () {
        let height = wx.getSystemInfoSync().windowHeight;
        this.setData({
            windowHeight: height
        })
        this.pageScrollToBottom()
    },

    // 获取容器高度，使页面滚动到容器底部
    pageScrollToBottom: function () {
        let that = this;
        let height = wx.getSystemInfoSync().windowHeight;
        wx.createSelectorQuery().select('#chat-record').boundingClientRect(function (rect) {
            if (rect) {
                that.setData({
                    windowHeight: height,
                    scrollTop: rect.height
                })
            }
        }).exec()

    },


    //发送货源信息
    getSendMsg() {
        this.WebSocketInit()

        let id = this.data.resourcesID;
        let userInfo = this.data.userInfo;
        let talkContent = this.data.talkContent;
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;

        User.UserMtCargoQueryInfo({
            id
        }).then(cargo => {
            Promise.all([cargo]).then(result => {
                let cargoItem = result[0].data.data;

                let obj = {
                    loadingDate: cargoItem.loadingDate,
                    portArrivalAddress: cargoItem.portArrivalAddress,
                    portDepartureAddress: cargoItem.portDepartureAddress,
                    name: cargoItem.mtNameGoods.name,
                    number: cargoItem.number
                }

                let params = {
                    receiverId,
                    senderId,
                    msg: JSON.stringify(obj),
                    action: 2
                }

                talkContent.push({
                    img: userInfo.faceImage,
                    cargoItem: obj,
                    isMine: true,
                })

                WebSocket.sendSocketMessage(params)

                this.setData({
                    talkContent
                })

                this.SaveChatLogs()
                this.pageScrollToBottom() //聊天始终显示最底部

            })
        })
    },
    //发送船源信息
    getShipSenMsg() {
        this.WebSocketInit()
        let id = this.data.resourcesID;
        let userInfo = this.data.userInfo;
        let talkContent = this.data.talkContent;
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;

        mtWharf.frontDeskShipPeriodItem({
            id
        }).then(ship => {
            Promise.all([ship]).then(result => {
                let shipItem = result[0].data.data;
                let emptyDate = new Date(shipItem.emptyDate).toLocaleDateString();
                shipItem.emptyDate = emptyDate.replace(/\//g, "-");

                let obj = {
                    nameVessel: shipItem.mtShip.nameVessel,
                    emptyDate: shipItem.emptyDate
                }

                let params = {
                    receiverId,
                    senderId,
                    msg: JSON.stringify(obj),
                    action: 2
                }

                talkContent.push({
                    img: userInfo.faceImage,
                    shipItem: obj,
                    isMine: true,
                })

                WebSocket.sendSocketMessage(params)

                this.setData({
                    talkContent
                })
                this.SaveChatLogs()
                this.pageScrollToBottom() //聊天始终显示最底部
            })

        })
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
        let params = {
            senderId,
            receiverId,
            msg,
            action: 1
        }

        WebSocket.connectSocket(params)
        WebSocket.onSocketMessageCallback = this.onSocketMessageCallback;
    },

    //关闭websocket连接
    onUnload: function () {
        WebSocket.closeSocket()
    },

    //websocket通信接收信息
    onSocketMessageCallback: function (data) {
        console.log(data)
        let dataContent = JSON.parse(data.data);
        let msg = dataContent.chatMsg.msg;
        try {
            if (typeof JSON.parse(msg) == 'object') {
                msg = JSON.parse(msg)
            }
        } catch (e) {
            console.log(e)
        }

        let senderId = dataContent.chatMsg.senderId
        let Authorization = wx.getStorageSync('Authorization');
        let talkContent = this.data.talkContent;
        let params = {
            Authorization,
            uId: senderId
        };
        User.userInfo(params).then(res => {
            let userInfo = res.data.data;
            let state = typeof msg == 'object';

            if (state) {
                if (msg) {
                    if (msg.emptyDate) {
                        talkContent.push({
                            img: userInfo.faceImage,
                            shipItem: msg,
                            isMine: false
                        })
                    } else {
                        talkContent.push({
                            img: userInfo.faceImage,
                            cargoItem: msg,
                            isMine: false
                        })
                    }
                }
            } else {
                if (msg) {
                    talkContent.push({
                        img: userInfo.faceImage,
                        text: msg,
                        isMine: false
                    })
                }
            }

            this.setData({
                talkContent
            })
            this.SaveChatLogs();
            this.pageScrollToBottom(); //聊天始终显示最底部

        })

    },


    //获取用户信息
    getUserInfo() {
        let Authorization = wx.getStorageSync('Authorization');
        let receiverid = this.data.receiverid;
        let params = {
            Authorization,
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

    //初始化聊天记录
    gettalkContent() {
        let Authorization = wx.getStorageSync('Authorization');
        let id = this.data.receiverid;
        let senderId = this.data.senderid;
        let page = 1;
        console.log(Authorization)
        let total = []
        User.userInfo({
            Authorization,
            uId: id
        }).then(res => {
            let user = res.data.data;

            userFriend.UserFriendChatMsg({
                Authorization,
                page,
                rows: 10,
                senderId: id
            }).then(unread => {
                Promise.all([unread]).then(result => {
                    let rows = result[0].data.data.rows;
                    let msgId = rows.map(a => a.id);
                    console.log(msgId)
                    // let params = {
                    //     receiverId:id,
                    //     senderId,
                    //     msg:null,
                    //     msgId:msgId,
                    //     action: 3
                    // }
                    // WebSocket.sendSocketMessage(params)
                    rows.forEach(data => {
                        if (data.msg) {
                            let msg = data.msg;
                            // console.log(total)
                            // console.log(data)
                            try {
                                if (typeof JSON.parse(msg) == 'object') {
                                    msg = JSON.parse(msg)
                                }
                            } catch (e) {

                            }
                            chatList.forEach(chat => {
                                if (chat.id == data.senderId) {
                                    let state = typeof msg == 'object';
                                    if (state) {
                                        if (msg.emptyDate) {
                                            chat.talkContent.push({
                                                img: user.faceImage,
                                                shipItem: msg,
                                                isMine: false
                                            })
                                        } else {
                                            chat.talkContent.push({
                                                img: user.faceImage,
                                                cargoItem: msg,
                                                isMine: false
                                            })
                                        }
                                    } else {
                                        chat.talkContent.push({
                                            img: user.faceImage,
                                            text: msg,
                                            isMine: false
                                        })
                                    }
                                }
                            })

                        }
                    })

                    // console.log(rows)
                    // console.log(chatList)
                    this.pageScrollToBottom()
                })

            })

        })




    },

    focusEven(e) {
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
        let params = {
            receiverId,
            senderId,
            msg,
            action: 2
        }

        WebSocket.sendSocketMessage(params).then(data => {
            User.userInfo({
                Authorization,
                uId: data.senderId
            }).then(res => {
                let userInfo = res.data.data;
                talkContent.push({
                    img: userInfo.faceImage,
                    text: msg,
                    isMine: true
                })

                this.setData({
                    talkContent,
                    value: '',
                    msg: ''
                })
                this.SaveChatLogs();
                this.pageScrollToBottom(); //聊天始终显示最底部

            })
        })

    },
    gotoCrewList(e) {
        let userInfo = this.data.userInfo;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
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
    },

    //储存聊天记录
    SaveChatLogs() {
        let chat = wx.getStorageSync('chatList');
        let talkContent = this.data.talkContent;
        let receiverId = this.data.receiverid;
        console.log(receiverId)
        let usertalkContent = {
            id: receiverId,
            talkContent
        }

        if (!chat) {
            let chatList = [];
            chatList.push(usertalkContent)
            wx.setStorageSync('chatList', chatList)
        } else {
            let chatitem = {}
            chat.forEach(data => {
                if (data.id == receiverId) {
                    data.talkContent = talkContent
                    chatitem = data
                }
            })

            if (chatitem.id != receiverId) {
                chat.push(usertalkContent)
            }

            wx.setStorageSync('chatList', chat)
        }

    }
})