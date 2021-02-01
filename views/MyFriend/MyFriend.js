

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
    // //获取我的好友列表
    // getUserFriendList() {
    //     let Authorization = wx.getStorageSync('Authorization');
    //     let page = 1;
    //     let rows = 10;
    //     let params = {
    //         Authorization,
    //         page,
    //         rows
    //     };
    //     userFriend.UserFriendsListL(params).then(res => {
    //         console.log(res)
    //         let myFriendList = res.data.data.rows;
    //         let total = res.data.data.total;
    //         this.setData({
    //             myFriendList,
    //             total
    //         })

    //     });
    // },
    // handleuserFriendSearch(e) {
    //     let value = e.detail;
    //     // if (value) {
    //     //     let myFriendList = this.data.myFriendList;
    //     //     let friend = []
    //     //     if (/^1[34578]\d{9}$/.test(value)) {
    //     //         myFriendList.forEach(data => {
    //     //             if (data.myFriendUser.phone == value) {
    //     //                 friend.push(data)
    //     //             }
    //     //         })
    //     //     } else {
    //     //         myFriendList.forEach(data => {
    //     //             console.log(data)
    //     //             if (data.myFriendUser.nickName == value) {
    //     //                 friend.push(data)
    //     //             }
    //     //         })
    //     //     }
    //     //     this.setData({
    //     //         myFriendList: friend
    //     //     })
    //     // } else {
    //     //     this.getUserFriendList()
    //     // }
    // },
    // //显示好友搜索框
    // showSearchFriends() {
    //     wx.setNavigationBarTitle({
    //         title: '添加好友',
    //     })
    //     this.setData({
    //         friendQequest: false,
    //         show: true
    //     })
    //     this.getUserFriendapply()
    // },
    // //用户搜索未添加好友
    // getUserFriendSearch(e) {
    //     let value = e.detail;
    //     let page = 1;
    //     let rows = 10;

    //     if (/^1[34578]\d{9}$/.test(value)) {
    //         let params = {
    //             page,
    //             rows,
    //             phone: value
    //         }
    //         userFriend.UserFriendSearch(params).then(res => {
    //             let searchOf = res.data.data;
    //             searchOf.rows.forEach(data => {
    //                 data.addstate = false
    //             })
    //             console.log(searchOf)
    //             this.setData({
    //                 searchOf,
    //                 friendQequest: false,
    //             })
    //         })
    //     } else {
    //         let params = {
    //             page,
    //             rows,
    //             nickName: value
    //         }
    //         userFriend.UserFriendSearch(params).then(res => {
    //             let searchOf = res.data.data;
    //             searchOf.rows.forEach(data => {
    //                 data.addstate = false
    //             })
    //             console.log(searchOf)
    //             this.setData({
    //                 searchOf,
    //                 friendQequest: false,
    //             })
    //         })
    //     }
    // },
    // //申请添加好友
    // handleAddFriend(e) {
    //     console.log(e)
    //     let acceptUserId = e.currentTarget.dataset.id;
    //     let index = e.currentTarget.dataset.index;
    //     let searchOf = this.data.searchOf;

    //     searchOf.rows[index].addstate = true

    //     let Authorization = wx.getStorageSync('Authorization');
    //     let params = {
    //         Authorization,
    //         acceptUserId
    //     };
    //     userFriend.UserFriendRequest(params).then(res => {
    //         console.log(res)
    //         if (res.data.state === 200) {

    //             wx.showToast({
    //                 title: '申请成功,请等待同意',
    //             })
    //             this.setData({
    //                 searchOf
    //             })
    //         } else {
    //             wx.showToast({
    //                 title: res.data.message,
    //                 icon: 'loading',
    //             })
    //             this.setData({
    //                 searchOf
    //             })
    //         }
    //     })
    // },
    // //显示好友申请列表
    // newFriendAgreeShow() {
    //     wx.setNavigationBarTitle({
    //         title: '新的好友',
    //     })
    //     this.setData({
    //         show: true,
    //         friendQequest: true
    //     })
    //     this.getUserFriendapply()
    // },
    // // 获取好友申请列表
    // getUserFriendapply() {
    //     let friendQequest = this.data.friendQequest;
    //     if (friendQequest) {
    //         let Authorization = wx.getStorageSync('Authorization');
    //         console.log(Authorization)
    //         let page = 1;
    //         let rows = 10;
    //         let params = {
    //             Authorization,
    //             page,
    //             rows
    //         }
    //         userFriend.UserFriendRequestList(params).then(res => {
    //             console.log(res)
    //             let searchOf = res.data.data;
    //             this.setData({
    //                 searchOf
    //             })
    //             console.log(this.data.searchOf)
    //         })
    //     } else {
    //         this.setData({
    //             searchOf: []
    //         })
    //     }
    // },
    // //打开验证
    // verifyCurrentItem(e) {
    //     console.log(e)
    //     let index = e.currentTarget.dataset.index;
    //     let sendUserId = e.currentTarget.dataset.id;
    //     let searchOf = this.data.searchOf;
    //     let VerifyItemInfo = searchOf.rows[index];

    //     wx.setNavigationBarTitle({
    //         title: '验证详情',
    //     })

    //     this.setData({
    //         sendUserId,
    //         VerifyItemInfo,
    //         VerifyShow: true,
    //         show: false
    //     })

    // },
    // //确认验证信息
    // handleVerifyItemButton(e) {
    //     let Authorization = wx.getStorageSync('Authorization');
    //     let sendUserId = this.data.sendUserId;
    //     let state = e.currentTarget.dataset.status;
    //     let params = {
    //         Authorization,
    //         sendUserId,
    //         state
    //     }
    //     console.log(params)
    //     userFriend.UserFriendVerification(params).then(res => {
    //         console.log(res)
    //         if (res.data.state === 200) {
    //             wx.showToast({
    //                 title: '成功添加好友',
    //             })
    //             this.setData({
    //                 VerifyShow: false,
    //                 show: false
    //             })
    //         }
    //     })
    // },
    // //关闭弹框
    // onCloseAddress() {
    //     console.log('关闭')
    //     wx.setNavigationBarTitle({
    //         title: '好友',
    //     })
    //     this.setData({
    //         show: false,
    //         VerifyShow: false,
    //         value: ''
    //     })
    // },

    // //用户未读好友聊天信息
    // UserUnreadChatInfo() {
    //     let Authorization = wx.getStorageSync('Authorization');
    //     let page = 1;
    //     let rows = 10;
    //     let params = {
    //         Authorization,
    //         page,
    //         rows
    //     };
    //     // userFriend.UserFriendChatMsg(params).then(res => {
    //     //     let rows = res.data.data.rows;
    //     //     console.log(rows)
    //     //     // let unreadChatInfo = [];
    //     //     // rows.forEach((data,index) => {
    //     //     //     console.log(data)
    //     //     // })
    //     //     this.setData({
    //     //         unreadChatInfo:rows
    //     //     })
    //     // })
    // },

    // // 打开聊天对话
    // BeganToChat(e) {
    //     let receiverid = e.currentTarget.dataset.receiverid; //好友的ID
    //     let senderid = e.currentTarget.dataset.senderid; //我的ID
    //     let action = 1; //第一次连接聊天
    //     let msg = ''; //
    //     wx.navigateTo({
    //         url: '/views/chat/chat?receiverid=' + receiverid + '&senderid=' + senderid + '&action=' + action + '&msg=' + msg,
    //     })
    // },

    // handleAddUser(e) {
    //     console.log(e)
    // },

    // onPullDownRefresh: function () {
    //     wx.showNavigationBarLoading()
    //     setTimeout(() => {
    //         this.getUserFriendList();
    //         wx.stopPullDownRefresh();
    //     }, 1000)

    // }
})