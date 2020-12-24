import User from '../../models/user/user'
Page({
    data: {
        activeIndex:0,
        tabbarStyle:'width: 30px; height: 18px;',
        tabBar:[
            {
                name:'聊天',
                icon:{
                    normal:'/images/my/MyFriend/lt@3x.png',
                    active:'/images/my/MyFriend/lt1@3x.png'
                }
            },
            {
                name:'通讯录',
                icon:{
                    normal:'/images/my/MyFriend/tx@3x.png',
                    active:'/images/my/MyFriend/tx1@3x.png'
                }
            }
        ],
        show:false
    },
    onShow: function () {
        this.getUserFriendList()
    },

    getUserFriendList(){
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {Authorization, page, rows};
        User.UserFriendsListL(params).then(res => {
            console.log(res)
        })
    },


     //点击底部导航
     handleClickTabbar(event){
        console.log(event)
        this.setData({
            activeIndex:event.detail
        })
        console.log(this.data.activeIndex)
        let activeIndex = this.data.activeIndex;
        if(activeIndex === 0){
            console.log(11111)
        }else{
            console.log(2222)
        }
    },

    //显示好友搜索框
    showSearchFriends(){
        this.setData({
            show:true
        })
    },
    onCloseAddress(){
        this.setData({
            show:false
        })
    },

    gotoChat(e){
        console.log(e)
        wx.navigateTo({
          url: '/views/chat/chat',
        })
    },
    handleAddUser(e){
        console.log(e)
    }
})