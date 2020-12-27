import User from '../../models/user/user';
import CHAT from '../../models/userChat/userChat';
import AAA from '../../models/request/aaabbbb'
Page({
    data: {
        receiverid:null,
        senderid:null,
        msg:null,
        bottom:0,
        talkContent:[
            { 
                img:'/images/my/MyFriend/add.png',
                text:'你好，可以认识一下吗？',
                isMine:false
            },
            {
                img:'/images/my/MyFriend/add.png',
                text:'我叫****靓女',
                isMine:false
            },
            {
                img:'/images/my/ye@3x.png',
                text:'你好，很高兴认识你****靓女',
                isMine:true
            },
            {
                img:'/images/my/ye@3x.png',
                text:'平时有什么爱好',
                isMine:true
            },
            {
                img:'/images/my/MyFriend/add.png',
                text:'喜欢看书',
                isMine:false
            }
        ],
        userInfo:null
    },

    onLoad: function (options) {
        this.setData({
            receiverid:options.receiverid,
            senderid:options.senderid
        })
        this.WebSocketInit()
    },

    WebSocketInit(){
        let action = 1;
        let senderid = this.data.senderid;
        let receiverid = this.data.receiverid;
        let msgId = null;
        let msg = null;
        let params = {action,senderid,receiverid,msgId,msg}
        AAA.startWebSocket(params)
        // CHAT.UserFriendChat(params).then(res => {
        //     console.log(res)
        // })

    },

    onShow: function () {
        // this.getUserInfo()
    },
    // getUserInfo(){
    //     let Authorization = wx.getStorageSync('Authorization');
    //     let uId = '';
    //     User.userInfo({Authorization,uId}).then(res => {
    //         let user = res.data.data;
    //         if(user.mtCargoOwner.idNumber != null && user.mtCargoOwner.idNumber != ' '){
    //             user.idenID = user.mtCargoOwner.id;
    //         }else if(user.mtOwner.idNumber != null && user.mtOwner.idNumber != ' '){
    //             user.idenID = user.mtOwner.id;
    //         }else if(user.mtShipowner.idNumber != null && user.mtShipowner.idNumber != ' '){
    //             user.idenID = user.mtShipowner.id;
    //         }
    //         this.setData({
    //             userInfo:user
    //         })
    //         console.log(this.data.userInfo)
    //     })
    // },
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
    handleInputValue(e){
        this.setData({
            msg:e.detail.value
        })
    },
    handleChatSend(){
        let Authorization = wx.getStorageSync('Authorization');
        let receiverId = this.data.receiverid;
        let senderId = this.data.senderid;
        let msgId = this.data.senderid;
        let msg = this.data.msg;
        let action = 2;
        let param = { Authorization,receiverId,senderId,msg,msgId,action }
        // console.log(param)
        CHAT.UserFriendChat(param).then(res => {
            console.log(res)
        })
    },
    // gotoCrewList(e){
    //     console.log(e)
    //     let idenID = this.data.userInfo.idenID;
    //     wx.navigateTo({
    //       url: '/views/FindResources/FindResources?idenID='+idenID,
    //     })
    //     console.log(idenID)
    // }
})