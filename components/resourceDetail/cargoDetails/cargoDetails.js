import User from "../../../models/user/user";
import mtWharf from "../../../models/frontEnd/mtWharf"
import user from "../../../models/user/user";
const {
    formatTime
} = require('../../../utils/util')

Component({
    properties: {
        porID: Number
    },
    lifetimes: {
        ready: function () {
            this.getUserInfo();
        }
    },
    data: {
        user: {},
        deatil: {},
        show: false,
        shipShow: false,
        btn: [{
            id: 1,
            icon: 'https://img.gdmatt.com/images/2021/01/14/16106173558876345.png',
            title: '修改货源信息',
            background: '#FFFFFF',
            color: '#999999',
            family: 'PingFang-SC-Medium',
            weight: 'Medium',
            width: '89.5px',
            size: '12px',
            show: true
        }, {
            id: 2,
            icon: 'https://img.gdmatt.com/images/2021/01/14/16106173690245366.png',
            title: '投诉',
            background: '#FFFFFF',
            color: '#999999',
            family: 'PingFang-SC-Medium',
            weight: 'Medium',
            width: '89.5px',
            size: '12px',
            show: false
        }, {
            id: 3,
            title: '发起聊天',
            background: '#FF7038',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: true
        }, {
            id: 4,
            title: '选择船东承运',
            background: '#FF3C07',
            color: '#FFFFFF',
            family: 'PingFang-SC-Bold',
            weight: 'bold',
            flex: 1,
            size: '15px',
            show: true
        }]
    },
    methods: {
        getUserInfo() {
            let Authorization = wx.getStorageSync('Authorization');
            let uId = '';
            let params = {
                Authorization,
                uId
            };

            User.userInfo(params).then(res => {
                let rows = res.data.data;
                this.getCargoInfo(rows)
            })
        },
        //获取货源信息
        getCargoInfo(user) {
            let id = this.properties.porID;
            let Authorization = wx.getStorageSync('Authorization');
            let params = {
                Authorization,
                collegeId: id
            }

            mtWharf.frontDeskCargoDeatil({
                id
            }).then(res => {
                let rows = res.data.data;
                User.UserCargoFocusOn(params).then(focus => {
                    Promise.all([focus]).then(result => {
                        let focusStatus = result[0].data.data;
                        rows.focusStatus = focusStatus
                        rows.loadingDate = formatTime(new Date(rows.loadingDate)).replace(/\//g, "-");
                        let btn = this.data.btn;
                        if (user.uid === rows.mtUser.uid) {
                            btn.forEach(data => {
                                if (data.id == 2) {
                                    data.show = false
                                } else {
                                    data.show = true
                                }
                            })
                        } else {
                            btn.forEach(data => {
                                if (data.id == 1 || data.id == 4) {
                                    data.show = false
                                } else {
                                    data.show = true
                                    if (data.id == 3) {
                                        data.background = "#FF3C07"
                                    }
                                }
                            })
                        }
                        this.setData({
                            deatil: rows,
                            user,
                            btn
                        })
                    })
                })

            })
        },
        //展示运价
        showHidden() {
            let show = this.data.show = !this.data.show;
            console.log(show)
            this.setData({
                show
            })
        },
        //关注
        handleCargoFocus(e) {
            let Authorization = wx.getStorageSync('Authorization');
            let status = e.currentTarget.dataset.status;
            let shipId = e.currentTarget.dataset.id;
            let params = {
                Authorization,
                shipId
            }
            console.log(params, status)

            if (status != true) {
                User.UserCargoFocus(params).then(res => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.setData({
                            [`deatil.focusStatus`]: true
                        })
                        wx.showToast({
                            title: '关注成功',
                            icon: 'success'
                        })

                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'loading'
                        })
                    }
                })
            } else {
                User.UserCargoCancelFocus({
                    Authorization,
                    id: shipId
                }).then(res => {
                    console.log(res)
                    if (res.data.state == 200) {
                        this.setData({
                            [`deatil.focusStatus`]: false
                        })
                        wx.showToast({
                            title: '成功取消关注',
                            icon: 'success'
                        })
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'loading'
                        })
                    }
                })
            }

        },
        //是否展示所有信息
        handleshow() {
            console.log(e)
        },
        //按钮事件
        handleBtn(e) {
            let id = e.currentTarget.dataset.id;
            let user = this.data.user;
            let deatil = this.data.deatil;
            console.log(id, user, deatil)

            switch (id) {
                case 1:
                    console.log(1)
                    break
                case 2:
                    console.log(2)
                    break
                case 3:
                    console.log(3)
                    if (user.uid === deatil.mtUser.uid) {
                        wx.navigateTo({
                            url: '/views/MyFriend/MyFriend',
                        })
                    } else {
                        wx.navigateTo({
                            url: '/views/chat/chat?receiverid=' + deatil.mtUser.uid + '&senderid=' + user.uid,
                        })
                    }
                    break
                case 4:
                    wx.navigateTo({
                      url: '/views/UserSpecifiedShip/UserSpecifiedShip',
                    })
                    break
            }

        },
    }
})