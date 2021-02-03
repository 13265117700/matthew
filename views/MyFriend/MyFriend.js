

Page({
    data: {
        activeIndex: 0,
        tabbarStyle: 'width: 30px; height: 18px;',
        tabBar: [{
                name: '聊天',
                icon: {
                    normal: '/images/my/MyFriend/lt@3x.png',
                    active: '/images/my/MyFriend/lt1@3x.png'
                }
            },
            {
                name: '通讯录',
                icon: {
                    normal: '/images/my/MyFriend/tx@3x.png',
                    active: '/images/my/MyFriend/tx1@3x.png'
                }
            }
        ],
    },



    onShow: function () {
        this.UserUnreadChatInfo()
        
    },

    //点击底部导航
    handleClickTabbar(event) {
        this.setData({
            activeIndex: event.detail
        })

        let activeIndex = this.data.activeIndex;
        if (activeIndex === 0) {
            wx.setNavigationBarTitle({
                title: '消息中心',
            })
            this.UserUnreadChatInfo()
        } else {
            wx.setNavigationBarTitle({
                title: '好友',
            })
            this.getUserFriendList()
        }
    },
    UserUnreadChatInfo() {
        const child = this.selectComponent('#new-msg');
        child.UserUnreadChatInfo()
    },

    getUserFriendList() {
        const child = this.selectComponent('#my-friend');
        child.getUserFriendList()
    },

    onPullDownRefresh: function () {
        let activeIndex = this.data.activeIndex;
        wx.showNavigationBarLoading()
        console.log(activeIndex)
        if (activeIndex == 0) {
            setTimeout(() => {
                const child = this.selectComponent('#new-msg');
                child.UserUnreadChatInfo()
                wx.stopPullDownRefresh();
            }, 1000)
        } else {
            setTimeout(() => {
                const child = this.selectComponent('#my-friend');
                child.getUserFriendList()
                wx.stopPullDownRefresh();
            }, 1000)
        }
    }

})