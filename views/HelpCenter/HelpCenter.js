import userFriend from "../../models/userFriend/userFriend";


Page({
    data: {
        setUpList: [{
            icon: 'https://img.gdmatt.com/images/2021/02/07/16126763714342104.png',
            title: '联系客服',
            show: true,
            state: 1
        }, {
            icon: 'https://img.gdmatt.com/images/2021/02/07/16126763796821515.png',
            title: '小程序使用手册',
            show: true,
            state: 2
        }],
    },
    handSetUp(e) {
        let index = e.currentTarget.dataset.index;
        switch (index) {
            case 0:
                this.getUser()
                break;
            case 1:
                this.instructions()
                break;
        }
    },
    //联系客服
    getUser() {
        let Authorization = wx.getStorageSync('Authorization');
        let page = 1;
        let rows = 10;
        let params = {
            Authorization,
            page,
            rows
        };

        userFriend.UserFriendsListL(params).then(res => {
            let rows = res.data.data.rows;
            let receiverid = null;
            let senderid = null;
            let action = 1;
            let msg = '';
            rows.forEach(data => {
                if (data.myFriendUser.mtEmployeeInformation) {
                    receiverid = data.myFriendUser.uid
                    senderid = data.myUser.uid
                }
            })

            wx.navigateTo({
                url: '/views/chat/chat?receiverid=' + receiverid + '&senderid=' + senderid + '&action=' + action + '&msg=' + msg,
            })

        })
    },
    instructions() {
        console.log('使用手册')
    }
})