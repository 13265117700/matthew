import User from '../../models/user/user';
import WebSocket from '../../models/websocket/websocket';

Page({
    data: {
        receiverid:null,//接收者ID
        senderid:null,//发送者ID
        msg:'',//聊天信息
        bottom:0,
        value:'',//文本框内容
        talkContent:[],//聊天内容
        userInfo:null,
        state:false,
        // id:null,//货源ID
    },

    onLoad: function (options) {
        console.log(options)
        this.setData({
            receiverid:options.receiverid,
            senderid:options.senderid,
            id:options.id
        })

        this.WebSocketInit()
        this.specifiedDialog(options.state)
        this.getSendMsg(options.id)
    },

    //发送货源信息
    getSendMsg(id){
        let talkContent = this.data.talkContent;
        let Authorization = wx.getStorageSync('Authorization');
        let params = {Authorization,uId:''};
        console.log(params)

        if(id){
            User.userInfo(params).then(res => {
                let user = res.data.data;
                User.UserMtCargoQueryInfo({id}).then(cargo => {
                    Promise.all([cargo]).then(result => {
                        let cargoItem = result[0].data.data;
                        talkContent.push({
                            img:user.faceImage,
                            isMine:true,
                            cargoItem
                        })
                        console.log(talkContent)
                        this.setData({
                            talkContent
                        })
                    })
                })
            })

            
        }
    },

    //指定船东后弹出提示框
    specifiedDialog(state){
        if(state){
            this.setData({
                state
            })
        }
    },

    

    //监听websocket连接与接收信息
    WebSocketInit:function(){
        let senderId = this.data.senderid;//自己的ID
        let receiverId = this.data.receiverid;//对方的ID
        let msg = null;
        let action = 1;
        let params = {senderId,receiverId,msg,action}
        WebSocket.connectSocket(params)
        WebSocket.onSocketMessageCallback = this.onSocketMessageCallback;
    },

    //关闭websocket连接
    onUnload:function(){
        WebSocket.closeSocket()
    },

    //websocket通信接收信息
    onSocketMessageCallback:function(data){
        let dataContent = JSON.parse(data.data);
        console.log(dataContent)
        let msg = dataContent.chatMsg.msg;
        let senderId = dataContent.chatMsg.senderId
        let Authorization = wx.getStorageSync('Authorization');
        let talkContent = this.data.talkContent;
        let params = {Authorization,uId:senderId};
        User.userInfo(params).then(res => {
            console.log(res)
            let userInfo = res.data.data;
            talkContent.push({
                img:userInfo.faceImage,
                text:msg,
                isMine:false
            })
            this.setData({
                talkContent
            })
            console.log(talkContent)
        })
        
    }, 

    onShow: function () {
        this.getUserInfo();
        
    },

    //获取用户信息
    getUserInfo(){
        let Authorization = wx.getStorageSync('Authorization');
        let uId = '';
        User.userInfo({Authorization,uId}).then(res => {
            let user = res.data.data;
            console.log(user)
            if(user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' '){
                user.cargo = true;
            }else if(user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' '){
                user.car = true;
            }else if(user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' '){
                user.ship = true
            }
            this.setData({
                userInfo:user
            })
            console.log(this.data.userInfo)
        })
    },

    focusEven(e){
        // console.log(e)
        this.setData({
            bottom: e.detail.height *2
        })
    },
    blurEven(e){
        this.setData({
            bottom:0
        })
    },

    //聊天输入框
    handleInputValue(e){
        this.setData({
            msg:e.detail.value
        })
    },

    //聊天发送信息
    handleChatSend(){
        let Authorization = wx.getStorageSync('Authorization');
        let talkContent = this.data.talkContent;
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;
        let msg = this.data.msg;
        let action = 2;
        let params = {receiverId,senderId,msg,action }
        WebSocket.sendSocketMessage(params).then(data => {
            console.log(data)
            User.userInfo({Authorization,uId:data.senderId}).then(res => {
                console.log(res)
                let userInfo = res.data.data;
                talkContent.push({
                    img:userInfo.faceImage,
                    text:msg,
                    isMine:true
                })
                console.log(talkContent)
                this.setData({
                    talkContent,
                    value:''
                })
            })
        })
    },
    gotoCrewList(e){
        // let idenID = this.data.userInfo.idenID;
        let userInfo = this.data.userInfo;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        // console.log(idenID)
        if(userInfo.cargo === true){
            wx.navigateTo({
              url: '/views/cargoPeriod/cargoPeriod?senderid='+senderid+'&receiverid='+receiverid,
            })
        }else{
            wx.navigateTo({
                url: '/views/ShipPeriod/ShipPeriod?senderid='+senderid+'&receiverid='+receiverid,
            })
        }
        
    }
})